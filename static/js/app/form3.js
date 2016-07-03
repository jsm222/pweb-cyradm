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
	this.selector = {url:'/ajax/domains',valueField:'id',displayField:'domain_name',root:'domains',multiple:false};
	Baseform.call(this,sel);
	
	return this;	
	}
	Form2.prototype = Object.create(Baseform.prototype);
	Form2.prototype.populate=function(record) {
	$(($(this.el).find("div.multiple"))[0]).select2("destroy");
	$(($(this.el).find("div.multiple"))[0]).hide();
	$(($(this.el).find("label.multiple"))[0]).hide();
	
	var modal = $(this.el);
	$.each(record,function(key,value) {
            var input = $(modal).find("input[name="+key+"]");
        
        if(key === "quota")  {
          var text = $(modal).find("input[name=quota_text]")[0];
          $(text).val(formatters.FileSizeFormatter(undefined,undefined,value));
          $(input[0]).val(value);
          } else  {
	
	if(input.length===1) {
	$(input[0]).val(value);
	}
	 }	
	});
	

    };
	
	Form2.prototype.getPostData = function() {
            $(this.getForm()).find("input[name=quota]").eq(0).val(formatters.FileSizeParser($(this.getForm()).find("input[name=quota_text]").eq(0).val()));
	var postdata="";
	if($(($(this.el).find("div.multiple"))[0]).css('display')!='none') {
	postdata="&domain_id="+$(($(this.el).find("div.multiple"))[0]).select2("val");
	}
	
	return postdata;
	}
	Form2.prototype.getSaveUrl = function() {
	return '/ajax/accounts';

	}
	
    
return Form2;
});
