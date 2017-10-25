/**
 * Created by kristys on 2017-10-24.
 */
function login() {
    //Todo: remove hardcoded data and get it from the user
    var data = {email: 'test@test.com', pw: 'password'};
    $.ajax({
        url: "http://localhost:1234/login/admin",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        type: "POST",
        success: function(res) {
            window.location.href = 'http://localhost:1234/admindashboard.html';

        },
        error: function (err) {
            console.log(err);
            alert(err.responseText);
        }
    });

}