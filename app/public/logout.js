/**
 * Created by kristys on 2017-10-27.
 */
function logout() {
    $.ajax({
        url: "http://localhost:1234/logout",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (res) {
            window.location = res;
        },
        error: function (err) {
            console.log(err);
            alert(err.responseText);
        }
    });
}