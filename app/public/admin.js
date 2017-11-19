$(document).ready(function () {
    $('main.container').toggle();
    $.ajax({
        url: "http://localhost:1234/isloggedin/admin",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function () {
            $('main.container').toggle();
            displayOfferChart();
            displayEduChart();
            displayOffers();
            displayMPC();
            displayMPH();
        },
        error: function (err) {
            $('#log').text('Log in');
            $('main.container').empty().append("<h2>Please log in as an Admin first.</h2>").toggle();

        }
    });

    $(".nav-link").on("click", function () {
        $(".nav-link.active").removeClass("active");
        $(this).addClass("active");
    });
});


function setUpInterview() {
    var round = $('#round').val(), aID = $('#aID').val(), time = $('#time').val(), location = $('#loc').val();
    if (round == '' || aID == '' || time == '' || location == '')
        return alert('Please enter all fields.');

    var data = [parseInt(round), parseInt(aID), time, location];
    $.ajax({
        url: "http://localhost:1234/admin/setupinterview",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({values: data}),
        type: "POST",
        success: function () {
            alert("Interview set up successfully.");
        },
        error: function (err) {
            //console.log(err);
            if (err.responseJSON.errno == 1452)
                return alert("Please enter a valid aID.");
            else if (err.responseJSON.errno == 1062)
                return alert("Interview already set up.");
            else if(err.responseJSON.code == 'ER_TRUNCATED_WRONG_VALUE')
                return alert("Please enter interview time in the correct format.");
            else return alert(err.responseJSON.code);
        }
    });
}

function displayOffers() {
    $.ajax({
        url: "http://localhost:1234/admin/offers",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (res) {
            $('#offer_table').bootstrapTable({
                columns: [{field: 'name', title: 'Resident'},
                    {field: 'resEmail', title: 'Resident Email'},
                    {field: 'postingID', title: 'Posting ID'},
                    {field: 'hID', title: 'Hospital ID'},
                    {field: 'hospital', title: 'Hospital'},
                    {field: 'recruiterEmail', title: 'Recruiter Email'},
                    {field: 'compensation', title: 'Compensation'},
                    {field: 'decision', title: 'Decision'}],
                data: res
            });
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function displayMPC() {
    $.ajax({
        url: "http://localhost:1234/admin/mpc",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (res) {
            $('#mpc_table').bootstrapTable({
                columns: [{field: 'resEmail', title: 'Email'},
                    {field: 'name', title: 'Name'},
                    {field: 'Average_rank', title: 'Average Rank'}],
                data: res
            });
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function displayMPH() {
    $.ajax({
        url: "http://localhost:1234/admin/mph",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (res) {
            $('#mph_table').bootstrapTable({
                columns: [{field: 'hID', title: 'hID'},
                    {field: 'name', title: 'Name'},
                    {field: 'Average_rank', title: 'Average Rank'}],
                data: res
            });
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function addOffer() {
    var postID = $('#postID').val(), resEmail = $('#resEmail').val(), comp = $('#comp').val(), decs = $('#decs option:selected').text();
    if (postID == '' || resEmail == '' || comp == '' || $("#decs option:selected").val() === " ")
        return alert('Please enter all fields.');
    var data = [parseInt(postID), resEmail, parseInt(comp), decs];
    $.ajax({
        url: "http://localhost:1234/admin/addoffer",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({values: data}),
        type: "POST",
        success: function () {
            alert("Succesfully added an offer to " + resEmail + " for postingID"+ postID );
        },
        error: function (err) {
          if (err.responseJSON.errno == 1452)
              return alert("Please enter an existing postingID and candidate email address.");
          else if (err.responseJSON.errno == 1062)
              return alert("Offer already exists.");
          else return alert(err.responseJSON.code);
        }
    });
}

function displayOfferChart() {
    $.ajax({
        url: "http://localhost:1234/admin/offer_rates",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (res) {
            var array = res.map((r) => {return [r.decision, r.count]});

            google.charts.load("current", {packages:["corechart"]});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Decision');
                data.addColumn('number', 'Count');
                data.addRows(array);

                var options = {
                    pieHole: 0.25
                };

                var chart = new google.visualization.PieChart(document.getElementById('offer_rates'));
                chart.draw(data, options);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

    function displayEduChart() {
        $.ajax({
            url: "http://localhost:1234/admin/edu_rates",
            contentType: "application/json; charset=utf-8",
            type: "GET",
            success: function (res) {
                var array = res.map((r) => {return [r.sname,r.count]});

                google.charts.load("current", {packages:["corechart"]});
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'School Name');
                    data.addColumn('number', 'Count');
                    data.addRows(array);

                    var options = {
                        pieHole: 0.25
                    };

                    var chart = new google.visualization.PieChart(document.getElementById('edu_rates'));
                    chart.draw(data, options);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
      }
