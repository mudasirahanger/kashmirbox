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
jQuery(document).ready(function(){
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
    slidesToShow: 10,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
            centerPadding: '40px'
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
            centerPadding: '60px'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
            centerPadding: '110px',
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
        breakpoint: 1201,
        settings: {
          slidesToShow: 3,
          centerPadding: '110px'
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          centerPadding: '110px'
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 2100,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 2400,
        settings: {
          slidesToShow: 7,
        }
      },
      {
        breakpoint: 2700,
        settings: {
          slidesToShow: 8,
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

  $(document).on('click', '.product-slider .add-to-wishlist', function(){
    // ajax call to add to wish list
    var result = true;
    if(result) {
      var heart = $(this).find('.fa-heart-o');
      heart.removeClass('fa-heart-o');
      heart.addClass('fa-heart');
      $(this).removeClass('add-to-wishlist');
      $(this).addClass('liked');
    }
  });

 

});


// Deal Countdown
$(document).ready(function(){
  
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
$(document).ready(function() {
  $('.testimonial-slider').slick({
    dots : true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 4
  });
});


//mega menu
$(document).ready(function(){
  var megaMenu = $('#mega-menu');
  var menuWrapper = megaMenu.find('.menu-wrapper');
  var menuToggle = megaMenu.find('.menu-toggle');
  var shopByMenu = megaMenu.find('#shop-by-menu');
  var shopBySubCatlink = shopByMenu.find('.dropdown-menu.multi-level > .dropdown-submenu > a');
  var shopByMainMenuItem = shopByMenu.find('.navbar-nav > li');
  var windowWidth = $(window).width();

  //events
  $(document).on('click', '#site-header-mobile-menu .menu-toggle', function(){
    siteOverlayToggle(true);
    $('#site-header-navigation .navbar-default').css('height', '100%');
    $('#site-header-navigation').css('height', '100%')
  });

  $(document).on('click', '#site-header-navigation .close-menu', function(){
    siteOverlayToggle();
    $('#site-header-navigation .navbar-default').css('height', 'auto');
    $('#site-header-navigation').css('height', 'auto')
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

  $(document).on('click', '#site-header-mobile-menu .search-toggle', function(){
    $(this).siblings().removeClass('open');
    if(!$(this).hasClass('open')) {
      $(this).addClass('open');
    } else {
      $(this).removeClass('open');
    }
  });

  $(window).resize(onResizeScreen);
  onResizeScreen();

  var extraHeight = 60; // for padding
  shopBySubCatlink.hover(
    function(){
      var multiLevelDD = $(this).closest('.dropdown-menu.multi-level');
      if(windowWidth > 767) {
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
      if(windowWidth > 767) {
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
      } else {
        multiLevelDD.css('min-height', 'auto');
      }
    }
  );

  //functions
  function onResizeScreen() {
    if(windowWidth <= 767) {
      $('#site-header-navigation .navbar-default').css('height', 'auto');
      $('#site-header-navigation').css('height', 'auto')
      
      if(menuWrapper.hasClass('in')) {
        menuWrapper.removeClass('in');
        siteOverlayToggle();
      }

      shopBySubCatlink.siblings('ul').removeClass('inline-element'); 
      $('.dropdown-menu.multi-level').css('min-height', 'auto');

    } else {
      
      if(!menuWrapper.hasClass('in')) {
        menuWrapper.addClass('in');
      }

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
