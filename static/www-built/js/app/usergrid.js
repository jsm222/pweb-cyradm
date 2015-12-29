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

define(["slick.editors","app/grid1","app/i18n"],function(h,l,c){var k=new l({columns:[{id:"id",name:"id",field:"id",sortable:!0,focusable:!0,editable:!1},{id:"username",name:c.gettext("Username"),field:"username",sortable:!0,focusable:!0,editable:!1},{id:"auth_item",name:c.gettext("Role"),field:"authitem",formatter:function(d,f,g,e,b){return b.authitem?b.authitem.auth_item:""},sortable:!1,editor:h.SelectOptionEditor,seloptions:{multiple:!1,options:[{auth_item:"Administrator",id:1},{auth_item:"SuperDomainAdministrator",
id:2},{auth_item:"DomainAdministrator",id:3},{auth_item:"AccountUser",id:4}],displayField:"auth_item",txt:c.gettext("Role"),valueField:"id"},editable:!0},{id:"domains",name:c.gettext("Domain(s)"),sfield:"domain_name",field:"domains",formatter:function(d,f,g,e,b){var a="";b.domains&&0<b.domains.length&&($.map(b.domains,function(b){a=a+b.domain_name+","}),a=a.slice(0,-1));""==a&&(a="N/A");return a},sortable:!1,editor:h.SelectOptionEditor,seloptions:{txt:c.gettext("Search for a domain"),root:"domains",
url:"/ajax/domains",displayName:"domain_name"},editable:!0}],options:{rowHeight:24,editable:!0,autoEdit:!1,fullWidthRows:!0,enableAddRow:!1,forceFitColumns:!0,multiSelect:!1,enableColumnReorder:!0,multiColumnSort:!0,enableCellNavigation:!0,editCommandHandler:function(d,f,g){g.execute();var e={},b=[],a=0,c=0;if("authitem"==f.field)e.role_id=d.authitem.id;else if("domains"==f.field){c=d.domains.length;for(a=0;a<c;a++)b.push(d.domains[a].id);e.domain_id=b}else e[f.field]=d[f.field];e.id=d.id;$.ajax({url:"/ajax/users",
context:g,method:"post",error:g.undo,success:function(a){0===$.parseJSON(a).success&&g.undo();$(k).trigger("row-saved",[$.parseJSON(a),this.row])},data:e})}},url:"/ajax/users"});return k});