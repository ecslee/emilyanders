function postSongToGoogle() {
    var formKey = '1906QMPalvWnym_SPhQVZvoJoZLkFBmzio8RYbhbqHek';
    var name = $('#name').val();
    var song = $('#song').val();
    var artist = $('#artist').val();

    if ((name !== "") && (song !== "")) {
        $.ajax({
            url: "https://docs.google.com/forms/d/" + formKey + "/formResponse",
            data: {
                "entry.1327441261": song,
                "entry.7876010": artist,
                "entry.1730225343": name
            },
            type: "POST",
            crossDomain: true,
            dataType: 'jsonp',
            accepts: 'text/javascript',
            success: function (result,status,xhr) {
                console.log('success', result,status,xhr);
            },
            error: function (xhr,status,error) {
                console.log('error', xhr,status,error);
            },
            complete: function () {
                $('#name').val("");
                $('#song').val("");
                $('#artist').val("");
            }
        });
    } else {
        //Error message
    }
}

$(document).ready(function () {
    $('#songForm').submit(function (evt) {
        try {
            evt.preventDefault();
            postSongToGoogle();
        } catch (e) {
            console.log(e.message);
        }

    });
});
