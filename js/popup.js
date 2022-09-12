function showPopup({content, title, text, icon, button, className}) {
    return swal({content, title, text, icon, button, className});
}

function setCookie({name, duration, useCookie}) {
    if (!useCookie) {
        console.log('not using cookie');
        return
    }
    var date = new Date();
    date.setTime(date.getTime() + (duration * 1000));
    var expires = "expires="+ date.toUTCString();
    document.cookie = `${name}=true;${expires};path=/;SameSite=Strict`;
}

function isCookieSet(name) {
    var cookieName = name + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            console.log('cookie found');
            return true;
        }
    }
    console.log('cookie not found');
    return false;
}

function shouldShowPopup(cookie) {
    if (cookie.useCookie) {
        return !isCookieSet(cookie.name);
    }
    return true;
}

function processPopupDiv(popupDiv) {
    var content = $(popupDiv).find("div.popup-content")[0];
    var title = popupDiv.getAttribute('data-title');
    var text = popupDiv.getAttribute('data-text');
    var icon = popupDiv.getAttribute('data-icon');
    var button = popupDiv.getAttribute('data-button');
    var cookieName = popupDiv.getAttribute('data-cookie-name');
    var className = popupDiv.getAttribute('data-custom-class');
    var cookieDuration = popupDiv.getAttribute('data-cookie-duration-seconds');
    var cookie = {
        useCookie: Boolean(cookieName),
        name: cookieName,
        duration: cookieDuration
    };
    console.log(JSON.stringify(cookie));
    if (shouldShowPopup(cookie)) {
        showPopup({content, title, text, icon, button, className})
            .then(() => setCookie(cookie));
    }
}

$(window).on('load', function () {
    var popupDivs = $( "div.popup" );
    if (popupDivs.length > 0) {
        processPopupDiv(popupDivs[0]);
    }
});
