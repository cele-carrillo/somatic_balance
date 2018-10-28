(function($) {
    'use strict';

    /* Hide menu after click
    ----------------------------------------------*/
    $('.navbar-nav li a').click(function(event) {
        $('.in').collapse('hide');
    });

    /* Smooth scroll to section
    ----------------------------------------------*/
    $('a.scroll[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top-70
                }, 2000);
                return false;
            }
        }
    });

    /* Testimonials slideshow
    ----------------------------------------------*/
    $("#testimonial-carousel").owlCarousel({
        autoPlay: 10000, //Set AutoPlay to 6 seconds
        stopOnHover: true,
 
        singleItem: true,
        pagination : true
    });

    /* Team slideshow
    ----------------------------------------------*/
    $("#team-carousel").owlCarousel({

        autoPlay: 5000, //Set AutoPlay to 5 seconds

        items : 4,
        itemsDesktopSmall : [979,3],
        stopOnHover: true

    });

    /* Tooltip
    ----------------------------------------------*/
    $('[data-toggle="tooltip"]').tooltip();

    /* Lightbox
    ----------------------------------------------*/
    $('.image-link').magnificPopup({
        type:'image'
    });

    /* Google map
    ----------------------------------------------*/
    $(".map").each(function(){
            
        var data_zoom = 17;
        var center = undefined;

        if ($(this).attr("data-zoom") !== undefined) {
            data_zoom = parseInt($(this).attr("data-zoom"),10);
        }
        if ($(this).attr("data-lat") !== undefined && $(this).attr("data-lng") !== undefined) {
            center = [
                Number($(this).attr("data-lat")),
                Number($(this).attr("data-lng"))
            ];
        }
        
        $(this).gmap3({
            marker: {
                values: [{
                    address: $(this).attr("data-address"),
                    position: center,
                    data: $(this).attr("data-address-details")
                }],
                options:{
                    draggable: false
                },
                events:{
                    click: function(marker, event, context){
                        var map = $(this).gmap3("get"),
                        infowindow = $(this).gmap3({get:{name:"infowindow"}});
                        if (infowindow){
                            infowindow.open(map, marker);
                            infowindow.setContent(context.data);
                        } else {
                            $(this).gmap3({
                                infowindow:{
                                    anchor:marker, 
                                    options:{content: context.data}
                                }
                            });
                        }
                    }
                }
            },
            map: {
                options: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: data_zoom,
                    scrollwheel: false,
                    styles: [
                        {
                            featureType: 'poi.business',
                            stylers: [{visibility: 'off'}]
                        }
                    ]
                }
            }
        });
        
    });
})(jQuery);