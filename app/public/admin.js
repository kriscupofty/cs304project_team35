
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
});

function setUpInterview() {
        var data = {}; //Todo: get actually data from the user
        $.ajax({
            url: "http://localhost:1234/admin/setupinterview",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            type: "POST",
            success: function (res) {
                alert(res);
            },
            error: function (err) {
                console.log(err);
                alert(err.responseText);
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
            })
        },
        error: function (err) {
            console.log(err);
        }
    });

}
