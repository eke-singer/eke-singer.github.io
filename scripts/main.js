// https://github.com/jfriend00/docReady
// https://stackoverflow.com/a/9899701/3403216
(function() {
    "use strict";
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }    
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
    window["onReady"] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            readyList.push({fn: callback, ctx: context});
        }
        if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("onReady", window);

onReady(function() {
    function hl(sel, lngs) {
        hljs.configure({languages: lngs});
        document.querySelectorAll(sel).forEach(el => hljs.highlightElement(el));
    };
    hl("pre.src.src-python", ["python"]);
    hl("pre.example", []);
});
