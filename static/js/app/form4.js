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


define(["app/aliasgrid","app/Baseform"],function(config,Baseform) {
	function Form4(sel) {
	this.selector = {url:'/ajax/accounts',valueField:'id',displayField:'username',root:config.getSelectorText(),multiple:false};
	this.selector2 = {url:'/ajax/domains?all=true',valueField:'id',displayField:'domain_name',root:config.getSelectorText(2),multiple:false};
	Baseform.call(this,sel);
	return this;	
	}
	Form4.prototype = Object.create(Baseform.prototype);
	Form4.prototype.populate=function(record) {
	var modal = $(this.el),accountselector,newrecord,domainselector;
	$.each(record,function(key,value) {
		if(key === "alias") {
		value = (value.split("@")[0]);
		}
	var input = $(modal).find("input[name="+key+"]");
	if(input.length==1) {
	$(input[0]).val(value);
	}
		
	});
newRecord = {};
newRecord['domain_name']=record['alias_domain']['domain_name'];
newRecord['id']=record['alias_domain']['id'];

domainselector = this.makeSelector($(this.el).find("div.multiple")[1],this.selector2,newRecord);
newRecord = {};
newRecord['username']=record['dest'];
newRecord['id']=record.user.id;
accountselector = this.makeSelector($(this.el).find("div.multiple")[0],this.selector,newRecord);
$(accountselector).select2("disable");
	}

	
	Form4.prototype.getPostData = function() {
	var postdata="";
	if($(($(this.el).find("div.multiple"))[0]).css('display')!='none') {
	postdata="&user_id="+$(($(this.el).find("div.multiple"))[0]).select2("val");
	}
	if($(($(this.el).find("div.multiple"))[2]).css('display')!='none') {
	postdata=postdata+"&domain_id="+$(($(this.el).find("div.multiple"))[2]).select2("val");
	}
	return postdata;
	}
	
	Form4.prototype.getSaveUrl = function() {
	return '/ajax/aliases';

	}
    
return Form4;
});
