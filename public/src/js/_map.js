(function ($) {
    'use strict';

    var mapElement = $('#map');

    var isBern = true;

    if (mapElement.length != 1) {
        return;
    }

    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        var latLng = null;
        if (isBern == true) {
            latLng = new google.maps.LatLng(46.9627314, 7.4434203, 17);
        } else {
            latLng = new google.maps.LatLng(47.3890956, 8.5365762, 17);

        }
        var mapOptions = {
            zoom: 14,
            center: latLng,
            scrollwheel: false,
            draggable: false,
            disableDefaultUI: true,
            styles: [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#f2f2f2"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 45
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "color": "#1d5c62"
                }, {
                    "visibility": "on"
                }]
            }]
        };

        var map = new google.maps.Map(mapElement.get(0), mapOptions);
        var marker = new google.maps.Circle({
            center: latLng,
            radius: 60,
            map: map,
            strokeWeight: 0,
            fillColor: '#99CCCC',
            fillOpacity: 1
        });

        google.maps.event.addListener(marker, 'click', function () {
            window.open('https://maps.google.com?q=sidefyn GmbH');
        });

        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    }

    $('address').click(function () {

        isBern = $(this).hasClass('Bern');
        init();

    });


})(jQuery);
