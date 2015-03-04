$(document).ready(function () {
    /* map accordion */
    $('.panel-heading').click(function () {
        if ($(this).next().hasClass('panel-open')) {
            return;
        }
        
        $('.panel-body').removeClass('panel-open', 500, 'easeInOutCubic');
        $(this).next().addClass('panel-open', 500, 'easeInOutCubic');
    });

    /* google map */
    var map;
    function mapInit() {
        var khimairaLatLong = new google.maps.LatLng(38.628217, -78.428725);
        var mapOptions = {
            zoom: 8,
            // Warrenton, VA - recenter on page resize
            center: new google.maps.LatLng(38.729663, -77.792662)
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var khimaira = new google.maps.Marker({
            position: khimairaLatLong,
            map: map,
            title: 'Khimaira Farm',
            icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|4A2544|FFFFFF',
            zIndex: 3
        });
        var khimairaInfo = new google.maps.InfoWindow({
            content: '<div><h4>Khimaira Farm</h4><p>2974 Stonyman Rd<br>Luray, VA 22835</p></div>'
        });

        var mimslyn = new google.maps.Marker({
            position: new google.maps.LatLng(38.664417, -78.466819),
            map: map,
            title: 'Mimslyn Inn',
            icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=2|4A2544|FFFFFF',
            zIndex: 2
        });
        var mimslynInfo = new google.maps.InfoWindow({
            content: '<div><h4>Mimslyn Inn</h4><p>401 W. Main Street<br>Luray, VA 22835</p></div>'
        });

        var caverns = new google.maps.Marker({
            position: new google.maps.LatLng(38.663911, -78.483257),
            map: map,
            title: 'Luray Caverns',
            icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=3|4A2544|FFFFFF',
            zIndex: 1
        });
        var cavernsInfo = new google.maps.InfoWindow({
            content: '<div><h4>Luray Caverns</h4><p>101 Cave Hill Rd<br>Luray, VA 22835</p></div>'
        });

        google.maps.event.addListener(khimaira, 'click', function () {
            mimslynInfo.close();
            cavernsInfo.close();
            khimairaInfo.open(map, khimaira);
        });
        google.maps.event.addListener(mimslyn, 'click', function () {
            khimairaInfo.close();
            cavernsInfo.close();
            mimslynInfo.open(map, mimslyn);
        });
        google.maps.event.addListener(caverns, 'click', function () {
            khimairaInfo.close();
            mimslynInfo.close();
            cavernsInfo.open(map, caverns);
        });
    }

    google.maps.event.addDomListener(window, 'load', mapInit);
});