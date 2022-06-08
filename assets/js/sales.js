$(function () {
    'use strict'
    var table = $('#customers').DataTable({
        "columns": [{
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "title": "ID",
            "data": "ID_SALE"
        },
        {
            "title": "DESCRIPCIÓN",
            "data": "DESCR"
        },
        {
            "title": "MONTO",
            "data": "MONTO"
        },
        {
            "title": "FECHA DE REGISTRO",
            "data": "FECHA_REGISTRO"
        },
        {
            data: null,
            defaultContent: '<a href="#edit" data-id="" class="fa fa-pen Edit" title="Editar" data-toggle="modal" data-animation="effect-newspaper"></a>',
            orderable: false
        },
        {
            data: null,
            defaultContent: '<a href="#delete" data-id="" class="fa fa-trash Delete" title="Eliminar" data-toggle="modal" data-animation="effect-super-scaled"></a>',
            orderable: false
        }
        ],
    });

    let http = new XMLHttpRequest();
    let url = '../php/get_sales.php';
    http.open('GET', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            if (http.responseText != '') {
                let datos = JSON.parse(http.responseText);
                table.rows.add(datos['customers']).draw();
                const customers = datos['customers'].map(function (custom) {
                    return custom.ID_SALE;
                });

                for (let e = 0; e < customers.length; e++) {
                    var elementsList = document.querySelectorAll('.Edit');
                    var elementsList2 = document.querySelectorAll('.Delete');
                    for (var i = 0; i < elementsList.length; i++) {
                        elementsList[i].setAttribute("data-id", customers[i]);
                    }
                    for (var i = 0; i < elementsList2.length; i++) {
                        elementsList2[i].setAttribute("data-id", customers[i]);
                    }
                }

            }
        }
    }
    http.send();

    $('#edit').on('show.bs.modal', function (event) {
        var animation = $(event.relatedTarget).data('animation');
        $(this).addClass(animation);
        let idCustom = $(event.relatedTarget).data('id');
        let msg = document.getElementById("msg");
        let http = new XMLHttpRequest();
        let url = '../php/get_sale.php';
        let params = 'ids=' + idCustom;
        document.getElementById("idC").value = idCustom;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                if (http.responseText != 0) {
                    document.getElementById("desc").value = JSON.parse(http.responseText)['DESCR'];
                    document.getElementById("total").value = JSON.parse(http.responseText)['MONTO'];
                } else {
                    msg.className = "alert alert-danger";
                    msg.innerHTML = "Ha ocurrido un error!.";
                }
            }
        }
        http.send(params);

    });

    // hide modal with effect
    $('#edit').on('hidden.bs.modal', function (e) {
        $(this).removeClass(function (index, className) {
            return (className.match(/(^|\s)effect-\S+/g) || []).join(' ');
        });
    });

    $('#delete').on('show.bs.modal', function (event) {
        var animation = $(event.relatedTarget).data('animation');
        $(this).addClass(animation);
        let idC2 = $(event.relatedTarget).data('id');
        document.getElementById("idC1").value = idC2;
    });

    // hide modal with effect
    $('#delete').on('hidden.bs.modal', function (e) {
        $(this).removeClass(function (index, className) {
            return (className.match(/(^|\s)effect-\S+/g) || []).join(' ');
        });
    });
});

function UpdateSale() {
    let idCu = document.getElementById("idC").value;
    let desc = document.getElementById("desc").value;
    let total = document.getElementById("total").value;
    let msg = document.getElementById("msg");
    let http = new XMLHttpRequest();
    let url = '../php/update_sale.php';
    let params = 'ids=' + idCu + '&desc=' + desc + '&total=' + total;

    if (desc == '' && total == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar los datos solicitados!.";
    } else if (desc == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Escribir Descripción!.";
    } else if (total == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Escribir Total!.";
    } else {
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                if (http.responseText == 1) {
                    msg.className = "alert alert-success";
                    msg.innerHTML = "La venta ha sido actualizada exitosamente!.";
                    window.setInterval('refresh()', 2000);
                } else {
                    msg.className = "alert alert-danger";
                    msg.innerHTML = "Ha ocurrido un error!.";
                }
            }
        }
        http.send(params);
    }
}

function DeleteSale() {
    let idcus = document.getElementById("idC1").value;
    let msg = document.getElementById("msg2");
    let http = new XMLHttpRequest();
    let url = '../php/delete_sale.php';
    let params = 'ids=' + idcus;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            if (http.responseText == 1) {
                msg.className = "alert alert-success";
                msg.innerHTML = "La venta ha sido eliminada exitosamente!.";
                window.setInterval('refresh()', 2000);
            } else {
                msg.className = "alert alert-danger";
                msg.innerHTML = "Ha ocurrido un error!.";
            }
        }
    }
    http.send(params);
}

function refresh() {
    window.location.reload();
    //location.replace("customers.html");
}