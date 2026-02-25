(function($) {
	'use strict';

	var headerIsFixed = false;
	var lastHash = null;
	var scrollTop = 0;	
	var touchX = 0;
	var target = null;
	var delta = 0;
	
	/**
	 * Makes the navigation transparent when on desktop and scroll position is all the way at the top.
	 */
	function updateHeaderBackground() {
		if ($(this).scrollTop() > 0 || headerIsFixed) {
			$('header').addClass('fixed');
		} else {
			$('header').removeClass('fixed');
		}
	}

	/**
	 * Updates the page after a hash change.
	 */
	function updateHash(hash, immediate) {
		if (lastHash == hash) {
			return;
		}

		lastHash = hash;

		if (hash.length <= 0) {
			closeSubpage();
		}

		var target = $(hash);
		if (target.length <= 0) {
			return;
		}
		
		$('.collapse').removeClass('in');
		setTimeout(function(){
			if($('.collapse').hasClass('in')){
				return;
			}
			$('.collapse').addClass('hidden-sm');
		}, 600);

		if (target.hasClass('subpage')) {
			
			var inDirection = null;
			var outDirection = null;

			if($('.subpage.in a[href="' + hash + '"]').length > 0){
				inDirection = 'right';
				outDirection = 'left';
				
				$.each($('.subpage.in .active').closest('li').prevAll(), function(i, el){
					if($(el).children('a[href="' + hash + '"]').length > 0){
						inDirection = 'left';
						outDirection = 'right';
						return false;
					}
				});
			}
			
			closeSubpage(outDirection);
			openSubpage(target, inDirection);
			if (history.pushState) {
				window.history.pushState(null, document.title, location.pathname + hash);
			}
			return;
		}
		
		if(target.hasClass('tab')){
			if(!target.closest('.subpage').hasClass('in')){
				openSubpage(target.closest('.subpage'));
			}
			target.closest('.tab-container').children('.tab').removeClass('in');
			target.addClass('in');
			if (history.pushState) {
				window.history.pushState(null, document.title, location.pathname + hash);
			}
			return;
		}

		closeSubpage();

		$('body, html').stop(true, false).animate({
			scrollTop : $(hash).offset().top - $('.header').outerHeight()
		}, immediate ? 0 : 800, function(){
			if (history.pushState) {
				window.history.pushState(null, document.title, location.pathname + hash)
			}
		});

		if ($(this).closest('#sidefyn-navbar').length == 1) {
			$('#sidefyn-navbar').removeClass('in');
			setTimeout(function(){
				if($('#sidefyn-navbar').hasClass('in')){
					return;
				}
				$('#sidefyn-navbar').addClass('hidden-sm');
			}, 600);
		}
	}

	function openSubpage(target, direction) {
		scrollTop = $(window).scrollTop();
		
		target.removeClass('right').removeClass('left');
		
		if(direction != null){
			target.addClass(direction);
		}
		
		target.addClass('in').show();
		$('body').addClass('subpage-container');
		headerIsFixed = true;
		updateHeaderBackground();
		
		var ratio = $('.subpage.in .content').prevAll().length / $('.subpage.in .content').nextAll().length;
		
		if(ratio > 0){
			$('.subpage.in .content').nextAll().css('flex-grow', ratio);
		}
	}

	function closeSubpage(direction) {
		var subpage = $('.subpage.in'); 
		if (subpage.length <= 0) {
			return;
		}
		
		headerIsFixed = false;
		updateHeaderBackground();
		if (history.pushState) {
			history.pushState('', document.title, window.location.pathname);
		}

		subpage.removeClass('right').removeClass('left');
		
		if(direction != null){
			$('.subpage.in').addClass(direction);
		}
		
		subpage.removeClass('in');
		$('body').removeClass('subpage-container');
		$(window).scrollTop(scrollTop);
		setTimeout(function(){
			if(subpage.hasClass('in')){
				return;
			}
			subpage.hide();
		}, 600);
	}

	function nextSubpage() {
		var hash = '#' + $('.subpage.in').attr('data-next');
		var page = $(hash);
		if (page.length > 0) {
			closeSubpage('left');
			openSubpage(page, 'right');
			if (history.pushState) {
				window.history.pushState(null, document.title, location.pathname + hash)
			}
		}
	}

	function previousSubpage() {
		var hash = '#' + $('.subpage.in').attr('data-prev');
		var page = $(hash);
		if (page.length > 0) {
			closeSubpage('right');
			openSubpage(page, 'left');
			if (history.pushState) {
				window.history.pushState(null, document.title, location.pathname + hash)
			}
		}
	}
	
	/**
	 * Chooses 3 random references to display. Different after every page reload. 
	 */
	function initReferences(){
		var used = [];
		var ghost = '<div class="col subpage-ghost hidden-sm"></div>';
		var hiddenGhost = '<div class="subpage-ghost hidden-sm"></div>';

		if($('.reference').length < 3){
			return;
		}
		
		while (used.length < 3) {
			var random = Math.floor((Math.random() * $('.reference').length));

			if (used.indexOf(random) == -1) {
				used.push(random);
			}
		}
		
		for(var i = 0; i < 3; i++){
			var ref = $($('.reference').get(used[i]));
			$('.reference-' + (i + 1)).html(ref.html());
			
			var prev = '';
			var prevButton = '';
			var next = '';
			var nextButton = '';
			var dataNext = '';
			var dataPrev = '';
			
			switch(i){
			case 0:
				next = ghost + ghost;
				prev = hiddenGhost;
				var nextId = $($('.reference').get(used[i + 1])).attr('data-id');
				nextButton = '<div class="subpage-next hidden-sm"><div class="subpage-next-button"><a href="#' + nextId + '"><span class="arrow arrow-right"></span></a></div></div>';
				dataNext = ' data-next="' + nextId + '"';
				break;
			case 1:
				prev = ghost;
				next = ghost;
				var nextId = $($('.reference').get(used[i + 1])).attr('data-id');
				var prevId = $($('.reference').get(used[i - 1])).attr('data-id');
				prevButton = '<div class="subpage-prev hidden-sm"><div class="subpage-prev-button"><a href="#' + prevId + '"><span class="arrow arrow-left"></span></a></div></div>';
				nextButton = '<div class="subpage-next hidden-sm"><div class="subpage-next-button"><a href="#' + nextId + '"><span class="arrow arrow-right"></span></a></div></div>';
				dataPrev = ' data-prev="' + prevId + '"';
				dataNext = ' data-next="' + nextId + '"';
				break;
			case 2:
				next = hiddenGhost;
				prev = ghost + ghost;
				var prevId = $($('.reference').get(used[i - 1])).attr('data-id');
				prevButton = '<div class="subpage-prev hidden-sm"><div class="subpage-prev-button"><a href="#' + prevId + '"><span class="arrow arrow-left"></span></a></div></div>';
				dataPrev = ' data-prev="' + prevId + '"';
				break;
			}
			
			var nav = '<ul class="subpage-navigation">';
			for(var j = 0; j < 3; j++){
				var active = '';
				if(i == j){
					active = ' active';
				}
				nav += '<li><a href="#' + $($('.reference').get(used[j])).attr('data-id') + '"><span class="icon-circle' + active + '"></span></a></li>';
			}
			nav += '</ul>';

			var subpage = '<div class="subpage subpage-light row-light" id="' + ref.attr('data-id') + '"' + dataPrev + dataNext + '><div class="subpage-wrapper">' 
			    + prev + '<div class="content">'
				+ '<div class="subpage-controls">' + nav + '<div class="btn-close"><p><button>'
				+ '<span class="icon-diagonal-bar"></span><span class="icon-diagonal-bar">'
				+ '</span></button></p></div>' + prevButton + nextButton + '</div>' + ref.html() + '</div>' + next + '</div></div>';

			$('body').append(subpage);
		}
	}

	// Key event handlers for subpage navigation
	$(document).keyup(function(e) {
		switch (e.keyCode) {
		case 36: // Home
		case 27: // ESC
			closeSubpage();
			break;
		case 34: // Pg down
		case 39: // Right
		case 107: // plus
		case 78: // 'n'
			nextSubpage();
			break;
		case 33: // Pg up
		case 37: // Left
		case 109: // minus
		case 80: // 'p'
			previousSubpage();
			break;
		}
	});

	$(window).on('hashchange', function(e) {
		updateHash(window.location.hash);
		return false;
	});

	initReferences();
	
	$(document).scroll(updateHeaderBackground);
	setTimeout(updateHeaderBackground, 200);
	
	$('body').mousewheel(function(){
		$('body').stop(true, false);
	});
	
	updateHash(window.location.hash, true);

	$('body').delegate('.btn-close button', 'click', closeSubpage);

	$('[data-toggle=collapse]').click(function() {
		$($(this).attr('data-target')).removeClass('hidden-sm').show().toggleClass('in');
	});
	
	$('a[href^="#"]').click(function(e) {
		lastHash = null;
		updateHash($(this).attr('href'));
		return false;
	});
	
	$('body').delegate('.subpage.in .content', 'touchstart', function(e){
		touchX = e.originalEvent.targetTouches[0].clientX;
		target = $('.subpage.in .content').addClass('moving');
		delta = 0;
	});
	
	$('body').delegate('.subpage.in .content', 'touchmove', function(e){
		delta = e.originalEvent.targetTouches[0].clientX - touchX;
		var translateX = 0;
		if(Math.abs(delta) > 30){
			translateX = delta;
		}
		target[0].style.transform = 'translateX(' + translateX + 'px)';
	});
	
	$('body').delegate('.subpage.in .content', 'touchend', function(e){
		if(delta > target.width() / 3){
			previousSubpage();
		} else if(delta < - (target.width() / 3)){
			nextSubpage();
		}
		target.removeClass('moving').css('transform','translateX(0)');
	});
	
	$('.clickable-column').click(function(){
		var id = $(this).attr('data-id');

		if (typeof id !== typeof undefined && id !== false) {
			closeSubpage($(this).attr('data-position') == 'left' ? 'right' : 'left');
		    openSubpage($('#' + id), $(this).attr('data-position'));
			if (history.pushState) {
				window.history.pushState(null, document.title, location.pathname + '#' + id)
			}
		    return;
		}
		
		$(this).find('a').click();
	});
	
	$(window).resize(function(){
		resizeColumnsInSubpage();
	});
	
	/**
	 * Fixes height of columns in subpage. Only affects IE. Other browsers don't need this.
	 */
	function resizeColumnsInSubpage(){
		$('.subpage-wrapper > div').css('min-height', $(window).height() - 60 + 'px');		
	}
	
	resizeColumnsInSubpage();
	
})(jQuery);
