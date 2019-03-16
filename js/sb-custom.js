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
    checkForPopUpAutoOpen();
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
    gtag('event', 'generate_lead', {event_label: 'success'});
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
    gtag('event', 'exception', {description: error});
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

$('.offer-box').matchHeight(true);
$('.faq-box').matchHeight(true);

$('.open-modal-window').magnificPopup({
    type:'inline',
    midClick: true,
    callbacks: {
        open: function () {
            gtag('event', 'view_item', {event_label: this.currItem.src});
        }
    }
});

$('.close-modal-window').click(function () {
   $.magnificPopup.close();
});

function autoCollapse(groupId) {
    $('.' + groupId).on('show.bs.collapse', function () {
        $('.' + groupId +'.collapse.in').each(function(){
            $(this).collapse('hide');
        });
    });
}

autoCollapse('rolfing-faqs');
autoCollapse('body-centred-mindfulness-faqs');

function scrollAndHighlightContactForm() {
    var contactForm = $('#contact-form');

    $('<div class="form-highlight"/>')
        .prependTo(contactForm)
        .fadeIn(2000, function(){
            $(this).fadeOut(2000, function(){
                $(this).remove();
            });
        });
    gtag('event', 'generate_lead', {event_label: 'interest'});
}

$('.highlight-contact-form').click(scrollAndHighlightContactForm);

function isValidPopupDiv(value) {
    return $("div").find("[data-mfp-src='" + value + "']").length > 0;
}

function checkForPopUpAutoOpen() {
    if (window.location.hash && isValidPopupDiv(window.location.hash)) {
        $.magnificPopup.open({
            items: {
                src: window.location.hash
            },
            type:'inline',
            midClick: true,
            callbacks: {
                open: function () {
                    gtag('event', 'view_item', {event_label: this.currItem.src});
                }
            }
        });
    }
}

})(jQuery);