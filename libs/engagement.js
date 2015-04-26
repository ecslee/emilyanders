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
        s: ['welcome', 'wedding', 'us', 'guests', 'luray', 'registry', 'gallery'],
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
        
        ga('send', 'event', 'navbar', 'click', this.hash.substring(1, this.hash.length));
    });

    // scroll with keyboard shortcuts
    $(document).keydown(function (e) {
        if (document.activeElement.tagName == 'INPUT') {
            return;
        }
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
        if (document.activeElement.tagName == 'INPUT') {
            return;
        }
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
            var id = $(evt.target).attr('id');
            ga('send', 'event', 'modal', 'show', id.substring(0, id.indexOf("Modal")));
        }
    });
    
    // registry links
    $('.registry-link').click(function () {
        var store = $('img', this).attr('alt-text');
        ga('send', 'event', 'registry', 'click', store);
    });
    
    $(document).resize();
});
