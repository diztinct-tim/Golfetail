import PageManager from '../page-manager';

export default class Home extends PageManager {
    constructor() {
        super();

        $(".home-new-prods > section > ul").append("<span class='show-more-products'>Show More Products &#187</span>");
        $(".show-more-products").on("click", function(){
            $(this).addClass("hide-me");
            $(".home-new-prods > section > ul").addClass("expanded");
        })


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

        function newProductsDollarsOff(){
            $(".home-new-prods > section > ul > li .price-section").each(function(){
                var bluePrice = $(this).find(".blue-price.price.price--withoutTax").text().replace("$","");
                var retailPrice = $(this).find(".price.price--rrp.retail-price").text().replace("Retail $","");
                var npDollarsOff = retailPrice - bluePrice;
                var roundedNpDollarsOff = Math.round(npDollarsOff);
                $(this).find(".you-save-percent").text("Save $" +roundedNpDollarsOff+".00");
            })
        }
        newProductsDollarsOff();

        if( $(".save-price").text() == "NaN%OFF" ){
            $("div.deal-of-day").hide();
            $(".body-sign-up").hide();
            $(".main-banner").addClass("bottom-margin");
        }

    }
}
