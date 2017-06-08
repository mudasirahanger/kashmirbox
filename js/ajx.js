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

})();