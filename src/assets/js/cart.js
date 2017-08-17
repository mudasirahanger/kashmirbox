jQuery(document).ready(function($){
  var cartPage = $('.cart-content');
  var cartProducts = $('#cart-products-wrapper');
  var offerItems = cartPage.find('.box-offers .offer-items');
  /* Events */
  $(document).on(
    'change', 
    '.cart-content .product .counter-input input', 
    function(){
      var priceEl = $(this).closest('.product').find('.price-value');
      var units = parseFloat($(this).val());
      var price = parseFloat(priceEl.attr('data-unit-price'));
      var total = units * price;
      total = total.toFixed(2);
      priceEl.html(kb_shop_currency_symbol+total);
      calculateCartSummary();
  });

  $(document).on('click', '.cart-content .product .product-delete', function(){
    var product = $(this).closest('.product');
    isOfferItem = product.eq(0).data('offer');
    if(isOfferItem) {
      var productData = {
        unitPrice : product.eq(0).data('unit-price'),
        taxAmount : product.eq(0).data('gst-tax-amount'),
        discountPercent : product.eq(0).data('discount-percent'),
        quantity : product.eq(0).data('quantity'),
        productName : product.eq(0).data('product-name'),
        kbcode : product.eq(0).data('kbcode'),
        productImg : product.eq(0).data('product-img'),
        offerDesc : product.eq(0).data('offer-desc'),
        productId : product.eq(0).data('product-id')
      };
      offerHtml = getOfferHtml(productData);
      //add back to offer items
      offerItems.append(offerHtml);
    }

    $(this).closest('.product').remove();
    calculateCartItems();
    calculateCartSummary();
  });

  $(document).on('change', '.cart-content .box-section .offer-item input', function(){
    var unitPrice = parseFloat($(this).attr('data-unit-price'));
    var taxAmount = parseFloat($(this).attr('data-gst-tax-amount'));
    var discountPercent = parseFloat($(this).attr('data-discount-percent'));
    var quantity = parseFloat($(this).attr('data-quantity'));
    if(isNaN(discountPercent) || isNaN(taxAmount) || isNaN(unitPrice) || isNaN(quantity)){
      console.error('invalid offer item values');
      return;
    }
    var totalPrice = (unitPrice * quantity).toFixed(2);
    var productName = $(this).attr('data-product-name');
    var kbcode = $(this).attr('data-kbcode');
    var productImg = $(this).attr('data-product-img');
    var offerDesc = $(this).data('offer-desc');
    var productId = $(this).data('product-id');
    var productHtml='';
    productHtml += ' <div class="product clearfix" data-offer="true" data-offer-desc="'+offerDesc+'" data-quantity="'+quantity+'" data-unit-price="'+unitPrice+'" data-gst-tax-amount="'+taxAmount+'" data-discount-percent="'+discountPercent+'" data-product-name="'+productName+'" data-kbcode="'+kbcode+'" data-product-img="'+productImg+'" data-product-id="'+productId+'">';
    productHtml += '<div class="product-img"><img src="'+productImg+'"></div>';
    productHtml += '<div class="product-info"><span class="name">'+productName+'</span><span class="kbcode">'+kbcode+'</span></div>';
    productHtml += '<div class="product-counter">';
    productHtml += '<div class="counter-input"><span class="fa fa-minus decrement"></span><span> ';
    productHtml += '<input class="form-control" type="number" value="'+quantity+'"></span><span class="fa fa-plus increment"></span></div>';
    productHtml += '</div>';
    productHtml += '<div class="product-price"><span class="price-value" data-unit-price="'+unitPrice+'">'+kb_shop_currency_symbol+totalPrice+'</span><span class="tax-value" data-gst-tax-amount="'+taxAmount+'">+ '+kb_shop_currency_symbol+taxAmount+' GST</span><span class="discount-value" data-discount-percent="'+discountPercent+'">- '+discountPercent+'%</span></div>';
    productHtml += '<div class="product-delete">';
    productHtml += '<div><span class="fa fa-times"></span></div>';
    productHtml += '</div>';
    productHtml += '</div>';
    
    var self = $(this);
    $(this).closest('.offer-item').fadeOut('slow', 'linear', function(){
       self.closest('.offer-item').remove();
       cartProducts.append(productHtml);
       calculateCartItems();
       calculateCartSummary();
    });
  });

  function getOfferHtml(data) {
    if(!data)
      return "";

    var offerHtml='';
    offerHtml += '<div class="offer-item">';
    offerHtml += '<div class="radio-wrap">';
    offerHtml += '<div class="radio radio-primary">';
    offerHtml += '<input id="offer-radio'+data.productId+'" type="radio" value="1" data-quantity="'+data.quantity+'" data-unit-price="'+data.unitPrice+'" data-gst-tax-amount="'+data.taxAmount+'" data-discount-percent="'+data.discountPercent+'" data-product-name="'+data.productName+'" data-kbcode="'+data.kbcode+'" data-product-img="'+data.productImg+'" data-product-id="'+data.productId+'" data-offer-desc="'+data.offerDesc+'">';
    offerHtml += '<label for="offer-radio'+data.productId+'"></label>';
    offerHtml += '</div>';
    offerHtml += '</div>';
    offerHtml += '<div class="item-image"><img src="'+data.productImg+'"></div>';
    offerHtml += '<div class="item-info">';
    offerHtml += '<p>'+data.offerDesc+'</p>';
    offerHtml += '</div>';
    offerHtml += '</div>';
    return offerHtml;
  }

  /* functions */
  function calculateCartItems() {
    var count = cartPage.find('.box-products > .product').length;
    $('#cart-item-count').html(count);
    if(count > 0)
      cartPage.find('.empty-cart-msg').addClass('hidden');
    else 
      cartPage.find('.empty-cart-msg').removeClass('hidden');
  }

  function calculateCartSummary() {
    var products = cartPage.find('.box-products > .product');
    var count = products.length;
    var price = 0;
    var taxAmount = 0;
    
    //calculate price
    for(var i = 1; i <= count; i++) {
      var product = cartPage.find('.box-products > .product:nth-of-type('+i+')');
      var productPrice = product.find('.price-value').attr('data-unit-price');
      var quantity = product.find('.counter-input input').val();
      var productTotal = productPrice * quantity;
      var discountPercent = parseFloat(product.find('.discount-value').attr('data-discount-percent'));
      if(discountPercent > 0 && discountPercent <= 100) {
        productTotal -= ( productTotal / 100 ) * discountPercent; 
      }
      price += parseFloat(productTotal);
      taxAmount +=  parseFloat(product.find('.tax-value').attr('data-gst-tax-amount'));
    }
    
    $('#kbprice').attr('data-price', price.toFixed(2))
    $('#kbprice').html(kb_shop_currency_symbol+price.toFixed(2));

    $('#taxAmount').attr('data-price', taxAmount.toFixed(2));
    $('#taxAmount').html(kb_shop_currency_symbol+taxAmount.toFixed(2));

    var cartTotal = (price + taxAmount).toFixed(2);
    $('#cartTotal').attr('data-price', cartTotal);
    $('#cartTotal').html(kb_shop_currency_symbol+cartTotal);
  }

  calculateCartItems();
  calculateCartSummary();

});
