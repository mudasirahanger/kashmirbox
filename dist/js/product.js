jQuery(document).ready(function(t){function s(){var s=i(t(".product-details-section .container").css("width")),o=(t(window).width()-s)/2+s-i(a.css("width"))-3;a.css("max-width",a.css("width")),a.css("position","fixed").css("top",10).css("left",o)}function i(t){return t?parseFloat(t.replace("px")):0}t("#product-img").elevateZoom({zoomType:"inner",cursor:"crosshair",gallery:"product-img-gal",galleryActiveClass:"active"});var o=t("#product-img-gal").html();t("#product-img-slider").append(o),t("#product-img-slider").slick({prevArrow:'<span class="fa fa-chevron-left slide-back"></span>',nextArrow:'<span class="fa fa-chevron-right slide-next"></span>',arrows:!0,slidesToShow:1,slidesToScroll:1});var a=t(".product-details-section .extra-options"),c=!0,e=t(".product-details-section");t(window).scroll(function(){var o=t(window).scrollTop(),r=i(e.css("height")),l=i(a.css("height")),n=t(window).width();if(!(Math.abs(r-l)<300)){var d=e[0].offsetTop+r-l;n<=991?a.css("position","static").css("top",0):o>=460&&o<=d?(s(),c=!0):c&&(a.css("position","static").css("top",0),c=!1)}}),t(document).on("click",".product-details-section .toggle-details",function(){t(this).hasClass("fa-plus-circle")?(t(this).removeClass("fa-plus-circle"),t(this).addClass("fa-minus-circle")):(t(this).addClass("fa-plus-circle"),t(this).removeClass("fa-minus-circle"))}),t(document).on("change","#product-quantity-input",function(){var s=t(this).val();isNaN(s)&&(s=1,t(this).val(s));var i=t(this).attr("data-target"),o=parseFloat(t(i).attr("data-unit-price"))*s;t(i).attr("data-total",o),t(i).val(kb_shop_currency_symbol+new Number(o).toLocaleString())}),t(window).width()<=767&&(t(".product-page-content .product-details-section .footer-col .title .fa").trigger("click"),t(document).on("click",".product-page-content .product-details-section .footer-col .title .fa",function(){t(t(this).data("target")).collapse("toggle")}))});
//# sourceMappingURL=product.js.map