(function(){
	
	// initialisation des variables
	var $elem;
	var $item;
	var $type;
	var $value;
	var $error;
	var $button;
	
	// initialisation de l'objet
	$.shinycheck = function(){};

	$.fn.shinycheck = function(options){
		
		$settings = $.extend({},$.shinycheck.settings,options);
		
		
		return this.each(function(){
			
			$button = $('input:submit',$(this));
			$button.click(function(){
			
				$elem = $(this).parents('form');
				$elem.removeClass('error');
				
				$('*:required',$elem).each(function(){
					check($(this));
				});
				
				submit();
			
				return false;
			});
			
		});
		
	}
	
	// check les éléments
		
	function check(item){
		
		$item = item;
		$item.removeClass('error');
		
		$error = '';
		
		$type = $item.attr('type');
		$value = $item.val();
		
		switch($type){
				
			case 'email':
				if($value == ''){
					$error = 'Veuillez saisir une adresse e-mail';
				}else if($value != '' && !$value.match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)){
					$error = 'E-mail invalide';
				}
			break;
			
			case 'file':
				if($value == ''){
					$error = 'Veuillez choisir un fichier';
				}else if($value != ''){
					var file_extension = $value.split('.').pop();
					var accepted = $item.attr('data-extension');
					accepted = accepted.split(',');
					var length = accepted.length;
					
					error_extension = 'false';
					for(var i=0; i<length; i++){
						if(file_extension == accepted[i]){
							error_extension = 'true';
						}
					}
					
					if(error_extension == 'false'){
						$error = 'Fichier au mauvais format';	
					}
				}
			break;
			
			default:
			case 'text':
				if($value == ''){
					$error = 'Veuillez saisir ce champ';
				}	
			break;
			
		}
		
		show();
		
	}
	
	
	
	// affiche la box error
	
	function show(){
		$item.next('.error_message').remove();
		if($error != ''){
			if(!$elem.hasClass('error')){
				$elem.addClass('error');
			}
			$item.after('<span class="error_message">' + $error + '</span>');
		}
	
	}
	
	
	
	
	function submit(){
		if(!$elem.hasClass('error')){
			$elem.submit();
		}
	}


})(jQuery);