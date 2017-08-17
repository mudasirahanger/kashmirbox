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

  // mobile fix for collapse
  $(document).on(
      'click', 
      '.category-page-content #product-filter-modal .category-products-filter .product-category-filter .filter-label .fa',
      function(){
        $($(this).data('target')).collapse('toggle');
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

    /*//overlay
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
    //end overlay*/
    
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
      html += '<del>'+product.currency_symbol+product.price+'</del>';
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
      html += '<a data-product-id="'+product.id+'"><span class="fa fa-heart"></span> add to wishlist</a>';
      html += '</div>';
    } else {
      html += '<div class="add-to-wishlist">';
      html += '<a data-product-id="'+product.id+'"><span class="fa fa-heart-o"></span> add to wishlist</a>';
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
        $(this).closest('.product').find('.add-to-wishlist').css('display', 'block');
      },
      function(){
        $(this).closest('.product').find('.add-to-wishlist').attr('style', '');
      }
    );
  }

});
