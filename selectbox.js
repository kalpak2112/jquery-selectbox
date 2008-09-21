(function($) {
	$.selectbox = function() {
	  var elem         = $(this).hide().change(onchange_select),
		    selectbox    = elem.wrap('<div class="selectbox" />').parent('.selectbox'),
				list_visible = false;

		// Wrap select tag and provide a default option
		selectbox.append(
			$.selectbox.options.current_html.replace('%default_content%', $.selectbox.options.default_content));

		var dropdown = selectbox.append('<ol />').children('ol');
	  $(this).find('option').each(function() {
	     var option = $(this);
	     dropdown.append($('<li>' +
	                       '  <div class="title">' + option.text() + '</div>' +
	                       '</li>').data('boxvalue', option.val()));
		});

		selectbox.find('.current').click(function(event) {
			if (list_visible) {
				dropdown.hide();
				list_visible = false;
			} else {
				list_visible = true;
				dropdown.show();
				selectbox.siblings('.selectbox').find('ol:visible').hide();
				selectbox.find('li').one('click', function() {
					elem.val($(this).data('boxvalue')).change();
				});
			}
		});

		return;

		function onchange_select() {
			var title = $(this).val() || $.selectbox.options.default_content;
			selectbox.children('ol').hide();
			selectbox.find('.current .title').text(title);
		}
	};

	$.extend($.selectbox, {
		options: {
			default_content: 'Choose an option',
			current_html:    '<div class="current">' +
											 '  <img src="bg_select.gif" class="down-arrow" />' +
											 '  <div class="title">%default_content%</div>' +
											 '</div>'
		}
	});

	$.fn.selectbox = function() {
	  this.each($.selectbox);
		return this;
	};
})(jQuery);