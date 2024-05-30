

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/Home/GetAllDepartment",
        success: function (data) {
            let rows = "";
            rows += '<option value="">Select Department</option>';
            data.data.forEach((item) => {
                rows += '<option value="' + item.Id + '">' + item.DepartmentName + '</option>';
            })
            $("#department").append(rows);
        },
        error: function () {
            console.log('error');
        },
    });

    $.ajax({
        type: "GET",
        url: "/Home/GetAllPost",
        success: function (data) {
            let rows = "";
            rows += '<option value="">Select Post</option>';
            data.data.forEach((item) => {
                rows += '<option value="' + item.Id + '">' + item.PostName + '</option>';
            })
            $("#post").append(rows);
        },
        error: function () {
            console.log('error');
        },
    });

    $("#DOJ").datepicker({
        dateFormat: 'dd/mm/yy',
        maxDate: '0'
    });

});

$('#personForm').submit(function (e) {
    e.preventDefault();
    console.log(document.getElementById('mobile').value);
        var Person = {
            Name: document.getElementById('Name').value,
            Email: document.getElementById('email').value,
            Phone: document.getElementById('mobile').value,
            Exp: document.getElementById('Experience').value,
            DOJ: document.getElementById('DOJ').value,
            Department: $('#department').find(":selected").val(),
            Post: $('#post').find(":selected").val()
        };
        $.ajax({
            type: "POST",
            url: "/Home/InsertUpdate",
            data: {
                p: Person
            },
            success: function (data) {
                window.location.href = "/Home/Index";
            },
            error: function () {
                alert('error');
            }
        });
    
});