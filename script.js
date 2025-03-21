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

function servicesclick(service) {
    console.log("services click");
    console.log(service);

    if (service === "ot") {
        document.getElementById("wrapperOT").style.display = "flex";
        document.getElementById("wrapperSE").style.display = "none";
        document.getElementById("wrapperSecurity").style.display = "none";
    }

    if (service === "se") {
        document.getElementById("wrapperOT").style.display = "none";
        document.getElementById("wrapperSE").style.display = "flex";
        document.getElementById("wrapperSecurity").style.display = "none";
    }

    if (service === "security") {
        document.getElementById("wrapperOT").style.display = "none";
        document.getElementById("wrapperSE").style.display = "none";
        document.getElementById("wrapperSecurity").style.display = "flex";
    }
}