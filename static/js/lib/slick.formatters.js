/***
 * Contains basic SlickGrid formatters.
 * 
 * NOTE:  These are merely examples.  You will most likely need to implement something more
 *        robust/extensible/localizable/etc. for your use!
 * 
 * @module Formatters
 * @namespace Slick
 */

// Universal module definition
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', './slick.core'], factory);
    } else {
        // Browser globals
        root.Slick.Formatters = factory(root.jQuery, root.Slick);
    }
}(this, function ($, Slick) {
    // register namespace
    $.extend(true, Slick, {
        "Formatters": {
            "PercentComplete": PercentCompleteFormatter,
            "PercentCompleteBar": PercentCompleteBarFormatter,
            "YesNo": YesNoFormatter,
            "Checkmark": CheckmarkFormatter,
            "FileSizeFormatter":FileSizeFormatter,
            "FileSizeParser":FileSizeParser
        }

    });

    function PercentCompleteFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "") {
            return "-";
        } else if (value < 50) {
            return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
        } else {
            return "<span style='color:green'>" + value + "%</span>";
        }
    }

    function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "") {
            return "";
        }

        var color;

        if (value < 30) {
            color = "red";
        } else if (value < 70) {
            color = "silver";
        } else {
            color = "green";
        }

        return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
    }

    function YesNoFormatter(row, cell, value, columnDef, dataContext) {
        return value ? "Yes" : "No";
    }

    function CheckmarkFormatter(row, cell, value, columnDef, dataContext) {
        return value ? "<img src='../images/tick.png'>" : "";
    }
    function FileSizeFormatter(row, cell, value, columnDef, dataContext) {
        if(value===0 || value==="0" || value===null) {
        return null;
        }
        var bytes = value, fmtValue = "";
         
        bytes = Number(bytes);
        var types = ['KB', 'MB', 'GB', 'TB', 'PB'], i = 0;
        var posttxt = 0;
        if (bytes == 0) {
            fmtValue = '0 KB';
            return fmtValue;
        }
        if (bytes < 1024) {
            fmtValue = (Number(bytes)) + " " + types[posttxt];
            return fmtValue;

        }
        while (bytes >= 1024) {

            posttxt++;
            bytes = bytes / 1024;
        }
        fmtValue = (Number(bytes)) + " " + types[posttxt];
        return fmtValue;
    }
    function FileSizeParser(value) {
	var arr=[];
        if (value == null || value === "" || value === "0") {
            return "0";
        }
	arr = value.match(new RegExp(/(^\d+(\.\d+)?)(\s+)?(KB|MB|GB|TB|PB)/i));
        if(arr) {
       switch(arr[4].toUpperCase()) {
	case "KB" : value=Number(arr[1]*1024);break;
	case "MB" : value=Number(arr[1]*Math.pow(1024,2));break;
	case "GB" : value=Number(arr[1]*Math.pow(1024,3));break;
	case "TB" : value=Number(arr[1]*Math.pow(1024,4));break;
	case "PB" : value=Number(arr[1]*Math.pow(1024,5));break;
	}
        value = Math.floor(value / 1024);
        };
	
        //stored in whole KB
     return value;
     
     };
    return Slick.Formatters;
}
        ));
