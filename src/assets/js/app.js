jQuery(document).ready(function($){
	
  $('.hero-slider').slick({
    dots : true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000
  });

  $('.artisan-collection-slider').slick({
    'prevArrow' : '<span class="fa fa-chevron-left slide-back"></span>',
    'nextArrow' : '<span class="fa fa-chevron-right slide-next"></span>',
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 4
  });


  /* product slider  */
  
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
            centerPadding: '10px'
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
