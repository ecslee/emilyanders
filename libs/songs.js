function postSongToGoogle($form) {
    var url = 'https://script.google.com/macros/s/AKfycbwWPxKWiK33tNF_9wUlS_uSLGI3UjtgBlAB2nSdjQUIVNEheU01/exec';
    var name = $('#name').val();
    var song = $('#title').val();
    var artist = $('#artist').val();

    if ((name !== "") && (song !== "")) {
        var serializedData = $form.serialize();
        var request = $.ajax({
            url: url,
            type: 'POST',
            data: serializedData,
            success: function (result,status,xhr) {
                console.log(serializedData);
                $('#songForm').addClass('hidden');
                $('.songSuccess').removeClass('hidden');
            },
            error: function (xhr,status,error) {
                console.log('error', xhr,status,error);
            },
            complete: function () {
                $('#name').val("");
                $('#title').val("");
                $('#artist').val("");
            }
        });
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
    $('#anotherSong').click(function () {
        $('.songSuccess').addClass('hidden');
        $('#songForm').removeClass('hidden');
    });
});
