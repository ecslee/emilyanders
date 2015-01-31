$("#welcome").backstretch("images/walden-blur.jpg");
//$("#our-story").backstretch("gallery/purple/dome.jpg");
//$("#wedding").backstretch("gallery/green/log.jpg");
//$("#gallery").backstretch("gallery/bw/sculpture.jpg");
//$("#thanks").backstretch("gallery/purple/stata.jpg");
$(".section").css("min-height", $(window).height() + 130);

$('#ecs-navbar').on('affix.bs.affix', function () {
    $(this).addClass('navbar-fixed-top');
    $(this).removeClass('col-sm-8 col-sm-offset-2');
}).on('affix-top.bs.affix', function () {
    $(this).removeClass('navbar-fixed-top');
    $(this).addClass('col-sm-8 col-sm-offset-2');
});

var section = {
    now: 'welcome',
    s: ['welcome', 'our-story', 'wedding', 'gallery', 'thanks'],
    getCurrentIndex: function ()  {
        return Math.max(0, Math.floor($(window).scrollTop() / $(window).height()));
    },
    getCurrent: function () {
        var i;
        var center = $(window).scrollTop() + $(window).height()/2;
        for (var i=0; i < section.s.length; i++) {
            if ($('#' + section.s[i]).offset().top > center) {
                return i-1;
            }
        }
        return i-1;
    }
};

// TODO: make this smoother
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
        j, move = false;

    switch (e.which) {
        case 38: // up
        case 33:
            j = Math.max(i-1, 0);
            move = !(i===j);
            break;
        case 40: // down
        case 34:
            j = Math.min(i+1, section.s.length-1);
            move = !(i===j);
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
                j = Math.max(i-1, 0);
            } else {
                j = Math.min(i+1, section.s.length-1);
            }
            move = !(i===j);
            break;
    }

    if (move) {
        $('a[href="#' + section.s[j] + '"]').click();
    }
    return;
});

$('.navbar a').click(function (e) {
    e.preventDefault();
    
    section.now = this.hash.substr(1);
    $('html,body').animate({
        scrollTop: $('#' + section.now).offset().top
    }, 800);
});
