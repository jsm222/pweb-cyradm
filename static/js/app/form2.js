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


define(["app/Baseform","slick.formatters"],function(Baseform,formatters) {
	function Form2(sel) {
	this.selector = {url:'/ajax/users',valueField:'id',displayField:'username',root:'users',multiple:true};
	Baseform.call(this,sel);
	return this;	
	}
	Form2.prototype = Object.create(Baseform.prototype);
	Form2.prototype.populate=function(record) {
	
	var sel1 = this.makeSelector($(this.el).find("div.multiple")[0],this.selector,record.users);
	var modal = $(this.el);
	$.each(record,function(key,value) {
	var input = $(modal).find("input[name="+key+"]");
        if(key === "max_quota_per_account")  {
           var text = $(modal).find("input[name=max_quota_per_account_text]")[0];
           $(text).val(formatters.FileSizeFormatter(undefined,undefined,value));
           $(input[0]).val(value);
        } else if(key==="is_alias_domain") {		
	$(input[0]).prop("checked",(value==="1" || value===1));
	
	} else {
	if(input.length===1) {
	$(input[0]).val(value);
	}
	}
	
	});
	
	return false;

    	}
	
	Form2.prototype.getPostData = function() {
            $(this.getForm()).find("input[name=max_quota_per_account]").eq(0).val(formatters.FileSizeParser($(this.getForm()).find("input[name=max_quota_per_account_text]").eq(0).val()));
	var postdata="",sel1 = $(this.el).find("div.multiple")[0];
	$.map($(sel1).select2("val"),function(value) {
	postdata = postdata +"&user_id="+value;
	
	});
	
	return postdata;
	}

	Form2.prototype.getSaveUrl = function() {
	return '/ajax/domains';

	}
	
	
	
    
return Form2;
});
