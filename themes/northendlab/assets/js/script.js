(function ($) {
  'use strict';

  // Preloader js    
  $(window).on('load', function () {
    $('.preloader').fadeOut(100);
  });

  // navigation
  $(window).scroll(function () {
    if ($('.navigation').offset().top > 1) {
      $('.navigation').addClass('nav-bg');
    } else {
      $('.navigation').removeClass('nav-bg');
    }
  });

  //  Search Form Open
  $('#searchOpen').on('click', function () {
    $('.search-wrapper').addClass('open');
    setTimeout(function () {
      $('.search-box').focus();
    }, 400);
  });
  $('#searchClose').on('click', function () {
    $('.search-wrapper').removeClass('open');
  });


	// tab
	$('.tab-content').find('.tab-pane').each(function (idx, item) {
		var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
			title = $(this).attr('title');
		navTabs.append('<li class="nav-item"><a class="nav-link" href="#">' + title + '</a></li>');
	});

	$('.code-tabs ul.nav-tabs').each(function () {
		$(this).find("li:first").addClass('active');
	})

	$('.code-tabs .tab-content').each(function () {
		$(this).find("div:first").addClass('active');
	});

	$('.nav-tabs a').click(function (e) {
		e.preventDefault();
		var tab = $(this).parent(),
			tabIndex = tab.index(),
			tabPanel = $(this).closest('.code-tabs'),
			tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
		tabPanel.find('.active').removeClass('active');
		tab.addClass('active');
		tabPane.addClass('active');
	});


	// Accordions
	$('.collapse').on('shown.bs.collapse', function () {
		$(this).parent().find('.fas fa-plus').removeClass('fas fa-plus').addClass('fas fa-minus');
	}).on('hidden.bs.collapse', function () {
		$(this).parent().find('.fas fa-minus').removeClass('fas fa-minus').addClass('fas fa-plus');
	});

  //  post-slider-block
  function postSlider() {
    $('.slider-block').slick({
      dots: false,
      arrows: true,
      infinite: true,
      speed: 400,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplay: true,
      prevArrow: $('.slider-prev'),
      nextArrow: $('.slider-next'),
      responsive: [{
      breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }]
    });
  }
  postSlider();

  // Shuffle js filter 
  function shuffleInit() {
    var containerEl = document.querySelector('.shuffle-wrapper');
    if (containerEl) {
      var Shuffle = window.Shuffle;
      var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
        itemSelector: '.shuffle-item',
        buffer: 1
      });

      jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
        var input = evt.currentTarget;
        if (input.checked) {
          myShuffle.filter(input.value);
        }
      });
    }
	}
  shuffleInit()

})(jQuery);