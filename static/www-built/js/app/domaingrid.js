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

define(["slick.editors","slick.formatters","app/grid2","app/i18n"],function(c,k,l,a){var h=new l({columns:[{id:"id",name:"id",field:"id",sortable:!0,focusable:!0,editable:!1},{id:"domain_name",name:a.gettext("Domain name"),field:"domain_name",sortable:!0,focusable:!0,editor:c.Text,editable:!0},{id:"alias_domain",name:a.gettext("Alias domain"),field:"is_alias_domain",sortable:!0,focusable:!0,editable:!1,formatter:function(m,c,d,e,f){return"1"===d||1===d?a.gettext("Yes"):a.gettext("No")}},{id:"max_accounts_per_domain",
name:a.gettext("Max accounts"),field:"max_accounts_per_domain",sortable:!0,focusable:!0,editor:c.Integer,editable:!0},{id:"max_quota_per_account",name:a.gettext("Max quota pr. account"),formatter:k.FileSizeFormatter,field:"max_quota_per_account",sortable:!0,focusable:!0,editor:c.FileSizeEditor,editable:!0},{id:"max_aliases_per_account",name:a.gettext("Max aliases pr. account"),field:"max_aliases_per_account",sortable:!0,focusable:!0,editor:c.Integer,editable:!0},{id:"managedby",name:a.gettext("Managed by"),
field:"users",sfield:"username",formatter:function(a,c,d,e,f){var b="";f.users&&$.map(f.users,function(a){b=b+a.username+","});b=b.slice(0,-1);""==b&&(b="");return b},sortable:!1,editor:c.SelectOptionEditor,seloptions:{url:"/ajax/users",displayName:"username",root:"users"},editable:!0}],options:{rowHeight:24,editable:!0,autoEdit:!1,fullWidthRows:!1,enableAddRow:!1,forceFitColumns:!0,multiSelect:!1,multiColumnSort:!0,enableCellNavigation:!0,editCommandHandler:function(a,c,d){d.execute();var e={},f=
[],b=0,g=0;if("users"==c.field){g=a.users.length;for(b=0;b<g;b++)f.push(a.users[b].id);e.user_id=f}else e[c.field]=a[c.field];e.id=a.id;$.ajax({url:"/ajax/domains",context:d,method:"post",error:d.undo,success:function(a){0===$.parseJSON(a).success&&d.undo();$(h).trigger("row-saved",[$.parseJSON(a),this.row])},data:e})}},url:"/ajax/domains",deleteText:"domain",deleteKey:"domain_name"});return h});