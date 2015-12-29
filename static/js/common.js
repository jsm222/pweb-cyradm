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


requirejs.config({baseUrl:"../static/js/lib",paths:{app:"../app",jquery:"//code.jquery.com/jquery-1.10.1.min",jqueryui:"//code.jquery.com/ui/1.10.3/jquery-ui.min"}});
require(['jquery','jqueryui','select2','app/i18n'], function ($,ui,sel2,i18n) {
$(function() {
    $.extend($.fn.select2.defaults, {
        formatNoMatches: function () { return i18n.gettext("No matches found"); },
        formatInputTooShort: function (input, min) { var n = min - input.length; return i18n.sprintf(i18n.ngettext("Please enter %1$d more character","Please enter %1$d more characters",n),n); },
        formatInputTooLong: function (input, max) { var n = input.length - max; return i18n.sprintf(i18n.ngettext("Please delete %1$d character","Please delete %1$d characters",n),n); },
        formatSelectionTooBig: function (limit) { return i18n.sprintf(i18n.ngettext("You can only select %1$d item","You can only select %1$d items",limit),limit); },
        formatLoadMore: function (pageNumber) { return i18n.gettext("Loading more results..."); },
        formatSearching: function () { return i18n.gettext("Searching..."); }
    });
    
$('#menu').menu();
$("#left").show();
});
});

