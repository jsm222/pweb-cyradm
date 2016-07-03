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


define(["app/i18n"],function(i18n) {
function BaseForm(sel) {
this.el = $(($(sel))[0]).clone().appendTo('body').attr("class","item-details-form");

}

BaseForm.prototype = {
        show: function (enableAll) {
            $(this.el).draggable({containment:'parent'});   
	    $(this.el).css({display:'block'});
	    $(this.el).position({my: "center",at: "center",of:$(window)});
		if(enableAll) {
	    $.map($(this.el).find("input:disabled"),function(input) {
		$(input).removeAttr("disabled");
		});
if(this.selector != undefined) {
this.makeSelector($(this.el).find("div.multiple")[0],this.selector);
}

	if(this.selector2 != undefined) {
this.makeSelector($(this.el).find("div.multiple")[2],this.selector2);
}
	}

        },
	enableForm:function() {
	var me = this;
	$(this.el).find("[data-action=save]").click(function() { me.save(me.getPostData(),me.getSaveUrl()); return false;});

	$(this.el).find("[data-action=cancel]").click(function () {
      	$(me.el).remove();
	return false;
	});
    	},
	getForm:function() {
	return ($(this.el).find("form"))[0];
	},
	makeSelector:function(domainsel,config,record) {
	var displayField = config.displayField,valueField=config.valueField,url=config.url,txt=config.txt,sel2config,ajax;

	ajax= {
	url: config.url,
		dataType: 'json',
		quietMillis: 100,
		data: function (term, page) { // page is the one-based page number tracked by Select2
		return {
		q: term, //search term
		page_limit: 10, // page size
		page: page // page number
		
};
},	
results: function (data, page) {
var more = (page * 10) < data.total; // whether or not there are more results available
 
// notice we return the value of more so Select2 knows if more results can be loaded
return {results: data.results, more: more};
}
};

sel2config = {
	multiple:config.multiple,	
	placeholder: txt,
	minimumInputLength: 1,
	formatResult:function(item) {
return item[displayField];
},
formatSelection: function(item) {
        return item[displayField];
    },
id: function(item) { 
return item[valueField]; }
}
if(config.url!==undefined && config.data == undefined) {
sel2config.ajax=ajax;
}else {
sel2config.minimumInputLength=0;
sel2config.data=config.data;
} 


	$(domainsel).select2(sel2config);

if(record !== undefined) {
$(domainsel).select2("data",record);
}
return domainsel;
    },save:function(postdata,url) {
form = ($(this.el).find("form"))[0];
$.ajax({method:'post',url:url,data:$(form).serialize()+postdata,
success:function(data) {
$(form).trigger("form-saved",[$.parseJSON(data)]);
},
statusCode:{
403:function() {
	dialog = $("<div/>");
$(dialog).attr("title",i18n.gettext("An error occured"));
$(dialog).append("<p/>"+i18n.gettext("Permission denied")+"</p>")
$(dialog).dialog({
resizable: false,
height:250,
closeText:'',
modal: true,
buttons: [ { text: "Ok", click: function() { $("body").remove($(dialog)); $( this ).dialog( "destroy" ); } } ]
});
},
404:function() {
	dialog = $("<div/>");
$(dialog).attr("title",i18n.gettext("An error occured"));
$(dialog).append("<p>"+i18n.gettext("Invalid paramters")+"</p>")
$(dialog).dialog({
resizable: false,
height:250,
closeText:'',
modal: true,
buttons: [ { text: "Ok", click: function() { $( this ).dialog( "destroy" ); } } ]
});
}
}
});
return false;
},
getDialogText:function() {
	return i18n.getttext("Delete domain");
	}
}
return BaseForm;
});
