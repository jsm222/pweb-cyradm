/* 
 * The MIT License
 *
 * Copyright 2015 Jesper Schmitz Mouridsen.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/* 
 * The MIT License
 *
 * Copyright 2015 Jesper Schmitz Mouridsen.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


define(['slick.editors','app/grid1','app/i18n'], function (editor,Grid1,i18n) {
	
			
    var m1 = new Grid1(
   {
	
   columns:[
    {id: "id", name: "id", field: "id",sortable:true,focusable:true,editable:false},
    {id: "username", name: i18n.gettext("Username"), field:"username",sortable:true,focusable:true,editable:false},
    {id: "auth_item", name: i18n.gettext("Role"),field:"authitem",formatter:function (row, cell, value, columnDef, dataContext) {
	return (dataContext.authitem) ? dataContext.authitem.auth_item : "";
},sortable:false,editor: editor.SelectOptionEditor,seloptions:{multiple:false,options:[{auth_item:"Administrator",id:1},{auth_item:"SuperDomainAdministrator",id:2},{auth_item:"DomainAdministrator",id:3},{auth_item:"AccountUser",id:4}],displayField:"auth_item",txt:i18n.gettext("Role"),
valueField:'id'},editable:true},
    {id: "domains", name: i18n.gettext("Domain(s)"), sfield:'domain_name',field:"domains",formatter:function (row, cell, value, columnDef, dataContext) {
	var str="";
	if(dataContext.domains && dataContext.domains.length>0) {
	$.map(dataContext.domains,function(item) {
	str = str + item.domain_name+",";
	});
	
	str = str.slice(0,-1);
	}
	if(str == "") {
	str = "N/A";
	}
	return str;
},sortable:false,editor: editor.SelectOptionEditor,seloptions:{txt:i18n.gettext("Search for a domain"),root:'domains',url:"/ajax/domains",displayName:"domain_name"},editable:true}],
    options:{
    rowHeight: 24,
    editable: true,
    autoEdit:false,
    fullWidthRows:true,	
    enableAddRow: false,
    forceFitColumns:true,
    multiSelect:false,
    enableColumnReorder:true,	
    multiColumnSort: true,	
    enableCellNavigation: true,
    editCommandHandler:function(item,column,editCommand) {
editCommand.execute();
var data={},ids=[],k=0,len=0;
if(column.field=='authitem') {
var role_id = item.authitem.id;
data['role_id']=role_id;
} else if(column.field=='domains') {
len = item.domains.length;
for(k=0;k<len;k++) 
ids.push(item.domains[k].id);
data['domain_id']=ids;
}else {
data[column.field]=item[column.field];
}
data.id=item.id;
$.ajax({url:'/ajax/users',
	context:editCommand,
	method:'post',
	error:editCommand.undo,
	success:function(response) {
	if($.parseJSON(response).success===0) {
	 editCommand.undo();
	} 
	 $(m1).trigger("row-saved",[$.parseJSON(response),this.row]);
	
	},
data:data});




}
    },url:'/ajax/users'});
  
    return m1;
});
