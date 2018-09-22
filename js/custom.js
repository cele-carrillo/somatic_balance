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

    /* Team slideshow
    ----------------------------------------------*/
    $("#team-carousel").owlCarousel({
 
        autoPlay: 5000, //Set AutoPlay to 5 seconds

        items : 4,
        itemsDesktopSmall : [979,3],
        stopOnHover: true
 
    });

    /* Testimonials slideshow
    ----------------------------------------------*/
    $("#testimonial-carousel").owlCarousel({
 
        autoPlay: 6000, //Set AutoPlay to 6 seconds
 
        singleItem: true,
        pagination : false
 
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

    $('.open-modal-window').magnificPopup({
        type:'inline',
        midClick: true
    });

    $(window).load(function () {
        var promo = $('#promo-window');
        if (!promo.length) {
            return
        }
        var closable = promo.attr('data-closable') === 'true';
        var cookieName = "promo-shown";
        var cookieExpires = Number(promo.attr('data-close-cookie-timeout'));
        var cookie = getCookie(cookieName);

        if (!closable || cookie === "") {
            $.magnificPopup.open({
                type: 'image',
                items: {
                    src: promo.attr('data-img')
                },
                modal: !closable,
                callbacks: {
                    open: function () {
                        if (!closable) {
                            this.content.find('.mfp-close').addClass('invisible');
                        }
                    }
                }
            }, 0);
            setCookie(cookieName, 'true', cookieExpires);
        }
    });
})(jQuery);


function setCookie(name, value, expirationSeconds) {
    var date = new Date();
    date.setTime(date.getTime() + (expirationSeconds*1000));
    var expires = "expires="+ date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    var name = cookieName + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return '';
}