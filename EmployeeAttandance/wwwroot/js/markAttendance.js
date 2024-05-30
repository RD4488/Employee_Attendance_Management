
$(document).ready(function () {
    $('#DisplayTable').dataTable({
        "ajax": {
            "url": "/Home/GetAllEmployee",
            "type": "GET",
            "datatype": "json"
        },
        "columnDefs":
            [{
                "targets": '_all',
                "defaultContent": ""
            }
                //{
                //    "targets": [2],
                //    "searchable": false,
                //    "orderable": false
            ],
        "columns": [
            { "data": "Id", "autoWidth": true },
            { "data": "Name", "autoWidth": true },
            { "data": "PostName", "autoWidth": true },
            {
                "render": function (data, type, row) {

                    if (typeof row.AttendanceDate === "undefined" || !row.AttendanceDate) {
                        return "<input type='checkbox' class='text-center' onclick=Delete('" + row.Id + "')>";
                    }
                    return "<input type='checkbox' class='text-center' onclick=Delete('" + row.Id + "') checked disabled>";
                }
            },
            {
                "data": "AttendanceDate",
                "render": function (data) {
                    console.log(data);
                    if (typeof data === "undefined" || !data ) {
                        return ' ';
                    }
                    const myArray = data.split("T");
                    const today = new Date(myArray[0]);
                    const yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1;
                    let dd = today.getDate();
                    return dd + '/' + mm + '/' + yyyy + ' ' + myArray[1];
                }
            }
        ],
        "aaSorting": [[0, 'asc']]
    });

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    var date = ':-' + dd + '-' + mm + '-' + yyyy;
    document.getElementById("currentDate").innerHTML =  date;

});

function Delete(id) {
    console.log(id);
    if (confirm("You want to mark attendance?") == true) {
        $.ajax({
            type: "DELETE",
            url: "/Home/MarkAttendance?id="+id,
            success: function (data) {
                window.location.href = window.location;
            },
            error: function () {
                alert('error');
            }
        });
    }
}