$(document).ready(function () {
  $('main.container').toggle();
  $.ajax({
    url: "http://localhost:1234/isloggedin/recruiter",
    contentType: "application/json; charset=utf-8",
    type: "GET",
    success: function (res) {
      $('main.container').toggle();
      displayPostings();
    },
    error: function (err) {
      $('#log').text('Log in');
      $('main.container').empty().append("<h2>Please log in as a Recruiter first.</h2>").toggle();

    }
  });

  $(".nav-link").on("click", function(){
    $(".nav-link.active").removeClass("active");
    $(this).addClass("active");
  });
});

function postVacancy() {
  var pname = $('#pname').val(), dur = $('#dur').val();
  var spec = $('#spec').val(), ddl = $('#ddl').val(), slots = $('#slots').val();
  if(pname == '' || dur == '' || spec == '' || ddl == '')
  return alert('Please enter all required fields.');

  var data = {pname: pname, dur:dur, spec:spec, ddl:ddl, slots:parseInt(slots)};
  $.ajax({
    url: "http://localhost:1234/recruiter/postVacancy",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    type: "POST",
    success: function () {
      alert("Successfully posted vacancy for a program!");
    },
    error: function (err) {
      console.log(err);
      alert(err.responseText);
    }
  });
}

function displayPostings() {
  $.ajax({
    url: "http://localhost:1234/recruiter/postings",
    contentType: "application/json; charset=utf-8",
    type: "GET",
    success: function (res) {
      $('#post_table').bootstrapTable({
        columns: [{field: 'postingID', title: 'Posting ID'},
        {field: 'pname', title: 'Program Name'},
        {field: 'duration', title: 'Program Duration'},
        {field: 'specialty', title: 'Sepcialty'},
        {field: 'deadline', title: 'Program Deadline'},
        {field: 'numslots', title: 'Number of Slots Available'}],
        data: res
      });
    },
    error: function (err) {
      console.log(err);
    }
  });
}

function deletePosting() {
  var postID = $('#postID').val();
  if (postID === '')
  return alert("Please specify the posting ID of the one you want to delete.");
  var data = {postingID: parseInt(postID)};
  $.ajax({
    url: "http://localhost:1234/recruiter/deletePosting/" + postID,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    type: "DELETE",
    statusCode: {
      204: function(res) {
        alert("Please enter an ID of a posting posted by you.");
      },
      200: function(res) {
        alert(res);
      }
    },
    error: function (err) {
      console.log(err);
      alert(err.responseText);
    }
  });
}

function updatePname(){
  var postID = $('#postID').val();
  var pname = $('#upd_pname').val();
  if (postID === '')
  return alert("Please specify the posting ID of the one you want to edit.");
  if (pname === '')
  return alert("Please enter the program name you want to update for.");
  var data = {postingID: parseInt(postID),pname:pname};
  $.ajax({
    url: "http://localhost:1234/recruiter/updpname/" + postID,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    type: "PUT",
    statusCode: {
      204: function(res) {
        alert("Please enter an ID of a posting posted by you.");
      },
      200: function(res) {
        alert(res);
      }
    },
    error: function (err) {
      console.log(err);
      alert(err.responseText);
    }
  });}

  function updateDur(){
    var postID = $('#postID').val();
    var dur = $('#upd_dur').val();
    if (postID === '')
    return alert("Please specify the posting ID of the one you want to edit.");
    if (dur === '')
    return alert("Please enter the duration you want to update for.");
    var data = {postingID: parseInt(postID),dur:dur};
    $.ajax({
      url: "http://localhost:1234/recruiter/upddur/" + postID,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      type: "PUT",
      statusCode: {
        204: function(res) {
          alert("Please enter an ID of a posting posted by you.");
        },
        200: function(res) {
          alert(res);
        }
      },
      error: function (err) {
        console.log(err);
        alert(err.responseText);
      }
    });
  }

    function updateSpec(){
      var postID = $('#postID').val();
      var spec = $('#upd_spec').val();
      if (postID === '')
      return alert("Please specify the posting ID of the one you want to edit.");
      if (spec === '')
      return alert("Please enter the specialty you want to update for.");
      var data = {postingID: parseInt(postID),spec:spec};
      $.ajax({
        url: "http://localhost:1234/recruiter/updspec/" + postID,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        type: "PUT",
        statusCode: {
          204: function(res) {
            alert("Please enter an ID of a posting posted by you.");
          },
          200: function(res) {
            alert(res);
          }
        },
        error: function (err) {
          console.log(err);
          alert(err.responseText);
        }
      });
    }

    function updateDdl(){
      var postID = $('#postID').val();
      var ddl = $('#upd_ddl').val();
      if (postID === '')
      return alert("Please specify the posting ID of the one you want to edit.");
      if (ddl === '')
      return alert("Please enter the deadline you want to update for.");
      var data = {postingID: parseInt(postID),ddl:ddl};
      $.ajax({
        url: "http://localhost:1234/recruiter/updddl/" + postID,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        type: "PUT",
        statusCode: {
          204: function(res) {
            alert("Please enter an ID of a posting posted by you.");
          },
          200: function(res) {
            alert(res);
          }
        },
        error: function (err) {
          console.log(err);
          alert(err.responseText);
        }
      });
    }

    function updateSlots(){
      var postID = $('#postID').val();
      var slots = $('#upd_slots').val();
      if (postID === '')
      return alert("Please specify the posting ID of the one you want to edit.");
      if (slots === '')
      return alert("Please enter the #slots you want to update for.");
      var data = {postingID: parseInt(postID), slots:parseInt(slots)};
      $.ajax({
        url: "http://localhost:1234/recruiter/updslots/" + postID,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        type: "PUT",
        statusCode: {
          204: function(res) {
            alert("Please enter an ID of a posting posted by you.");
          },
          200: function(res) {
            alert(res);
          }
        },
        error: function (err) {
          console.log(err);
          alert(err.responseText);
        }
      });
    }
