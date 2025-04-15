/*-------------------

Template Name: <
Author:  pixel-drop
Author URI: https://themeforest.net/user/pixel-drop/portfolio
Developer: Gramentheme Team
Version: 1.0.0
Description: 

--------------------
CSS TABLE OF CONTENTS
--------------------

01. preloader
02. header
03. swiper slider
04. Custom text Animation
05. Aos Animation
06. Tilt Js
07. magnificPopup
08. Odometer
09. Booststrap Customization
10. nice select
11. wow animation
12.Custom Search 

-------------------*/

(function ($) {
  "use strict";

  $(document).ready(function () {
    //--- Custom Header Start ---//

    $(".navbar-toggle-btn").on("click", function () {
      $(".navbar-toggle-item").slideToggle(300);
      $("body").toggleClass("overflow-hidden");
      $(this).toggleClass("open");
    });
    $(".menu-item button").on("click", function () {
      $(this).siblings("ul").slideToggle(300);
    });

    var fixed_top = $(".header-section");
    if ($(window).scrollTop() > 50) {
      fixed_top.addClass("animated fadeInDown header-fixed");
    } else {
      fixed_top.removeClass("animated fadeInDown header-fixed");
    }
    //--== Sticky Header ==--//

    //--== Window On Scroll ==--//
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 50) {
        fixed_top.addClass("animated fadeInDown header-fixed");
      } else {
        fixed_top.removeClass("animated fadeInDown header-fixed");
      }
    });
    //--- Custom Header End ---//

    //--- Custom Sidebar ---//
    $(".remove-click").on("click", function (e) {
      $(".subside-barmenu").toggleClass("active");
    });

    //--- Custom Tilt Js Start ---//
    const tilt = document.querySelectorAll(".tilt");
    VanillaTilt.init(tilt, {
      reverse: true,
      max: 15,
      speed: 400,
      scale: 1.01,
      glare: true,
      reset: true,
      perspective: 800,
      transition: true,
      "max-glare": 0.45,
      "glare-prerender": false,
      gyroscope: true,
      gyroscopeMinAngleX: -45,
      gyroscopeMaxAngleX: 45,
      gyroscopeMinAngleY: -45,
      gyroscopeMaxAngleY: 45,
    });
    //--- Custom Tilt Js End ---//

    //--- Custom Line Animation ---//
    for (let i = 0; i < 3; i++) {
      const clone = $("<span></span>").clone();
      clone.appendTo(".line-shape.first");
    }
    //--- Custom Line Animation ---//

    //--- Scroll Top Start ---//
    let calcScrollValue = () => {
      let scrollProgress = document.getElementById("progress");
      let progressValue = document.getElementById("valu");
      let pos = document.documentElement.scrollTop;
      let calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      let scrollValue = Math.round((pos * 250) / calcHeight);

      if (pos > 250) {
        scrollProgress.style.display = "grid";
      } else {
        scrollProgress.style.display = "none";
      }
      scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
      });
    };
    window.onscroll = calcScrollValue;
    window.onload = calcScrollValue;
    //--- Scroll Top End ---//

    //---  Counter Start ---//
    $(".count").counterUp({
      delay: 15,
      time: 4000,
    });
    //--- Counter  End ---//

    //>> Brand Slider Start <<//
    if ($(".brand-slider").length > 0) {
      const brandSlider = new Swiper(".brand-slider", {
        spaceBetween: 30,
        speed: 2000,
        loop: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        breakpoints: {
          1199: {
            slidesPerView: 5,
          },
          991: {
            slidesPerView: 4,
          },
          767: {
            slidesPerView: 3,
          },
          575: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        },
      });
    }

    //>> Testimonial Slider Start <<//
    if ($(".testimonial-slider").length > 0) {
      const testimonialSlider = new Swiper(".testimonial-slider", {
        spaceBetween: 30,
        speed: 2000,
        loop: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".dot",
          clickable: true,
        },
        navigation: {
          nextEl: ".array-prev",
          prevEl: ".array-next",
        },
        breakpoints: {
          1399: {
            slidesPerView: 4,
          },
          1199: {
            slidesPerView: 3,
          },
          991: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 2,
          },
          575: {
            slidesPerView: 1,
          },
          0: {
            slidesPerView: 1,
          },
        },
      });
    }

    //--- Aos Animation --- //
    $(".title").attr({
      "data-aos": "zoom-in",
      "data-aos-duration": "2000",
    });

    AOS.init({
      once: true,
    });
    //--- Aos Animation --- //

    //--- magnific Popup --- //
    $(".img-popup").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });

    //--- magnific Popup --- //

    //--- Nice Select --- //
    $("select").niceSelect();
    //--- Nice Select --- //

    //--- Custom Accordion Tabs --- //
    $(".accordion-single .header-area").on("click", function () {
      if ($(this).closest(".accordion-single").hasClass("active")) {
        $(this).closest(".accordion-single").removeClass("active");
        $(this).next(".content-area").slideUp();
      } else {
        $(".accordion-single").removeClass("active");
        $(this).closest(".accordion-single").addClass("active");
        $(".content-area").not($(this).next(".content-area")).slideUp();
        $(this).next(".content-area").slideToggle();
      }
    });
    //--- Custom Accordion Tabs --- //
  }); // End Document Ready Function

  function loader() {
    $(window).on("load", function () {
      // Animate loader off screen
      $(".preloader").addClass("loaded");
      $(".preloader").delay(10).fadeOut();
    });
  }

  loader();
})(jQuery);

let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

next.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(items[0]);
});

prev.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").prepend(items[items.length - 2]);
});

//
