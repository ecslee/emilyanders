var autoScroll = false;

$("#welcome").backstretch("images/walden-blur.jpg");
$("#our-story").backstretch("gallery/purple/dome.jpg");
$("#wedding").backstretch("gallery/green/log.jpg");
$("#gallery").backstretch("gallery/bw/sculpture.jpg");
$("#thanks").backstretch("gallery/purple/stata.jpg");
$(".section").css("min-height", $(window).height() + 130);

var section = {
    now: 'welcome',
    s: ['welcome', 'our-story', 'wedding', 'gallery', 'thanks']
};

$(window).scroll(function (event) {
    var curId = section.s[getCurrentSectionIndex()];
    section.now = curId;
    
    if (!autoScroll) {
        $('a', '.navbar').removeClass('active');
        $('a[href="#'+curId+'"]', '.navbar').addClass('active');
    }

    if (curId === 'welcome') {
        $('.navbar.fixed').addClass('hide');
    } else {
        $('.navbar.fixed').removeClass('hide');
    }
});

function getCurrentSectionIndex() {
    return Math.max(0, Math.floor($(window).scrollTop() / $(window).height()));
}

// TODO: make this smoother
$(document).keydown(function (e) {
    var i = section.s.indexOf(section.now);
    var move = false;

    switch (e.which) {
        case 38: // up
        case 33:
            var j = Math.max(i-1, 0);
            move = !(i===j);
            break;
        case 40: // down
        case 34:
            var j = Math.min(i+1, section.s.length-1);
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
            var j;
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
});

$('.navbar a').click(function () {
    section.now = this.hash.substr(1);
    $('.navbar a').removeClass('active');
    autoScroll = true;
    setTimeout(function () {
        $('a[href="' + this.hash + '"]').addClass('active');
        autoScroll = false;
    }, 1000);
});
