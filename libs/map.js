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
                khimaira: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=K|4A2544|FFFFFF',
                hotelHampton: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|4A2544|FFFFFF',
                hotelHoliday: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=2|4A2544|FFFFFF',
                hotelBest: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=3|4A2544|FFFFFF',
                caverns: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=L|4A2544|FFFFFF',
                shenandoah: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=S|4A2544|FFFFFF',
                wine: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=W|4A2544|FFFFFF'
            },
            blue: {
                khimaira: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=K|9AD0FF|444444',
                hotelHampton: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|9AD0FF|444444',
                hotelHoliday: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=2|9AD0FF|444444',
                hotelBest: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=3|9AD0FF|444444',
                caverns: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=L|9AD0FF|444444',
                shenandoah: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=S|9AD0FF|444444',
                wine: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=W|9AD0FF|444444'
            }
        };
        
        var khimairaLatLong = new google.maps.LatLng(38.628217, -78.428725);
        var mapOptions = {
            zoom: 9,
            center: new google.maps.LatLng(38.762418, -78.279751)
            //center: khimairaLatLong
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Khimaira - 2974 Stonyman Rd, Luray, VA 22835
        var khimairaInfo = new google.maps.InfoWindow({
            content: '<div><h4>Khimaira Farm</h4><p>2974 Stonyman Rd<br>Luray, VA 22835</p></div>'
        });
        var khimairaMarker = new google.maps.Marker({
            position: khimairaLatLong,
            map: map,
            title: 'Khimaira Farm',
            icon: icons.purple.khimaira,
            zIndex: 3,
            weddingType: 'khimaira',
            weddingInfo: khimairaInfo,
            weddingPanel: 'khimairaPanel'
        });
        
        // Hampton - 9800 Winchester Rd, Front Royal, VA 22630
        var hamptonInfo = new google.maps.InfoWindow({
            content: '<div><h4>Hampton Inn</h4><p>9800 Winchester Rd<br>Front Royal, VA 22630</p></div>'
        });
        var hamptonMarker = new google.maps.Marker({
            position: new google.maps.LatLng(38.960593, -78.194782),
            map: map,
            title: 'Hampton Inn',
            icon: icons.blue.hotelHampton,
            zIndex: 2,
            weddingType: 'hotelHampton',
            weddingInfo: hamptonInfo,
            weddingPanel: 'hotelsPanel'
        });
        
        // Holiday - 1130 Motel Dr, Woodstock, VA 22664
        var holidayInfo = new google.maps.InfoWindow({
            content: '<div><h4>Mimslyn Inn</h4><p>1130 Motel Dr<br>Woodstock, VA 22664</p></div>'
        });
        var holidayMarker = new google.maps.Marker({
            position: new google.maps.LatLng(38.869607, -78.527165),
            map: map,
            title: 'Holiday Inn',
            icon: icons.blue.hotelHoliday,
            zIndex: 2,
            weddingType: 'hotelHoliday',
            weddingInfo: holidayInfo,
            weddingPanel: 'hotelsPanel'
        });
        
        // Best Western - 410 W Main St, Luray, VA 22835
        var bestwestInfo = new google.maps.InfoWindow({
            content: '<div><h4>Best Western</h4><p>410 W Main St<br>Luray, VA 22835</p></div>'
        });
        var bestwestMarker = new google.maps.Marker({
            position: new google.maps.LatLng(38.665769, -78.466715),
            map: map,
            title: 'Best Western',
            icon: icons.blue.hotelBest,
            zIndex: 2,
            weddingType: 'hotelBest',
            weddingInfo: bestwestInfo,
            weddingPanel: 'hotelsPanel'
        });

        // Caverns: 101 Cave Hill Rd, Luray, VA 22835
        var cavernsInfo = new google.maps.InfoWindow({
            content: '<div><h4>Luray Caverns</h4><p>101 Cave Hill Rd<br>Luray, VA 22835</p></div>'
        });
        var cavernsMarker = new google.maps.Marker({
            position: new google.maps.LatLng(38.663911, -78.483257),
            map: map,
            title: 'Luray Caverns',
            icon: icons.blue.caverns,
            zIndex: 1,
            weddingType: 'caverns',
            weddingInfo: cavernsInfo,
            weddingPanel: 'cavernsPanel'
        });
        
        // Shenandoah -  US Highway 211 East, Luray, VA 22835 (Thornton Gap entrance)
        var shenandoahInfo = new google.maps.InfoWindow({
            content: '<div><h4>Shenandoah National Park</h4><p>Thornton Gap entrance<br>US Highway 211 East<br>Luray, VA 22835</p></div>'
        });
        var shenandoahMarker = new google.maps.Marker({
            position: new google.maps.LatLng(38.662387, -78.320798),
            map: map,
            title: 'Shenandoah National Park',
            icon: icons.blue.shenandoah,
            zIndex: 1,
            weddingType: 'shenandoah',
            weddingInfo: shenandoahInfo,
            weddingPanel: 'shenandoahPanel'
        });

        // open and close markers
        var markers = [khimairaMarker, hamptonMarker, holidayMarker, bestwestMarker, cavernsMarker, shenandoahMarker];
        var infos = [khimairaInfo, hamptonInfo, holidayInfo, bestwestInfo, cavernsInfo, shenandoahInfo];
        function clickMarker(evt) {
            for (var i=0; i < infos.length; i++) {
                infos[i].close();
            }
            this.weddingInfo.open(map, this);
        }
        for (var m=0; m < markers.length; m++) {
            google.maps.event.addListener(markers[m], 'click', clickMarker);
        }
        
        $('.panel-heading', '.panel-wedding').click(function () {
            var m;
            for (var m = 0, len = markers.length; m < len; m++) {
                if (markers[m].weddingPanel == this.id) {
                    markers[m].setIcon(icons.purple[markers[m].weddingType]);
                    markers[m]['z-index'] = 3;
                } else {
                    markers[m]['z-index'] = 1;
                    markers[m].setIcon(icons.blue[markers[m].weddingType]);
                }
            }
        });
    }

    google.maps.event.addDomListener(window, 'load', mapInit);
});