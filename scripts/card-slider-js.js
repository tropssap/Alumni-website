var x = window.matchMedia("(min-width: 576px)")

let navType = 'centered';
let midActive = 1;

function checkNavbar(x) {
    if (x.matches) { // If media query matches
        navType = 'forceCentered';
        midActive = 0;
    }
}
checkNavbar(x) // Call listener function at run time

var options = {
    horizontal: 1,
    itemNav: navType,
    activateMiddle: midActive,
    smart: 1,
    activateOn: 'click',
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    startAt: 4,
    scrollBy: 1,
    cycleBy:       'items',  // Enable automatic cycling by 'items' or 'pages'.
    cycleInterval: 5000,
    speed: 300,
    elasticBounds: 1,
    easing: 'easeOutExpo',
    dragHandle: 1,
    dynamicHandle: 1,
    clickBar: 1,
}

var frame = new Sly('#centered', options).init();


window.addEventListener("resize", resizer);
function resizer() {
    setTimeout(function () {
        frame.reload()
    }, 200)
}
window.addEventListener('load', (event) => {
    frame.reload()
});
frame.activate(1, true)
