
$(function () {
	/* Inits */
	init1001tickets();
	initScroll();
	initBodyScroll();
	initCarousel();
	initNoindexLinks();
	initPopup();
	initRegisterForm();
	initSpeakersPopup();
	initTabs();
	initDateMask();
	initMergelead();
	initToggle();
	reinitLazyLoadXT();
    initDiscussionPopup();
    // openChatbotPopup();

	/*Functions*/
	function initDateMask(){
		$('[name="birthday"]').inputmask('99.99.9999', { placeholder: 'дд.мм.гггг' });
	}

	function initTabs(){
		if( !$('.tabs').length ) return;

		$('.tabs__link').on('click tabs.init', function(e){
			e.preventDefault();

			var $target = $( $(this).attr('href') || $(this).data('href') );

			$(this).addClass('tabs__link_active').siblings('.tabs__link').removeClass('tabs__link_active');
			$target.addClass('tabs__content_active').siblings('.tabs__content').removeClass('tabs__content_active');
		})
		.filter('.tabs__link_active').trigger('tabs.init');
	}


	function initPopup() {
		if (!$('.fancybox').length) return;

		$(document).on('fancybox.init', '.fancybox', function () {
			var
			defaults = {
				autoResize: true,
				padding: 0,
				touch : {
					vertical : false,
					momentum : false
				},
				hash : false,
				helpers: {
					media: {},
					overlay: {
						locked: false
					}
				},
				tpl: {
					closeBtn: '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
					next: '<a title="Далее" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
					prev: '<a title="Назад" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
				}
				,
				autoWidth: false,
				beforeShow: function(){
					/*if( this.href == '#register-popup' ){

						$_form = $('#register-popup').find('form');

						if( $_form.valid() ) {
							$_form.find(':submit').prop('disabled', false);
						}
					}*/
				}
			},
			$el = $(this),
			group = $el.attr('data-fancybox-group'),
			options = eval('[' + $el.data('fancybox-options') + ']')[0]
			;

			if (group) $el = $('[data-fancybox-group="' + group + '"]');

			$.extend(defaults, options);

			$el.fancybox(defaults);
		});

		$('.fancybox').trigger('fancybox.init');
	}


	function initNoindexLinks(){

		$links = $('[data-noindex-href]');

		if(!$links.length) return;

		$links.map(function(){

			$(this).attr( 'href', $(this).data('noindex-href') );

			// Тегом скрываем ссылку, чтобы у поисковика 100% не было никаких подозрений. Работу скрипта можно посмотреть в футере в ссылке на разработчика
			if( !$(this).is('a') ) {
				var attr_arr = '';
				$(this.attributes).map(function () {
					attr_arr += this.name + '="' + this.value + '" ';
				});

				$(this).replaceWith(
					function(){
						return '<a ' + attr_arr + '>' + $(this).html() + '</a>';
					});
			}
		});
	}


	// Ко всем блокам с классом owl-carousel инициализируется слайдер.
	// Параметры указываем в data-атрибуте блока. Например <div class="owl-carousel" data-owl-options="{loop:false, responsive : {0 : {items:1, margin: 0, center: true}, 767 : {items:2, margin: 25, center: true}, 992 : {items:3, margin: 50, center: false}}}">
	function initCarousel() {
		if (!$('div.owl-carousel').length) return;

		$(document).on('init', 'div.owl-carousel', function() {

			var
			$carousel = $(this),
			defaults = {
				loop: true,
				items: 1,
				dots: true,
				nav: true,
				navText: '',
				onInitialized: function(){
					$('div.owl-nav, div.owl-dots', this.$element).wrapAll('<div class="owl-controls"/>');
				}
			},
			options = {}
			;

			if ( $carousel.data('owl-options') ) {
				options = eval('[' + $carousel.data('owl-options') + ']')[0];
				$.extend(defaults, options);
			}

			$carousel.owlCarousel(defaults);
		});

		$('div.owl-carousel').trigger('init');
	}


	function initScroll() {
		if (!$('.scroll').length) return;

		$(document).on('click init.scroll', '.scroll', function(event) {
			event.preventDefault();
			$.fancybox.close();

			var
			hrefId = $(this).attr('href') || $(this).data('href'),
			posTop = $(hrefId).offset().top - $('.header').height() + 0.5
			;
			$('html, body').animate({scrollTop: posTop}, 1000);
		});
	}


	function initBodyScroll() {
		if (!$('div.header').length) return;

		$(document).on('scroll init.scroll', function(event) {
			$('body').toggleClass('page-scrolled', $(this).scrollTop() > $('div.header').height());
		})
		.trigger('init.scroll');
	}


	function initToggle() {
		if (!$('.toggle').length) return;

		$('.toggle').on('click', function(event) {
			event.preventDefault();
			var obj = $(this).attr('href') || $(this).data('href');
			$(obj).add(this).toggleClass('toggled');
			$.fancybox.update();
		});
	}


	function initSpeakersPopup() {
		if( !$('[href="#speaker-popup"]').length ) return;

		$('[href="#speaker-popup"]').on('click', function(){
			var
			$card = $(this),
			$popup = $('#speaker-popup'),
			img = $('div.speaker-card__image', $card).html() || '',
			name = $('div.speaker-card__name', $card).html() || '',
			position = $('div.speaker-card__note', $card).html() || '',
			text = $('div.speaker-card__text', $card).html() || '',
			quote = $('div.speaker-card__quote', $card).html() || '',
			video = $card.data('video') || ''
			;

			$('div.speaker-popup__photo', $popup).html(img);
			$('div.speaker-popup__content-name', $popup).html(name);
			$('div.speaker-popup__content-position', $popup).html(position);
			$('div.speaker-popup__content-text', $popup).html(text);
			$('div.speaker-popup__content-quote', $popup).html(quote).toggleClass('d-none', !quote);
			$('.speaker-popup__content-video-link', $popup).attr('href', video).toggleClass('d-none', !video);
		});
	}
    
    
	function initDiscussionPopup() {
		if( !$('[href="#speaker-popup"]').length ) return;

		$('.discussion__member[href="#speaker-popup"]').on('click', function(){
			var
			$card = $(this),
			$popup = $('#speaker-popup'),
			img = $('div.discussion__member-photo', $card).html() || '',
			name = $('div.discussion__member-name', $card).html() || '',
			position = $('div.discussion__member-note', $card).html() || '',
			text = $('div.discussion__member-text', $card).html() || ''
			//quote = $('div.speaker-card__quote', $card).html() || '',
			//video = $card.data('video') || ''
			;

			$('div.speaker-popup__photo', $popup).html(img);
			$('div.speaker-popup__content-name', $popup).html(name);
			$('div.speaker-popup__content-position', $popup).html(position);
			$('div.speaker-popup__content-text', $popup).html(text);
			//$('div.speaker-popup__content-quote', $popup).html(quote).toggleClass('d-none', !quote);
			//$('.speaker-popup__content-video-link', $popup).attr('href', video).toggleClass('d-none', !video);
		});
        
        $('.moderator').on('click', function(){
			var
			$card = $(this),
			$popup = $('#speaker-popup'),
			img = $('div.moderator__photo', $card).html() || '',
			name = $('h3.moderator__name', $card).html() || '',
			position = $('p.moderator__note', $card).html() || '',
			text = $('div.moderator__text', $card).html() || ''
			;
            
            console.log($card);

			$('div.speaker-popup__photo', $popup).html(img);
			$('div.speaker-popup__content-name', $popup).html(name);
			$('div.speaker-popup__content-position', $popup).html(position);
			$('div.speaker-popup__content-text', $popup).html(text);
			//$('div.speaker-popup__content-quote', $popup).html(quote).toggleClass('d-none', !quote);
			//$('.speaker-popup__content-video-link', $popup).attr('href', video).toggleClass('d-none', !video);
		});
	}


	function reinitLazyLoadXT() {
		if (typeof $.fn.lazyLoadXT == 'undefined') return;

		var resizeTimeout;

		$( window ).resize(function() {
			if ( !$('img.lazy-loaded').length ) return;

			resizeTimeout = setTimeout(function () {
				$(window).lazyLoadXT({
					checkDuplicates: false
				});
				clearTimeout(resizeTimeout);
			}, 300);
		});
	}


	function initRegisterForm() {
		// В процессе заполнения формы проверяем ее валидность. И если форма валидна, то разблокируем кнопку
		// Разблокировка в кнопке еще происходит в initPopup();
		// $('.register-popup__form :input').on('keyup', function(){
		// 	var $_form = $(this).closest('form');
		// 	if( $_form.valid() ) {
		// 		$_form.find(':submit').prop('disabled', false);
		// 	} else {
		// 		$_form.find(':submit').prop('disabled', true);
		// 	}
		// });



		$('.form__button[data-fancybox-href="#register-popup"]').on('click', function(e){
			e.preventDefault();

			var $_form = $(this).closest('form'), // Стандартная форма
					$_form_2 = $('form.register-popup__form-2'); // ИНН

			// Если первая форма валидна, то по нажатию на кнопку скрываем первую форму и показываем вторую
			// Здесь же убираем аттрибут disabled и ставим фокус в поле ИНН
			// После отправки второй формы $_form_2 сериализуем первую и добавляем значения ко второй
			if( $_form.valid() ) {
				$('div.register-popup__step_1').hide();
				$('div.register-popup__step_2').show();

				$('[name="INN"]').prop('disabled', false).focus();

				var action_2 = $_form_2.attr('action') + '&' + $_form.serialize();

				$_form_2.attr('action', action_2);
			}
			else {
				$.fancybox.close();
			}

		});
	}



$(function () {

    $(document).on('change init.checkbox', ':checkbox[name="personalDataAgree"]', function () {

    	console.log('12')
        var $form = $(this).closest('form');

        console.log(this.checked);

        if (this.checked) {
            $(':submit', $form).removeAttr('disabled');
        } else {
            $(':submit', $form).attr('disabled', 'disabled');
        }
    });

    $(':checkbox[name="personalDataAgree"]').trigger('init.checkbox');

});


