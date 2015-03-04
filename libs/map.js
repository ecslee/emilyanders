$(document).ready(function () {
    /* map accordion */
    $('.panel-heading', '.panel-wedding').click(function () {
        if ($(this).next().hasClass('panel-open')) {
            return;
        }
        
        $('.panel-body', '.panel-wedding').removeClass('panel-open', 500, 'easeInOutCubic');
        $(this).next().addClass('panel-open', 500, 'easeInOutCubic');
    });

    /* google map */
    var map;
    function mapInit() {
        var icons = {
            purple: {
                khimaira: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|4A2544|FFFFFF',
                hotel: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=2|4A2544|FFFFFF',
                caverns: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=3|4A2544|FFFFFF'
            },
            blue: {
                khimaira: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|9AD0FF|444444',
                hotel: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=2|9AD0FF|444444',
                caverns: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=3|9AD0FF|444444'
            }
        };
        
        var khimairaLatLong = new google.maps.LatLng(38.628217, -78.428725);
        var mapOptions = {
            zoom: 9,
            center: new google.maps.LatLng(38.762418, -78.279751)
            //center: khimairaLatLong
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var khimairaMarker = new google.maps.Marker({
            position: khimairaLatLong,
            map: map,
            title: 'Khimaira Farm',
            icon: icons.purple.khimaira,
            zIndex: 3,
            weddingType: 'khimaira'
        });
        var khimairaInfo = new google.maps.InfoWindow({
            content: '<div><h4>Khimaira Farm</h4><p>2974 Stonyman Rd<br>Luray, VA 22835</p></div>'
        });

        var mimslynMarker = new google.maps.Marker({
            position: new google.maps.LatLng(38.664417, -78.466819),
            map: map,
            title: 'Mimslyn Inn',
            icon: icons.blue.hotel,
            zIndex: 2,
            weddingType: 'hotel'
        });
        var mimslynInfo = new google.maps.InfoWindow({
            content: '<div><h4>Mimslyn Inn</h4><p>401 W. Main Street<br>Luray, VA 22835</p></div>'
        });
        
        var hamptonMarker = new google.maps.Marker({
            position: new google.maps.LatLng(38.960593, -78.194782),
            map: map,
            title: 'Hampton Inn',
            icon: icons.blue.hotel,
            zIndex: 2,
            weddingType: 'hotel'
        });
        var hamptonInfo = new google.maps.InfoWindow({
            content: '<div><h4>Mimslyn Inn</h4><p>401 W. Main Street<br>Luray, VA 22835</p></div>'
        });

        var cavernsMarker = new google.maps.Marker({
            position: new google.maps.LatLng(38.663911, -78.483257),
            map: map,
            title: 'Luray Caverns',
            icon: icons.blue.caverns,
            zIndex: 1,
            weddingType: 'caverns'
        });
        var cavernsInfo = new google.maps.InfoWindow({
            content: '<div><h4>Luray Caverns</h4><p>101 Cave Hill Rd<br>Luray, VA 22835</p></div>'
        });

        google.maps.event.addListener(khimairaMarker, 'click', function () {
            mimslynInfo.close();
            cavernsInfo.close();
            khimairaInfo.open(map, khimairaMarker);
        });
        google.maps.event.addListener(mimslynMarker, 'click', function () {
            khimairaInfo.close();
            cavernsInfo.close();
            mimslynInfo.open(map, mimslynMarker);
        });
        google.maps.event.addListener(cavernsMarker, 'click', function () {
            khimairaInfo.close();
            mimslynInfo.close();
            cavernsInfo.open(map, cavernsMarker);
        });
        
        var markers = [
            khimairaMarker,
            mimslynMarker,
            hamptonMarker,
            cavernsMarker
        ];
        $('.panel-heading', '.panel-wedding').click(function () {
            var m;
            for (m=0; m<markers.length; m++) {
                markers[m]['z-index'] = 1;
                markers[m].setIcon(icons.blue[markers[m].weddingType]);
            }
            switch (this.id) {
                case 'khimairaPanel':
                    khimairaMarker.setIcon(icons.purple.khimaira);
                    khimairaMarker['z-index'] = 3;
                    break;
                case 'hotelsPanel':
                    mimslynMarker.setIcon(icons.purple.hotel);
                    hamptonMarker.setIcon(icons.purple.hotel);
                    mimslynMarker['z-index'] = 3;
                    hamptonMarker['z-index'] = 3;
                    break;
                case 'cavernsPanel':
                    cavernsMarker.setIcon(icons.purple.caverns);
                    cavernsMarker['z-index'] = 3;
                    break;
            }
        });
    }

    google.maps.event.addDomListener(window, 'load', mapInit);
});