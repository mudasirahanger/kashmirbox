(function(){


$("#ex2").slider({});

$('.product_single').find('.actual_price').each(function(){
	var act=$(this).html();
	//console.log(act);
	var act1="&#8377; " + act;
	//console.log(act1);
	$(this).html(act1);
	var pr=$(this).parent().find('.sale_percent');
	//var pr1=pr.find('sale_percent').html();
	act=parseInt(act);

	pr1=parseInt(pr.html());

	var newpr=act-((act*pr1)/100);
     newpr="&#8377; " + newpr;
	//console.log(newpr);
	pr.html(newpr);
});

$('#ex2').change(function(){
	console.log('working');
	var x=$(this).val();
	var z=x.split(",");
	//console.log(z);
	var min=z[0];
	var max=z[1];
	$('#slider-min').val(min);
	$('#slider-max').val(max);
});



$('#grid-view').on('click',function(){
  if ($(this).hasClass('active')){}
  else{
    $(this).addClass('active');
    $('#list-view').removeClass('active');
    $('.product_single_detail').hide();
    $('.product_single').removeClass('col-md-12 col-sm-12').addClass('col-md-4 col-sm-4 pad-t-0 pad-b-0').css('background','none');
    $('.product_single_img').removeClass('col-md-3 col-sm-3').addClass('col-md-12 col-sm-12 pad-0');
    $('.product_single_desc').removeClass('col-md-9 col-sm-9').addClass('col-md-12 col-sm-12');
    $('.ready_to_ship').removeClass('col-md-2 col-sm-2').addClass('col-md-12 col-sm-12 ready_to_ship_grid');
    $('.product_single_wishlist').removeClass('col-md-3 col-sm-3').addClass('col-md-12 col-sm-12 product_single_wishlist_grid');
    $('.product_single_wishlist').html('<i class="fa fa-heart"></i>');
    $('.product_single_wishlist').hide();
    $('.product_single_name').removeClass('col-md-9 col-sm-9').addClass('col-md-10 col-sm-10 mar-t-15 pad-0 product_single_name_grid');
    $('.product_single_price').removeClass('col-sm-10 col-md-10').addClass('col-sm-4 col-md-4 price_grid');
    $('.product_single_rating').addClass('pad-0');
    $('.btn-single-product').removeClass('btn-single-product').addClass('btn-single-product-grid');
    $('.product_single_img').html('<div class="wrapper_overlay"></div>').addClass('height_img_grid')
                            .removeClass('height_img_list');
    $('.product_single').addClass('product_hover');
    $('.wrapper_overlay').hide();
    $('.btn-single-product-grid').hide();
    $('.actual_price').hide();
   $('.product_single').find('.sale_percent').each(function(){
	   var tmp=$(this).html();
	   var price=tmp.split(" ");
	   console.log(price[1]);
	   var tmp1=$(this).parent().find('.actual_price').html();
	   var act=tmp1.split(" ");
	   console.log(act[1]);
	   var per= 100-((price[1]*100)/act[1]);
	   console.log(per);
	   var par=$(this).parent().parent().parent().find('.product_single_img');
	   tmp='<div class="sale"><div class="sale_txt">Sale ' +per+'% off</div></div>'
	   par.append(tmp);
	   console.log(tmp);
   });

  }
    $('.product_hover').on('mouseenter',function(){
      //console.log("working");
      $(this).find('.wrapper_overlay').show();
      $(this).find('.btn-single-product-grid').show();
      $(this).find('.product_single_wishlist').show();
    });



    $('.product_hover').on('mouseleave',function(){
      $(this).find('.wrapper_overlay').hide();
      $(this).find('.btn-single-product-grid').hide();
      $(this).find('.product_single_wishlist').hide();
    });




 });

$('#list-view').on('click',function(){
  if ($(this).hasClass('active')){}
  else{
    $(this).addClass('active');
    $('#grid-view').removeClass('active');
    $('.product_single_detail').show();
    $('.product_single').removeClass('col-md-4 col-sm-4 pad-t-0 pad-b-0').addClass('col-md-12 col-sm-12').css('background','#fff');
    $('.product_single_img').removeClass('col-md-12 col-sm-12 pad-0').addClass('col-md-3 col-sm-3');
    $('.product_single_desc').removeClass('col-md-12 col-sm-12').addClass('col-md-9 col-sm-9');
    $('.product_single_wishlist_grid').removeClass('col-md-12 col-sm-12 product_single_wishlist_grid').addClass('col-md-3 col-sm-3');
    $('.product_single_wishlist').html('<i class="fa fa-heart"></i>add to wishlist');
    $('.product_single_wishlist').show();
    $('.ready_to_ship').removeClass('col-md-12 col-sm-12 ready_to_ship_grid').addClass('col-md-2 col-sm-2');
    $('.product_single_name').removeClass('col-md-10 col-sm-10 mar-t-15 pad-0 product_single_name_grid').addClass('col-md-9 col-sm-9');
    $('.product_single_price').removeClass('col-sm-4 col-md-4 price_grid').addClass('col-sm-10 col-md-10');
    $('.product_single_rating').removeClass('pad-0');
    $('.btn-single-product-grid').removeClass('btn-single-product-grid').addClass('btn-single-product');
    $('.btn-single-product').show();
    $('.product_single_img').html(' ').addClass('height_img_list').removeClass('height_img_grid');
    //console.log('testing');
    $('.product_single').removeClass('product_hover');
    $('.actual_price').show();
    $('.sale').hide();

  }
});



})();


