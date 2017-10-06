(function(_, $) {
    $(document).ready(function(){
        /* модификация jquery чтобы работал триггер show */
        $.each(['show'], function(i, ev) {
        	var el = $.fn[ev];
        	$.fn[ev] = function() {
        		var result = el.apply(this, arguments);
        		result.promise().done(function() {
        			this.trigger(ev, [result]);
        		})
        		return result;
        	};
        });
        $("div[id^='open_id_ajax'], div[id^='content_call_request_block']").each( function(i) {
	        $(this).on("show", function(e) {
				if ($(this).hasClass('ui-dialog-content')) {
					var $form = $(this).find('form');
					if ($form.html() !== undefined) {
						/* если форма найдена */
						if ($form.children('div.ty-control-group.fzcheckbox').html() !== undefined) {
							/*console.log('вставлено уже');*/
						} else {
							/* вставка объекта */
							var link = '/polzovatelskoe-soglashenie-ru';
							$('div.ty-control-group:last').after(
								$('<div>', {
									class: 'ty-control-group fzcheckbox', 
									append: $('<input>', {
										class: 'ty-form-builder__checkbox checkbox',
										type: 'checkbox',
										name: 'form_values[fz]',
										checked: false
									}).add($('<span>', {
										html: 'Я даю <a href="' + link + '">согласие</a> на обработку данных, в т.ч. отправку информационных сообщений'
									}))
								})
							);
							/* add check */
							var myCheck = function(e) {
				                if ($form.find('.fzcheckbox input').prop('checked') == false) {
				                	$form.find('.fzcheckbox span').css({'color': '#bf4d4d', 'font-weight': 'bold'});
				                	e.preventDefault();
				                	return false;
				                } else {
				                	$form.find('.fzcheckbox span').css({'color': '#000', 'font-weight': 'normal'});
				                }				                
							}
							$form.find('button[type="submit"]').bind('click', myCheck);
						}
					}
				}
			});
		});
    });
}(Tygh, Tygh.$));