function postContactToGoogle() {
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
            dataType: "xml",
            statusCode: {
                0: function () {
                    $('#name').val("");
                    $('#song').val("");
                    $('#artist').val("");
                    //Success message
                },
                200: function () {
                    $('#name').val("");
                    $('#song').val("");
                    $('#artist').val("");
                    //Success Message
                }
            }
        });
    } else {
        //Error message
    }
}