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


define(["app/grid1","app/Baseform"],function(config,Baseform) {
	function Form1(sel) {
	this.selector = {url:'/ajax/domains?all=true',valueField:'id',displayField:'domain_name',root:'domains',multiple:true};
	Baseform.call(this,sel);
	

	return this;	
	}
	Form1.prototype = Object.create(Baseform.prototype);
	Form1.prototype.populate=function(record) {
	
	this.sel1 = this.makeSelector($(this.el).find("div.multiple")[0],this.selector,record.domains);
var me = this;
		$.ajax({url:'/ajax/authitems',method:'post',success:function(data) {
	
	me.sel2 =  me.makeSelector($(modal).find("div.authitem")[0],{data:{results:$.parseJSON(data).results,text:'auth_item'},
valueField:'id',displayField:'auth_item',txt:'Role',root:'authitems',multiple:false},record.authitem);
	}});
	
	var modal = $(this.el);
	$.each(record,function(key,value) {
	if(key === "is_alias_domain") {
	    if(value) {
	$("#is_alias_domain").attr("checked","checked");
	} else {
$("#is_alias_domain").removeAttr("checked");
	}
	} else {
	var input = $(modal).find("input[name="+key+"]");
	if(input.length==1) {
	$(input[0]).val(value);
	}
	}
	});
	
	
	
	Form1.prototype.getPostData = function() {
	var postdata="";
	$.map($(this.sel1).select2("val"),function(value) {
	postdata = postdata +"&domain_id="+value;
	});
	
	postdata = postdata +"&role_id="+$(this.sel2).select2("val");
	
	return postdata;
	}
	
	Form1.prototype.getSaveUrl = function() {
	return "/ajax/users";
	}
	
    };
return Form1;
});
