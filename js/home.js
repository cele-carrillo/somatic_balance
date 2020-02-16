(function () {
    $(window).on('load', function () {
    	$("#testimonial-carousel").owlCarousel({
    		autoPlay: 10000,
    		stopOnHover: true,
    		singleItem: true,
    		pagination : true
    	});
    });
})();