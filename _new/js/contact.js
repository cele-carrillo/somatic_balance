$(window).on('load', function () {
    emailjs.init('user_SGBCPD2S1ZJ01TaEQGzZR');
});

$('#contact-form').submit(function (e) {
    e.preventDefault();
    emailjs.sendForm('default_service', 'contact_form', this)
        .then(function () {
            onContactSuccess();
        }, function (error) {
            onContactError(error);
        });
});

function onContactSuccess() {
    $('#contact-form')[0].reset();
    showTemporarily('#msg-success', 3500);
    gtag('event', 'generate_lead', {event_label: 'success'});
}

function onContactError(error) {
    console.log(error);
    showTemporarily('#msg-error', 5500);
    gtag('event', 'exception', {description: error, fatal: true});
}

function showTemporarily(elementId, time) {
    $(elementId).show();
    setTimeout(
        function(){
            $(elementId).fadeOut();
        },
        time
    );
}

function createMap(mapData) {
    var options = {
        scrollwheel: false,
        draggable: false,
        panControl: false,
        disableDefaultUI: true,
        styles: [
            {"featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{"color": "#f7f1df"}]},
            {"featureType": "landscape.natural", "elementType": "geometry", "stylers": [{"color": "#d0e3b4"}]},
            {"featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [{"visibility":"off"}]},
            {"featureType": "poi", "elementType": "labels", "stylers": [{"visibility":"off"}]},
            {"featureType": "poi.business", "elementType": "all", "stylers":[{"visibility":"off"}]},
            {"featureType": "poi.medical", "elementType": "geometry", "stylers": [{"color": "#fbd3da"}]},
            {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#bde6ab"}]},
            {"featureType": "road", "elementType": "geometry.stroke", "stylers": [{"visibility":"off"}]},
            {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#ffe15f"}]},
            {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color":"#efd151"}]},
            {"featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}]},
            {"featureType": "road.local", "elementType": "geometry.fill", "stylers": [{"color": "black"}]},
            {"featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [{"color": "#cfb2db"}]},
            {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#a2daf2"}]}],
        zoom: mapData.zoom,
        maxZoom: mapData.zoom,
        minZoom: mapData.zoom,
        center: new google.maps.LatLng(mapData.latitude, mapData.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map'), options);

    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(mapData.latitude, mapData.longitude)
    });

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(options.center);
    });
}