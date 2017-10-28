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

