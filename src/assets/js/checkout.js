$(document).ready(function() {
  var checkoutPage = $('.checkout-page-content');
  var step1 = checkoutPage.find('#step1');
  var step2 = checkoutPage.find('#step2');
  var step3 = checkoutPage.find('#step3');
  var step = checkoutPage.find('.step');

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
    formVar += '<input class="form-control" name="name" placeholder="Name" autofocus>';
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
    formVar += '<textarea class="form-control" name="street-address" placeholder="Address (Area and Street)"></textarea>';
    formVar += '</div>';
    formVar += '</div>';

    formVar += '<div class="form-group">';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" name="city" placeholder="City / District / Town">';
    formVar += '</div>';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" name="state" placeholder="State">';
    formVar += '</div>';
    formVar += '</div>';

    formVar += '<div class="form-group">';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" name="landmark" placeholder="Landmark (Optional)">';
    formVar += '</div>';
    formVar += '<div class="col-sm-6">';
    formVar += '<input class="form-control" name="alt-phone" placeholder="Alternate Phone (Optional)">';
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
