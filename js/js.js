'use strict';
(function($) {


    //HEADER-SLIDER START
    var headerSlide = $("#header-slider");
    var progress = $('.slider-progress .slider-progress__timer');
    var progressTime = 9;
    var isPause,
        progressTime,
        progressPercent;
    headerSlide.slick({
        dots: true,
        infinite: true,
        speed: 999,
        customPaging: function(slider, i) {
            return '<div class="dot"></div>';
        },
        prevArrow: '<button class="btn btn--arrow btn--left"> <img src="img/arrow-left.svg" /></button>',
        nextArrow: '<button class="btn btn--arrow btn--right"> <img src="img/arrow-right.svg" /></button>'
    });
    $('.btn--arrow').mouseover(function() {
        $(this).click();
    });
    //HEADER-SLIDER PROGRESS
    function isInternetExplorer() {
        return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    }
    if (isInternetExplorer() === true) {
        $(".slider-progress__bg").addClass("progress-bg-ie");
        $(".slider-progress__timer").addClass("progress-ie");
    }

    function startProgressbar() {
        resetProgressbar();
        progressPercent = 1;
        isPause = false;
        progressTime = setInterval(interval, 60);
    }

    function interval() {
        if (isPause === false) {
            progressPercent += 1 / (4 + 1);
            progress.css({
                width: progressPercent + "%"
            });
            if (progressPercent >= 100) {
                headerSlide.slick('slickNext');
                startProgressbar();
            }
        }
    }

    function resetProgressbar() {
        progress.css({
            width: 0 + '%'
        });
        clearTimeout(progressTime);
    }
    startProgressbar();
    headerSlide.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        startProgressbar();
    });
    //HEADER-SLIDER PROGRESS END
    //HEADER-SLIDER END
    //HEADER-ASIDE-NAV
    var $el = $(".header__top");
    var aside = $(".header__aside");
    $(window).on('scroll resize load', function() {
        if ($(this).scrollTop() < parseFloat($el.css("height"))) {
            var scrollTop = $(this).scrollTop(),
                scrollBot = scrollTop + $(this).height(),
                elTop = $el.offset().top,
                elBottom = elTop + $el.outerHeight(),
                visibleTop = elTop < scrollTop ? scrollTop : elTop,
                visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
            aside.css({ "top": visibleBottom - visibleTop });
        } else {
            aside.css({ "top": 0 });
        }
    });
    //HEADER-ASIDE-NAV END
    //PARALLAX EFFECT
    $(".event__image").each(function() {
        var img = $(this);
        var imgParent = $(this).children(".event__image-parallax");
        $(window).on('scroll resize load', function() {
            var imgParallaxSize = parseFloat(img.css("height"));
            var scrollTop = $(this).scrollTop(),
                scrollBot = scrollTop + $(this).height(),
                elTop = img.offset().top,
                elBottom = elTop + img.outerHeight(),
                visibleTop = elTop < scrollTop ? scrollTop : elTop,
                visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
            if ((visibleBottom - visibleTop) >= 0) {
                imgParent.css({ "top": (imgParallaxSize - (visibleBottom - visibleTop)) });
                // imgParent.css("transform", "translateY(" + (imgParallaxSize - (visibleBottom - visibleTop)) + ")");
            }
        });
    });
    $('.instagram__items').slick({
        infinite: true,
        speed: 999,
        slidesToShow: 3,
        centerPadding: '0',
        variableWidth: true,
        prevArrow: '<button class="btn btn--wave btn--wave-left"> <img src="img/wave-left.png" /></button>',
        nextArrow: '<button class="btn btn--wave btn--wave-right"> <img src="img/wave-right.png" /></button>',
        responsive: [{
            breakpoint: 1380,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: true,
                variableWidth: false
            }
        }]
    });
    //POP-UP
    var popUp = $("#pop-up"),
        burger = $("#burger"),
        popUpClose = $("#pop-up__close"),
        body = $("body");
    burger.on("click", function() {
        popSlide();
    });
    popUpClose.on("click", function() {
        popSlide();
    });

    function popSlide() {
        popUp.slideToggle("slow");
        body.toggleClass("no-scroll");
        if (popUp.is(":visible")) {
            popUp.addClass("fade");
        }
    };
    //POP-UP END
})(jQuery);