jQuery(document).ready(function($){

  // product image
  $("#product-img").elevateZoom({
    zoomType : "inner",
    cursor: "crosshair",
    gallery : 'product-img-gal',
    galleryActiveClass: 'active', 
  });

  //intialize slider for mobile
  var sliderContent = $('#product-img-gal').html();
  $('#product-img-slider').append(sliderContent);
  $('#product-img-slider').slick({
    'prevArrow' : '<span class="fa fa-chevron-left slide-back"></span>',
    'nextArrow' : '<span class="fa fa-chevron-right slide-next"></span>',
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  // fixed box
  var extraOptions = $('.product-details-section .extra-options');
  var positionFixed = true;
  var productDetailSection = $('.product-details-section');

  function makeExtraOptionsFixed() {
    var cw = intPX($('.product-details-section .container').css('width'));
    var vw = $(window).width();
    var mw = (vw-cw) / 2;
    var fp_l = mw+cw-intPX(extraOptions.css('width'))-3;
    extraOptions.css('max-width', extraOptions.css('width'));
    extraOptions.css('position', 'fixed').css('top', 10).css('left',fp_l);
  }

  $(window).scroll(function(){
    var scrollTop = $(window).scrollTop();
    var sectionHeight = intPX(productDetailSection.css('height'));
    var extraOptionsHeight = intPX(extraOptions.css('height'));
    var windowWidth = $(window).width();
    if(Math.abs(sectionHeight-extraOptionsHeight) < 300) {
      return;
    }
    var fixedFrom = 460;
    var fixedTo = productDetailSection[0].offsetTop+sectionHeight-extraOptionsHeight;
    if(windowWidth <= 991) {
      extraOptions.css('position', 'static').css('top', 0);
    } else {
        if(scrollTop >= fixedFrom && scrollTop <= fixedTo) {
        makeExtraOptionsFixed();
        positionFixed = true;
      } else {
        if(positionFixed) {
          extraOptions.css('position', 'static').css('top', 0);
          positionFixed = false
        }
      }
    }
    
  });

  // toggle details
  $(document).on('click', '.product-details-section .toggle-details', function(){
    if($(this).hasClass('fa-plus-circle')) {
      $(this).removeClass('fa-plus-circle');
      $(this).addClass('fa-minus-circle');
    } else {
      $(this).addClass('fa-plus-circle');
      $(this).removeClass('fa-minus-circle');
    }
  });


  $(document).on('change', '#product-quantity-input', function(){
    var quantity = $(this).val();
    if(isNaN(quantity)) {
      quantity = 1;
      $(this).val(quantity);
    }
    var target = $(this).attr('data-target');
    var unitPrice = parseFloat($(target).attr('data-unit-price'));
    var total = unitPrice * quantity;
    $(target).attr('data-total', total);
    $(target).val(kb_shop_currency_symbol+(new Number(total)).toLocaleString());
  });

  if($(window).width() <= 767) {
    //collapse description, shipping and seller details on mobile
    $('.product-page-content .product-details-section .footer-col .title .fa')
    .trigger('click');
    $(document).on(
      'click', 
      '.product-page-content .product-details-section .footer-col .title .fa',
      function(){
        $($(this).data('target')).collapse('toggle');
    });
  }

  function intPX(str) {
    if(!str) 
      return 0;
    return parseFloat(str.replace('px'));
  }

});
