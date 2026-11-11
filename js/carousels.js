/* Home and legacy carousel only; service media uses an uninterrupted portrait grid. */
(function(){
  if(!window.jQuery || !jQuery.fn.owlCarousel) return;
  jQuery(function($){
    $(".home-services.owl-carousel").each(function(){
      $(this).owlCarousel({items:1,loop:true,nav:false,dots:true,autoplay:true,autoplayTimeout:4500,smartSpeed:700});
    });

  });
})();
