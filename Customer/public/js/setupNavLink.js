var navlinks = document.getElementsByClassName("navigate-link");
var navdivs = document.getElementsByClassName("navigate-div");
const url = window.location.pathname;
for (var i = 0; i < navdivs.length; i++) {
    if (navlinks[i].getAttribute("href").slice(1) === url.split('/')[1]) {
        navdivs[i].className = "navigate-div active";
    } else {
        navdivs[i].className = "navigate-div";
    }
}