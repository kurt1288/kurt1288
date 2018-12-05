// From https://stackoverflow.com/a/13538245/1078475
String.prototype.escapeHtml = function() {
    const htmlTags = {
        '&' : '&amp;',
        '<' : '&lt;',
        '>' : '&gt;',
        '"' : '&quot;',
        "'" : '&#39;',
        '/' : '&#x2F;'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return htmlTags[tag] || tag;
    });
};

window.onload = function() {
    const codeElements = document.body.getElementsByTagName('code');
    for (let i=0; i < codeElements.length; i++) {
        const escapedHtml = codeElements[i].innerHTML.escapeHtml();
        codeElements[i].innerHTML = escapedHtml;
    }

    Array.from(document.getElementsByClassName('menuLink')).forEach(function(element) {
        element.addEventListener('click', openMenu);
    });

    document.addEventListener('click', closeMenu);

    function openMenu(e) {
        e.preventDefault();
        closeMenu();
        let menu = document.getElementById(e.srcElement.dataset.menu);
        menu.classList.add("open");
        e.stopImmediatePropagation();
    }

    function closeMenu() {
        if (document.getElementsByClassName('open').length > 0) {
            document.getElementsByClassName('open')[0].classList.remove('open');
        };
    }
}