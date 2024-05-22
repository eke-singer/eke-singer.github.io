document.addEventListener(
    'DOMContentLoaded',
    function () {
        document.querySelectorAll('pre.src').forEach(
            el => { hljs.highlightElement(el); }
        )
    },
    false);
