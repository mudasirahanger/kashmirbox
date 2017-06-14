(function(){
	$('#ajx_val').hide();
	$('#srch').on('keyup',function(){

		var x= $(this).val();
    if(x==''){
      $('#ajx_val').hide();
    }
		//console.log(x);
    else{
		    $.ajax({
		    type:'POST',
		    url:'tmp.php',
		    data: 'srch='+x,
		    success:function(html){
		    	$('#ajx_val').show();
		        $('#ajx_val').html(html);
		         //alert(html);
		    }
		}); 
     }
	});
  $('[data-toggle="slide-collapse"]').on('click', function() {
    $navMenuCont = $($(this).data('target'));
    $navMenuCont.animate({'width':'toggle'}, 300).css('background-color','#fff');

    $('.fa-mob-close').toggle(300);
          
});
   $('.fa-mob-close').on('click',function(){
    //console.log('working');
     $('[data-toggle="slide-collapse"]').trigger('click');
  });
})();