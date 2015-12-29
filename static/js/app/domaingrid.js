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


define(['slick.editors','app/grid2','app/i18n'], function (editor,grid2,i18n) {



    var m2 = new grid2(
   {columns : [
    {id: "id", name: "id", field: "id",sortable:true,focusable:true,editable:false},
    {id: "domain_name", name: i18n.gettext("Domain name"), field:"domain_name",sortable:true,focusable:true,editor: editor.Text,editable:true},
    {id: "alias_domain",name: i18n.gettext("Alias domain"), field:"is_alias_domain",sortable:true,focusable:true,editable:false,formatter: function(row, cell, value, columnDef, dataContext) {
    return (value==="1" || value===1) ? i18n.gettext("Yes") : i18n.gettext("No");
  }},
    {id: "max_accounts_per_domain", name: i18n.gettext("Max accounts"), field:"max_accounts_per_domain",sortable:true,focusable:true,editor: editor.Integer,editable:true},
    {id: "max_quota_per_account", name: i18n.gettext("Max quota pr. account"), formatter:function(row, cell, value, columnDef, dataContext) {
var bytes=dataContext.max_quota_per_account,fmtValue="";
bytes = Number(bytes);
        var types = ['KB', 'MB', 'GB', 'TB', 'PB' ],i=0;
	var posttxt = 0;
	if (bytes == 0) { fmtValue = '0 KB'; return fmtValue;}
	if (bytes < 1024) {
			fmtValue = (Number(bytes)) + " " + types[posttxt];
			return fmtValue;
					
	}
	while( bytes >= 1024 ) {
			
			posttxt++;
			bytes = bytes / 1024;
	}
fmtValue = (Number(bytes)) + " " + types[posttxt];
return fmtValue;
} ,field:"max_quota_per_account",sortable:true,focusable:true,editor: editor.FileSizeEditor,editable:true},
    {id: "max_aliases_per_account", name: i18n.gettext("Max aliases pr. account"), field:"max_aliases_per_account",sortable:true,focusable:true,editor: editor.Integer,editable:true},
    {id: "managedby", name: i18n.gettext("Managed by"), field:"users",sfield:'username',formatter:function (row, cell, value, columnDef, dataContext) {
	var str="";
	if(dataContext.users)
	$.map(dataContext.users,function(item) {
	str = str + item.username+",";
	});
	str = str.slice(0,-1);
	if(str == "") {
	str = "";
	}
	return str;
},sortable:false,editor: editor.SelectOptionEditor,seloptions:{url:"/ajax/users",displayName:"username",root:'users'},editable:true}
  ],
    options : {
    rowHeight: 24,
    editable: true,
    autoEdit:false,
    fullWidthRows:false,	
    enableAddRow: false,
    forceFitColumns:true,
    multiSelect:false,
    multiColumnSort: true,	
    enableCellNavigation: true,
    editCommandHandler:function(item,column,editCommand) {
editCommand.execute();
var data={},ids=[],k=0,len=0;
if(column.field=='users') {
len = item.users.length;
for(k=0;k<len;k++) {
ids.push(item.users[k].id);
}
data['user_id']=ids;
}else {
data[column.field]=item[column.field];
}
data.id=item.id;
$.ajax({url:'/ajax/domains',
	context:editCommand,
	method:'post',
	error:editCommand.undo,
        success:function(resp) {
        if($.parseJSON(resp).success===0) {
	 editCommand.undo();
	} 
                $(m2).trigger("row-saved",[$.parseJSON(resp),this.row]); },
data:data});




}},url:'/ajax/domains',deleteText:'domain',deleteKey:'domain_name'});
	
    return m2;
});
