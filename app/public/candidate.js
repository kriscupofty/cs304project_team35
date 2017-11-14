$(document).ready(function () {
    $('main.container').toggle();
    $.ajax({
        url: "http://localhost:1234/isloggedin/candidate",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (res) {
            $('main.container').toggle();
            displayAS();
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
              columns: [{field: 'postingID', title: 'Applied Posting ID'},
                  {field: 'hname', title: 'Hospital Name'},
                  {field: 'pname', title: 'Program Name'},
                  {field: 'duration', title: 'Program Duration'},
                  {field: 'specialty', title: 'Required Sepcialty'},
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
