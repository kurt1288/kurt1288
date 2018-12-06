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
    // Get current file URL
    fetch('https://api.github.com/repos/kurt1288/road/tags').then(function(response) { 
        return response.json();
    }).then(function(myJson) {
        const url = "https://github.com/kurt1288/Road/releases/download/" + myJson[0].name + "/road.zip";
        Array.from(document.getElementsByClassName('downloadLink')).forEach(function(e) {
            e.href = url;
        });
    });

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