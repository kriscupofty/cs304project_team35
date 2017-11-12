$(document).ready(function () {
    $('main.container').toggle();
    $.ajax({
        url: "http://localhost:1234/isloggedin/admin",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (res) {
            $('main.container').toggle();
        },
        error: function (err) {
            $('#log').text('Log in');
            $('main.container').empty().append("<h2>Please log in as a Recruiter first.</h2>").toggle();

        }
    });
});