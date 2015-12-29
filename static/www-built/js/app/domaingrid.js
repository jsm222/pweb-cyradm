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

define(["slick.editors","app/grid2","app/i18n"],function(f,k,b){var h=new k({columns:[{id:"id",name:"id",field:"id",sortable:!0,focusable:!0,editable:!1},{id:"domain_name",name:b.gettext("Domain name"),field:"domain_name",sortable:!0,focusable:!0,editor:f.Text,editable:!0},{id:"alias_domain",name:b.gettext("Alias domain"),field:"is_alias_domain",sortable:!0,focusable:!0,editable:!1,formatter:function(a,d,c,l,g){return"1"===c||1===c?b.gettext("Yes"):b.gettext("No")}},{id:"max_accounts_per_domain",
name:b.gettext("Max accounts"),field:"max_accounts_per_domain",sortable:!0,focusable:!0,editor:f.Integer,editable:!0},{id:"max_quota_per_account",name:b.gettext("Max quota pr. account"),formatter:function(a,d,c,b,g){a=g.max_quota_per_account;d="";a=Number(a);d=["KB","MB","GB","TB","PB"];c=0;if(0==a)return"0 KB";if(1024>a)return d=Number(a)+" "+d[c];for(;1024<=a;)c++,a/=1024;return d=Number(a)+" "+d[c]},field:"max_quota_per_account",sortable:!0,focusable:!0,editor:f.FileSizeEditor,editable:!0},{id:"max_aliases_per_account",
name:b.gettext("Max aliases pr. account"),field:"max_aliases_per_account",sortable:!0,focusable:!0,editor:f.Integer,editable:!0},{id:"managedby",name:b.gettext("Managed by"),field:"users",sfield:"username",formatter:function(a,d,c,b,g){var e="";g.users&&$.map(g.users,function(a){e=e+a.username+","});e=e.slice(0,-1);""==e&&(e="");return e},sortable:!1,editor:f.SelectOptionEditor,seloptions:{url:"/ajax/users",displayName:"username",root:"users"},editable:!0}],options:{rowHeight:24,editable:!0,autoEdit:!1,
fullWidthRows:!1,enableAddRow:!1,forceFitColumns:!0,multiSelect:!1,multiColumnSort:!0,enableCellNavigation:!0,editCommandHandler:function(a,d,c){c.execute();var b={},g=[],e=0,f=0;if("users"==d.field){f=a.users.length;for(e=0;e<f;e++)g.push(a.users[e].id);b.user_id=g}else b[d.field]=a[d.field];b.id=a.id;$.ajax({url:"/ajax/domains",context:c,method:"post",error:c.undo,success:function(a){0===$.parseJSON(a).success&&c.undo();$(h).trigger("row-saved",[$.parseJSON(a),this.row])},data:b})}},url:"/ajax/domains",
deleteText:"domain",deleteKey:"domain_name"});return h});