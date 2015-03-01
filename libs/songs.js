function postSongToGoogle($form) {
    var formKey = '1906QMPalvWnym_SPhQVZvoJoZLkFBmzio8RYbhbqHek';
    var sheetKey = '1vFmSEAErnL98lay5-9H6XUa5IgC5vZlANxJCPUypOKE';
    //var url = 'https://spreadsheets.google.com/feeds/list/1vFmSEAErnL98lay5-9H6XUa5IgC5vZlANxJCPUypOKE/od6/public/values?alt=json-in-script&callback=?';
    var url = 'https://script.google.com/macros/s/AKfycbwWPxKWiK33tNF_9wUlS_uSLGI3UjtgBlAB2nSdjQUIVNEheU01/exec';
    var name = $('#name').val();
    var song = $('#title').val();
    var artist = $('#artist').val();

    if ((name !== "") && (song !== "")) {
        var serializedData = $form.serialize();
        console.log(serializedData);
        var request = $.ajax({
            url: url,
            type: 'POST',
            data: serializedData
        });
        
        request.done(function (result,status,xhr) {
            console.log('success', result,status,xhr);
            alert("Thanks for helping us with the playlist!");
        });
        request.fail(function (xhr,status,error) {
            console.log('error', xhr,status,error);
        });
        request.always(function () {
            $('#name').val("");
            $('#title').val("");
            $('#artist').val("");
        });
        
        /*$.getJSON(url,
        function (data) {
            console.log(data.feed)
            //console.log(data.feed.entry[0]['gsx$title']['$t'])
            console.log(data);
        }).success(function (data) {
            console.log('success', data);
        }).error(function (message) {
            console.log('error', message);
        }).complete(function () {
            console.log('complete');
        });
        
        $.ajax({
            url: url, //"https://docs.google.com/forms/d/" + formKey + "/formResponse",
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
        });*/
    } else {
        //Error message
    }
}

$(document).ready(function () {
    $('#songForm').submit(function (evt) {
        try {
            evt.preventDefault();
            postSongToGoogle($(this));
        } catch (e) {
            console.log(e.message);
        }

    });
});
