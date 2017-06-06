(function(){


$("#ex2").slider({});


$('#grid-view').on('click',function(){
  if ($(this).hasClass('active')){}
  else{
    $(this).addClass('active');
    $('#list-view').removeClass('active');
    $('.product_single_detail').hide();
    $('.product_single').removeClass('col-md-12 col-sm-12').addClass('col-md-4 col-sm-4 pad-0');
    $('.product_single_img').removeClass('col-md-3 col-sm-3').addClass('col-md-12 col-sm-12 pad-0');
    $('.product_single_desc').removeClass('col-md-9 col-sm-9').addClass('col-md-12 col-sm-12');
    $('.ready_to_ship').removeClass('col-md-2 col-sm-2').addClass('col-md-12 col-sm-12 ready_to_ship_grid');
    $('.product_single_wishlist').removeClass('col-md-3 col-sm-3').addClass('col-md-12 col-sm-12 product_single_wishlist_grid');
    $('.product_single_wishlist').html('<i class="fa fa-heart"></i>add to wishlist');
    $('.product_single_wishlist').hide();
    $('.product_single_name').removeClass('col-md-9 col-sm-9').addClass('col-md-8 col-sm-8 mar-t-15 pad-0 product_single_name_grid');
    $('.product_single_price').removeClass('col-sm-10 col-md-10').addClass('col-sm-4 col-md-4 price_grid');
    $('.product_single_rating').addClass('pad-0');
    $('.btn-single-product').removeClass('btn-single-product').addClass('btn-single-product-grid');
    $('.product_single_img').html('<div class="wrapper_overlay"></div>').addClass('height_img_grid')
                            .removeClass('height_img_list');
    $('.product_single').addClass('product_hover');
    $('.wrapper_overlay').hide();
    $('.btn-single-product-grid').hide();

  }
    $('.product_hover').on('mouseenter',function(){
      //console.log("working");
      $('.wrapper_overlay').show();
      $('.btn-single-product-grid').show();
      $('.product_single_wishlist').show();
    });



    $('.product_hover').on('mouseleave',function(){
      $('.wrapper_overlay').hide();
      $('.btn-single-product-grid').hide();
      $('.product_single_wishlist').show();
    });
});


$('#list-view').on('click',function(){
  if ($(this).hasClass('active')){}
  else{
    $(this).addClass('active');
    $('#grid-view').removeClass('active');
    $('.product_single_detail').show();
    $('.product_single').removeClass('col-md-4 col-sm-4 pad-0').addClass('col-md-12 col-sm-12');
    $('.product_single_img').removeClass('col-md-12 col-sm-12 pad-0').addClass('col-md-3 col-sm-3');
    $('.product_single_desc').removeClass('col-md-12 col-sm-12').addClass('col-md-9 col-sm-9');
    $('.product_single_wishlist').removeClass('col-md-12 col-sm-12 product_single_wishlist_grid').addClass('col-md-3 col-sm-3');
    $('.product_single_wishlist').html('<i class="fa fa-heart"></i>add to wishlist');
    $('.product_single_wishlist').show();
    $('.ready_to_ship').removeClass('col-md-12 col-sm-12 ready_to_ship_grid').addClass('col-md-2 col-sm-2');
    $('.product_single_name').removeClass('col-md-8 col-sm-8 mar-t-15 pad-0 product_single_name_grid').addClass('col-md-9 col-sm-9');
    $('.product_single_price').removeClass('col-sm-4 col-md-4 price_grid').addClass('col-sm-10 col-md-10');
    $('.product_single_rating').removeClass('pad-0');
    $('.btn-single-product-grid').removeClass('btn-single-product-grid').addClass('btn-single-product');
    $('.btn-single-product').show();
    $('.product_single_img').html('').addClass('height_img_list').removeClass('height_img_grid');
    $('.pruduct_single').removeClass('product_hover');

  }
});



})();