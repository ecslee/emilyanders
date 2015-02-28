/*global $, document, window, console*/

$(document).ready(function () {
    "use strict";

    //$("#welcome").backstretch("images/walden-blur.jpg");
    //$("#welcome").backstretch("gallery/purple/sculpture.jpg");
    //$("#registry").backstretch("gallery/purple/dome.jpg");
    //$("#wedding").backstretch("gallery/green/log.jpg");
    //$("#gallery").backstretch("gallery/bw/sculpture.jpg");
    //$("#guests").backstretch("gallery/purple/stata.jpg");
    $(".section").css("min-height", $(window).height() + 130);

    /*
     * Navbar
     * Mobile: always affix to top
     * Other: affix to top after welcome section
     * Only show brand icon when affixed to top
     */    
    $('#ecs-navbar').on('affix.bs.affix', function () {
        $(this).addClass('navbar-fixed-top');
        $(this).removeClass('col-sm-12');
    }).on('affix-top.bs.affix', function () {
        $(this).removeClass('navbar-fixed-top');
        $(this).addClass('col-sm-12');
    });
    
    var navbarOffset = 500;
    $('#ecs-navbar').affix({
        offset: {
            top: function () {
                console.log('offset', navbarOffset)
                return ($(window).width() < 768 ? -100 : navbarOffset);
            }
        }
    });

    $(document).click(function (evt) {
        var closestNavbar = $(evt.target).closest('.navbar');
        if ($('.navbar-collapse').hasClass('in') && (closestNavbar.length === 0 || evt.target.nodeName === 'A')) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    var section = {
        now: 'welcome',
        s: ['welcome', 'wedding', 'us', 'guests', 'map', 'registry', 'gallery'],
        getCurrentIndex: function () {
            return Math.max(0, Math.floor($(window).scrollTop() / $(window).height()));
        },
        getCurrent: function () {
            var i,
                center = $(window).scrollTop() + $(window).height() / 2;
            for (i = 0; i < section.s.length; i++) {
                if ($('#' + section.s[i]).offset().top > center) {
                    return i - 1;
                }
            }
            return i - 1;
        }
    };

    // click navbar
    $('.navbar a').click(function (e) {
        e.preventDefault();

        section.now = this.hash.substr(1);
        $('html,body').animate({
            scrollTop: $('#' + section.now).offset().top
        }, 800);
    });

    // scroll with keyboard shortcuts
    $(document).keydown(function (e) {
        switch (e.which) {
        case 38: // up
        case 33:
        case 40: // down
        case 34:
        case 36: // home
        case 35: // end
        case 37: // left
        case 39: // right
        case 32: // spacebar
            e.preventDefault();
            break;
        }
    }).keyup(function (e) {
        var i = section.getCurrent(),
            j,
            move = false;

        switch (e.which) {
        case 38: // up
        case 33:
            j = Math.max(i - 1, 0);
            move = !(i === j);
            break;
        case 40: // down
        case 34:
            j = Math.min(i + 1, section.s.length - 1);
            move = !(i === j);
            break;
        case 36: // home
            i = 0;
            break;
        case 35: // end
            i = section.s.length;
            break;
        case 37: // left
            break;
        case 39: // right
            break;
        case 32: // spacebar
            if (e.shiftKey) {
                j = Math.max(i - 1, 0);
            } else {
                j = Math.min(i + 1, section.s.length - 1);
            }
            move = !(i === j);
            break;
        }

        if (move) {
            $('a[href="#' + section.s[j] + '"]').click();
        }
        return;
    });

    $(window).resize(function () {
        // trigger a scroll event to reset the navbar position
        navbarOffset = parseInt($('.welcome-info').css('height')) + $('.welcome-info').offset().top + 62;
        $(window).scroll();
        
        // reset margin between wedding party pics
        // .css('height') includes border, .height() just gets content height
        var picHeight = parseInt($('.img-circle', '.wedding-party-pics').css('height'), 10),
            margin = (100 - picHeight) / 2;
        $('.img-circle', '.wedding-party-pics').css('margin', margin + 'px 0');
    });
    
    // after the images are loaded, trigger a resize to get alignment cleaned up
    var imagesLoaded = 0,
        expectedImages = $('.img-circle').length;
    $('.img-circle').load(function () {
        imagesLoaded++;
        if (imagesLoaded === expectedImages) {
            $(window).resize();
        }
    });
    
    // when opening a wedding party modal, center vertically
    $('.wedding-party-modal').click(function (evt) {
        var closestModal = $(evt.target).closest('.wedding-party-modal');
        if (closestModal.length > 0) {
            closestModal.modal('hide');
        }
    }).on('shown.bs.modal', function (evt) {
        if (evt.target) {
            // recenter wedding party pic modals
            var marginTop = Math.max(($(window).height() - $('.modal-dialog', evt.target).height()) / 2, 10),
                modalType = $(evt.target).hasClass('modal-h') ? '.modal-h' : '.modal-v';
            $('.modal-dialog', modalType).css('margin-top', marginTop);
        }
    });
    
    // map section
    var map;
    function mapInit() {
        var khimairaLatLong = new google.maps.LatLng(38.628217, -78.428725);
        var mapOptions = {
            zoom: 8,
            center: khimairaLatLong
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        
        var khimaira = new google.maps.Marker({
            position: khimairaLatLong,
            map: map,
            title: 'Khimaira Farm'
        });
        var khimairaInfo = new google.maps.InfoWindow({
            content: '<div><h4>Khimaira Farm</h4><p>2974 Stonyman Rd<br>Luray, VA 22835</p></div>'
        });
        
        var mimslyn = new google.maps.Marker({
            position: new google.maps.LatLng(38.664417, -78.466819),
            map: map,
            title: 'Mimslyn Inn'
        });
        var mimslynInfo = new google.maps.InfoWindow({
            content: '<div><h4>Mimslyn Inn</h4><p>401 W. Main Street<br>Luray, VA 22835</p></div>'
        });
        
        var caverns = new google.maps.Marker({
            position: new google.maps.LatLng(38.663911, -78.483257),
            map: map,
            title: 'Luray Caverns'
        });
        var cavernsInfo = new google.maps.InfoWindow({
            content: '<div><h4>Luray Caverns</h4><p>101 Cave Hill Rd<br>Luray, VA 22835</p></div>'
        });
        
        google.maps.event.addListener(khimaira, 'click', function() {
            mimslynInfo.close();
            khimairaInfo.open(map, khimaira);
        });
        google.maps.event.addListener(mimslyn, 'click', function() {
            khimairaInfo.close();
            mimslynInfo.open(map, mimslyn);
        });
        google.maps.event.addListener(caverns, 'click', function() {
            cavernsInfo.close();
            cavernsInfo.open(map, caverns);
        });
    }
    google.maps.event.addDomListener(window, 'load', mapInit);
});
