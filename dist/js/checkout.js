  var checkoutPage = $('.checkout-page-content');
  var step1 = checkoutPage.find('#step1');
  var step2 = checkoutPage.find('#step2');
  var step3 = checkoutPage.find('#step3');
  var step = checkoutPage.find('.step');
  var shippingAddresses = []
    /* Step2 Events */
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

$(document).ready(function() {
    $('#preloader').show();
    step1.find('.col-right form').parent().removeClass('hidden');
    $.ajax({   
       "async": true,
       "crossDomain": true,
       "url": "https://www.kashmirbox.com/index.php?route=checkout/api",
       "method": "POST",
       "headers": {"content-type": "application/x-www-form-urlencoded"},
    }).done(function(data){
     $('#preloader').hide();
     if (data.logged != null) {
        if(data.redirect.split('=')[1] == 'checkout/cart') {
          window.location = data.redirect
        } else {
          $('#logged-out').addClass('hidden')
          $('#logged-in').removeClass('hidden')
          $('#logged-in .login-name').text(" NO NAME AVAILABLE ")
          $('#logged-in .login-email').text(" NO EMAIL AVAILABLE ")
        }
     } 
   });
});


  function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  $(document).on(
    'click', 
    '.checkout-page-content .step >.step-complete-panel', function(){
      $(this).closest('.step').nextAll('.step')
      .removeClass('open')
      .removeClass('done')
      .find('.step-content')
      .removeClass('in');
      $(this).closest('.step')
      .addClass('open')
      .removeClass('done')
      .find('.step-content')
      .addClass('in');
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

  $('#logout-link').on('click',function () {
  	// moveToNextStep(1, 2);
  })

  $('#nextstep').on('click',function () {
  	moveToNextStep(1, 2);
  })

  $(document).on('submit', '#checkout-login-form', function(){
    //login new user
    if(!validateCheckoutLoginForm($(this))) {
      return false;
    }

    $('#preloader').show();

    let email = $('#login-email').val()
    let password = $('#login-password').val()

    $.ajax({   
       "async": true,
       "crossDomain": true,
       "url": "https://www.kashmirbox.com/index.php?route=checkout%2Fapi%2FLogin",
       "method": "POST",
       "headers": {"content-type": "application/x-www-form-urlencoded"},
       "data": {
        "email": email,
        "password": password
      }
    }).done(function(data){
     $('#preloader').hide();
     if (data.responseCode === '200') {
      $('#step1 .details .name').text(data.firstname + " " + data.lastname)
      $('#step1 .details .email').text(email)
      $('#login-email').val('')
      $('#login-password').val('')
      $('#logged-out').addClass('hidden')
      $('#logged-in').removeClass('hidden')
      $('#logged-in .login-name').text(data.firstname + " " + data.lastname)
      $('#logged-in .login-email').text(email)
      if(data.shipping_address !== false)
      {
        $('#add-new-address').removeClass('hidden')
        for (var address in data.shipping_address) {
          shippingAddresses.push(data.shipping_address[address]);
          var formHtml = setAddressFormHtml(lastFormId, data.shipping_address[address]);
          step2.find('.address-forms').append(formHtml);
          registerAddressFormSubmit(lastFormId);
          lastFormId++
        }
      } else {
        var formHtml = getAddressFormHtml(lastFormId)
        step2.find('.address-forms').append(formHtml);
        registerAddressFormSubmit(lastFormId);
        lastFormId++
      }
      
      let cartData = data.cartDetails;
      var listItems = ""
      alert(cartData[cartData.length-1].text.trim())
      if(data.redirect) {
       swal({
        title: 'Sorry!',
        text: 'Your cart is empty',
        type: 'warning'
      })
       window.location = data.redirect
     } else {
       for (var i = 0; i < cartData.length; i++) {
        if(cartData.title === 'Total') {
         listItems += `<li class="item total"><span class="item-title">${cartData[i].title}</span><span class="item-value">${cartData[i].text}</span></li>`
       } else {
         listItems += `<li class="item"><span class="item-title">${cartData[i].title}</span><span class="item-value">${cartData[i].text}</span></li>`
       }
     }
   }

   $('#order-summary .order-summary-list').html(listItems)

   moveToNextStep(1, 2);
  } else {
    swal({
     title: "OOPS!",
     text: data.warning.warning,
     type: "error"
   })
  }
  console.log(data)                       
  }); 
    //step1 is complete
    return false;
});


  $(document).on('submit', '#checkout-register-form', function(){
    //register new user
    if(!validateCheckoutRegisterForm($(this))) {
      return false;
    }

    let name = $('#register-name').val()
    let email = $('#register-email').val()
    let password = $('#register-password').val()

    swal({
     title: 'Dear <b>'+name+'</b>',
     html: 'Are your sure you want to continue with <b>' + email + '</b>?',
     type: 'question',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Continue'
   }).then(function () {
    $('#step1 .details .name').text(name)
    $('#step1 .details .email').text(email)
    $('#register-name').val('')
    $('#register-email').val('')
    $('#register-password').val('')
    moveToNextStep(1, 2);
  })

    //step1 is complete
    return false;
  });

  $(document).on('submit', '#checkout-guest-form', function(){
    //guest user
    if(!validateCheckoutGuestForm($(this))) {
      return false;
    }

    let name = $('#guest-name').val()
    let email = $('#guest-email').val()
    $('#step1 .details .name').text(name)
    $('#step1 .details .email').text(email)
    $('#guest-name').val('')
    $('#guest-email').val('')

    //step1 is complete
    moveToNextStep(1, 2);
    return false;
  });

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
      console.log(formId)
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
      var isNewAddress = wrapper.hasClass('new');
      if(!validateCheckoutAddressForm($(this))) {
        return false;
      }
      if(isNewAddress) {
        $('#add-new-address').removeClass('hidden');
      }
      wrapper.removeClass('new');
      wrapper.removeClass('editing');
      wrapper.addClass('saved');
      wrapper.find('#edit-panel-address-toggle'+id).prop('checked', true);
      let addressSummary = wrapper.find('#address-summary'+id);
      addressSummary.find('.name').text($(this).find('input[name="name"]').val())
      addressSummary.find('.phone').text($(this).find('input[name="phone"]').val())
      addressSummary.find('.street-address').text($(this).find('textarea[name="street-address"]').text())
      addressSummary.find('.city').text($(this).find('input[name="city"]').val())
      addressSummary.find('.state').text($(this).find('input[name="state"]').val())
      addressSummary.find('.pincode').text($(this).find('input[name="pincode"]').val())
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
  var firstname = form.find('input[name="firstname"]');
  var lastname = form.find('input[name="lastname"]');
  var phone = form.find('input[name="phone"]');
  var pincode = form.find('input[name="pincode"]');
  var address_1 = form.find('input[name="address_1"]');
  var address_2 = form.find('input[name="address_2"]');
  var city = form.find('input[name="city"]');
  var stateVal = form.find('select[name="state"] :selected').val();
  var state = form.find('select[name="state"]');
  var country = form.find('select[name="country"]');
  var countryVal = form.find('select[name="country"] :selected').val();

  if(!firstname.val() || firstname.val().trim() === '') {
    firstname.after('<span class="field-error">First Name is required</span>');
    isRequeredEmpty = true;
  }

  if(!lastname.val() || lastname.val().trim() === '') {
    lastname.after('<span class="field-error">Last Name is required</span>');
    isRequeredEmpty = true;
  }

  if(!pincode.val() || pincode.val().trim() === '') {
    pincode.after('<span class="field-error">Pincode is required</span>');
    isRequeredEmpty = true;
  } else if (pincode.val().length != '6') {
    pincode.after('<span class="field-error">Invalid Pincode</span>');
    isRequeredEmpty = true;
  }

  if(!phone.val() || phone.val().trim() === '') {
    phone.after('<span class="field-error">Phone is required</span>');
    isRequeredEmpty = true;
  } else if(phone.val().length > '15' || phone.val().length < '8') {
    phone.after('<span class="field-error">Invalid Phone Number</span>');
    isRequeredEmpty = true;
  }

  if(!address_1.val() || address_1.val().trim() === '') {
    address_1.after('<span class="field-error">Address line 1 is required</span>');
    isRequeredEmpty = true;
  }

  if(!address_2.val() || address_2.val().trim() === '') {
    address_2.after('<span class="field-error">Address line 2 is required</span>');
    isRequeredEmpty = true;
  }

  if(!city.val() || city.val().trim() === '') {
    city.after('<span class="field-error">City is required</span>');
    isRequeredEmpty = true;
  }

  if(stateVal === '-1') {
    state.after('<span class="field-error">State is required</span>');
    isRequeredEmpty = true;
  }

  if(countryVal === '-1') {
    country.after('<span class="field-error">Country is required</span>');
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
  editPanel += '<div id="address-summary'+id+'" class="address-summary">';
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
  formVar += '<label for="edit-address-toggle'+id+'"><span class="edit-label">Edit Shipping Address</span><span class="new-label">Add a new Shipping Address</span></label>';
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<form id="address-form'+id+'" data-form-id="'+id+'">';

  formVar += '<div class="form-group">';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" name="firstname" placeholder="First Name" autofocus>';
  formVar += '</div>';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" name="lastname" placeholder="Last Name">';
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
  formVar += '<div class="col-xs-6">';
  formVar += '<input class="form-control" type="number" onkeypress="return isNumberKey(event)" name="pincode" placeholder="Pincode">';
  formVar += '</div>';
  formVar += '<div class="col-xs-6">';
  formVar += '<input class="form-control" type="number" onkeypress="return isNumberKey(event)" name="phone" placeholder="Phone Number">';
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" name="city" placeholder="City / District / Town">';
  formVar += '</div>';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" name="state" placeholder="State">';
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" name="address_1" placeholder="Address Line 1">';
  formVar += '</div>';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" name="address_2" placeholder="Address Line 2">';
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" name="city" placeholder="City / District / Town">';
  formVar += '</div>';
  formVar += '<div class="col-sm-6">';
  formVar += `<select class="form-control" style="height:45px" name="Country" placeholder="State">
  <option disabled value='-1'>Select Country</option>
  <option selected value="99" >India</option>
  </select>`;
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
  formVar += '<div class="col-sm-6">';
  formVar += `<select class="form-control" style="height:45px" name="state" placeholder="State">
              <option disabled value='-1'>Select State</option>
              <option selected value="1488" >Jammu And Kashmir</option>
  </select>`;
  formVar += '</div>';
  formVar += '<div class="col-sm-6">';
  formVar += `<select class="form-control" style="height:45px" name="defaultAddress" placeholder="Default Address">
  <option selected disabled value='-1'>Default Address</option>
  <option value="yes" >Yes</option>
  <option value="no" >No</option>
  </select>`;
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

function setAddressFormHtml(id,address) {
  if(!id)
    return '';
  console.log(address)
  var editPanel='';
  editPanel += '<div class="address-form-edit-panel">';
  editPanel += '<div class="address-toggle">';
  editPanel += '<div class="radio radio-primary">';
  editPanel += '<input data-id="'+address.address_id+'" class="address-toggle" id="edit-panel-address-toggle'+id+'" type="radio" name="edit-address-toggle" value="new" checked>';
  editPanel += '<label for="edit-panel-address-toggle'+id+'"> </label>';
  editPanel += '</div>';
  editPanel += '</div>';
  editPanel += '<div id="address-summary'+id+'" class="address-summary">';
  editPanel += '<p><span class="name">'+address.firstname+' '+address.lastname+'</span><span class="phone">'+address.lastname+'</span></p>';
  editPanel += '<p class="delivery-address"><span class="street-address">'+address.address_1+','+address.address_2+'</span><span class="city">'+address.custom_field[1]+'</span><span class="state">'+address.zone+'</span><span class="pincode">'+address.postcode+'</span><span class="country">'+address.country+'</span></p>';
  editPanel += '<p class="pin-error">The pincode is not servicable.</p>';
  editPanel += '</div>';
  editPanel += '<div class="address-edit"><a><span class="fa fa-edit"></span><span>Edit</span></a></div>';
  editPanel += '</div>';

  var formVar = '<div class="address-form-wrap saved clearfix">';
  formVar += editPanel;
  formVar += '<div class="address-form">';
  formVar += '<div class="col-xs-12"> ';
  formVar += '<div class="radio radio-primary">';
  formVar += '<input data-id="'+address.address_id+'" class="address-toggle" id="edit-address-toggle'+id+'" type="radio" name="address-toggle" value="new" checked>';
  formVar += '<label for="edit-address-toggle'+id+'"><span class="edit-label">Edit Shipping Address</span><span class="new-label">Add a new Shipping Address</span></label>';
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<form id="address-form'+id+'" data-form-id="'+id+'">';

  formVar += '<div class="form-group">';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" value="'+address.firstname+'" name="firstname" placeholder="First Name" autofocus>';
  formVar += '</div>';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" value="'+address.lastname+'" name="lastname" placeholder="Last Name">';
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
  formVar += '<div class="col-xs-6">';
  formVar += '<input class="form-control" value="'+address.postcode+'" type="number" onkeypress="return isNumberKey(event)" name="pincode" placeholder="Pincode">';
  formVar += '</div>';
  formVar += '<div class="col-xs-6">';
  formVar += '<input class="form-control" value="'+address.custom_field[1]+'" type="number" onkeypress="return isNumberKey(event)" name="phone" placeholder="Phone Number">';
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" value="'+address.address_1+'" name="address_1" placeholder="Address Line 1">';
  formVar += '</div>';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" value="'+address.address_2+'" name="address_2" placeholder="Address Line 2">';
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
  formVar += '<div class="col-sm-6">';
  formVar += '<input class="form-control" name="city" placeholder="City / District / Town">';
  formVar += '</div>';
  formVar += '<div class="col-sm-6">';
  formVar += `<select class="form-control" style="height:45px" name="Country" placeholder="State">
  <option disabled value='-1'>Select Country</option>
  <option selected value="99" >India</option>
  </select>`;
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
  formVar += '<div class="col-sm-6">';
  formVar += `<select class="form-control" style="height:45px" name="state" placeholder="State">
              <option disabled value='-1'>Select State</option>
              <option selected value="1488" >Jammu And Kashmir</option>
  </select>`;
  formVar += '</div>';
  formVar += '<div class="col-sm-6">';
  formVar += `<select class="form-control" style="height:45px" name="defaultAddress" placeholder="Default Address">
  <option selected disabled value='-1'>Default Address</option>
  <option value="yes" >Yes</option>
  <option value="no" >No</option>
  </select>`;
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
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


