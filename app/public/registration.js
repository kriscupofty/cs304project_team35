/*
Created by Jiaxuan on Nov. 5
*/
$(document).ready(function() {
  $("#proceed").click(function() {
    var checked = document.querySelector('input[name="optradio"]:checked');
    if(checked == null)
    return alert("Please check the type of user you are.");
    let user = checked.value;
    $.ajax({
      contentType: "text/html; charset=utf-8",
      type: "GET",
      success: function(res) {
        window.location.href = "http://localhost:1234/" + user + "_register.html";
      },
      error: function (err) {
        console.log(err);
        alert(err.responseText);
      }});
    });

    function commonCheck(name,email,phone,password,cpassword) {
      if (name == '' || email == '' || password == '' || cpassword == '') {
        alert("Please fill in all required fields.");
      } else if (email.indexOf('@') == -1 ) {
        alert("Please enter a valid email address.");
      } else if (password.length < 6) {
        alert("Password should at least 6 character in length.");
      } else if (!(password).match(cpassword)) {
        alert("Your passwords don't match. Try again?");
      }
    }

    function request(user,data) {
      var reqURL = "http://localhost:1234/register/" + user;
      var resURL = "http://localhost:1234" ;
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

    $("#admin_register").click(function() {
      var name = $("#name").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var password = $("#password").val();
      var cpassword = $("#cpassword").val();
      var iden = $("#secret").val();
      var user = "admin";
      commonCheck(name,email,phone,password,cpassword);
      if (iden !== "8888") {
        alert("You failed to verify yourself as an administrator!");
      } else {
        if (phone.length === 0) {
          phone = null;
        }
        var data = {name: name, email: email, phone: phone, pw: password};
        request(user,data);
      }
    });

    $("#recr_register").click(function() {
      var name = $("#name").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var password = $("#password").val();
      var cpassword = $("#cpassword").val();
      var hosp = $("#hosp option:selected").text();
      var user = "recruiter";
      commonCheck(name,email,phone,password,cpassword);
      if ($("#hosp option:selected").val() === " ") {
        alert("Please select the hospital you are woking for!");
      } else {
        if (phone.length === 0) {
          phone = null;
        }
        var data = {name: name, email: email, phone: phone, pw: password, hosp: hosp};
        request(user,data);
      }});

      $("#cand_register").click(function() {
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var password = $("#password").val();
        var cpassword = $("#cpassword").val();
        var empl = $("#empl").val();
        var spec = $("#spec option:selected").text();
        var user = "candidate";
        commonCheck(name,email,phone,password,cpassword);
        if ($("#spec option:selected").val() === " ")
          alert("Please select your specialty!");
         else {
          if (phone.length === 0) phone = null;
          if (empl.length === 0) empl = null;
          var data = {name: name, email: email, phone: phone, pw: password, spec: spec, empl: empl};
        request(user,data)
      }});


    $("#back").click(function() {
      $.ajax({
          contentType: "text/html; charset=utf-8",
          type: "GET",
          success: function(res) {
              window.location.href = "http://localhost:1234/register.html";
          },
          error: function (err) {
              console.log(err);
              alert(err.responseText);
          }
      });
    });
});
