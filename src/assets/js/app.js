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
  var catProduct = catListContent.find('.product');
  var products = [];

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
        catListContent.append('<div class="grid-item">'+getProductTileView(product)+'</div>');
      else
        catListContent.append('<div class="grid-item">'+getProductListView(product)+'</div>');
    });
  }

  function getProductTileView(product) {
    var html = '<div class="product">';
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
    var html = '<div class="product">';

    //product image
    html += '<div class="product-img">';
    html += '<a href="#"><img src="'+product.img+'" alt="'+product.name+'"></a>';
    html += '</div>';
    //end product image
    
    html += '</div>';
  }

  function refreshCategoryProductView(view) {
    $.each(products, function(index, product){
      if(view === 'grid')
        catListContent.append('<div class="grid-item">'+getProductTileView(product)+'</div>');
      else
        catListContent.append('<div class="grid-item">'+getProductListView(product)+'</div>');
    });
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

});

/*******************************************************************************
Global Helper Functions
********************************************************************************/

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
