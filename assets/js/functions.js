if( window.navigator.userAgent.toLowerCase().indexOf("msie ") > -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./) ) {
	//if internet Explorer
	document.body.innerHTML = document.getElementById('not-supported-html').innerHTML;
} else {
	//-------------------------------------------------------
	// Swiper only on Tablet or Mobile
	if(
		document.querySelectorAll('.swiper-on-desktop').length || 
		document.querySelectorAll('.swiper-on-tablet').length || 
		document.querySelectorAll('.swiper-on-mobile').length
	) {
		window.addEventListener('resize', function() {
			initMultiSwipers();
		});
	}
	// MULTI swiper
	initMultiSwipers();
	function initMultiSwipers() {
		window.multiSwipers = window.multiSwipers || [];
		document.querySelectorAll('.multi-swipers').length && (function(){
			document.querySelectorAll('.multi-swipers').forEach(function(e,i){
				let is_swiper_alive = window.multiSwipers[i] && ! window.multiSwipers[i].destroyed;
				if (
					( e.classList.contains('swiper-on-desktop') && window.innerWidth <= 767 ) ||
					( e.classList.contains('swiper-on-tablet') && window.innerWidth > 991 ) ||
					( e.classList.contains('swiper-on-mobile') && window.innerWidth > 767 )
				) {
					if( is_swiper_alive ) {
						window.multiSwipers[i].destroy(true, true);
					}
					return;
				}
				if( is_swiper_alive ) {
					return;
				}
				
				let itemNum			= ( e.getAttribute('data-items') != 'auto' ) ? parseInt( e.getAttribute('data-items') ) : 'auto';
				let autoplay		= e.getAttribute('data-autoplay') ? parseInt( e.getAttribute('data-autoplay'), 10 ) : false;
				let itemArrows		= e.getAttribute('data-arrows') ? true : false;
				let speed			= e.getAttribute('data-speed') ? parseInt( e.getAttribute('data-speed'), 10 ) : 600;
				let margin			= e.getAttribute('data-margin') ? parseInt( e.getAttribute('data-margin'), 10 ) : 0;
				let itemPagination	= e.getAttribute('data-pagination') ? true : false;
				let paginationType	= e.getAttribute('data-pagination-type') ? e.getAttribute('data-pagination-type') : 'bullets';
				let breakpoints_992	= e.getAttribute('data-breakpoints-992');
				let breakpoints_768	= e.getAttribute('data-breakpoints-768');
				let breakpoints_600	= e.getAttribute('data-breakpoints-600');
				let centeredSlides	= e.getAttribute('data-center-slides') ? true : false;
				let effect			= e.getAttribute('data-effect') || 'slide'; // "slide", "fade", "cube", "coverflow" or "flip"
				let startSlideFrom	= e.getAttribute('data-start') ? parseInt( e.getAttribute('data-start'), 10 ) : 0;
				let rtl 			= ( e.getAttribute('data-rtl') || document.querySelector('html').getAttribute('dir') === 'rtl' ) ? true : false;
				let loop			= e.getAttribute('data-loop') ? true : false;
				if( loop && itemNum != 'auto' && e.querySelectorAll('.swiper-slide').length <= itemNum ) {
					loop = false;
				}
				
				// breakpoints - לא כל הפרמטרים עובדים ב
				// effect / pagination / loopedSlides -> breakpoints - לא עובדים ב
				
				let breakpoints = {};
				if( breakpoints_992 ) {  //min-width: 992px
					breakpoints['992'] = JSON.parse( breakpoints_992 );
				}
				if( breakpoints_768 ) {  //min-width: 768px
					breakpoints['768'] = JSON.parse( breakpoints_768 );
				}
				if( breakpoints_600 ) {  //min-width: 600px
					breakpoints['600'] = JSON.parse( breakpoints_600 );
				}
				
				let wrap = e.closest('.swiper-wrap');
				let next = wrap && wrap.querySelectorAll('.next')
							? wrap.querySelectorAll('.next')
							: e.parentElement.querySelectorAll('.next');
				let prev = wrap && wrap.querySelectorAll('.prev')
							? wrap.querySelectorAll('.prev')
							: e.parentElement.querySelectorAll('.prev');
				let nextBtns = [];
				let prevBtns = [];
				for( let n = 0; n < next.length; n++ ) {
					nextBtns.push( next[n] );
				};
				for( let p = 0; p < prev.length; p++ ) {
					prevBtns.push( prev[p] );
				};
				let options = e.getAttribute('data-options') ? JSON.parse( e.getAttribute('data-options') ) : '';
				let swiperConfig = options || {
					autoplay				: autoplay ? {
												delay: autoplay,
												pauseOnMouseEnter: true
											} : false,
					speed					: speed,
					spaceBetween			: margin,
					rtl						: rtl,
					slidesPerView			: itemNum,
					updateOnImagesReady		: true,
					preventClicks			: true,
					centerInsufficientSlides: true,
					touchMoveStopPropagation: true,
					watchSlidesProgress		: true,
					grabCursor				: true,
					keyboard				: true,
					pagination				: itemPagination ? {
												el 			 : e.querySelector('.swiper-pagination'),
												clickable	 : true,
												renderBullet : function (i, className) {
													return '<button type="button" class="'+className+'" aria-label="לחצו כאן למעבר לשקופית '+(i+1)+'"></button>';
												},
												type : paginationType
											} : false,
					navigation				: itemArrows ? {
												nextEl : nextBtns,
												prevEl : prevBtns,
											} : false,
					a11y					: {
												prevSlideMessage: 'מעבר לשקופית הקודמת',
												nextSlideMessage: 'מעבר לשקופית הבאה',
											  },
					breakpoints				: breakpoints,
					effect 					: effect,
					loop					: loop,
					centeredSlides			: centeredSlides,
					initialSlide			: startSlideFrom
				};
				
				if( window.multiSwipers[i] ) {
					window.multiSwipers[i] = new Swiper(e,swiperConfig);
				} else {
					window.multiSwipers.push( new Swiper(e,swiperConfig) );
				}
			});
		}());
	};
	// HP categories hover
	jQuery('.category-item-btn').hover(function(){
		jQuery(this).closest('.events-and-categories-section').addClass('focus');
		stop_play_events_swiper({
			type: 'stop'
		});
	}, function(){
		jQuery(this).closest('.events-and-categories-section').removeClass('focus');
		stop_play_events_swiper({
			type: 'start'
		});
	});
	// HP categories focus
	jQuery('.category-item-btn').focus(function(){
		jQuery(this).closest('.events-and-categories-section').addClass('focus');
		stop_play_events_swiper({
			type: 'stop'
		});
	});
	// HP categories blur
	jQuery('.category-item-btn').blur(function(){
		if( ! jQuery('.category-item-btn').is(':focus') ) {
			jQuery(this).closest('.categories-wrap').removeClass('focus');
			stop_play_events_swiper({
				type: 'start'
			});
		}
	});
	function stop_play_events_swiper( obj ) {
		const swiperEl = jQuery('.events-swiper').get(0);
		if ( ! swiperEl )
			return;

		const all = document.querySelectorAll('.multi-swipers');
		const index = Array.from( all ).indexOf( swiperEl );
		if ( index === -1 )
			return;

		const swiper = window.multiSwipers[ index ];
		if ( ! swiper ) return;

		if ( obj.type == 'stop' && swiper.autoplay && swiper.autoplay.running ) {
			swiper.autoplay.pause();
		} else if ( obj.type == 'start' && swiper.autoplay ) {
			swiper.autoplay.resume();
		}
	}
	//-------------------------------------------------------
	jQuery('html').keyup( function( e ) {
		if( e.keyCode == 27 ) { //Esc
			close_mobile_menu();
			closeTopSearch();
		}
	});
	// accessible contact form 7 focus validation
	// list of contact form 7 DOM events: https://contactform7.com/dom-events/
	jQuery(".wpcf7").on("wpcf7invalid", function (event) {
		jQuery(this).find(".wpcf7-not-valid").first().focus();
	});
	// Open top search
	jQuery('.js-open-search').click(function(){
		jQuery(this).addClass('focus');
		jQuery('body').addClass('search-is-open');
		setTimeout(function(){
			jQuery('#top-search-wrap .top-search-field').focus();
		}, 100);
	});
	// Overlay click
	jQuery('.my-overlay').click(function(){
		close_mobile_menu();
		closeTopSearch();
	});
	// Close top search
	jQuery('.close-top-search').click(function(){
		closeTopSearch();
	});
	function closeTopSearch(){
		if( jQuery('body').hasClass('search-is-open') ) {
			jQuery('body').removeClass('search-is-open');
			jQuery('.js-open-search.focus').focus().removeClass('focus');
		}
	};
	// Top search - Show submit on keydown
	jQuery('.top-search-field').keyup(function(){
		if( jQuery(this).val().trim() == '' ) {
			jQuery(this).closest('.top-search-form.go').removeClass('go');
		} else {
			jQuery(this).closest('.top-search-form').addClass('go');
		}
	});
	// A11y - inner focus
	document.addEventListener('keydown', function (event) {
		const body = document.querySelector('body');
		let innerFocus = false;
		let boxWrap;
		
		// search
		if ( body.classList.contains('search-is-open') ) { 
			innerFocus = true;
			boxWrap = jQuery('#top-search-wrap');
		} else {
			if ( body.classList.contains('mobile-menu-is-open') ) { 
				innerFocus = true;
				boxWrap = jQuery('#page-header');
			}
		}
		
		if ( innerFocus ) {
			const focusableElements = boxWrap.find('button:visible, input:not(:disabled):not([type="hidden"]), a:visible, select');
			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if ( event.key === 'Tab' ) {
				if (event.shiftKey) { // Shift + Tab
					if (document.activeElement === firstElement) {
						event.preventDefault();
						lastElement.focus();
					}
				} else { // Tab
					if (document.activeElement === lastElement) {
						event.preventDefault();
						firstElement.focus();
					}
				}
			}
		}
	});
	// HP - Logo - Add the logo height to his wrapper
	jQuery('#page-header .big-logo-img').each(function(){
		let h = jQuery(this).height();
		jQuery(this).closest('.logo-link').css({
			'height': h,
			'max-height': h
		});
	});
	jQuery('.mobile-header .mobile-logo-img').each(function(){
		let w = jQuery(this).width();
		let h = jQuery(this).height();
		jQuery(this).closest('.logo-link').css({
			'width': w,
			'height': h
		});
		return false;
	});
	
	// Logo - Replace every 10 seconds
	function activateNextLogo() {
		jQuery('.logo-link').each(function(){
			let logos = jQuery('.logo-img-wrap', this);
			
			if( ! jQuery('.logo-img-wrap.active', this).length ) {
				jQuery('.logo-img-wrap', this).first().addClass('active');
			} else {
				let next = jQuery('.logo-img-wrap.active', this).next('.logo-img-wrap').length ? 
								jQuery('.logo-img-wrap.active', this).next('.logo-img-wrap') : 
								jQuery('.logo-img-wrap', this).first();
				
				jQuery('.logo-img-wrap.active', this).removeClass('active');
				next.addClass('active');
			}
			
			if( jQuery(this).closest('#page-header').length ) {
				const color = jQuery('.logo-img-wrap.active', this).attr('data-text-color');
				jQuery('#page-nav ul li.bold > a').css('color', color);
				jQuery('.btn-close-mobile-menu').css('background', color);
			}
		});
	}
	activateNextLogo();
	setInterval( activateNextLogo, 10000 );
	
	// Add labels to inputs
	add_labels_to_inputs();
	function add_labels_to_inputs(){
		if( ! document.querySelectorAll('.wpcf7-form-control:not(.wpcf7-submit):not(span):not([type="hidden"])').length ) {
			return false;
		}
		document.querySelectorAll('.wpcf7-form-control:not(.wpcf7-submit):not(span):not([type="hidden"])').forEach( function(e, i) {
			if( e.classList.contains('js-for-label') ) {
				return;
			}
			var placeholder = '';
			if( e.tagName === 'SELECT' ) {
				placeholder = e.querySelectorAll('option')[0].innerText;
			} else if( e.classList.contains('wpcf7-file') && e.parentElement.parentElement.querySelector('.file-input-val-text') ) {
				placeholder = e.parentElement.parentElement.querySelector('.file-input-val-text').getAttribute('data-default-text');
			} else {
				placeholder = e.getAttribute('placeholder');
			}
			var name = e.getAttribute('name');
			var id = name + 'Input' + i;
			e.classList.add('js-for-label');
			e.setAttribute('id', id);
			
			var label = document.createElement("label");
			label.innerHTML = placeholder;
			label.className = 'inputs-label hide-inputs-label';
			label.setAttribute('for', id);
			
			if( e.classList.contains('wpcf7-file') )
				insertAfter(e.parentElement, label);
			else
				insertAfter(e, label);
		});
		showLabels();
	}
	function insertAfter(referenceNode, newNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	};
	// Placeholder
	function showLabels() {
		if( ! document.querySelectorAll('.js-for-label').length ) {
			return false;
		}
		document.querySelectorAll('.js-for-label').forEach( function(field, i) {
			field.addEventListener("change", function(){
				checkIfVal( field );
			});
			checkIfVal( field );
		});
		document.querySelectorAll('.hide-inputs-label').forEach( function(label, i) {
			label.classList.remove('hide-inputs-label');
		});
		
		for( let i = 0; i < document.querySelectorAll('.js-for-label:not(select)').length; i++ ) {
			let input = document.querySelectorAll('.js-for-label:not(select)')[i];
			input.setAttribute('data-default-placeholder', input.placeholder);
			input.setAttribute('placeholder', '');
		};
	};
	function checkIfVal( field ) {
		if( field.tagName === 'SELECT' ) {
			if( field.value && field.value.length && field.firstElementChild.innerText != field.value ) {
				field.classList.remove('val-is-empty');
			} else {
				field.classList.add('val-is-empty');
			}
		} else {
			if( field.value && field.value.length ) {
				field.classList.remove('val-is-empty');
			} else {
				field.classList.add('val-is-empty');
			}
		}
	};
	// Wordpress - CF7 - Clear file input after submit
	document.addEventListener('wpcf7mailsent', function( event ) {
		setTimeout(showLabels, 500);
	}, false );
	//*************
	
	// Footer register - open the form
	jQuery('.js-open-footer-register-form').click(function(){
		var ariaExpanded = jQuery(this).attr('aria-expanded') === 'true';
		jQuery(this).attr('aria-expanded', ! ariaExpanded);
		
		jQuery(this).closest('.footer-register-section').addClass('show-form');
		setTimeout(function(){
			jQuery('#footer-register-form input').first().focus();
		}, 100);
	});
	// footer register form submit
	jQuery('#footer-register-form').submit(function(e){
		console.error('#footer-register-form - הודעת תודה אחרי שליחת הטופס');
		e.preventDefault();
		jQuery(this).closest('.footer-register-section').addClass('thanks-msg');
	});
	//
	jQuery('.category-item-btn').hover(function(){
		if( jQuery(window).width() > 991 )
			category_item_btn_aria_expanded( jQuery(this) );
	}, function(){
		if( jQuery(window).width() > 991 )
			category_item_btn_aria_expanded( jQuery(this) );
	});
	jQuery('.category-item-btn').focus(function(){
		if( jQuery(window).width() > 991 )
			category_item_btn_aria_expanded( jQuery(this) );
	});
	jQuery('.category-item-btn').blur(function(){
		if( jQuery(window).width() > 991 )
			category_item_btn_aria_expanded( jQuery(this) );
	});
	jQuery('.category-item-btn').click(function(e){
		if( jQuery(window).width() <= 991 && e.target.classList[0] != 'y-btn' ) {
			category_item_btn_aria_expanded( jQuery(this) );
			jQuery(this).closest('.category-item').toggleClass('active');
		}
	});
	function category_item_btn_aria_expanded( self ) {
		if( self.is(':hover') || self.is(':focus') || self.closest('.category-item').hasClass('active') )
			self.attr('aria-expanded', true);
		else
			self.attr('aria-expanded', false);
	}
	jQuery('.btn-close-mobile-menu').click(function(){
		close_mobile_menu();
	});
	function close_mobile_menu() {
		jQuery('body.mobile-menu-is-open').removeClass('mobile-menu-is-open');
		jQuery('.btn-close-mobile-menu').attr('aria-expanded', false);
		jQuery('.btn-open-mobile-menu').attr('aria-expanded', false).focus();
	}
	jQuery('.btn-open-mobile-menu').click(function(){
		jQuery('body').addClass('mobile-menu-is-open');
		jQuery(this).attr('aria-expanded', true);
		setTimeout(function(){
			jQuery('.btn-close-mobile-menu').attr('aria-expanded', true).focus();
		}, 100);
	});
	//Languages button
	jQuery('.open-lang-menu').click(function(e){
		jQuery('.mobile-floating-btns-lang-wrap .blurFunc_menu').toggleClass('active');
	});
	//Wordpress WPML
	if( jQuery('.wpml-ls-statics-footer').length ) {
		jQuery('.wpml-ls-statics-footer').appendTo('#top-languages-list');
	} else {
		jQuery('#top-languages-list').html(
			'<li><a href="/en">English</a></li>'+
			'<li><a href="/ar">العربية</a></li>'
		);
	}
	// in the museum - box hover
	jQuery('.box-item-a').hover(function(){
		box_focus( jQuery(this) );
	}, function(){
		box_blur( jQuery(this) );
	});
	jQuery('.box-item-a').focus(function(){
		box_focus( jQuery(this) );
	});
	jQuery('.box-item-a').blur(function(){
		box_blur( jQuery(this) );
	});
	jQuery('.boxes-list').each(function(){
		let counter = 1;
		jQuery('.box-item').each(function(i){
			jQuery(this).attr('data-idx', counter);
			counter++;
			if( counter === 4 ) {
				counter = 1;
			}
		});
	});
	function box_focus( a ) {
		if( jQuery(window).width() <= 767 ) 
			return false;
		
		let li = a.parent();
		let prev = li.prev('.box-item');
		let next = li.next('.box-item');
		let li_idx = parseInt(li.attr('data-idx'));
		
		li.addClass('focus');
		
		switch( li_idx ) {
			case 1:
				next.addClass('focus-small').next('.box-item').addClass('focus-small');
				break;
			case 2:
				prev.addClass('focus-small');
				next.addClass('focus-small');
				break;
			case 3:
				prev.addClass('focus-small').prev('.box-item').addClass('focus-small');
				break;
		}
	}
	function box_blur( a ) {
		if( jQuery(window).width() <= 767 ) 
			return false;
		
		jQuery('.box-item.focus, .box-item.focus-small').removeClass('focus focus-small');
	}
	// Openning Hours
	setActiveDay();
	function setActiveDay() {
		if( ! jQuery('.openning-hours-list').length ) {
			return false;
		}
		let today = new Date().getDay(); // 0=Sunday, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
		
		jQuery('.openning-hours-list tr[data-days]').each(function(){
			let days = jQuery(this).attr('data-days').split(',');
			for( let i = 0; i < days.length; i++ ) {
				if( (today+1) === parseInt(days[i]) ) {
					jQuery(this).addClass('active');
				}
			};
		});
	}
	// banner-between-rows
	bannerBetweenRows();
	function bannerBetweenRows(){
		let banner = jQuery('.banner-between-rows');
		let faq = jQuery('.banner-between-rows').closest('.sections').find('.q-ul');
		let li = faq.find('>li:first-child');
		if( ! banner.length || ! faq.length || ! li.length ) {
			return false;
		}
		li.after('<li class="banner-here"></li>');
		banner.appendTo( faq.find('>li.banner-here') );
	}
	//FAQs
	jQuery('.q-btn').click(function(){
		let btn = jQuery(this);
		let ariaExpanded = btn.attr('aria-expanded') === 'true';
		let parent = btn.parent();
		jQuery('.q-btn').not( btn ).attr('aria-expanded', 'false');
		btn.attr('aria-expanded', !ariaExpanded);
		jQuery('.q-ul > li.active').not(parent).removeClass('active').find('.q-text').slideUp();
		parent.toggleClass('active').find('.q-text').slideToggle(function(){
			Waypoint.refreshAll();
			if( window.innerWidth <= 767 ) {
				window.scrollTo({
					top: btn.offset().top,
					behavior: 'smooth'
				});
			}
		});
	});
	// On footer shows
	new Waypoint({
		element	: document.querySelector('#page-footer'),
		offset	: '100%',
		handler	: function( direction ) {
			if( direction == 'down' ) {
				document.querySelector('body').classList.add('resize-header');
			} else {
				document.querySelector('body').classList.remove('resize-header');
			}
		}
	});
	window.addEventListener("load", (event) => {
		Waypoint.refreshAll();
	});
	//Accessibility - Focus on sub menu arrow
	if( jQuery('.menu-item-has-children > a').length ) {
		jQuery('.menu-item-has-children > a').attr({
			'rel': 'nofollow',
			'aria-expanded': 'false'
		});
	}
	jQuery(document).on('click', '.menu-item-has-children > a', function(e){
		e.preventDefault();
		openSubMenu({ self: jQuery(this) });
	});
	function openSubMenu( obj ){
		var ariaExpanded = obj.self.attr('aria-expanded') === 'true';
		jQuery('li.menu-item-has-children > a').not( obj.self ).attr('aria-expanded', false).closest('li').removeClass('focus');
		obj.self.attr('aria-expanded', ! ariaExpanded).closest('li').toggleClass('focus');
	}
	// Accessibility - Close sub menu on blur
	jQuery('li.menu-item-has-children > ul > li:first-child *, li.menu-item-has-children > ul > li:last-child *').blur(function(){
		if( blurTimeout ) {
			clearTimeout( blurTimeout );
		}
		var self = jQuery(this);
		var blurTimeout = setTimeout(function(){
			if( ! self.closest('ul').find('*:focus').length ) {
				self.closest('li.focus').removeClass('focus');
			}
		}, 200);
	});
}