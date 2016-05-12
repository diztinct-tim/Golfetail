/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from '../page-manager';
import Review from './product/reviews';
import collapsible from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import {classifyForm} from './common/form-utils';

export default class Product extends PageManager {
    constructor() {
        super();
        this.url = location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    before(next) {
        
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#writeReview') !== -1) {
                history.replaceState('', document.title, window.location.pathname);
            }
        });

        $("div.body").addClass("ProductPage");
        $("body").addClass("ProductPage");

        // Main Product Percent OFF
        function mainPercentOff(){
            var retailPrice = $(".productView-price .price.price--rrp.retail-price").text().replace("$","");
            var salePrice = $(".productView-price .price.price--withoutTax").text().replace("$","");
            var percent = (retailPrice - salePrice) / retailPrice * 100;
            var percentOffFinal = Math.round(percent);
            $(".percent-saved").text('('+percentOffFinal+'%)');
        }
        mainPercentOff();

        // Deal of the Day Percent OFF
        function percentOff(){
            var sale = $(".part2 .price.price--withoutTax").text().replace("$","");
            var retail = $(".part2 .price.price--rrp").text().replace("Retail $","");
            var percentRaw = (retail - sale) / retail * 100;
            var percentOff = Math.round(percentRaw);
            $(".save-price span").text(percentOff + '%');
        }
        percentOff();

        function dollarAmountOff(){
            var saleDollars = $(".part2 .price.price--withoutTax").text().replace("$","");
            var retailDollars = $(".part2 .price.price--rrp").text().replace("Retail $","");
            var dollarsOff = retailDollars - saleDollars;
            var roundedDollarsOff = Math.round(dollarsOff);
            $(".dod-dollars-off").text('Save $'+ roundedDollarsOff);   
        }
        dollarAmountOff();


        function calculateHMSleft(){
            //calculate
            var now = new Date();
            var hoursleft = 23-now.getHours();
            var minutesleft = 59-now.getMinutes();
            var secondsleft = 59-now.getSeconds();

            //format 0 prefixes
            if(hoursleft<10) hoursleft = "0"+hoursleft;
            if(minutesleft<10) minutesleft = "0"+minutesleft;
            if(secondsleft<10) secondsleft = "0"+secondsleft;

            //display
            $('span.hoursLeft').html(hoursleft);
            $('span.minutesLeft').html(minutesleft);
            $('span.secondsLeft').html(secondsleft);
        }

        calculateHMSleft();
        setInterval(calculateHMSleft, 1000);

        // hide golfers also bought if empty
        if ( $("div.also-bought > section > ul").html().trim() == ""){
            $("div.also-bought").html("");
        }

        $("label.form-option").on("click", function(){
            $("span.selected-color").remove();
            var selectedColor = $(this).find(".form-option-variant.form-option-variant--pattern").attr("title");
            $(this).siblings(".form-label.form-label--alternate.form-label--inlineSmall").append("<span class='selected-color'>"+ selectedColor +"</span>");
        });

        $(document).on('mouseenter','label.form-option', function(){
            if( $(this).hasClass("unavailable") ){
                $("<span class='color-text out-of-stock'>Out of Stock</span>").insertAfter(this);
            } else {
                var color = $(this).find(".form-option-variant.form-option-variant--pattern").attr("title");
                $("<span class='color-text'>"+ color +"</span>").insertAfter(this);
            }
        }).on('mouseleave','label.form-option', function(){
            $("span.color-text").remove();
        });


        if( $(".save-price > span").text() == "NaN%" ){
            $(".deal-of-day").hide();
        }

        if( $(".custom-field.MAP").length ){
            var mapPrice = $(".custom-field.MAP > .productView-info-value").text();
            $(".toggle-map-price").removeClass("id-hidden");
            $(".top-right-desk .productView-price").hide();
            console.log(mapPrice);
        }

        $(".toggle-map-price").on("click", function(){
            $(".top-right-desk .productView-price").slideToggle();
        })


        next();
    }

    loaded(next) {
        let validator;

        // Init collapsible
        collapsible();

        this.productDetails = new ProductDetails($('.productView'), this.context);

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation();
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        next();
    }

    after(next) {
        this.productReviewHandler();

        next();
    }

    productReviewHandler() {
        if (this.url.indexOf('#writeReview') !== -1) {
            this.$reviewLink.click();
        }
    }
}
