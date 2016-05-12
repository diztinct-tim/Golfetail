import $ from 'jquery';

export default function() {
    const $mobileMenuTrigger = $('[data-mobilemenu]');
    const $header = $('.header');
    const headerHeight = $('.header').outerHeight();
    const $mobileMenu = $('#mobile-menu');

    function calculateMobileMenuOffset() {
        $mobileMenu.attr('style', (i, attr) => {
            return attr !== `top:${headerHeight}px` ? `top:${headerHeight}px` : 'top:auto';
        });

        $header.attr('style', (i, attr) => {
            return attr === 'height:100%' ? 'height:auto' : 'height:100%';
        });
    }

    function toggleMobileMenu() {
        calculateMobileMenuOffset();

        $mobileMenuTrigger.toggleClass('is-open').attr('aria-expanded', (i, attr) => {
            return attr === 'true' ? 'false' : 'true';
        });

        $mobileMenu.toggleClass('is-open').attr('aria-hidden', (i, attr) => {
            return attr === 'true' ? 'false' : 'true';
        });
    }

    function addMobileMenuClass(){
        var width = $(window).width();
        if( width < 768){
            $("#mobile-menu").addClass("mobile-menu-toggle");
        }
    }
    addMobileMenuClass();

    $(".mobile-menu-toggle").on("click", ".navPages-action.has-subMenu", function(e){
        e.preventDefault();
        $(this).next(".navPage-subMenu").slideToggle();
        $(this).toggleClass("open");
    })

    function mobileMenu() {
        // $mobileMenuTrigger.on('click', (event) => {
        //     event.preventDefault();
        //     toggleMobileMenu();
        // });

        // // Hide the mobile sidebar if the cart is opened
        // $('[data-cart-preview]').on('click', () => {
        //     if ($mobileMenuTrigger.hasClass('is-open')) {
        //         toggleMobileMenu();
        //     }
        // });
    }

    if ($mobileMenuTrigger.length) {
        mobileMenu();
    }
}


$(".toggleMenu").on("click", function(){
    $("body").toggleClass("off-screen");
    $(".navPages-container").toggleClass("on-screen");
    $(".burger").toggleClass("hide");
    $(".close-x").toggleClass("show");            
    $(".menu").toggleClass("hide");
    $(".close").toggleClass("show");
});

$(".login-logout > span").on("click", function(){
    $(".login-logout > ul").slideToggle();
    $(this).toggleClass("open");
})