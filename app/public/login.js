/**
 * Created by kristys on 2017-10-24.
 */
function login() {
    //Todo: remove hardcoded data and get it from the user
    //var data = {email: 'test@test.com', pw: 'password'};
    var emailEntered = document.getElementById("email").value;
    var pwEntered    = document.getElementById("password").value;
    var data = {email: emailEntered, pw: pwEntered};

    // type of user (admin, candidate, recruiter)
    var user = document.querySelector('input[name="optradio"]:checked').value;
    var reqURL = "http://localhost:1234/login/" + user;
    var resURL = "http://localhost:1234/" + user + "dashboard.html";
    console.log(reqURL);

    $.ajax({
        url: reqURL,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        type: "POST",
        success: function(res) {
            window.location.href = resURL;
        },
        error: function (err) {
            console.log(err);
            alert(err.responseText);
        }
    });

}