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