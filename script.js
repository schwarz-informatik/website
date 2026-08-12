var menuVisible = false;

function burgerclick() {
    console.log("burger click");

    menuVisible = !menuVisible;

    console.log(menuVisible);

    if (menuVisible) {
        document.getElementById("mainNavigation").style.display = "flex";
    }
    else {
        document.getElementById("mainNavigation").style.display = "none";
    }
}

/*
 * Zuordnung Leistungsbereich zu Wrapper-ID. Ein weiterer Bereich braucht hier
 * nur einen Eintrag, dazu den Block in services.html, die Regel in style.css
 * und ein Halblogo in /img.
 */
var serviceWrappers = {
    ot: "wrapperOT",
    se: "wrapperSE",
    pa: "wrapperPA",
    security: "wrapperSecurity"
};

function servicesclick(service) {
    console.log("services click");
    console.log(service);

    if (!serviceWrappers.hasOwnProperty(service)) {
        return;
    }

    for (var key in serviceWrappers) {
        var wrapper = document.getElementById(serviceWrappers[key]);

        if (wrapper) {
            wrapper.style.display = key === service ? "flex" : "none";
        }
    }
}