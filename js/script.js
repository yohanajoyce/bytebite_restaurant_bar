'use strict';

// preload

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
} ); 

/**
 * add event listener on mutiple elements
 */



const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
    }
}

/**
 * NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglerNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", togglerNavbar);

/**
 *  HEADER
 */

 const header = document.querySelector("[data-header]");

 let lastScrollPos = 0;

 const hideHeader =  function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else{
        header.classsList.remove("hide");
    }

    lastScrollPos = window.scrollY; 
 }
 window.addEventListener("scroll", function (){
if (window.scrollY >= 50) {
    header.classList.add("active");
    hideHeader();
} else {
    header.classList.remove("active");
}
 });




 /**
  *  hero slider
  */

 const heroSlider = document.querySelector("[data-hero-slider");
 const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
 const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
 const heroSliderNextBtn = document.querySelector("[data-next-btn]");

 let currentSlidePos = 0;
 let lastActiveSliderItem = heroSliderItems[0];

 const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
 }

 const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }
    updateSliderPos();
 }
 heroSliderNextBtn.addEventListener("click", slideNext);

 const sliderPrev = function () {
    if (currentSlidePos<= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }
    updateSliderPos();
 }
 heroSliderPrevBtn.addEventListener("click", sliderPrev);


 /**
  * auto slide
  */


let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function() {
    clearInterval(autoSlideInterval);
});


addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);