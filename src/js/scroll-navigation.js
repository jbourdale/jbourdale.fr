/**
 * script: scroll-navigation.js
 * author: Jules Bourdalé <jules.bourdale@gmail.com>
 *
 * This file holds the logic to implemement the scrolling mechanism, scrolling vertically
 * go to next page
 */

let currentPage = 0;
let pages = document.getElementsByClassName("page");

const particlesBackgroundEnabled = [true, false, false, false, false, false, false, false, false]


const onLeave = function(pageIndex) {
    if (particlesBackgroundEnabled[pageIndex]) {
        const el = document.getElementById(`animation-wrapper-${pageIndex}`);
        el.classList.remove("visible");
        el.classList.add("hidden");
    }
}

const onEnter = function(pageIndex) {
    if (particlesBackgroundEnabled[pageIndex]) {
        const el = document.getElementById(`animation-wrapper-${pageIndex}`);
        el.classList.remove("hidden");
        el.classList.add("visible");
    }
}


let scrollEnabled = true;
const handler = function(e) {
    e.preventDefault();
    if (!scrollEnabled) {
        return false;
    }

    onLeave(currentPage);
    if (e.deltaY > 0) {
        currentPage += 1
    } else if (e.deltaY < 0) {
        currentPage -= 1
    }
    if (currentPage < 0) { currentPage = 0 }
    if (currentPage > (pages.length - 1)) { currentPage = 0 }


    pages[currentPage].scrollIntoView({ behavior: 'smooth' });
    scrollEnabled = false;
    setTimeout(function() {
        scrollEnabled = true
    }, 1000);
    onEnter(currentPage)
}

document.getElementById("scroller").addEventListener("wheel", handler);
document.getElementById("scroller").addEventListener("DOMMouseScroll", handler);
document.getElementById("scroller").addEventListener("mousewheel", handler);

