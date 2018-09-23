;(function($) {

'use strict';

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

$('.open-modal-window').magnificPopup({
    type:'inline',
    midClick: true
});

$('.close-modal-window').click(function () {
   console.log('here');
   $.magnificPopup.close();
});

$('.highlight-contact-form').click(function () {
    var contactForm = $('#contact-form');

    $('<div class="form-highlight"/>')
        .prependTo(contactForm)
        .fadeIn(2000, function(){
            $(this).fadeOut(2000, function(){
                $(this).remove();
            });
    });
});

})(jQuery);