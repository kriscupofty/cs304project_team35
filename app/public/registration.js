/*
Created by Jiaxuan on Nov. 5, 2017
*/
$(document).ready(function() {
  $("#proceed").click(function() {
    var checked = document.querySelector('input[name="optradio"]:checked');
    if(checked == null)
    return alert("Please check the type of user you are.");
    let user = checked.value;
    window.location = "/" + user + "_register.html";
  });

  $("#admin_register").click(function() {
    var name = $("#name").val();
    var email = $("#email");
    var phone = $("#phone").val();
    var password = $("#password").val();
    var cpassword = $("#cpassword").val();
    var iden = $("#secret").val();
    var user = "admin";
    if (commonCheck(name,email,phone,password,cpassword)===true) {
      if (iden !== "8888") {
        alert("You failed to verify yourself as an administrator!");
      } else {
        if (phone.length === 0) {
          phone = null;
        } else if ($("#phone").is(':invalid')){
          return alert('Please enter a valid phone number!');
        }
        var data = {email: email.val(), name: name, phone: phone, pw: password};
        request(user,data);
      }
    }
  });
  $("#hosp").change(function() {
    if ($("#hosp option:selected").val() === "other"){
      $('#newHosp').show();
    } else $('#newHosp').hide();
  });

  $("#recr_register").click(function() {
    var name = $("#name").val();
    var email = $("#email");
    var phone = $("#phone").val();
    var password = $("#password").val();
    var cpassword = $("#cpassword").val();
    var hosp = $("#hosp option:selected").text();
    var user = "recruiter";
    if (commonCheck(name,email,phone,password,cpassword)===true) {
      if ($("#hosp option:selected").val() === " ") {
        alert("Please select the hospital you are woking for!");
      } else if (phone.length === 0) {
        phone = null;
      } else if ($("#phone").is(':invalid')){
        return alert('Please enter a valid phone number!');
      }
      if ($("#hosp option:selected").val() === "other"){
        var hname = $("#hname").val();
        var hloc = $("#hloc").val();
        var data = {name: name, email: email.val(), phone: phone, pw: password, hname: hname, hloc: hloc};
      } else
      var data = {name: name, email: email.val(), phone: phone, pw: password, hosp: hosp};
      request(user,data);
    }});

    $("#cand_register").click(function() {
      var name = $("#name").val();
      var email = $("#email");
      var phone = $("#phone").val();
      var password = $("#password").val();
      var cpassword = $("#cpassword").val();
      var empl = $("#empl option:selected").text();
      var spec = $("#spec option:selected").text();
      var user = "candidate";
      if (commonCheck(name,email,phone,password,cpassword)===true) {
        if ($("#spec option:selected").val() === " ")
        alert("Please select your specialty!");
        else {
          if (phone.length === 0) {
            phone = null;
          } else if ($("#phone").is(':invalid')){
            return alert('Please enter a valid phone number!');
          }
          if ($("#empl option:selected").val() === " ") empl = null;
          var data = {name: name, email: email.val(), phone: phone, pw: password, spec: spec, empl: empl};
          request(user,data)
        }}});

        function commonCheck(name,email,phone,password,cpassword) {
          var val = true;
          if (name == '' || email == '' || password == '' || cpassword == '') {
            alert("Please fill in all required fields.");
            val = false;
          } else if (email.is(':invalid')) {
            alert("Please enter a valid email address.");
            val = false;
          } else if (password.length < 6) {
            alert("Password should at least 6 character in length.");
            val = false;
          } else if (!(password).match(cpassword)) {
            alert("Your passwords don't match. Try again?");
            val = false;
          }
          return val;
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
              alert('Successfully signed up!')
            },
            error: function (err) {
              if (err.responseJSON.errno == 1062)
              return alert("Email already used for registration.");
              else return alert(err.responseText);
            }
          });
        }
      });
