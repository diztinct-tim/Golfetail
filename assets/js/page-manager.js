import { api } from 'bigcommerce-stencil/stencil-utils';
import _ from 'lodash';

export default class PageManager {
    constructor() {
    }

    before(next) {
        next();

        function addBodyClass(){
            var pageName = $("h1.page-heading").text();
            $("body").addClass(pageName);
        }
        addBodyClass();

        function makeThumbnailActive(){
            $("ul.productView-thumbnails > li.productView-thumbnail:first-child > a").addClass("is-active");
        }
        makeThumbnailActive();

        $('.test-slider').slick({
            autoplay: true,
            arrows: false,
            dots: true,
            infinite: true,
            speed: 500,
            adaptiveHeight: true
        });

        var username = $("signed-in-or-no").text();

        if($(".mob-cart-amt").text().trim() == "0" ){
            $(".mob-cart-amt").hide();
        }

        if( $(".custom-field.DropShip > dd.productView-info-value").text() == "Yes" ){
            $(".free-ship-instock > p").html('<span class="orange-text">Ships within 2 business days.</span>');
        }


    }


    loaded(next) {
        next();



    
    }

    after(next) {
        next();
    }

    type() {
        return this.constructor.name;
    }

    getPageModal(url, options, callback) {
        const modal = {
            $element: $('#modal'),
            $content: $('.modal-content', this.$element),
            $overlay: $('.loadingOverlay', this.$element),
        };

        /* eslint-disable no-param-reassign */
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (!_.isObject(options)) {
            options = {};
        }
        /* eslint-enable no-param-reassign */

        modal.$content.html('');
        modal.$overlay.show();

        // open modal
        modal.$element.foundation('reveal', 'open');

        api.getPage(url, options, (err, content) => {
            modal.$overlay.hide();

            if (err) {
                modal.$content.html(this.context.genericError);

                if (typeof callback === 'function') {
                    return callback(err, {
                        modal: modal,
                    });
                }

                throw err;
            }

            modal.$content.html(content);

            if (typeof callback === 'function') {
                callback(null, {
                    modal: modal,
                    content: content,
                });
            }
        });
    }
}
