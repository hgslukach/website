/* ==============
 ========= js documentation ==========================

 * template name: Safai
 * version: 1.0
 * description: Cleaning Service HTML5 Template
 * author: Expert-Themes
 * author-url: https://themeforest.net/user/expert-themes

    ==================================================

     01. preloader
     -------------------------------------------------
     02. custom cursor
     -------------------------------------------------
     03. scroll to top with progress
     -------------------------------------------------
     04. background image
     -------------------------------------------------
     05. add active class to the current link
     -------------------------------------------------
     06. open search box
     -------------------------------------------------
     07. open sidebar info
     -------------------------------------------------
     08. offcanvas cart
     -------------------------------------------------
     09. mobile menu
     -------------------------------------------------
     10. fixed header on scroll
     -------------------------------------------------
     11. odometer counter
     -------------------------------------------------
     12. video popup
     -------------------------------------------------
     13. vanilla tilt animations
     -------------------------------------------------
     14. service item active on hover
     -------------------------------------------------
     15. featured services tab
     -------------------------------------------------
     16. bubble animations
     -------------------------------------------------
     17. bubble medium animations
     -------------------------------------------------
     18. bubble small animations
     -------------------------------------------------
     19. partner slider
     -------------------------------------------------
     20. testimonial slider
     -------------------------------------------------
     21. bubble blog animations
     -------------------------------------------------
     22. bubble newsletter animations
     -------------------------------------------------
     23. banner two slider
     -------------------------------------------------
     24. bubble banner animation
     -------------------------------------------------
     25. testimonial two slider
     -------------------------------------------------
     26. banner three slider
     -------------------------------------------------
     27. service three slider
     -------------------------------------------------
     28. coming soon
     -------------------------------------------------
     29. footer copyright year
     -------------------------------------------------
     30. aos initialization
     -------------------------------------------------
     31. register gsap
     -------------------------------------------------
     32. gsap null config
     -------------------------------------------------
     33. title animation
     -------------------------------------------------
     34. particles background bubbles
     -------------------------------------------------
     
    ==================================================
============== */

(function ($) {
  "use strict";

  jQuery(function () {
    let device_width = window.innerWidth;
    let initialScroll = $(window).scrollTop();

    /**
     * ======================================
     * 01. preloader
     * ======================================
     */
    if ($("#preloader").length) {
      $("#preloader").delay(300).hide(300);
    }

    /**
     * ======================================
     * 02. custom cursor
     * ======================================
     */
    if ($(".mouseCursor").length > 0) {
      function itCursor() {
        var myCursor = jQuery(".mouseCursor");
        if (myCursor.length) {
          if ($("body")) {
            const e = document.querySelector(".cursor-inner"),
              t = document.querySelector(".cursor-outer");
            let n,
              i = 0,
              o = !1;
            (window.onmousemove = function (s) {
              o ||
                (t.style.transform =
                  "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                (e.style.transform =
                  "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                (n = s.clientY),
                (i = s.clientX);
            }),
              $("body").on(
                "mouseenter",
                "button, a, .cursor-pointer",
                function () {
                  e.classList.add("cursor-hover"),
                    t.classList.add("cursor-hover");
                }
              ),
              $("body").on(
                "mouseleave",
                "button, a, .cursor-pointer",
                function () {
                  ($(this).is("a", "button") &&
                    $(this).closest(".cursor-pointer").length) ||
                    (e.classList.remove("cursor-hover"),
                    t.classList.remove("cursor-hover"));
                }
              ),
              (e.style.visibility = "visible"),
              (t.style.visibility = "visible");
          }
        }
      }
      itCursor();
    }

    /**
     * ======================================
     * 03. scroll to top with progress
     * ======================================
     */
    if ($(".progress-wrap").length > 0) {
      var progressPath = document.querySelector(".progress-wrap path");
      var pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.WebkitTransition =
        "none";
      progressPath.style.strokeDasharray = pathLength + " " + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition =
        "stroke-dashoffset 10ms linear";
      var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progress;
      };
      updateProgress();
      $(window).on("scroll", updateProgress);
      var offset = 50;
      var duration = 800;
      $(window).on("scroll", function () {
        if ($(this).scrollTop() > offset) {
          $(".progress-wrap").addClass("active-progress");
        } else {
          $(".progress-wrap").removeClass("active-progress");
        }
      });
      $(".progress-wrap").on("click", function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, duration);
        return false;
      });

      if (initialScroll >= 100) {
        $(".progress-wrap").addClass("active-progress");
      }
    }

    /**
     * ======================================
     * 04. background image
     * ======================================
     */
    $("[data-background]").each(function () {
      var backgroundImages = $(this).attr("data-background").split(",");
      var cssValue = backgroundImages
        .map(function (image) {
          return 'url("' + image.trim() + '")';
        })
        .join(",");

      $(this).css("background-image", cssValue);
    });

    /**
     * ======================================
     * 05. add active class to the current link
     * ======================================
     */
    function dynamicCurrentMenuClass(selector) {
      let FileName = window.location.href.split("/").reverse()[0];

      selector.find("li").removeClass("active");
      selector
        .find(".navbar__dropdown-label")
        .removeClass("navbar__item-active");

      selector.find("li").each(function () {
        let anchor = $(this).find("a");
        if ($(anchor).attr("href") === FileName) {
          $(this).addClass("active");
        }
      });

      const activeDropdownItem = selector.find(".navbar__sub-menu .active");
      if (activeDropdownItem.length) {
        activeDropdownItem.parents("li").addClass("active");
      }

      selector.find("li").each(function () {
        if ($(this).find(".active").length) {
          $(this).addClass("active");
        }
      });

      if (FileName === "") {
        selector.find('li:has(a[href="index.html"])').addClass("active");
      }
    }
    if ($("header").length) {
      dynamicCurrentMenuClass($("header"));
    }

    /**
     * ======================================
     * 06. open search box
     * ======================================
     */
    if ($(".search-popup").length > 0) {
      $(".open-search").on("click", function () {
        $("body").addClass("search-active");
      });

      $(".close-search").on("click", function () {
        $("body").removeClass("search-active");
      });
    }

    /**
     * ======================================
     * 07. open sidebar info
     * ======================================
     */
    $(".nav__bar-alt").on("click", function () {
      $(this).toggleClass("nav__bar-toggle-active");
      $(".off-canvas-backdrop").toggleClass("off-canvas-backdrop-active");
      $(".off-canvas").toggleClass("off-canvas-active");
    });

    $(".off-canvas-backdrop, .off-canvas-close").on("click", function () {
      $(".off-canvas").removeClass("off-canvas-active");
      $(".off-canvas-backdrop").removeClass("off-canvas-backdrop-active");
      $(".nav__bar-alt").removeClass("nav__bar-toggle-active");
    });

    /**
     * ======================================
     * 08. offcanvas cart
     * ======================================
     */

    $(".cart").on("click", function () {
      $(".sidebar-cart").addClass("sidebar-cart-active");
      $(".cart-backdrop").addClass("cart-backdrop-active");
      $("body").toggleClass("body-active");
    });

    $(".close-cart").on("click", function () {
      $(".sidebar-cart").removeClass("sidebar-cart-active");
      $(".cart-backdrop").removeClass("cart-backdrop-active");
      $("body").removeClass("body-active");
    });

    $(".cart-backdrop").on("click", function () {
      $(".sidebar-cart").removeClass("sidebar-cart-active");
      $(".cart-backdrop").removeClass("cart-backdrop-active");
      $("body").removeClass("body-active");
    });

    $(".sidebar-cart").on("click", function (event) {
      event.stopPropagation();
    });

    function calculateTotalPrice() {
      var totalPrice = 0;
      $(".cart-item-single").each(function () {
        var quantity = parseInt($(this).find(".item-quantity").text());
        var price = parseFloat($(this).find(".item-price").text());
        totalPrice += quantity * price;
      });
      $(".total-price").text(totalPrice.toFixed(2));
    }

    $(".cart-item-single").each(function () {
      var quantity = parseInt($(this).find(".item-quantity").text());
      $(this)
        .find(".quantity-increase")
        .click(function () {
          if (quantity < 6) {
            quantity++;
            $(this).siblings(".item-quantity").text(quantity);
            calculateTotalPrice();
          }
        });
      $(this)
        .find(".quantity-decrease")
        .click(function () {
          if (quantity > 1) {
            quantity--;
            $(this).siblings(".item-quantity").text(quantity);
            calculateTotalPrice();
          }
        });
      $(this)
        .find(".delete-item")
        .click(function () {
          $(this).closest(".cart-item-single").hide();
        });
    });

    /**
     * ======================================
     * 09. mobile menu
     * ======================================
     */
    if ($(".mobile-menu").length > 0) {
      var mobileMenuContent = $(".navbar__menu").html();
      $(".mobile-menu__list").append(mobileMenuContent);

      $(".mobile-menu .navbar__dropdown-label").on("click", function () {
        $(this).parent().siblings().find(".navbar__sub-menu").slideUp(500);
        $(this)
          .parent()
          .siblings()
          .find(".navbar__dropdown-label")
          .removeClass("navbar__item-active");
        $(this).siblings(".navbar__sub-menu").slideToggle(500);
        $(this).toggleClass("navbar__item-active");
      });
    }

    $(".open-offcanvas-nav").on("click", function () {
      $(this).addClass("open-offcanvas-nav-active");
      $(".mobile-menu__backdrop").addClass("mobile-menu__backdrop-active");
      $(".nav-fade").each(function (i) {
        $(this).css("animation-delay", 0.25 * 1 * i + "s");
      });

      $(".mobile-menu").addClass("show-menu");
      $(".mobile-menu__wrapper").removeClass("nav-fade-active");
    });

    $(".close-mobile-menu, .mobile-menu__backdrop").on("click", function () {
      $(".open-offcanvas-nav").removeClass("open-offcanvas-nav-active");
      $(".mobile-menu").removeClass("show-menu");
      $(".mobile-menu__backdrop").removeClass("mobile-menu__backdrop-active");
      $(".mobile-menu__wrapper").addClass("nav-fade-active");
      $(".mobile-menu .navbar__dropdown-label").removeClass(
        "navbar__item-active"
      );
      $(".mobile-menu .navbar__sub-menu").slideUp(0);
    });

    $(".navbar__item.navbar__item--has-children > a").on("click", function (e) {
      e.preventDefault();
    });

    $(window).on("resize", function () {
      // sidebar info
      $(".off-canvas").removeClass("off-canvas-active");
      $(".off-canvas-backdrop").removeClass("off-canvas-backdrop-active");
      $(".nav__bar-alt").removeClass("nav__bar-toggle-active");

      // mobile menu
      $(".mobile-menu").removeClass("show-menu");
      $(".mobile-menu__backdrop").removeClass("mobile-menu__backdrop-active");
      $(".mobile-menu__wrapper").addClass("nav-fade-active");
      $(".mobile-menu .navbar__dropdown-label").removeClass(
        "navbar__item-active"
      );
      $(".mobile-menu .navbar__sub-menu").slideUp(0);
      $(".open-offcanvas-nav").removeClass("open-offcanvas-nav-active");
    });

    /**
     * ======================================
     * 10. fixed header on scroll
     * ======================================
     */
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll < 160) {
        $(".header").removeClass("sticky-header");
      } else {
        $(".header").addClass("sticky-header");
      }
    });

    if (initialScroll >= 100) {
      $(".header").addClass("sticky-header");
    }

    /**
     * ======================================
     * 11. odometer counter
     * ======================================
     */
    $(".odometer").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          for (
            var i = 0;
            i < document.querySelectorAll(".odometer").length;
            i++
          ) {
            var el = document.querySelectorAll(".odometer")[i];
            el.innerHTML = el.getAttribute("data-odometer-final");
          }
        }
      });
    });

    /**
     * ======================================
     * 12. video popup
     * ======================================
     */
    if (document.querySelector(".open-video-popup") !== null) {
      $(".open-video-popup").magnificPopup({
        disableOn: 768,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
      });
    }

    /**
     * ======================================
     * 13. vanilla tilt animations
     * ======================================
     */

    let Vantilt = document.querySelectorAll(".vanilla-tilt");

    if (Vantilt) {
      VanillaTilt.init(document.querySelectorAll(".vanilla-tilt"), {
        max: 5,
        speed: 3000,
      });
    }

    /**
     * ======================================
     * 14. service item active on hover
     * ======================================
     */
    $(".service").each(function () {
      $(this)
        .find(".service__single")
        .on("mouseover", function () {
          $(this)
            .closest(".service")
            .find(".service__single")
            .removeClass("service__single-active");
          $(this).addClass("service__single-active");
        });
    });

    /**
     * ======================================
     * 15. featured services tab
     * ======================================
     */

    $(".featured-tab__single").hide();
    $(".featured-tab__single:first").show();

    $(".tab-btn-wrapper").on("click", function () {
      $(".tab-btn-wrapper").removeClass("tab-btn-active");
      $(this).addClass("tab-btn-active");
      $(".featured-tab__single").hide();
      var target = $(this).data("target");
      $(target).fadeIn(500);
      return false;
    });

    /**
     * ======================================
     * 16. bubble animations
     * ======================================
     */
    var $container = $(".bubble-wrapper");

    for (var i = 0; i < 80; i++) {
      var $bubble = $('<div class="bubble"></div>');
      var size = Math.random() * 100 + "px";

      var bottomPosition = Math.random() * 100 + "%";
      var animationDelay = Math.random() * 10 + "s";
      var animationDuration = Math.random() * 10 + 5 + "s";

      $bubble.css({
        width: size,
        height: size,
        bottom: bottomPosition,
        left: Math.random() * 100 + "%",
        animationDelay: animationDelay,
        animationDuration: animationDuration,
      });

      $container.append($bubble);
    }

    /**
     * ======================================
     * 17. bubble medium animations
     * ======================================
     */

    var $bubbleArea = $(".bubble-md");

    for (var bubbleNum = 0; bubbleNum < 30; bubbleNum++) {
      var $bubbleElement = $('<div class="bubble"></div>');

      var bubbleDimension = Math.random() * 50 + 50 + "px";
      var bubblePosition = (bubbleNum / 30) * 100 + "%";
      var animationStartDelay = Math.random() * 10 + "s";
      var animationLength = Math.random() * 10 + 5 + "s";

      $bubbleElement.css({
        width: bubbleDimension,
        height: bubbleDimension,
        bottom: "0%",
        left: bubblePosition,
        animationDelay: animationStartDelay,
        animationDuration: animationLength,
      });

      $bubbleArea.append($bubbleElement);
    }

    /**
     * ======================================
     * 18. bubble small animations
     * ======================================
     */

    var $bubbleContainer = $(".bubble-sm");
    var totalBubbles = 30;

    for (var bubbleIndex = 0; bubbleIndex < totalBubbles; bubbleIndex++) {
      var $singleBubble = $('<div class="bubble"></div>');

      var bubbleSize = Math.random() * 40 + 50 + "px";

      var horizontalPosition =
        (bubbleIndex / totalBubbles) * 100 +
        Math.random() * (100 / totalBubbles) +
        "%";

      var verticalPosition = Math.random() * 100 + "%";

      var bubbleDelay = Math.random() * 10 + "s";
      var bubbleDuration = Math.random() * 10 + 5 + "s";

      $singleBubble.css({
        width: bubbleSize,
        height: bubbleSize,
        bottom: verticalPosition,
        left: horizontalPosition,
        animationDelay: bubbleDelay,
        animationDuration: bubbleDuration,
      });

      $bubbleContainer.append($singleBubble);
    }

    /**
     * ======================================
     * 19. partner slider
     * ======================================
     */
    var partner = new Swiper(".partner__slider", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        425: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
    });

    /**
     * ======================================
     * 20. testimonial slider
     * ======================================
     */
    var testimonial = new Swiper(".testimonial__slider", {
      loop: true,
      speed: 2000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 30,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".next-testimonial",
        prevEl: ".prev-testimonial",
      },
    });

    /**
     * ======================================
     * 21. bubble blog animations
     * ======================================
     */

    var $bubbleContainer = $(".bubble-blog");
    var totalBubbles = 14;

    for (var bubbleIndex = 0; bubbleIndex < totalBubbles; bubbleIndex++) {
      var $singleBubble = $('<div class="bubble"></div>');

      var bubbleSize = Math.random() * 15 + 30 + "px";

      var horizontalPosition =
        (bubbleIndex / totalBubbles) * 100 +
        Math.random() * (100 / totalBubbles) +
        "%";

      var verticalPosition = Math.random() * 100 + "%";

      var bubbleDelay = Math.random() * 10 + "s";
      var bubbleDuration = Math.random() * 10 + 5 + "s";

      $singleBubble.css({
        width: bubbleSize,
        height: bubbleSize,
        bottom: verticalPosition,
        left: horizontalPosition,
        animationDelay: bubbleDelay,
        animationDuration: bubbleDuration,
      });

      $bubbleContainer.append($singleBubble);
    }

    /**
     * ======================================
     * 22. bubble newsletter animations
     * ======================================
     */

    var $bubbleContainer = $(".bubble-news");
    var totalBubbles = 150;

    for (var bubbleIndex = 0; bubbleIndex < totalBubbles; bubbleIndex++) {
      var $singleBubble = $('<div class="bubble"></div>');

      var bubbleSize = Math.random() * 5 + 30 + "px";

      var horizontalPosition = Math.random() * 100 + "%";

      var verticalPosition = Math.random() * 60 + "px";

      var bubbleDelay = Math.random() * 10 + "s";
      var bubbleDuration = Math.random() * 10 + 5 + "s";

      $singleBubble.css({
        width: bubbleSize,
        height: bubbleSize,
        bottom: verticalPosition,
        left: horizontalPosition,
        animationDelay: bubbleDelay,
        animationDuration: bubbleDuration,
      });

      $bubbleContainer.append($singleBubble);
    }

    /**
     * ======================================
     * 23. banner two slider
     * ======================================
     */
    var bannerTwo = new Swiper(".banner-two__slider", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next-banner",
        prevEl: ".prev-banner",
      },
    });

    var bannerTwoThumb = new Swiper(".banner-two-slider-thumb", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next-banner",
        prevEl: ".prev-banner",
      },
    });

    /**
     * ======================================
     * 24. bubble banner animations
     * ======================================
     */
    var $container = $(".bubble-banner");
    var containerWidth = 130;

    var numBubbles = 150;

    for (var i = 0; i < numBubbles; i++) {
      var $bubble = $('<div class="bubble"></div>');
      var size = Math.random() * 40 + 20 + "px";

      var animationDelay = Math.random() * 5 + "s";
      var animationDuration = Math.random() * 10 + 5 + "s";

      $bubble.css({
        width: size,
        height: size,
        left: Math.random() * containerWidth + "px",
        bottom: "0px",
        animationDelay: animationDelay,
        animationDuration: animationDuration,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationFillMode: "forwards",
        position: "absolute",
        borderRadius: "50%",
      });

      $container.append($bubble);
    }

    /**
     * ======================================
     * 25. testimonial two slider
     * ======================================
     */
    var testimonialTwo = new Swiper(".testimonial-two-slider", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".next-testimonial",
        prevEl: ".prev-testimonial",
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
        },
      },
    });

    /**
     * ======================================
     * 26. banner three slider
     * ======================================
     */
    var bannerThree = new Swiper(".banner-three-slider", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next-banner",
        prevEl: ".prev-banner",
      },
    });

    var bannerThreeThumb = new Swiper(".banner-three-slider-thumb", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next-banner",
        prevEl: ".prev-banner",
      },
    });

    var bannerCloud = new Swiper(".banner-cloud-slider", {
      loop: true,

      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      freeMode: true,
      autoplay: {
        delay: 0,

        disableOnInteraction: false,
      },
      speed: 20000,
    });

    /**
     * ======================================
     * 27. service three slider
     * ======================================
     */
    var serviceThree = new Swiper(".service-three-slider", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".next-testimonial",
        prevEl: ".prev-testimonial",
      },
      breakpoints: {
        1200: {
          direction: "vertical",
          slidesPerView: 3,
        },
      },
    });

    /**
     * ======================================
     * 28. coming soon
     * ======================================
     */
    if ($(".clock-wrapper").length) {
      (function () {
        var now = new Date();
        var hourDeg =
          (now.getHours() / 12) * 360 + (now.getMinutes() / 60) * 30;
        var minuteDeg =
          (now.getMinutes() / 60) * 360 + (now.getSeconds() / 60) * 6;
        var secondDeg = (now.getSeconds() / 60) * 360;

        var stylesDeg = [
          "@-webkit-keyframes rotate-hour{from{transform:rotate(" +
            hourDeg +
            "deg);}to{transform:rotate(" +
            (hourDeg + 360) +
            "deg);}}",
          "@-webkit-keyframes rotate-minute{from{transform:rotate(" +
            minuteDeg +
            "deg);}to{transform:rotate(" +
            (minuteDeg + 360) +
            "deg);}}",
          "@-webkit-keyframes rotate-second{from{transform:rotate(" +
            secondDeg +
            "deg);}to{transform:rotate(" +
            (secondDeg + 360) +
            "deg);}}",
          "@-moz-keyframes rotate-hour{from{transform:rotate(" +
            hourDeg +
            "deg);}to{transform:rotate(" +
            (hourDeg + 360) +
            "deg);}}",
          "@-moz-keyframes rotate-minute{from{transform:rotate(" +
            minuteDeg +
            "deg);}to{transform:rotate(" +
            (minuteDeg + 360) +
            "deg);}}",
          "@-moz-keyframes rotate-second{from{transform:rotate(" +
            secondDeg +
            "deg);}to{transform:rotate(" +
            (secondDeg + 360) +
            "deg);}}",
        ].join("");
        document.getElementById("clock-animations").innerHTML = stylesDeg;
      })();
    }

    /**
     * ======================================
     * 29. countdown
     * ======================================
     */
    var endDate = new Date("2025-07-01T00:00:00").getTime();

    var countdown = setInterval(function () {
      var now = new Date().getTime();

      var distance = endDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      $(".day").text(days);
      $(".hour").text(hours);
      $(".minute").text(minutes);
      $(".second").text(seconds);

      if (distance < 0) {
        clearInterval(countdown);
        $(".day").text("00");
        $(".hour").text("00");
        $(".minute").text("00");
        $(".second").text("00");
      }
    }, 1000);

    /**
     * ======================================
     * 29. footer copyright year
     * ======================================
     */
    if ($("#copyrightYear").length > 0) {
      $("#copyrightYear").text(new Date().getFullYear());
    }

    /**
     * ======================================
     * 30. aos initialization
     * ======================================
     */
    AOS.init();

    /**
     * ======================================
     * 31. register gsap
     * ======================================
     */
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    /**
     * ======================================
     * 32. gsap null config
     * ======================================
     */
    gsap.config({
      nullTargetWarn: false,
    });

    /**
     * ======================================
     * 33. title animation
     * ======================================
     */

    if ($(".title-animation").length > 0) {
      let char_come = gsap.utils.toArray(".title-animation");
      char_come.forEach((char_come) => {
        let split_char = new SplitText(char_come, {
          type: "chars, words",
          lineThreshold: 0.5,
        });
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: char_come,
            start: "top 90%",
            end: "bottom 60%",
            scrub: false,
            markers: false,
            toggleActions: "play none none none",
          },
        });
        tl2.from(split_char.chars, {
          duration: 0.9,
          x: 40,
          autoAlpha: 0,
          stagger: 0.06,
          ease: "back.out",
        });
      });
    }

    /**
     * ======================================
     * 34. particles background bubbles
     * ======================================
     */
    if ($("#particles-js-left").length) {
      particlesJS("particles-js-left", {
        particles: {
          number: {
            value: 180,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#d0ecfa",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 3,
              color: "#d0ecfa50",
            },
            shadow: {
              enable: true,
              color: "#d0ecfa",
              blur: 50,
              offset: {
                x: 3,
                y: 0,
              },
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "img/github.svg",
              width: 300,
              height: 300,
            },
          },
          opacity: {
            value: 0.8,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.3,
              sync: false,
            },
          },
          size: {
            value: 17,
            random: true,
            anim: {
              enable: false,
              speed: 10,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#0a1968",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              random: true,
              size: 80,
              duration: 2,
              opacity: 6,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    }
    if ($("#particles-js-right").length) {
      particlesJS("particles-js-right", {
        particles: {
          number: {
            value: 180,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#d0ecfa",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 3,
              color: "#d0ecfa50",
            },
            shadow: {
              enable: true,
              color: "#d0ecfa",
              blur: 50,
              offset: {
                x: 3,
                y: 0,
              },
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "img/github.svg",
              width: 300,
              height: 300,
            },
          },
          opacity: {
            value: 0.8,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.3,
              sync: false,
            },
          },
          size: {
            value: 15,
            random: true,
            anim: {
              enable: false,
              speed: 10,
              size_min: 0.3,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#0a1968",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              random: true,
              size: 80,
              duration: 2,
              opacity: 6,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    }
    if ($("#particles-js-faq").length) {
      particlesJS("particles-js-faq", {
        particles: {
          number: {
            value: 180,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#d0ecfa",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 3,
              color: "#d0ecfa50",
            },
            shadow: {
              enable: true,
              color: "#d0ecfa",
              blur: 50,
              offset: {
                x: 3,
                y: 0,
              },
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "img/github.svg",
              width: 300,
              height: 300,
            },
          },
          opacity: {
            value: 0.8,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.3,
              sync: false,
            },
          },
          size: {
            value: 15,
            random: true,
            anim: {
              enable: false,
              speed: 10,
              size_min: 0.4,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#0a1968",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              random: true,
              size: 80,
              duration: 2,
              opacity: 6,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    }
  });
})(jQuery);
