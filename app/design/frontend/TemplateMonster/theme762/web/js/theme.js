    define([
    'jquery',
    'mage/smart-keyboard-handler',
    'matchMedia',
    'jquery/ui',
    'mage/mage',
    'mage/ie-class-fixer',
    'rdnavbar',
    'carouselInit',
    'blockCollapse',
    'camera',
    'dd',
    'jquery.animateNumber.min'
], function ($, keyboardHandler, mediaCheck) {
    'use strict';

    $("a[href=#]").attr("href","javascript:void(0)");
    
    var random = Math.floor(Math.random() * $('.testimonial-item').length);
    $('.testimonial-item').hide().eq(random).show();
    
	$(".messages").on('click', function(){
		$(this).hide();
	});
	

	
    $(document).on('click','#homevideo',function(e){
        $('#homevideo').hide();
        $('#ytvideo').html('<iframe width="100%" height="500px" id="ytvideo" frameborder="0" allowfullscreen src="'+$(this).attr("data-url")+'"></iframe>').show();
    });
    
    //single product page js
    var wishlisthtml = $('.product-social-links').find('a.towishlist').clone().get(0);
    $("#custom_addtocart").append(wishlisthtml);
    $('.swatch-select.color option:first').html("Select Color");

    $('body').on('click', function (e) {
        var target = $(e.target);
        if (target.parents('.submenu.dropdown-menu').length == 0) {
            $(".submenu.dropdown-menu").fadeOut();
        }
    });
	
	$('a[href$=".pdf"]').addClass("downloadlink");
	$('.catalog-product-view .panel a').each(function() {
		
		var hrefdo = $(this).attr("title");
		if(hrefdo == 'Download')
		{
		$(this).addClass("downloadlink");	
		}
		var hreflink = $(this).attr("href");
		//alert(hreflink);
		if(hreflink == '{{media url=')
		{
		$(this).addClass("downloadlink");	
		}
	});
	

    $(".page-header").on('click',function(){
            if($(".hideus").hasClass("active")){
                $(".hideus").removeClass("active").hide();
            }
    });
	
	$(".page-header").on('click',function(){
            if($(".hideus").hasClass("active")){
                $(".hideus").removeClass("active").hide();
            }
    });
	
	$('li.product-item').find('img.galimg').addClass(function() {
		$(this).parent().addClass('mutiimg');
	});
	/* if($("li.product-item img.galimg").hasClass("image2")){
        $(this).parent().addClass('mutiimg');
    } */
	
	/* $("a.weltpixel-quickview").on('click',function(){
		$('.closepopup').css('position','fixed');
	});
	$(".closepopup").on('click',function(){
			alert('aaa');
            //$('.mfp-bg.mfp-ready').remove();
			//$('body').find('.mfp-wrap.mfp-close-btn-in').remove();
    }); */
	
	
	/* $('.showmore p:gt(0)').hide();
	$(".rd_more").on('click',function(){
			$('.showmore p:gt(0)').toggle();
    }); */
	/* setTimeout(function() {
		//$("#attribute90").css("background", 'grey');
		$('#attribute90 option').eq(1).prop('selected', true);
		$('select#attribute90').find('option').each(function() {
			var defcol = $(this).text();
			var defcolor = defcol.split(' ');
			//alert(defcolor[0]);
			$(this).css('background',defcolor[0]);
		});
		
	}, 2000); */
	
	//$('#attribute90 option').eq(2).prop('selected', true)
	
	$('div.price-final_price').append("<small class='inclgst'>INCL GST</small>");
   
    $("#maincontent").on('click',function(){
        if($(".hideus").hasClass("active")){
            $(".hideus").removeClass("active").hide();
        }
    });

   /*  setInterval(function(){ 
        if($('.wishlist_counter_qty').find('span').length == 0){
             $('.wishlist_counter_qty').html(function (idx, html) {
           return html.replace(/(\s[\S]+)$/, '<span>$1</span>')
            });  
        }

    }, 500); */

	
	var linktop = $(location).attr('href'); 
	var linksort = linktop.split('product_list_order=');
	if(linksort[1] != '')
	{
		var deftxt = linksort[1];
	}
	else if(linksort[1] == 'position')
	{
		var deftxt = 'Popularity';
	}
	else
	{
		var deftxt = 'Popularity';
	}
	
	if (deftxt === undefined || deftxt === null) {
		var deftxt = 'Popularity';
	}
	//alert(linktop);
	 $('.sorter-options').parent().append('<ul id="newyearfilter" class="newyearfilter" name="yearfilter"><li class="clickarrow">'+deftxt+'</li></ul>');
	$('#sorter').eq(0).find('option').each(function(){
	$('.newyearfilter').append('<li class="' + $(this).val() + '" value="' + $(this).val() + '"><a href="'+linksort[0]+'?product_list_order='+ $(this).val() + '">'+$(this).text()+'</a></li>');
	});
	$('li.position').hide();
	$('li.name').hide();
	$('li.fabric').hide();
	$('li.collections').hide();
	$("#newyearfilter li.clickarrow").on('click',function(){
        $('li.position').toggle();
		$('li.name').toggle();
		$('li.fabric').toggle();
		$('li.collections').toggle();
    });
	//$('#sorter ul li').eq(1).prop('selected', true);
	$('.sorter-options').remove();
	//$('#newyearfilter').attr('id', 'sorter'); 
	
	
	
    var url = $(".action.showcart.topBarIcon").attr("href");
    url = url.slice(0, url.lastIndexOf('/'));
    url = url.slice(0, url.lastIndexOf('/'));
    $(".action.showcart.topBarIcon").attr("href",url);
    $(".side-navbar-btn--link.side-navbar-btn--cart").attr("href",url);

    if ($('body').hasClass('checkout-cart-index')) {
        if ($('#co-shipping-method-form .fieldset.rates').length > 0 && $('#co-shipping-method-form .fieldset.rates :checked').length === 0) {
            $('#block-shipping').on('collapsiblecreate', function () {
                $('#block-shipping').collapsible('forceActivate');
            });
        }
    }

    $('.cart-summary').mage('sticky', {
        container: '#maincontent'
    });

    keyboardHandler.apply();
    /* Navbar init */
    var o = $('.rd-navbar');
    if (o.length > 0) {
        o.RDNavbar({
            responsive: {
                0: {
                    layout: 'rd-navbar-fixed',
                    stickUp: true
                },
                768: {
                    layout: 'rd-navbar-static',
                    stickUp: true
                }
            }
        });
    }

    /* Sidebar block collapse in mibile */
    $(".sidebar-additional .block").sidebarCollapse();

    /* Carousel init */
    $(".carousel").carouselInit();


    // ==============================================
    // Animation Skills
    // ==============================================

    if($('.skills .number').length > 0){
        var number = $('.skills .number');
        number.each(function(){
            var finish = $(this).data('finish');
            $(this).animateNumber({ number: finish }, 2000);
        })
    }

    // ==============================================
    // Camera Slider
    // ==============================================
	//var cameraCount = 0 ;
	var glblCounter=0;
	var camLoad;
	
    if($('#camera_wrap').length > 0){
        $('#camera_wrap').camera({
            alignmen: 'topCenter',
            //height: '54.325956%',
            height: '52%',
            minHeight: '100px',
            loader : false,
            navigation: false,
            fx: 'simpleFade',
            navigationHover:false,
            thumbnails: false,
            playPause: false,
            pagination:true,
			onLoaded: function() {
				var ww = $(window).width();
				if(ww>=1025){
					$('.slider_wrapper.custom-slider-style').parent().css({
						'position':'absolute',
						'top':'0px',
						'left':'0px',
						'right':'0px',
						'z-index':'10'
					});
					setHomeTopPart();
				}
				
				clearTimeout(camLoad);
				
				camLoad = setTimeout(function(){
					//alert('camera slider loaded');
					clearInterval(glblCounter);
				},5000);
				
			}
        });
    }
	
	if($('#camera_wrap1').length > 0){
        $('#camera_wrap1').camera({
            alignmen: 'topCenter',
            //height: '54.325956%',
            height: '52%',
            minHeight: '100px',
            loader : false,
            navigation: false,
            fx: 'simpleFade',
            navigationHover:false,
            thumbnails: false,
            playPause: false,
            pagination:true,
			onLoaded: function() {
				var ww = $(window).width();
				if(ww>=1025){
					$('.slider_wrapper.custom-slider-style').parent().css({
						'position':'absolute',
						'top':'0px',
						'left':'0px',
						'right':'0px',
						'z-index':'10'
					});
					setHomeTopPart();
				}
				
				clearTimeout(camLoad);
				
				camLoad = setTimeout(function(){
					//alert('camera slider loaded');
					clearInterval(glblCounter);
				},5000);
				
			}
        });
    }

    // ==============================================
    // Carousels
    // ==============================================

    $('.products-crosssell .product-items').carouselInit();

    $('.owl-testimonials').carouselInit({
        responsive:{
            0:{
                items:1,
            },
            400:{
                items:1,
            },
            768:{
                items:1,
            },
            991:{
                items:1,
            }
        },
        singleItem: true,
        nav : true,
        navigationText : [ ],
        loop : true,
        dots : false,
        autoPlay : true,
        autoplay : 3000,
        autoplayTimeout: 2000,
        autoplayHoverPause: true
    });

    $('.cms-index-index .widget.block-new-products .widget-new-grid').carouselInit({
        items: 5,
        itemsDesktop: [1600,4],
        //itemsDesktop: [1199,3],
        itemsDesktopSmall: [979,3],
        itemsTablet: [768,2],
        itemsMobile: [400,1],
        navigation : true,
        pagination: false,
        navigationText : [ ],
        autoPlay : false
    });

    $('.cms-index-index .widget.block-products-list .widget-product-grid').carouselInit({
        items: 6,
        itemsDesktop: [1199,4],
        itemsDesktopSmall: [979,3],
        itemsTablet: [768,1],
        itemsMobile: [400,1],
        navigation : true,
        pagination: false,
        navigationText : [ ],
        autoPlay : false
    });

    // ==============================================
    // Side navbar
    // ==============================================


    //$('.side-navbar-btn--cart').click(function(e){
    //    e.preventDefault();
    //});

        //Login and create account switcher
        var loginSwitcher = $('.login-switcher');
        var loginBlock = $('.login-block');
        var registerSwitcher = $('.register-switcher');
        var registerBlock = $('.register-block');

        $(loginSwitcher).click(function(e){
            e.preventDefault();
            $(loginBlock).removeClass('active');
            $(registerBlock).addClass('active');
        });
        $(registerSwitcher).click(function(e){
            e.preventDefault();
            $(registerBlock).removeClass('active');
            $(loginBlock).addClass('active');
        });


    // ==============================================
    // Footer accordion
    // ==============================================
    /* var acc = $("#footer-col-wrapper");
    var params = {
        header : ".footer-col h4",
        content : ".footer-col .footer-col-content",
        trigger : ".footer-col h4",
        active: "0",
        collapsible: true,
        multipleCollapsible: true,
        animate: 200
    }
    mediaCheck({
        media: '(max-width: 767px)',
        entry: function(){
            accInit(acc, params);
        },
        exit: function(){
            accInit(acc, params);
            accDestroy(acc);
        }
    });

    function accInit(elem, params){
        elem.accordion(params);
    }

    function accDestroy(elem){
        elem.accordion("destroy");
    }
	 */
	
	
	
	var normalVal = 7;
	var doubleVal = normalVal * 2;
	
	var windowWidth = $(window).width();
	
		if(windowWidth>=2701){
			normalVal = 14;
			doubleVal = normalVal * 2;
		}
		else if (windowWidth>=992 && windowWidth<=2700){
			normalVal = 7;
			doubleVal = normalVal * 2;
			
		}
		else if (windowWidth<=991){
			normalVal = 5;
			doubleVal = normalVal * 2;
		}
		
	
	
	
	
	
	function setShowcase(){
		
		
		
		windowWidth = $(window).width();
	
		if(windowWidth>=2701){
			normalVal = 14;
			doubleVal = normalVal * 2;
			
		}
		else if (windowWidth>=992 && windowWidth<=2700){
			normalVal = 7;
			doubleVal = normalVal * 2;
			
		}
		else if (windowWidth<=991){
			normalVal = 5;
			doubleVal = normalVal * 2;
			
		}
		
		$('.mainShowcase img').css('height','auto');
		$('.showcases .mainShowcase .col-xs-6, .showcases .row .col-md-6').css('padding','0px '+normalVal+'px');
		$('.showcases .row').css({'margin-left':'-'+normalVal+'px','margin-right':'-'+normalVal+'px'});
		$('.showcases .row.spl-row').css({'margin-left':'-'+doubleVal+'px','margin-right':'-'+doubleVal+'px'});
		$('.mainShowcase .full-product-box.show6').css('margin-left','0px');
		
		
		var imgCount = $('.mainShowcase img').length;
		var imgCountMax = imgCount + 1;
		
		var commonImgHeight = 50;
		
		for(var x=1;x<=imgCountMax;x++){
			
			if(x==2 || x==3 || x==4 || x==5){
				var currentImgHeight = $('.mainShowcase .show'+x+' img').outerHeight();
				if(commonImgHeight<=currentImgHeight){
					commonImgHeight = currentImgHeight;
				}
			}
			
			if(x==imgCountMax){
				$('.mainShowcase .show2 img, .mainShowcase .show3 img, .mainShowcase .show4 img, .mainShowcase .show5 img, .mainShowcase .show6 img').height(commonImgHeight);
			}
		}
		
		// setting first half
		var secondColHeight = $('.mainShowcase .show2').parent().height();
		
		$('.mainShowcase .show1 img').height(secondColHeight);
		
		
		
		$('.mainShowcase .short-product-box').css('margin','0px');
		$('.mainShowcase .short-product-box.show2').css('margin-bottom',doubleVal+'px');
		$('.mainShowcase .firstHalf').css('margin-bottom',doubleVal+'px');
		$('.mainShowcase .full-product-box.show6').css('margin-top',doubleVal+'px');
		
		
		
	}
	
	
	function setInfoSection(){
		
		//console.log('set info section function');
		$('.add-info.custom-info-section ul li > div').css('height','auto');
		var infoHeight = 50;
		var actHeight = 0;
		
		var itemCount = $('.add-info.custom-info-section ul li').length;
		var itemCountMax = itemCount + 1;
		
		for(var t=1;t<=itemCountMax;t++){
			actHeight = $('.add-info.custom-info-section ul li:nth-child('+t+')').height();
			if(infoHeight<=actHeight){
				infoHeight = actHeight;
			}
			
			if(t==itemCountMax){
				//$('.add-info.custom-info-section ul li > div, .add-info.custom-info-section ul li .info-img img').height(infoHeight);
				$('.add-info.custom-info-section ul li > div').height(infoHeight);
			}
			
		}
		
		
	}
	
	
	
	
	function setHomeTopPart(){
		
		if($('.homepage_custom').length>=1){
			
			var ww = $(window).width();
			if(ww>=1025){
				
				
				$('.slider_wrapper.custom-slider-style').parent().css({
					'position':'absolute',
					'top':'0px',
					'left':'0px',
					'right':'0px',
					'z-index':'10'
				});
				
				$('header.page-header').css({'z-index':'20'});
				var sliderHeight = $('.slider_wrapper.custom-slider-style').parent().height();
				var topBarHeight = $('.side-navbar').outerHeight();
				var currentPos = $('.showcases').parent().offset().top;
				var calMargVal = sliderHeight + topBarHeight - currentPos;
				
				
				
				if(calMargVal>=50){
					$('.showcases').parent().css({
						'margin-top':calMargVal
					});
				}
				
				
				$('.custom-slider-style .camera_caption > div .camera_caption_txt').css({'margin-top':'15%'});
				
			}
			else {
				$('.slider_wrapper.custom-slider-style').parent().css({'position':'initial'});
				$('.showcases').parent().css({'margin-top':'0px'});
				$('header.page-header').css({'z-index':'initial'});
				$('.custom-slider-style .camera_caption > div .camera_caption_txt').css({'margin-top':'15%'});
			}
		}
	}
	
	function setHomeTopPartResize(){
		
		//console.log('inside the second function');
		
		if($('.homepage_custom').length>=1){
			
			var ww = $(window).width();
			if(ww>=1025){
				$('header.page-header').css({'z-index':'20'});
				var sliderHeight = $('.slider_wrapper.custom-slider-style').parent().height();
				var topBarHeight = $('.side-navbar').outerHeight();
				var currentPos = $('.showcases').parent().offset().top;
				var calMargVal = sliderHeight + topBarHeight - currentPos;
				//console.log('top margin value is : ' + calMargVal);
				
				
				
				var topval = 0;
				topval = $('.showcases').parent().css('margin-top');
				//topval = $('.showcases').parent().offset().top;
				$('.showcases').parent().css({
					'margin-top':parseInt(topval) + calMargVal
				});
				
				
				
				$('.custom-slider-style .camera_caption > div .camera_caption_txt').css({'margin-top':'15%'});
				
				
			}
			else {
				$('.slider_wrapper.custom-slider-style').parent().css({'position':'initial'});
				$('.showcases').parent().css({'margin-top':'0px'});
				$('header.page-header').css({'z-index':'initial'});
				$('.custom-slider-style .camera_caption > div .camera_caption_txt').css({'margin-top':'15%'});
			}
			
		}
	}
	
	
	function glblStart(){
		var df = 0;
		glblCounter = setInterval(function(){
			setShowcase();
			setHomeTopPart();
			setInfoSection();
			// console.log('interval value is : ' + df);
			df++;
		}, 500);
	}
	
	
	
	
	$(document).ready(function(){
		$('.topBarIcon').tooltip({
			//position:{ within: this}
			position: {
				my: "center bottom-50",
				at: "center bottom",
				using: function( position, feedback ) {
				  $( this ).css( position );
				  $( "<div>" )
					.addClass( "arrow" )
					.addClass( feedback.vertical )
					.addClass( feedback.horizontal )
					.appendTo( this );
				}
			}
		});
		
		$('.topIcons-container .switcher-language').hover(function(){
			$('body').addClass('switchLanguageHover');
		},function(){
			$('body').removeClass('switchLanguageHover');
		});
		
		
		//alert('im here');
		var cookieBar = $('#notice-cookie-block').length;
		if(cookieBar>=1){
			$('body').addClass('cookie-bar');
		}
		
		//$('.showcases img').css('border','none');
		$('.mainShowcase .short-product-box').css('margin','0px');
		$('.mainShowcase .short-product-box.show2').css('margin-bottom',doubleVal+'px');
		$('.mainShowcase .firstHalf').css('margin-bottom',doubleVal+'px');
		
		$('.mainShowcase .full-product-box.show6').css('margin-top',doubleVal+'px');
		
		//setHomeTopPart();
		
		setShowcase();
		setHomeTopPart();
		setInfoSection();
		
		
		/*if($('#accordion').length>=1){
			$('#accordion .panel-heading a[data-toggle="collapse"]').click(function(){
				
			});
		}*/

	});
	
	
	var loadCount;
	
	$(window).on('load resize',function(){
		clearTimeout(loadCount);
		glblStart();
		loadCount = setTimeout(function(){
			clearInterval(glblCounter);
		},5000);
	});
	
	/* var doit;
	window.onresize = function(){
	  clearTimeout(doit);
	  //doit = setTimeout(glblStart, 100);
	  
		doit =  setTimeout(function(){
			glblStart();
			clearInterval(glblCounter);
		},100);
	  
	}; */
	
	window.onresize = function(){
		
		var tyu = setInterval(function(){
			setHomeTopPartResize();
		},100);
		
		setTimeout(function(){
			clearInterval(tyu);
		},2000);
		
		
		
		
	};
	
	
	/* window.onresize = function(){
			
		if($('#afterLoadTheme').length>=1){
			$('#afterLoadTheme').remove();
		}
		
		var scriptt = document.createElement('script');
		var ajxUrl = $('script[data-requiremodule="js/theme"]').attr('src');
		var timestamp = Date.now().toString();
		//var ajxUrl = getElementsByAttribute( "data-requiremodule", "js/theme" )
		scriptt.onload = function () {
			//do stuff with the script
		};
		scriptt.src = ajxUrl+'?'+timestamp;
		scriptt.id = "afterLoadTheme";

		document.body.appendChild(scriptt);

	};
	 */
	
});


