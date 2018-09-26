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

function showPromo() {
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
}

$(window).load(function () {
    showPromo();
    emailjs.init('user_SGBCPD2S1ZJ01TaEQGzZR');
});

function onContactSuccess() {
    $('#contact-form')[0].reset();
    $.magnificPopup.open({
        items: {
            src: '#form-success',
            type: 'inline',
            midClick: true
        }
    });
}

function onContactError(error) {
    console.log(error);
    $.magnificPopup.open({
        items: {
            src: '#form-error',
            type: 'inline',
            midClick: true
        }
    });
}

$('#contact-form').submit(function (e) {
    e.preventDefault();
    emailjs.sendForm('default_service', 'contact_form', this)
        .then(function () {
            onContactSuccess();
        }, function (error) {
            onContactError(error);
        });
});

$('.open-modal-window').magnificPopup({
    type:'inline',
    midClick: true
});

$('.close-modal-window').click(function () {
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