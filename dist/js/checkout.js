  var checkoutPage = $('.checkout-page-content');
  var step1 = checkoutPage.find('#step1');
  var step2 = checkoutPage.find('#step2');
  var step3 = checkoutPage.find('#step3');
  var step = checkoutPage.find('.step');
  var shippingAddresses = {}
  var paymentMethods = {}
  var countriesOptions = "<option disabled value='-1'>Select Country</option>"
  var statesOptions = "<option disabled value='-1'>Select State</option>"

  var customerId = ''
  var addressId = ''
  var paymentId = ''

  var availabilityFlag = true
  var codFlag = true
  var codProduct = ''
  var availabilityProduct = true

    /* Step2 Events */
  var addNewAddressBtn = step2.find('#add-new-address');
  var formsCount = step2.find('.address-forms > div').length;
  var lastFormId;
  for(var i = 1; i <= formsCount; i++) {
    var formId = step2
    .find('.address-forms > div:nth-of-type('+i+') form')
    .attr('data-form-id');
    lastFormId = parseInt(formId);
    registerAddressFormSubmit(formId);
  }

$(document).ready(function() {
    lastFormId = 1;
    $('#preloader').show();
    $('#ccavenueOpt').addClass('hidden')
    $('#ccavenueOpt').addClass('hidden')
    $('#ccavenueOpt').addClass('hidden')
    $('#ccavenueOpt').addClass('hidden')
    step1.find('.col-right form').parent().removeClass('hidden');
    $.ajax({   
       "async": true,
       "crossDomain": true,
       "url": "https://www.kashmirbox.com/index.php?route=checkout/api/getCountries",
       "method": "POST",
       "headers": {"content-type": "application/x-www-form-urlencoded"},
    }).done(function(countryData){
      console.log(countryData.countries)
      let countriesData = countryData.countries
      for(var i = 0; i < countriesData.length; i++){
        let selected = countriesData[i].country_id == '99'?'selected':''
        countriesOptions += '<option ' + selected + ' value=' + countriesData[i].country_id + '>' + countriesData[i].name + '</option>'
      }
      $.ajax({   
         "async": true,
         "crossDomain": true,
         "url": "https://www.kashmirbox.com/index.php?route=checkout/api",
         "method": "POST",
         "headers": {"content-type": "application/x-www-form-urlencoded"},
      }).done(function(userData){
        console.log(userData)
        if(userData.responseCode == '200') {
          $('#preloader').hide()
          $('#order-summary .order-summary-list .item-value').text(userData.session.total)
          if (userData.logged != null) {
            if(userData.redirect.split('=')[1] == 'checkout/cart') {
              window.location = data.redirect
            } else {
              $('#logout-link').data('cid',userData.logged)
              customer_id = userData.logged;
              $('#logged-out').addClass('hidden')
              $('#logged-in').removeClass('hidden')
              $('#logged-in .login-name').text(userData.session.firstname + " " + userData.session.lastname)
              $('#logged-in .login-email').text(userData.session.email)
              $('#step1 .details .name').text(userData.firstname + " " + userData.lastname)
              $('#step1 .details .email').text(userData.session.email)
              $('#login-email').val('')
              $('#login-password').val('')
              paymentMethods = userData.session.payment_methods
              for (var method in userData.session.payment_methods) {
                if (method == 'ccavenue') {
                  $('#ccavenueOpt').removeClass('hidden')
                }
                if (method == 'cod') {
                  $('#codOpt').removeClass('hidden')
                }
                if (method == 'mobikwik') {
                  $('#mobikwikOpt').removeClass('hidden')
                }
                if (method == 'payu') {
                  $('#payuOpt').removeClass('hidden')
                }
              }
              for (let i=0; i<userData.session.cartDetails.length; i++){
                if (userData.session.cartDetails[i].cod === 0) {
                  codFlag = false
                  codProduct = userData.session.cartDetails[i].name
                  break;
                }
              }
              for (let i=0; i<userData.session.cartDetails.length; i++){
                if (userData.session.cartDetails[i].availability_location === 1) {
                  availabilityFlag = false
                  availabilityProduct = userData.session.cartDetails[i].name
                  break;
                }
              }
              if(userData.session.shipping_address !== false)
              {
                $('#add-new-address').removeClass('hidden')
                shippingAddresses = userData.session.shipping_address
                for (var address in userData.session.shipping_address) {
                  shippingAddresses.push(userData.session.shipping_address[address]);
                  var formHtml = setAddressFormHtml(lastFormId, userData.session.shipping_address[address]);
                  step2.find('.address-forms').append(formHtml);
                  registerAddressFormSubmit(lastFormId);
                  console.log(lastFormId)
                   $('#countries_'+lastFormId).val(userData.session.shipping_address[address].country_id)
                   $('#countries_'+lastFormId).data('stateId',userData.session.shipping_address[address].zone_id)
                   $('#countries_'+lastFormId).trigger("change");
                  lastFormId++
                }
                $('#edit-panel-address-toggle1').prop('checked', true);

              } else {
                var formHtml = getAddressFormHtml(lastFormId)
                step2.find('.address-forms').append(formHtml);
                registerAddressFormSubmit(lastFormId);
                $.ajax({   
                   "async": true,
                   "crossDomain": true,
                   "url": "https://www.kashmirbox.com/index.php?route=account/account/country&country_id=99",
                   "method": "GET",
                   "headers": {"content-type": "application/x-www-form-urlencoded"},
                }).done(function(stateData){
                  console.log(stateData)
                  $('#preloader').hide();
                  let zoneData = stateData.zone
                  for(var i = 0; i < zoneData.length; i++){
                    let selected = zoneData[i].zone_id == '1488'?'selected':''
                    statesOptions += '<option ' + selected + ' value=' + zoneData[i].zone_id + '>' + zoneData[i].name + '</option>'
                  }
                  $('#countries_'+lastFormId).val('99')
                  $('#countries_'+lastFormId).data('stateId','1488')
                  $('#states_'+lastFormId).html(statesOptions)
                  lastFormId++
                })
              }
            }
          } else {
            $.ajax({   
               "async": true,
               "crossDomain": true,
               "url": "https://www.kashmirbox.com/index.php?route=account/account/country&country_id=99",
               "method": "GET",
               "headers": {"content-type": "application/x-www-form-urlencoded"},
            }).done(function(stateData){
              console.log(stateData)
              $('#preloader').hide();
              let countriesData = countryData.countries
              for(var i = 0; i < countriesData.length; i++){
                let selected = countriesData[i].country_id == '99'?'selected':''
                countriesOptions += '<option ' + selected + ' value=' + countriesData[i].country_id + '>' + countriesData[i].name + '</option>'
              }
              let zoneData = stateData.zone
              for(var i = 0; i < zoneData.length; i++){
                let selected = zoneData[i].zone_id == '1488'?'selected':''
                statesOptions += '<option ' + selected + ' value=' + zoneData[i].zone_id + '>' + zoneData[i].name + '</option>'
              }
            })
          }
        } else {
          swal({
            title: 'OOPS!',
            type: 'warning',
            text: 'Something wrong happened!'
          })
        }
      });
    }); 
});


  function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }


  window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Sure?';
    }

    // For Safari
    return 'Sure?';
  };

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
    $('#preloader').show()
  	$.ajax({   
         "async": true,
         "crossDomain": true,
         "url": "https://www.kashmirbox.com/index.php?route=checkout/api/logout",
         "method": "POST",
         "headers": {"content-type": "application/x-www-form-urlencoded"},
         "data": {
          customer_id: $(this).data('cid')
         }
      }).done(function(data){
        console.log(data)
        $('#preloader').show()
        swal({
          title: 'Success',
          type: 'success',
          text: data.success
        }).then(function(){
          if(data.success){
            window.onbeforeunload = true;
            window.location.reload(true)
          }
        })
      })
  })

  $('#forgotPassword').on('click',function () {
    $('.field-error').remove();
    let email = $('#login-email')
    let isReq = true
    if(!email.val() || email.val().trim() === '') {
      email.after('<span class="field-error">Email Address is required</span>');
      isReq = false;
    } else if(!validateEmail(email.val())) {
      email
      .after('<span class="field-error">Email Addresss is invalid.</span>');
      isReq = false;
    }


    if(isReq)
    {
      $.ajax({   
         "async": true,
         "crossDomain": true,
         "url": "https://www.kashmirbox.com/index.php?route=checkout/api/forgot",
         "method": "POST",
         "headers": {"content-type": "application/x-www-form-urlencoded"},
         "data": {
          email: email.val()
         }
      }).done(function(data){
        $('#login-password').removeClass('hidden')
        $('#loginBtn').removeClass('hidden')
        $('#forgotPassword').addClass('hidden')
        $('#forgotPasswordLink').data('value','forgot')
        $('#forgotPasswordLink').text('forgot password')
        swal({
          title: 'Success',
          type: 'success',
          text: data.success.split(':')[1].trim()
        })
      })
    }
  })

  $('#forgotPasswordLink').on('click',function () {
    if($(this).data('value') == 'forgot') {
      $('#login-password').addClass('hidden')
      $('#loginBtn').addClass('hidden')
      $('#forgotPassword').removeClass('hidden')
      $(this).data('value','cancel')
      $(this).text('cancel')
    } else {
      $('#login-password').removeClass('hidden')
      $('#loginBtn').removeClass('hidden')
      $('#forgotPassword').addClass('hidden')
      $(this).data('value','forgot')
      $(this).text('forgot password')
    }
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
        $('#logout-link').data('cid',data.customer_id)
        customerId = data.customer_id
        $('#login-password').val('')
        $('#logged-out').addClass('hidden')
        $('#logged-in').removeClass('hidden')
        $('#logged-in .login-name').text(data.firstname + " " + data.lastname)
        $('#logged-in .login-email').text(email)
        paymentMethods = data.payment_methods
        for (var method in data.payment_methods) {
          if (method == 'ccavenue') {
            $('#ccavenueOpt').removeClass('hidden')
          }
          if (method == 'cod') {
            $('#codOpt').removeClass('hidden')
          }
          if (method == 'mobikwik') {
            $('#mobikwikOpt').removeClass('hidden')
          }
          if (method == 'payu') {
            $('#payuOpt').removeClass('hidden')
          }
        }
        for (let i=0; i<data.cartDetails.length; i++){
          if (data.cartDetails[i].cod === 0) {
            codFlag = false
            codProduct = data.cartDetails[i].name
            break;
          }
        }
        for (let i=0; i<data.cartDetails.length; i++){
          if (data.cartDetails[i].availability_location === 1) {
            availabilityFlag = false
            availabilityProduct = data.cartDetails[i].name
            break;
          }
        }
        if(data.shipping_address !== false)
        {
          shippingAddresses = data.shipping_address
          $('#add-new-address').removeClass('hidden')
          for (var address in data.shipping_address) {
            shippingAddresses.push(data.shipping_address[address]);
            var formHtml = setAddressFormHtml(lastFormId, data.shipping_address[address]);
            step2.find('.address-forms').append(formHtml);
            registerAddressFormSubmit(lastFormId);
            $('#countries_'+lastFormId).val(data.shipping_address[address].country_id)
            $('#countries_'+lastFormId).data('stateId',data.shipping_address[address].zone_id)
            $('#countries_'+lastFormId).trigger("change");
            lastFormId++
          }
        } else {
          var formHtml = getAddressFormHtml(lastFormId)
          step2.find('.address-forms').append(formHtml);
          registerAddressFormSubmit(lastFormId);
          $.ajax({   
             "async": true,
             "crossDomain": true,
             "url": "https://www.kashmirbox.com/index.php?route=account/account/country&country_id=99",
             "method": "GET",
             "headers": {"content-type": "application/x-www-form-urlencoded"},
          }).done(function(stateData){
            console.log(stateData)
            $('#preloader').hide();
            let zoneData = stateData.zone
            for(var i = 0; i < zoneData.length; i++){
              let selected = zoneData[i].zone_id == '1488'?'selected':''
              statesOptions += '<option ' + selected + ' value=' + zoneData[i].zone_id + '>' + zoneData[i].name + '</option>'
            }
            $('#countries_'+lastFormId).val('99')
            $('#countries_'+lastFormId).data('stateId','1488')
            $('#states_'+lastFormId).html(statesOptions)
            lastFormId++
          })
        }
      
      // alert(cartData[cartData.length-1].text.trim())
        if(data.redirect) {
          swal({
            title: 'Sorry!',
            text: 'Your cart is empty',
            type: 'warning'
          })
          window.location = data.redirect
        } 
        let listItems = `<li class="item total"><span class="item-title">Total</span><span class="item-value">${data.total}</span></li>`
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


  $(document).on('change', '.countries', function() {
    let countryId = $(this).val()
    let stateId =  $(this).data('stateId')
    let formId = $(this).attr('id').split('_')[1]
    $.ajax({   
       "async": false,
       "crossDomain": true,
       "url": "https://www.kashmirbox.com/index.php?route=account/account/country&country_id=" + countryId,
       "method": "GET",
       "headers": {"content-type": "application/x-www-form-urlencoded"},
    }).done(function(stateData){
      console.log(stateData)
      let zoneData = stateData.zone
      let statesOptionss = "<option " + stateId == '-1' ? 'selected' : '' + " disabled value='-1'>Select State</option>"
      for(var i = 0; i < zoneData.length; i++){
        let selected = zoneData[i].zone_id == stateId?'selected':''
        statesOptionss += '<option ' + selected + ' value=' + zoneData[i].zone_id + '>' + zoneData[i].name + '</option>'
      }
      console.log('#states_'+formId)
      $('#states_'+formId).html(statesOptionss)
    })
  })

  $(document).on('submit', '#checkout-register-form', function(){
    //register new user
    if(!validateCheckoutRegisterForm($(this))) {
      return false;
    }

    $('#preloader').show();
    let firstname = $('#register-firstname').val()
    let lastname = $('#register-lastname').val()
    let email = $('#register-email').val()
    let password = $('#register-password').val()

    swal({
     title: 'Dear <b>'+firstname+' '+lastname+'</b>',
     html: 'Are your sure you want to continue with <b>' + email + '</b>?',
     type: 'question',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Continue'
   }).then(function () {
    $.ajax({   
      "async": true,
      "crossDomain": true,
      "url": "https://www.kashmirbox.com/index.php?route=checkout%2Fapi%2Fregister",
      "method": "POST",
      "headers": {"content-type": "application/x-www-form-urlencoded"},
      "data": {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "password": password
      }
    }).done(function(data){
      $('#preloader').hide();
      console.log(data)
      if (data.hasOwnProperty('success')) {
        $('#register-firstname').val('')
        $('#register-lastname').val('')
        $('#register-email').val('')
        $('#register-password').val('')
        $('#step1 .details .name').text(firstname + " " + lastname)
        $('#step1 .details .email').text(email)
        $('#logout-link').data('cid',data.customer_id)
        $('#logged-out').addClass('hidden')
        $('#logged-in').removeClass('hidden')
        $('#logged-in .login-name').text(firstname + " " + lastname)
        $('#logged-in .login-email').text(email)
        var formHtml = getAddressFormHtml(lastFormId)
        step2.find('.address-forms').append(formHtml);
        registerAddressFormSubmit(lastFormId);
        lastFormId++
        swal({
          title: "WELCOME",
          text: data.success,
          type: "success"
        })
        moveToNextStep(1, 2);
      } else {
        swal({
          title: "OOPS!",
          text: data.error.warning.split(':')[1].trim(),
          type: "error"
        })
      }
      console.log(data)                       
    }); 
    })
    //step1 is complete
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

      address_id = $('.address-toggle :checked').data('id')
      formId = $('.address-toggle :checked').val()
      if ($('#countries_'+formId).val() !== '99' && !availabilityFlag) {
        swal({
          title: 'Sorry!',
          type: 'info',
          text: "We don't ship " + availabilityProduct + " internatioanally."
        })
        return
      }

      if ($('#pinError_'+formId).data('validation') == '2') {
        swal({
          title: 'Sorry!',
          type: 'info',
          text: "We don't ship to this address."
        })
        return
      }

      $('#userAddress .street-address').text($('#address-summary'+formId+' .street-address').text())
      $('#userAddress .city').text($('#address-summary'+formId+' .city').text())
      $('#userAddress .state').text($('#address-summary'+formId+' .state').text())
      $('#userAddress .pincode').text($('#address-summary'+formId+' .pincode').text())

      if ($('#pinError_'+formId).data('validation') == '0' || !codFlag) {
        $('#cod-payment-option').prop('disabled',true)
        if (codFlag) {
          $('codError').text('Cod is not available on selected address.')
        } else {
          $('codError').text('Cod is not available on ' + codProduct + ' product.')
        }
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
      $('#preloader').show()
      wrapper.removeClass('new');
      wrapper.removeClass('editing');
      wrapper.addClass('saved');
      var firstname = $(this).find('input[name="firstname"]').val() 
      var lastname = $(this).find('input[name="lastname"]').val()
      var postcode = $(this).find('input[name="pincode"]').val()
      var phone = $(this).find('input[name="phone"]').val()
      var city = $(this).find('input[name="city"]').val()
      var address_1 = $(this).find('input[name="address_1"]').val()
      var address_2 = $(this).find('input[name="address_2"]').val()
      var state_id = $('#states_'+id).val()
      var country_id = $('#countries_'+id).val()
      var country = $(this).find('select[name="country"] :selected').text()
      var state = $(this).find('select[name="state"] :selected').text()
      var postData = {
        firstname: firstname,
        lastname: lastname,
        postcode: postcode,
        custom_field: {'1':phone},
        city: city,
        address_1: address_1,
        address_2: address_2,
        zone_id: state_id,
        country_id: country_id
      }
      let successMsg = 'You have added an address successfully.'
      let url = 'https://www.kashmirbox.com/index.php?route=checkout/api/editShippingAddress'
      console.log(postData)
      if(!isNewAddress) {
        postData.address_id = wrapper.find("#edit-panel-address-toggle"+id).data('id')
        successMsg = 'You have updated an address successfully.'
        url = 'https://www.kashmirbox.com/index.php?route=checkout/api/addShippingAddress'
      }
      $.ajax({   
        "async": true,
        "crossDomain": true,
        "url": 'https://www.kashmirbox.com/index.php?route=checkout/api/saveShippingAddress',
        "method": "POST",
        "headers": {"content-type": "application/x-www-form-urlencoded"},
        "data": postData
      }).done(function(data){
        console.log(data)
        if(data.hasOwnProperty('success'))
        {
          $.ajax({   
             "async": true,
             "crossDomain": true,
             "url": "https://www.kashmirbox.com/index.php?route=checkout/api",
             "method": "POST",
             "headers": {"content-type": "application/x-www-form-urlencoded"},
          }).done(function(userData){
            console.log(userData)
            $('#preloader').hide();
            if(userData.responseCode == '200') {
                if(userData.redirect.split('=')[1] == 'checkout/cart') {
                  window.location = data.redirect
                } else {
                  for (let i=0; i<userData.session.cartDetails.length; i++){
                    if (userData.session.cartDetails[i].cod === 0) {
                      codFlag = false
                      codProduct = userData.session.cartDetails[i].name
                      break;
                    }
                  }
                  for (let i=0; i<userData.session.cartDetails.length; i++){
                    if (userData.session.cartDetails[i].availability_location === 1) {
                      availabilityFlag = false
                      availabilityProduct = userData.session.cartDetails[i].name
                      break;
                    }
                  }
                  if(userData.session.shipping_address !== false)
                  {
                    formId = 1
                    step2.find('.address-forms').html('')
                    $('#add-new-address').removeClass('hidden')
                    for (var address in userData.session.shipping_address) {
                      shippingAddresses.push(userData.session.shipping_address[address]);
                      var formHtml = setAddressFormHtml(lastFormId, userData.session.shipping_address[address]);
                      step2.find('.address-forms').append(formHtml);
                      registerAddressFormSubmit(lastFormId);
                       $('#countries_'+lastFormId).val(userData.session.shipping_address[address].country_id)
                       $('#countries_'+lastFormId).data('stateId',userData.session.shipping_address[address].zone_id)
                       $('#countries_'+lastFormId).trigger("change");
                      lastFormId++
                    }
                    $('#edit-panel-address-toggle1').prop('checked', true);
                    swal({
                      title: 'Success',
                      type: 'warning',
                      text: successMsg
                    })
                  }
                }
            } else {
              swal({
                title: 'OOPS!',
                type: 'warning',
                text: 'Something wrong happened!'
              })
            }
          });
        } else {
          swal({
            title: 'OOPS!',
            text: data.warning,
            type: 'error'
          })
        }
      })
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
   var firstname = form.find('input[name="firstname"]');
   var lastname = form.find('input[name="lastname"]');
   var email = form.find('input[name="email"]');
   var password = form.find('input[name="password"]');

   if(!firstname.val() || firstname.val().trim() === '') {
     firstname.after('<span class="field-error">First Name is required</span>');
     isRequeredEmpty = true;
   }

   if(!lastname.val() || lastname.val().trim() === '') {
     lastname.after('<span class="field-error">First Name is required</span>');
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



$(document).on('change', '.paymentGateway', function (){
  paymentId = $(this).val();
})

$(document).on('click', '#proceedToPaymentGateway', function (){
  console.log('====================== IDS ========================')
  console.log(paymentId)
  console.log(addressId) 
  if(paymentId && addressId) {
    let paymentMethod = paymentMethods[paymentId]
    let shippingAddress = shippingAddresses[addressId]
    let postData = {
      payment_method: paymentMethod,
      shipping_address: shippingAddress
    }
    console.log('====================== CONFIRM POST DATA ========================')
    console.log(postData)
     $.ajax({   
       "async": true,
       "crossDomain": true,
       "url": "https://www.kashmirbox.com/index.php?route=checkout/confirm",
       "method": "POST",
       "headers": {"content-type": "application/x-www-form-urlencoded"},
       "data": postData
    }).done(function(data){
      console.log(data)
      if(data.redirect) {
        window.location = data.redirect
      } else {
        $('#confirmModal .modal-body').html(data.payment)
        $('#confirmModal').modal('show');
      }
    })
  }
})


function getAddressFormHtml(id) {
  if(!id)
    return '';

  var editPanel='';
  editPanel += '<div class="address-form-edit-panel">';
  editPanel += '<div class="address-toggle">';
  editPanel += '<div class="radio radio-primary">';
  editPanel += '<input class="address-toggle" id="edit-panel-address-toggle'+id+'" type="radio" name="edit-address-toggle" value="'+id+'" checked>';
  editPanel += '<label for="edit-panel-address-toggle'+id+'"> </label>';
  editPanel += '</div>';
  editPanel += '</div>';
  editPanel += '<div id="address-summary'+id+'" class="address-summary">';
  editPanel += '<p><span class="name"></span><span class="phone"></span></p>';
  editPanel += '<p class="delivery-address"><span class="street-address"></span><span class="city"></span><span class="state"></span><span class="pincode"></span><span class="country"></span></p>';
  editPanel += '<p "pinError_'+id+'" class="pin-error">The pincode is not servicable.</p>';
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
  formVar += `<select id='countries_${id}' data-statesId='-1' class="form-control countries" style="height:45px" name="country" placeholder="Country">
              ${countriesOptions}
  </select>`;
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
  formVar += '<div class="col-sm-6">';
  formVar += `<select id='states_${id}' class="form-control states" style="height:45px" name="state" placeholder="State">
              ${statesOptions}
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
  editPanel += '<input data-id="'+address.address_id+'" class="address-toggle" id="edit-panel-address-toggle'+id+'" type="radio" name="edit-address-toggle" value="'+id+'" checked>';
  editPanel += '<label for="edit-panel-address-toggle'+id+'"> </label>';
  editPanel += '</div>';
  editPanel += '</div>';
  editPanel += '<div id="address-summary'+id+'" class="address-summary">';
  editPanel += '<p><span class="name">'+address.firstname+' '+address.lastname+'</span><span class="phone">'+address.custom_field[1]+'</span></p>';
  editPanel += '<p class="delivery-address"><span class="street-address">'+address.address_1+','+address.address_2+'</span><span class="city">'+address.city+'</span><span class="state">'+address.zone+'</span><span class="pincode">'+address.postcode+'</span><span class="country">'+address.country+'</span></p>';
  var pinError = ''
  var pinValidation = 0
  if (address.pin_check.length == 0) {
    pinError = 'Service is not Available at this location yet'
    pinValidation = 2
  } else {
    pinError = address.pin_check.service_available == '0' ? 'Only Prepaid Service is Available At This Location' : 'COD and Prepaid Service is Available At This Location'
    pinValidation = address.pin_check.service_available
  }
 
  editPanel += '<p id="pinError_'+id+'" data-validation='+pinValidation+' class="pin-error">' + pinError + '</p>';
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
  formVar += '<input class="form-control" value="'+address.city+'" name="city" placeholder="City / District / Town">';
  formVar += '</div>';
  formVar += '<div class="col-sm-6">';
  formVar += `<select id='countries_${id}' data-statesId='-1' class="form-control countries" style="height:45px" name="country" placeholder="Country">
              ${countriesOptions}
  </select>`;
  formVar += '</div>';
  formVar += '</div>';

  formVar += '<div class="form-group clearfix">';
  formVar += '<div class="col-sm-6">';
  formVar += `<select id='states_${id}' class="form-control states" style="height:45px" name="state" placeholder="State">
              ${statesOptions}
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


