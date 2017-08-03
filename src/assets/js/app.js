/*******************************************************************************
Home page
********************************************************************************/
jQuery(document).ready(function($){
  $('.product-grid .product .category').hover(
    function() {
      $(this).closest('.product').find('.overlay').css('top', '0');
    },
    function(){
      $(this).closest('.product').find('.overlay').attr('style', '');
    }
  );
});

//hero slider 
jQuery(document).ready(function($) {
   $('.hero-slider').slick({
    dots : true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000
  });
});

//artisan slider
jQuery(document).ready(function($){
  $('.artisan-collection-slider').slick({
    'prevArrow' : '<span class="fa fa-chevron-left slide-back"></span>',
    'nextArrow' : '<span class="fa fa-chevron-right slide-next"></span>',
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '80px',
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          centerMode: true,
          centerPadding: '60px',
          slidesToShow: 1,
        }
      },
    ]
  });
});

 /* product slider  */
jQuery(document).ready(function($){
  
  function initProductSlider(index) {
    var slider = $('.product-slider:eq('+index+')');
    if($(window).width() > 767) {
     var activeCount = slider.find('.slick-active').length-1;
      slider.find('.slick-active:eq('+activeCount+')').css('opacity', 0.5);
    }
  }

  function reInitActiveSlides(index) {
    var slider = $('.product-slider:eq('+index+')');
    if($(window).width() > 767) {
      slider.find('.slick-slide').css('opacity', 0.5);
      slider.find('.slick-active').css('opacity', 1);
      var activeCount = slider.find('.slick-active').length-1;
      slider.find('.slick-active:eq('+activeCount+')').css('opacity', 0.5);
    }
  }

  $('.product-slider').on('init', function(slick){
    var count = $('.product-slider').length;
    for(var i = 0; i < count; i++)
      initProductSlider(i);
  });


  $('.product-slider').on('afterChange', function(slick, currentSlide){
    var count = $('.product-slider').length;
    for(var i = 0; i < count; i++)
      reInitActiveSlides(i);
  });

  $('.product-slider').slick({
    'prevArrow' : '<span class="fa fa-chevron-left slide-back"></span>',
    'nextArrow' : '<span class="fa fa-chevron-right slide-next"></span>',
    arrows: true,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 9,
    slidesToScroll: 4,
    centerMode: true,
    centerPadding: '100px',
    infinite: true,
    swipeToSlide: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 370,
        settings: {
          slidesToShow: 1,
            centerPadding: '30px'
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
            centerPadding: '40px'
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
            centerPadding: '60px'
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
            centerPadding: '100px'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
            centerPadding: '160px',
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          centerPadding: '110px'
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          centerPadding: '110px'
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 2100,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 2700,
        settings: {
          slidesToShow: 7,
        }
      },
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 9,
        }
      }
    ]
   
  });

  $(document).on('click', '.add-to-wishlist', function(){
    // result of ajax call to wishlist api
    var result = true; 
    if(result) {
      var heart = $(this).find('.fa-heart-o');
      heart.removeClass('fa-heart-o');
      heart.addClass('fa-heart');
      $(this).addClass('liked');
    }
  });

   $(document).on('click', '.add-to-wishlist.liked', function(){
    // result of ajax call to wishlist api
    var result = true; 
    if(result) {
      var heart = $(this).find('.fa-heart');
      heart.removeClass('fa-heart');
      heart.addClass('fa-heart-o');
      $(this).removeClass('liked');
    }
  });

});


// Deal Countdown
jQuery(document).ready(function($){
  
  function zeroFill(digit) {
    var digit = parseInt(digit);
    if(digit >= 0 && digit <= 9) {
      return '0'+digit;
    }
    return digit;
  }

  function getFormattedDate(date) {
    if( !date ) {
      return "";
    }
    var hour = zeroFill(23 - date.getHours());
    var min = zeroFill(59 - date.getMinutes());
    var sec = zeroFill(59 - date.getSeconds());
    return hour+' : '+min+' : '+sec;
  }


  setInterval(function() {
    $('#deal-countdown').html(getFormattedDate(new Date()));
  }, 1000);

});


// Testimonial slider
jQuery(document).ready(function($) {
  $('.testimonial-slider').slick({
    dots : true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
});



//mega menu
jQuery(document).ready(function($){
  var megaMenu = $('#mega-menu');
  var menuWrapper = megaMenu.find('.menu-wrapper');
  var menuToggle = megaMenu.find('.menu-toggle');
  var shopByMenu = megaMenu.find('#shop-by-menu');
  var serviceMenu = megaMenu.find('#service-menu');
  var shopBySubCatlink = shopByMenu.find('.dropdown-menu.multi-level > .dropdown-submenu > a');
  var shopByMainMenuItem = shopByMenu.find('.navbar-nav > li');
  var windowWidth = $(window).width();
  var siteHeaderNav = $('#site-header-navigation');
  var siteHeaderNavDefault = siteHeaderNav.find('.navbar-default');
  var mobileMenuIcon = $('#site-header-mobile-menu > .icons > .icon')

  //events
  $(document).on('click', '#site-header-mobile-menu .menu-toggle', function(){
    siteOverlayToggle(true);
    siteHeaderNavDefault.css('height', '100%');
    siteHeaderNav.css('height', '100%')
    siteHeaderNav.addClass('open');
  });

  $(document).on('click', '#site-header-navigation .close-menu', function(){
    siteOverlayToggle();
    siteHeaderNav.removeClass('open');
    mobileMenuIcon.removeClass('open');
  });

  $(document).on('click', '#site-header-mobile-menu .menu-toggle', function(){
    $(this).siblings().removeClass('open');
    if(!$(this).hasClass('open')) {
      $(this).addClass('open');
    } else {
      $(this).removeClass('open');
    }
  });

  $(document).on('click', '#site-header-mobile-menu .profile-dd-toggle > a', function(){
    $(this).parent().siblings().removeClass('open');
  });

  $(document).on('click', '#site-header-mobile-menu .search-toggle > a', function(){
    $(this).parent().siblings().removeClass('open');
    if(!$(this).parent().hasClass('open')) {
      $(this).parent().addClass('open');
    } else {
      $(this).parent().removeClass('open');
    }
  });

  $(document).on('click', '#mega-menu #shop-by-menu .dropdown-menu.multi-level>.dropdown-submenu>a', function(event){
    $(this).closest('.multi-level').parent().addClass('open');
  });

  $(window).resize(onResizeScreen);
  onResizeScreen();

  var extraHeight = 60; // for padding
  shopBySubCatlink.hover(
    function(){
      var multiLevelDD = $(this).closest('.dropdown-menu.multi-level');
      if(!multiLevelDD) {
        return;
      }
      if(windowWidth > 991) {
        shopBySubCatlink.removeClass('active-submenu');
        shopBySubCatlink.siblings('ul').removeClass('inline-element');
        $(this).addClass('active-submenu');
        $(this).siblings('ul').addClass('inline-element');
        var h1 = intPX($(this).siblings('ul').css('height')) + extraHeight;
        var oh = parseInt( multiLevelDD.attr('data-oh') ) + extraHeight;
        multiLevelDD.css('min-height', (h1 > oh ? h1 : oh));
      } else {
        multiLevelDD.css('min-height', 'auto');
      }
    }
  );

  shopByMainMenuItem.hover(
    function() {
      var multiLevelDD = $(this).find('.dropdown-menu.multi-level');
      if(multiLevelDD.length === 0) {
        return;
      }
      if(windowWidth > 991) {
        var h1 = multiLevelDD.find('.dropdown-submenu:first-child > ul').css('height');
        h1 = intPX(h1);
        if(!multiLevelDD.attr('data-oh')) {
          var oh = intPX(multiLevelDD.css('height'));
          multiLevelDD.attr('data-oh', oh);
        } else {
          var oh = parseInt(multiLevelDD.attr('data-oh'));
        }
        h1 += extraHeight;
        oh += extraHeight;
        multiLevelDD.css('min-height', (h1 > oh ? h1 : oh));
        multiLevelDD.find('.dropdown-submenu>ul').css('margin-top', extraHeight/2);
        multiLevelDD.find('.dropdown-submenu > a').removeClass('active-submenu');
        multiLevelDD.find('.dropdown-submenu > ul').removeClass('inline-element');
        multiLevelDD.find('.dropdown-submenu:first-child > a').addClass('active-submenu');
        multiLevelDD.find('.dropdown-submenu:first-child > ul').addClass('inline-element');
        multiLevelDD.css('top', 'auto');

      } else {
        multiLevelDD.css('min-height', 'auto');
      }
    }
  );

  //functions
  function onResizeScreen() {
    windowWidth = $(window).width();
    if(windowWidth <= 991) {
      
      if(!$('#site-header-mobile-menu .menu-toggle').hasClass('open'))
        menuWrapper.removeClass('in');

      shopBySubCatlink.siblings('ul').removeClass('inline-element'); 
      $('.dropdown-menu.multi-level').css('min-height', 'auto');

      shopByMenu.find('.navbar-collapse').addClass('in');
      serviceMenu.find('.navbar-service').addClass('in');

    } else if(windowWidth <=1199) {
    
      siteOverlayToggle();

      if(!menuWrapper.hasClass('in')) {
        menuWrapper.addClass('in');
      }
      menuWrapper.css('height', 'auto');

      serviceMenu.removeClass('active').removeClass('in');
      shopByMenu.addClass('active').addClass('in');
      shopByMenu.find('.navbar-collapse').addClass('in');
      serviceMenu.find('.navbar-service').removeClass('in');

    } else {

      siteOverlayToggle();
      
      if(!menuWrapper.hasClass('in')) {
        menuWrapper.addClass('in');
      }

      serviceMenu.removeClass('active').removeClass('in');
      shopByMenu.addClass('active').addClass('in');
      shopByMenu.find('.navbar-collapse').addClass('in');
      serviceMenu.find('.navbar-service').removeClass('in');

    }

  }
  
  function intPX(str) {
    if(!str) 
      return 0;
    return parseInt(str.replace('px'));
  }

  function siteOverlayToggle(show)
  {
    if(show) 
      $('.site-overlay').css('display', 'block');
    else 
      $('.site-overlay').css('display', 'none');
  }

});

/* subscribe form */
jQuery(document).ready(function($){
  $('#newsletter-form').submit(function(){
    var email = $(this).find('input').val();
    var form = $('#newsletter-form');
    form.find('.field-error').remove();
    if(!email || email.trim() === '') {
      form.find('input[name="email"]')
      .after('<span class="field-error">This field is required</span>');
      return false;
    }
    if(!validateEmail(email)) {
      form.find('input[name="email"]')
      .after('<span class="field-error">Email Addresss is invalid.</span>');
      return false;
    }
    return true;
  });
});


//defer youtube iframes
$(window).on('load', function(){
  var youtubeVideos = $( ".youtube-iframe" );
  var embedUrl = 'https://www.youtube.com/embed/';
  for(var i = 0; i < youtubeVideos.length; i++) {
    var currentFrame = $( '.youtube-iframe:eq('+i+')' );
    var frameborder = currentFrame.attr('frameborder');
    //create iframe
    var iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder',  currentFrame.attr('data-frameborder'));
    iframe.setAttribute('allowfullscreen', 'allowfullscreen');
    iframe.setAttribute('src', embedUrl+currentFrame.attr('data-query'));
    currentFrame.append(iframe);
  }
});

/*******************************************************************************
  Category page
********************************************************************************/

jQuery(document).ready(function($){

  var catProdList = $('.category-products-list');
  var catListContent = catProdList.find('.list-content');
  var catProduct;
  var products = [];

  //toggle product filter 
  $(document).on('click', '.product-category-filter .toggle-list', function(){
    if($(this).hasClass('fa-plus-circle')) {
      $(this).removeClass('fa-plus-circle');
      $(this).addClass('fa-minus-circle');
      $(this).closest('category-products-filter').addClass('open');
    } else {
      $(this).addClass('fa-plus-circle');
      $(this).removeClass('fa-minus-circle');
      $(this).closest('category-products-filter').removeClass('open');
    }
  });

  //toggle product view
  $(document).on('click', '.category-products-list .views > li', function(){
    var selectView = $(this).attr('data-view-type');
    if(catListContent.hasClass(selectView)) {
      return;
    }
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    if($(this).attr('data-view-type') === 'grid') {
      catListContent.addClass('grid-view');
      catListContent.removeClass('list-view');
    } else {
      catListContent.removeClass('grid-view');
      catListContent.addClass('list-view');
    }
    var view = catProdList.find('.views > li.active').attr('data-view-type');
    refreshCategoryProductView(view);
  });

  $.ajax({
    'url' : 'products.json',
    success : function(data, status, xhr) {
      var view = catProdList.find('.views > li.active').attr('data-view-type');
      showProducts(data, view);
      catProduct = catProdList.find('.product');
      productNameHover();
      products = data;
    }
  });

  function showProducts(data, view) {
    if(!data || data.length === 0) {
      return;
    }
    $.each(data, function(index, product){
      if(view === 'grid')
        catListContent
        .children('.products-wrapper')
        .append('<div class="grid-item">'+getProductTileView(product)+'</div>');
      else
        catListContent
        .children('.products-wrapper')
        .append('<div class="list-item">'+getProductListView(product)+'</div>');
    });
  }

  function getProductTileView(product) {
    var html = '<div class="product clearfix">';
    //product image
    html += '<div class="product-img">';
    html += '<a href="#"><img src="'+product.img+'" alt="'+product.name+'"></a>';

    //overlay
    html += '<div class="overlay"><div class="overlay-vertical"><div class="overlay-content">';
    html += '<a href="#" class="btn btn-white view-products">';
    html += 'View Products <span class="fa fa-caret"></span>';
    html += '</a>';
    //wishlist
    if(product.liked) {
      html += '<div class="add-to-wishlist liked">';
      html += '<a data-product-id="'+product.id+'"><span class="fa fa-heart"></a>';
      html += '</div>';
    } else {
      html += '<div class="add-to-wishlist">';
      html += '<a data-product-id="'+product.id+'"><span class="fa fa-heart-o"></a>';
      html += '</div>';
    }
    //end wishlist
    html += '</div></div></div>';
    //end overlay
    
    //sale
    if(product.discount && product.discount > 0) {
      html += '<div class="for-sale">';
      html += '<span>Sale '+product.discount+'% OFF</span>';
      html += '</div>';
    }
    //end sale
    
    //ready to ship
    if(product.readyToShip) {
      html += '<div class="ready-to-ship">';
      html += '<span class="fa fa-paper-plane-o"></span><span class="text">Ready to ship</span>';
      html += '</div>';
    }
    //end read to ship

    html += '</div>';
    //end product image
    
    //product footer
    html += '<div class="product-footer">';
    html += '<a href="#" class="name">'+product.name+'</a>';
    html += '<span class="price">'+product.currency_symbol+product.price+'</span>';
    html += '<div class="rating">';
    var rating = product.rating;
    while(rating--) {
      html += '<span class="fa fa-star"></span>';
    }
    html += '</div>';
    html += '</div>';
    //end product footer

    html += '</div>'; 
    //end product
    return html;
  }


  function getProductListView(product) {
    var html = '<div class="product clearfix">';

    //product image
    html += '<div class="product-img">';
    html += '<a href="#"><img src="'+product.img+'" alt="'+product.name+'"></a>';
    html += '</div>';
    //end product image
    
    //product details
    html += '<div class="product-details clearfix">';

    //left col
    html += '<div class="left-col">'
    html += '<a href="#" class="name">'+product.name+'</a>';
    
    html += '<div class="rating">';
    var rating = product.rating;
    while(rating--) {
      html += '<span class="fa fa-star"></span>';
    }
    html += '</div>';
    
    html += '<div class="price-box">';
    if(product.discount_price && parseFloat(product.discount_price) > 0) {
      html += '<del>'+product.price+'</del>';
      html += '<span class="price">'+product.currency_symbol+product.discount_price+'</span>';
    } else  {
      html += '<span class="price">'+product.currency_symbol+product.price+'</span>';
    }
    html += '</div>';

    html += '</div>';
    //end left col
    
    //right col
    html += '<div class="right-col">';

    //wishlist
    if(product.liked) {
      html += '<div class="add-to-wishlist liked">';
      html += '<a data-product-id="'+product.id+'"><span class="fa fa-heart"> add to wishlist</a>';
      html += '</div>';
    } else {
      html += '<div class="add-to-wishlist">';
      html += '<a data-product-id="'+product.id+'"><span class="fa fa-heart-o"> add to wishlist</a>';
      html += '</div>';
    }
    //end wishlist
    
    //ready to ship
    if(product.readyToShip) {
      html += '<div class="ready-to-ship">';
      html += '<span class="fa fa-paper-plane-o"></span><span class="text">Ready to ship</span>';
      html += '</div>';
    }
    //end read to ship
    
    html += '</div>';
    //end right col
    
    //description
    html += '<div class="description">';
    html += '<p>'+product.description+'</p>';
    html += '</div>'; 
    //end description

    html += '<a href="#" class="btn btn-orange shop-now">Shop Now</a>';
    
    html += '</div>';
    //end product detail
    
    html += '</div>';
    return html;
  }

  function refreshCategoryProductView(view) {
    catProduct.addClass('hidden');
    catListContent.find('.products-wrapper').html('');
    $.each(products, function(index, product){
      if(view === 'grid')
        catListContent
        .children('.products-wrapper')
        .append('<div class="grid-item">'+getProductTileView(product)+'</div>');
      else
        catListContent
        .children('.products-wrapper')
        .append('<div class="list-item">'+getProductListView(product)+'</div>');
    });
    productNameHover();
  }

  function productNameHover() {
    $('.product .name').hover(
      function() {
        $(this).closest('.product').find('.overlay').css('top', '0');
      },
      function(){
        $(this).closest('.product').find('.overlay').attr('style', '');
      }
    );
  }

  $(document).on('click', '.number-input .increment', function(){
    var input = $(this).closest('.number-input').find('input');
    var inputVal = parseFloat(input.val());
    if(isNaN(inputVal)) {
      input.val(1);
    } else {
      input.val(inputVal+1);
    }
    input.trigger('change');
  });

  $(document).on('click', '.number-input .decrement', function(){
    var input = $(this).closest('.number-input').find('input');
    var inputVal = parseFloat(input.val());
    if(isNaN(inputVal)) {
      input.val(1);
    } else {
      if(inputVal > 1)
        input.val(inputVal-1);
    }
    input.trigger('change');
  });

});

/*******************************************************************************
Product Page
*******************************************************************************/

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
    var symbol =  $(target).attr('data-currency-symbol');
    $(target).attr('data-total', total);
    $(target).val(symbol+(new Number(total)).toLocaleString());
  });

  if($(window).width() <= 767) {
    //collapse description, shipping and seller details on mobile
    $('.product-page-content .product-details-section .footer-col .title .fa')
    .trigger('click')
  }

  function intPX(str) {
    if(!str) 
      return 0;
    return parseFloat(str.replace('px'));
  }

});

/*******************************************************************************
Checkout Page
********************************************************************************/
$(document).ready(function() {
  var checkoutPage = $('.checkout-page-content');
  var step1 = checkoutPage.find('#step1');
  var step2 = checkoutPage.find('#step2');
  var step3 = checkoutPage.find('#step3');

  $(document).on(
    'click', 
    '.checkout-page-content .step >.step-complete-panel', function(){
  });

  /* Step1 Events */
  $(document).on('click', '#step1 #checkout-type-btn', function(){
    var isChecked = step1.find('input[name="customer-type"]').is(':checked');
    if(isChecked) {
      step1.find('.col-right #checkout-options-forms').addClass('open');
      switchCheckoutForms();
    }
  });

  $(document).on('change', '#step1 input[name="customer-type"]', function(){
    var isOpen = $('#step1 #checkout-options-forms').hasClass('open');
    if(isOpen) {
      switchCheckoutForms();
    }
  });

  $(document).on('submit', '#checkout-login-form', function(){
    //login new user
    if(!validateCheckoutLoginForm($(this))) {
      return false;
    }
    //step1 is complete
    moveToNextStep(1, 2);
    return false;
  });


  $(document).on('submit', '#checkout-register-form', function(){
    //register new user
    if(!validateCheckoutRegisterForm($(this))) {
      return false;
    }
    //step1 is complete
    moveToNextStep(1, 2);
    return false;
  });

  $(document).on('submit', '#checkout-guest-form', function(){
    //guest user
    if(!validateCheckoutGuestForm($(this))) {
      return false;
    }
    //step1 is complete
    moveToNextStep(1, 2);
    return false;
  });

  /* Step2 Events */
  /*var addressFormWrap = step2.find('.address-form-wrap');*/
  var addNewAddressBtn = step2.find('#add-new-address');
  var formsCount = step2.find('.address-forms > div').length;
  var lastFormId = 1;
  for(var i = 1; i <= formsCount; i++) {
    var formId = step2
                .find('.address-forms > div:nth-of-type('+i+') form')
                .attr('data-form-id');
    lastFormId = parseInt(formId);
    registerAddressFormSubmit(formId);
  }

  $(document).on('click', '.checkout-page-content #add-new-address', function(){
    var formsCount = step2.find('.address-forms > div').length;
    lastFormId++;
    $('.address-form-wrap').removeClass('editing');
    var formHtml = getAddressFormHtml(lastFormId);
    step2.find('.address-forms').append(formHtml);
    registerAddressFormSubmit(lastFormId);
    $(this).addClass('hidden');
  });

  $(document).on('click', '.checkout-page-content #step2 .cancel-address', function(){
    var wrapper = $(this).closest('.address-form-wrap');
    isNewAddress = wrapper.hasClass('new');
    if(isNewAddress){
      var formId = step2
                  .find('.address-form-wrap:eq(0) form')
                  .attr('data-form-id');
      removeNewAddress();
    }
    else {
      var formId = wrapper
                  .find('form')
                  .attr('data-form-id');
      wrapper.removeClass('editing');
    }
    activateAddressForm(formId);
    addNewAddressBtn.removeClass('hidden');
  });

  $(document).on(
    'change', 
    '.checkout-page-content #step2 input[name="edit-address-toggle"]', function(){
      removeNewAddress();
      addNewAddressBtn.removeClass('hidden');
  });

  $(document).on(
    'click', 
    '.checkout-page-content #step2 .address-form-wrap .address-edit', function(){
      removeNewAddress();
      addNewAddressBtn.removeClass('hidden');
      $('.checkout-page-content #step2 .address-form-wrap').removeClass('editing');
      var formId = $(this).closest('.address-form-wrap')
                    .find('form')
                    .attr('data-form-id');
      activateAddressForm(formId);
      $(this).closest('.address-form-wrap').addClass('editing');
  });

  $(document).on(
    'click', 
    '.checkout-page-content #step2 #proceed-to-payment-step button', function(){
      var isFormOpen = step2.find('.address-form-wrap.editing').length > 0;
      var formId = step2
      .find('.address-form-wrap.editing:eq(0)')
      .find('form')
      .attr('data-form-id');
      var form = $('#address-form'+formId);
      form.submit();
      if(form.find('.field-error').length > 0) {
        form.find('.field-error:eq(0)').siblings('input').focus();
        return;
      }
      //validate activated address form
      moveToNextStep(2, 3);
  });
  
  /* Helper Functions*/
  function switchCheckoutForms() {
    var isChecked = step1.find('input[name="customer-type"]').is(':checked');
    step1.find('.col-right form').parent().addClass('hidden');
    if(isChecked) {
      var checkoutType = step1.find('input[name="customer-type"]:checked').val();
      if(checkoutType === 'guest') {
        step1.find('#checkout-guest-form').parent().removeClass('hidden');
        step1.find('.step-title span:nth-of-type(2)').html('Guest');
      } else {
        step1.find('#checkout-register-form').parent().removeClass('hidden');
        step1.find('.step-title span:nth-of-type(2)').html('Register');
      }
    }
  }
  switchCheckoutForms();

  function moveToNextStep(oldId, newId) {
    var oldStep = checkoutPage.find('#step'+oldId);
    var newStep = checkoutPage.find('#step'+newId);
    oldStep.addClass('done');
    oldStep.find('.step-content').removeClass('in');
    newStep.addClass('open');
    newStep.find('.step-content').addClass('in');
  }

  function registerAddressFormSubmit(id) {
    $('#address-form'+id).submit(function(){
      var wrapper = $(this).closest('.address-form-wrap');
      isNewAddress = wrapper.hasClass('new');
      if(isNewAddress) {
        $('#add-new-address').removeClass('hidden');
      }
      if(!validateCheckoutAddressForm($(this))) {
        return false;
      }
      wrapper.removeClass('new');
      wrapper.removeClass('editing');
      wrapper.addClass('saved');
      wrapper.find('#edit-panel-address-toggle'+id).prop('checked', true);
      return false;
    });
  }

  function activateAddressForm(formId) {
    console.log(formId);
    step2.find('#edit-panel-address-toggle'+formId).prop('checked', true);
    step2.find('#edit-address-toggle'+formId).prop('checked', true);
  }

  function removeNewAddress() {
    step2.find('.address-form-wrap.new').remove();
  }


  function validateCheckoutLoginForm(form) {
    $('.field-error').remove();
    var isRequeredEmpty = false;
    var email = form.find('input[name="email"]');
    var password = form.find('input[name="password"]');

    if(!password.val() || password.val().trim() === '') {
      password.after('<span class="field-error">Password is required</span>');
      isRequeredEmpty = true;
    }

    if(!email.val() || email.val().trim() === '') {
      email.after('<span class="field-error">Email Address is required</span>');
      isRequeredEmpty = true;
    }

    if(isRequeredEmpty) {
      return false;
    }

    if(!validateEmail(email.val())) {
      email
      .after('<span class="field-error">Email Addresss is invalid.</span>');
      return false;
    }

    return true;
  }


  function validateCheckoutRegisterForm(form) {
    $('.field-error').remove();
    var isRequeredEmpty = false;
    var name = form.find('input[name="name"]');
    var email = form.find('input[name="email"]');
    var password = form.find('input[name="password"]');

    if(!name.val() || name.val().trim() === '') {
      name.after('<span class="field-error">Name is required</span>');
      isRequeredEmpty = true;
    }

    if(!password.val() || password.val().trim() === '') {
      password.after('<span class="field-error">Password is required</span>');
      isRequeredEmpty = true;
    }

    if(!email.val() || email.val().trim() === '') {
      email.after('<span class="field-error">Email Address is required</span>');
      isRequeredEmpty = true;
    }

    if(isRequeredEmpty) {
      return false;
    }

    if(!validateEmail(email.val())) {
      email
      .after('<span class="field-error">Email Addresss is invalid.</span>');
      return false;
    }

    return true;
  }


  function validateCheckoutGuestForm(form) {
    $('.field-error').remove();
    var isRequeredEmpty = false;
    var name = form.find('input[name="name"]');
    var email = form.find('input[name="email"]');

    if(!name.val() || name.val().trim() === '') {
      name.after('<span class="field-error">Name is required</span>');
      isRequeredEmpty = true;
    }

    if(!email.val() || email.val().trim() === '') {
      email.after('<span class="field-error">Email Address is required</span>');
      isRequeredEmpty = true;
    }

    if(isRequeredEmpty) {
      return false;
    }

    if(!validateEmail(email.val())) {
      email
      .after('<span class="field-error">Email Addresss is invalid.</span>');
      return false;
    }

    return true;
  }

  function validateCheckoutAddressForm(form) {
    $('.field-error').remove();
    var isRequeredEmpty = false;
    var name = form.find('input[name="name"]');
    var phone = form.find('input[name="phone"]');
    var pincode = form.find('input[name="pincode"]');
    var locality = form.find('input[name="locality"]');
    var city = form.find('input[name="city"]');
    var state = form.find('input[name="state"]');
    var streetAddress = form.find('textarea[name="street-address"]');

    if(!name.val() || name.val().trim() === '') {
      name.after('<span class="field-error">Name is required</span>');
      isRequeredEmpty = true;
    }

    if(!pincode.val() || pincode.val().trim() === '') {
      pincode.after('<span class="field-error">Pincode is required</span>');
      isRequeredEmpty = true;
    }

    if(!phone.val() || phone.val().trim() === '') {
      phone.after('<span class="field-error">Phone is required</span>');
      isRequeredEmpty = true;
    }

    if(!locality.val() || locality.val().trim() === '') {
      locality.after('<span class="field-error">Locality is required</span>');
      isRequeredEmpty = true;
    }

    if(!city.val() || city.val().trim() === '') {
      city.after('<span class="field-error">City is required</span>');
      isRequeredEmpty = true;
    }

    if(!state.val() || state.val().trim() === '') {
      state.after('<span class="field-error">State is required</span>');
      isRequeredEmpty = true;
    }

    if(!streetAddress.val() || streetAddress.val().trim() === '') {
      streetAddress.after('<span class="field-error">Sreet Address is required</span>');
      isRequeredEmpty = true;
    }

    if(isRequeredEmpty) {
      return false;
    }
    return true;
  }


  function getAddressFormHtml(id) {
    if(!id)
      return '';

    var editPanel='';
    editPanel += '<div class="address-form-edit-panel">';
    editPanel += '<div class="address-toggle">';
    editPanel += '<div class="radio radio-primary">';
    editPanel += '<input class="address-toggle" id="edit-panel-address-toggle'+id+'" type="radio" name="edit-address-toggle" value="new" checked>';
    editPanel += '<label for="edit-panel-address-toggle'+id+'"> </label>';
    editPanel += '</div>';
    editPanel += '</div>';
    editPanel += '<div class="address-summary">';
    editPanel += '<p><span class="name">Muheet Mehraj</span><span class="phone">9596888888</span></p>';
    editPanel += '<p class="delivery-address"><span class="street-address">BarBarshah</span><span class="city">Srinagar</span><span class="state">Jammu and Kashmir</span><span class="pincode">190001</span></p>';
    editPanel += '<p class="pin-error">The pincode is not servicable.</p>';
    editPanel += '</div>';
    editPanel += '<div class="address-edit"><a><span class="fa fa-edit"></span><span>Edit</span></a></div>';
    editPanel += '</div>';

    var formVar = '<div class="address-form-wrap new editing clearfix">';
    formVar += editPanel;
    formVar += '<div class="address-form">';
    formVar += '<div class="col-xs-12"> ';
    formVar += '<div class="radio radio-primary">';
    formVar += '<input class="address-toggle" id="edit-address-toggle'+id+'" type="radio" name="address-toggle" value="new" checked>';
    formVar += '<label for="edit-address-toggle'+id+'"><span class="edit-label">Edit Address</span><span class="new-label">Add a new Address</span></label>';
    formVar += '</div>';
    formVar += '</div>';

    formVar += '<form id="address-form'+id+'" data-form-id="'+id+'">';

    formVar += '<div class="form-group">';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" name="name" placeholder="Name">';
    formVar += '</div>';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" type="tel" name="phone" placeholder="Phone">';
    formVar += '</div>';
    formVar += '</div>';

    formVar += '<div class="form-group">';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" name="pincode" placeholder="Pincode">';
    formVar += '</div>';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" name="locality" placeholder="Locality">';
    formVar += '</div>';
    formVar += '</div>';

    formVar += '<div class="form-group">';
    formVar += '<div class="col-xs-12">';
    formVar += '<textarea class="form-control" name="street-address" placeholder="Address(Area and Street)"></textarea>';
    formVar += '</div>';
    formVar += '</div>';

    formVar += '<div class="form-group">';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" name="city" placeholder="City/District/Town">';
    formVar += '</div>';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" name="state" placeholder="State">';
    formVar += '</div>';
    formVar += '</div>';

    formVar += '<div class="form-group">';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" name="landmark" placeholder="Landmark(Optional)">';
    formVar += '</div>';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" name="alt-phone" placeholder="Alternate Phone(Optional)">';
    formVar += '</div>';
    formVar += '</div>';

    formVar += '<div class="form-group">';
    formVar += '<div class="col-xs-12">';
    formVar += '<p>Address Type</p>';
    formVar += '</div>';
    formVar += '<div class="col-sm-6">';
    formVar += '<div class="radio radio-primary">';
    formVar += '<input class="address-toggle" id="home-address-radio'+id+'" type="radio" name="address-type'+id+'" value="home" checked>';
    formVar += '<label for="home-address-radio'+id+'">Home(All day delivery)</label>';
    formVar += '</div>';
    formVar += '</div>';
    formVar += '<div class="col-sm-6">';
    formVar += '<div class="radio radio-primary">';
    formVar += '<input class="address-type" id="work-address-radio'+id+'" type="radio" name="address-type'+id+'" value="work">';
    formVar += '<label for="work-address-radio'+id+'">Work(Delivery between 10 AM - 5 PM)</label>';
    formVar += '</div>';
    formVar += '</div>';
    formVar += '</div>';

    formVar += '<div class="form-group">';
    formVar += '<div class="col-xs-12">';
    formVar += '<button class="btn btn-orange save-address" type="submit">Save</button>';
    formVar += '<button class="btn btn-default cancel-address" type="button">Cancel</button>';
    formVar += '</div>';
    formVar += '</div>';

    formVar += '</form>';
    formVar += '</div>';

    formVar += '</div>'; 
    return formVar;
  }

});

/*******************************************************************************
Global Helper Functions
********************************************************************************/

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


