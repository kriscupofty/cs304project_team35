
$(document).ready(function () {
    $('main.container').toggle();
    $.ajax({
        url: "http://localhost:1234/isloggedin/admin",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function () {
            $('main.container').toggle();
            displayOffers();
        },
        error: function (err) {
            $('#log').text('Log in');
            $('main.container').empty().append("<h2>Please log in as an Admin first.</h2>").toggle();

        }
    });

    $(".nav-link").on("click", function(){
        $(".nav-link.active").removeClass("active");
        $(this).addClass("active");
    });
});

function setUpInterview() {
    var round = $('#round').val(), aID = $('#aID').val(), time = $('#time').val(), location = $('#loc').val();
    if(round == null || aID == null || time == null || location == null)
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
                if (err.responseJSON.errno == 1462)
                    return alert("Please enter a valid aID.");
                else if (err.responseJSON.errno == 1062)
                    return alert("Interview already set up.");
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

