// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    $('#DisplayTable').dataTable({
        "ajax": {
            "url": "/Home/GetMarkedEmployee",
            "type": "GET",
            "datatype": "json"
        },
        "responsive": true,
        "scrollX": true,
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
            { "data": "Id" },
            { "data": "Name"},
            { "data": "Email" },
            { "data": "Phone" },
            { "data": "DepartmentName" },
            { "data": "PostName" },
            { "data": "Exp" },
            {
                "data": "DateTime",
                "render": function (data) {
                    const myArray = data.split("T");
                    const today = new Date(myArray[0]);
                    const yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1;
                    let dd = today.getDate();
                    return dd + '/' + mm + '/' + yyyy + ' ' + myArray[1] ;
                }
            },
            {
                "data": "DOJ",
                "render": function (data) {
                    const myArray = data.split("T");
                    const today = new Date(myArray[0]);
                    const yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1;
                    let dd = today.getDate();
                    return dd + '/' + mm + '/' + yyyy + ' ' + myArray[1];
                }
            }
        ],
        "aaSorting": [[7, 'desc']]
    });

    var table = $('#DisplayTable').DataTable();
    $('.dataTables_filter input').unbind().bind('keyup', function () {
        var colIndex = document.querySelector('#columnSelect').selectedIndex;
        table.column(colIndex).search(this.value).draw();
    });

    $('#columnSelect').change(function () {
        table.columns().search('').draw();
    }); 

    $('#DisplayTable tfoot td').each(function () {
        var title = $('#DisplayTable thead th').eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });

    // Apply the search
    table.columns().every(function () {
        
        let column = this;
        let title = column.footer().textContent;

        // Create input element
        let input = document.createElement('input');
        input.placeholder = title;
        column.footer().replaceChildren(input);

        // Event listener for user input
        input.addEventListener('keyup', () => {
            if (column.search() !== this.value) {
                column.search(input.value).draw();
            }
        });
    });

    $('.dataTables_scrollBody').css({
        'overflow': 'hidden',
        'border': '0'
    });

    // Enable TFOOT scoll bars
    $('.dataTables_scrollFoot').css('overflow', 'auto');

    // Sync TFOOT scrolling with TBODY
    $('.dataTables_scrollFoot').on('scroll', function () {
        $('.dataTables_scrollBody').scrollLeft($(this).scrollLeft());
    });

});