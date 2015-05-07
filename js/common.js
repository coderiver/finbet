head.ready(function() {

	// scroll-pane
	$('.scroll-pane').jScrollPane();
	$( window ).resize(function() {
		var settings = {
				autoReinitialise: true
			};
			var pane = $('.scroll-pane')
			pane.jScrollPane(settings);
			var contentPane = pane.data('jsp').getContentPane();
	});

	// duration-item
	$('.js-duration-item').on('click', function(){
		$('.js-duration-item').removeClass('is-active');
		$(this).addClass('is-active');
	});

	$('.js-option').each(function () {
		var thisOption = $(this),
			dataTime = $(this).data('seconds'),
			dataMin = $(this).data('munute'),
			timeSek = dataTime*1000,
			timeMS = (60000*dataMin)+timeSek,
			optionDial = thisOption.find('.js-dial'),
			optionTime = thisOption.find('.js-time'),
			timeId = optionTime.attr('id');
		// dial
		if (optionDial.hasClass('is-yellow')) {
			var fgColor = "#ffb400";
		}
		else {
			var fgColor = "#fff";
		}
		optionDial.knob();
		optionDial.trigger(
			'configure',
			{
				"width": 14,
				"height": 14,
				"min": 0,
				"max": 100,
				"fgColor": fgColor,
				"skin": "tron",
				"bgColor": "#000",
				"readOnly": true,
				"cursor": false
			}
		);
		$({animatedVal: 0}).animate({animatedVal: 100}, {
			duration: timeMS,
			easing: "swing",
			step: function() {
				optionDial.val(Math.ceil(this.animatedVal)).trigger("change");
			}
		});
		setTimeout(function() {
			optionDial.parents('.timer__ico').addClass('is-opacity');
		}, timeMS);
		// time
		$('#' + timeId).countDown({
			targetOffset: {
				'day': 0,
				'month': 0,
				'year': 0,
				'hour': 0,
				'min': dataMin,
				'sec': dataTime
			},
			animation: false
		});
	});

});
