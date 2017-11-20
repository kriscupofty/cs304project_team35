$(document).ready(function () {
    $('main.container').toggle();
    $.ajax({
        url: "http://localhost:1234/isloggedin/candidate",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (res) {
            $('main.container').toggle();
            displayAS();
            displayProfile();
            displayApplication();
            displayPostings();
        },
        error: function (err) {
            $('#log').text('Log in');
            $('main.container').empty().append("<h2>Please log in as a Candidate first.</h2>").toggle();

        }
    });

    $(".nav-link").on("click", function(){
        $(".nav-link.active").removeClass("active");
        $(this).addClass("active");
    });
});

function displayAS(){
  $.ajax({
      url: "http://localhost:1234/candidate/applintv",
      contentType: "application/json; charset=utf-8",
      type: "GET",
      success: function (res) {
          $('#intv_table').bootstrapTable({
              columns: [
                  {field: 'postingID', title: 'Posting ID'},
                  {field: 'hname', title: 'Hospital Name'},
                  {field: 'pname', title: 'Program Name'},
                  {field: 'duration', title: 'Program Duration'},
                  {field: 'specialty', title: 'Required Specialty'},
                  {field: 'deadline', title: 'Application Deadline'},
                  {field: 'intvRound', title: 'Interview Round'},
                  {field: 'intvTime', title: 'Interview Time'},
                  {field: 'intvLoc', title: 'Interview Location'}],
              data: res
          });
      },
      error: function (err) {
          console.log(err);
      }
  });
}

function displayProfile() {
  $.ajax({
    url: "http://localhost:1234/candidate/profile",
    contentType: "application/json; charset=utf-8",
    type: "GET",
    success: function(res) {

      $('#name').val(res[0].name);
      $('#email').val(res[0].email);
      $('#phone').val(res[0].phone);
      $('#specialty').val(res[0].specialty);
      $('#employmentStatus').val(res[0].employmentStatus);

    },
    error: function(err) {
      console.log(err);
    }
  });
}

function editProfile() {
  $('#name').attr("disabled", false);
  //$('#email').attr("disabled", false);
  $('#phone').attr("disabled", false);
  $('#specialty').attr("disabled", false);
  $('#specialty').hide();
  $('#newSpec').show();
  $('#employmentStatus').attr("disabled", false);
  $('#employmentStatus').hide();
  $('#newEmpl').show();
}

function updateProfile() {
  var name = $('#name').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var specialty = $("#spec option:selected").text();
  var employmentStatus = $("#empl option:selected").text();
  if (name == '' || email == '' || phone == '' || $("#spec option:selected").val() == " " || $("#empl option:selected").val() == " ") {
    alert('Please enter all fields.');
  }
  if ($("#otherSpec").is(':visible')){
    specialty = $("#nspec").val();
    $('#otherSpec').hide();
  } else $('#newSpec').hide();
  $('#specialty').show();
  $('#employmentStatus').show();
  $('#newEmpl').hide();
  var data = [name, phone, specialty, employmentStatus, email];

  $.ajax({
    url: "http://localhost:1234/candidate/updateProfile",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({values: data}),
    type: "POST",
    success: function(res) {

      $('#name').attr("disabled", true);
      $('#email').attr("disabled", true);
      $('#phone').attr("disabled", true);
      $('#specialty').attr("disabled", true);
      $('#employmentStatus').attr("disabled", true);
      displayProfile();
      return alert(res);

    },
    error: function(err) {
      console.log(err);
    }
  });
}

$(document).ready(function()
{
  $("#spec").change(function() {
    if ($("#spec option:selected").val() === "other"){
      $('#otherSpec').show();
      $('#newSpec').hide();
    } else {
      $('#otherSpec').hide();
      $('#newSpec').show();
    }
  });

  $("#fileuploader").uploadFile({
  url:"/packages/",
  fileName:"myfile"
  });
});



function displayApplication() {
  $.ajax({
    url: "http://localhost:1234/candidate/application",
    contentType: "application/json; charset=utf-8",
    type: "GET",
    success: function(res) {
      $('#app_table').bootstrapTable({
        columns: [
            {field: 'postingID', title: 'Posting ID'},
            {field: 'name', title: 'Hospital Name'},
            {field: 'pname', title: 'Program Name'},
            {field: 'duration', title: 'Program Duration'},
            {field: 'specialty', title: 'Required Specialty'},
            {field: 'time', title: 'Date Submitted'}
        ],
        data: res
      });
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function addAppl() {
    var postID = $('#postID').val(), docPath = "/packages/";
    var d = new Date();
    var time = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
    if (postID == '')
        return alert('Please enter all fields.');
    data={postID: postID, docPath: docPath, time: time};
    $.ajax({
        url: "http://localhost:1234/candidate/addApplication",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        type: "POST",
        success: function () {
            alert("Applied successfully.");
        },
        error: function (err) {
            if (err.responseJSON.errno == 1452)
                return alert("Please enter a valid postig ID.");
            else if (err.responseJSON.errno == 1062)
                return alert("Already applied");
            else return alert(err.responseJSON.code);
        }
    });
}
function displayPostings() {
  $.ajax({
    url: "http://localhost:1234/candidate/postings",
    contentType: "application/json; charset=utf-8",
    type: "GET",
    success: function(res) {
      $('#posting_table').bootstrapTable({
        columns: [{field: 'postingID', title: 'Posting ID'},
            {field: 'name', title: 'Hospital Name'},
            {field: 'pname', title: 'Program Name'},
            {field: 'duration', title: 'Program Duration'},
            {field: 'specialty', title: 'Required Specialty'},
            {field: 'deadline', title: 'Application Deadline'},
            {field: 'numslots', title: 'Number of Slots Available'},
            {field: 'recruiterEmail', title: 'Recruiter Email'}
        ],
        data: res
      });
        $('div.pull-left.pagination').css({'display': 'inline-block'});
        $('div.pull-right.pagination-detail').css({'display': 'inline-block','position': 'absolute',  'right': '0px'});

    },
    error: function(err) {
      console.log(err);
    }
  });
}
