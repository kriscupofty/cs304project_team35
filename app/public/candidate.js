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
                  {field: 'intvTime', title: 'Interview Date'},
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
      $('#profile_table').bootstrapTable({
        columns: [
            {field:'name', title: 'Name'},
            {field:'email', title: 'Email'},
            {field:'phone', title: 'Phone', editable: true},
            {field:'specialty', title: 'Specialty', editable: true},
            {field:'employmentStatus', title: 'Employment Status', editable: true}
        ],
        data: res
      });
    },
    error: function(err) {
      console.log(err);
    }
  });  
}

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

function displayPostings() {
  $.ajax({
    url: "http://localhost:1234/candidate/postings",
    contentType: "application/json; charset=utf-8",
    type: "GET",
    success: function(res) {
      $('#posting_table').bootstrapTable({
        columns: [
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
