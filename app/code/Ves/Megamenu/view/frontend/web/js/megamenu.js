// define([
// 	'jquery',
// 	'megamenuowlcarousel'
// 	], function () {
// 		jQuery(document).ready(function($) {
// 			jQuery.noConflict(true);
// 			if(jQuery(".megamenuowl-play").length > 0 ) {
// 				var owlItems = [];
// 				jQuery(".megamenuowl-play").each( function(){
// 					var owlCarousel = jQuery(this).find(".owl-carousel");
// 					var owlId = jQuery(owlCarousel).attr("id");
// 				//if(!owlItems[owlId]){
// 					jQuery(this).addClass("hasOwl");
// 					var config = [];
// 					owlItems[jQuery(owlCarousel).attr("id")] = true;
// 					if(jQuery(owlCarousel).data('nav')){
// 						config['nav'] = jQuery(owlCarousel).data('nav');
// 					}
// 					if(jQuery(owlCarousel).data('dot')){
// 						config['dot'] = jQuery(owlCarousel).data('dot');
// 					}
// 					if(jQuery(owlCarousel).data('autoplay')){
// 						config['autoplay'] = jQuery(owlCarousel).data('autoplay');
// 					}
// 					if(jQuery(owlCarousel).data('autoplay-timeout')){
// 						config['autoplayTimeout'] = jQuery(owlCarousel).data('autoplay-timeout');
// 					}
// 					if(jQuery(owlCarousel).data('autoplay-pauonhover')){
// 						config['autoplayHoverPause'] = jQuery(owlCarousel).data('autoplay-pauonhover');
// 					}
// 					if(jQuery(owlCarousel).data('rtl')){
// 						config['rtl'] = jQuery(owlCarousel).data('rtl');
// 					}
// 					if(jQuery(owlCarousel).data('items')){
						
// 						config['items'] = jQuery(owlCarousel).data('items');
// 					}
// 					if(jQuery(owlCarousel).data('loop')){
// 						config['loop'] = jQuery(owlCarousel).data('loop');
// 					}
// 					if(jQuery(owlCarousel).data('mousedrag')){
// 						config['mouseDrag'] = jQuery(owlCarousel).data('mousedrag');
// 					}
// 					if(jQuery(owlCarousel).data('pulldrag')){
// 						config['pullDrag'] = jQuery(owlCarousel).data('pulldrag');
// 					}
// 					if(jQuery(owlCarousel).data('freedrag')){
// 						config['freeDrag'] = jQuery(owlCarousel).data('freedrag');
// 					}
// 					if(jQuery(owlCarousel).data('stagepadding')){
// 						config['stagePadding'] = jQuery(owlCarousel).data('stagepadding');
// 					}
// 					if(jQuery(owlCarousel).data('lazyload')){
// 						config['lazyLoad'] = jQuery(owlCarousel).data('lazyload');
// 					}
// 					if(jQuery(owlCarousel).data('margin')){
// 						config['margin'] = jQuery(owlCarousel).data('margin');
// 					}
// 					var mobile_items = 1;
// 					if(jQuery(owlCarousel).data('mobile-items')){
// 						mobile_items = jQuery(owlCarousel).data('mobile-items');
// 					}
// 					var tablet_small_items = 3;
// 					if(jQuery(owlCarousel).data('tablet-small-items')){
// 						tablet_small_items = jQuery(owlCarousel).data('tablet-small-items');
// 					}
// 					var tablet_items = 3;
// 					if(jQuery(owlCarousel).data('tablet-items')){
// 						tablet_items = jQuery(owlCarousel).data('tablet-items');
// 					}
// 					var portrait_items = 4;
// 					if(jQuery(owlCarousel).data('portrait-items')){
// 						portrait_items = jQuery(owlCarousel).data('portrait-items');
// 					}
// 					var large_items = 5;
// 					if(jQuery(owlCarousel).data('large-items')){
// 						large_items = jQuery(owlCarousel).data('large-items');
// 					}
// 					var large_max_items = 6;
// 					if(jQuery(owlCarousel).data('large-max-items')){
// 						large_max_items = jQuery(owlCarousel).data('large-max-items');
// 					}
// 					config['responsive'] = {
// 						0 : {items: mobile_items},
// 						480 : {items: tablet_small_items},
// 						640 : {items: tablet_items},
// 						768 : {items: portrait_items},
// 						980 : {items: large_items},
// 						1200 : {items: large_max_items}
// 					};
// 					config['rewindNav'] = true;
// 					rewindSpeed: 600;
// 					jQuery(owlCarousel).owlCarousel(config);
// 					jQuery(".owl-left").click(function(){
// 						var owlCarousel = jQuery("#"+jQuery(this).data("owlid"));
// 						owlCarousel.trigger('prev.owl.carousel');
// 						return false;
// 					});
// 					jQuery(".owl-right").click(function(){
// 						var owlCarousel = jQuery("#"+jQuery(this).data("owlid"));
// 						owlCarousel.trigger('next.owl.carousel');
// 						return false;
// 					});
// 				//};
// 			});
// 			}
// 		});
// 	});