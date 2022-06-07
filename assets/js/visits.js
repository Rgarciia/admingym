$(function () {
    'use strict'
    var table = $('#customers').DataTable({
        "columns": [{
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "title": "ID",
            "data": "ID_VISIT"
        },
        {
            "title": "NOMBRE",
            "data": "NAMEC"
        },
        {
            "title": "SEXO",
            "data": "SEXO"
        },
        {
            "title": "TELÉFONO",
            "data": "PHONE"
        },
        {
            "title": "EMAIL",
            "data": "EMAIL"
        },
        {
            "title": "FECHA DE VISITA",
            "data": "FECHA_VISIT"
        },
        {
            "title": "FECHA FIN",
            "data": "FECHA_FIN"
        },
        {
            "title": "TIPO DE PAGO",
            "data": "PAGO"
        },
        {
            "title": "MONTO",
            "data": "MONTO"
        },
        {
            data: null,
            defaultContent: '<a href="#edit" data-id="" class="fa fa-pen Edit" title="Editar" data-toggle="modal" data-animation="effect-newspaper"></a>',
            orderable: false
        },
        {
            data: null,
            defaultContent: '<a href="#view" data-id="" class="fa fa-user View" title="Ver" data-toggle="modal" data-animation="effect-sign"></a>',
            orderable: false
        },
        {
            data: null,
            defaultContent: '<a href="#add" data-id="" class="fa fa-plus Add" title="Agregar" data-toggle="modal" data-animation="effect-sign"></a>',
            orderable: false
        }
        ],

    });

    let http = new XMLHttpRequest();
    let url = '../php/get_visits_list.php';
    http.open('GET', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            if (http.responseText != '') {
                let datos = JSON.parse(http.responseText);
                table.rows.add(datos['customers']).draw();
                const customers = datos['customers'].map(function (custom) {
                    return custom.ID_VISIT;
                });

                for (let e = 0; e < customers.length; e++) {
                    var elementsList = document.querySelectorAll('.Edit');
                    var elementsList2 = document.querySelectorAll('.Add');
                    var elementsList3 = document.querySelectorAll('.View');
                    for (var i = 0; i < elementsList.length; i++) {
                        elementsList[i].setAttribute("data-id", customers[i]);
                    }
                    for (var i = 0; i < elementsList2.length; i++) {
                        elementsList2[i].setAttribute("data-id", customers[i]);
                    }
                    for (var i = 0; i < elementsList3.length; i++) {
                        elementsList3[i].setAttribute("data-id", customers[i]);
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
        let url = '../php/get_visit.php';
        let params = 'idCustom=' + idCustom;
        document.getElementById("idC").value = idCustom;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                if (http.responseText != 0) {
                    // console.log(JSON.parse(http.responseText));
                    document.getElementById("name").value = JSON.parse(http.responseText)['NAMEC'];
                    document.getElementById("phone").value = JSON.parse(http.responseText)['PHONE'];
                    document.getElementById("email").value = JSON.parse(http.responseText)['EMAIL'];
                    document.getElementById("fechaP").value = JSON.parse(http.responseText)['FECHA_VISIT'];
                    document.getElementById("fechaV").value = JSON.parse(http.responseText)['FECHA_FIN'];
                    document.getElementById("monto").value = JSON.parse(http.responseText)['TOTAL'];
                    document.getElementById("imagen").value = JSON.parse(http.responseText)['FOTO'];
                    let radioOption = jQuery("input:radio[value=" + JSON.parse(http.responseText)['SEXO'] + "]");
                    radioOption.prop("checked", true);
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

    $('#add').on('show.bs.modal', function (event) {
        var animation = $(event.relatedTarget).data('animation');
        $(this).addClass(animation);
        let idCustom = $(event.relatedTarget).data('id');
        let msg = document.getElementById("msg");
        let http = new XMLHttpRequest();
        let url = '../php/get_visit.php';
        let params = 'idCustom=' + idCustom;
        document.getElementById("idC").value = idCustom;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                if (http.responseText != 0) {
                     //console.log(JSON.parse(http.responseText));
                    document.getElementById("name1").value = JSON.parse(http.responseText)['NAMEC'];
                    document.getElementById("phone1").value = JSON.parse(http.responseText)['PHONE'];
                    document.getElementById("email1").value = JSON.parse(http.responseText)['EMAIL'];
                    document.getElementById("fechaP1").value = JSON.parse(http.responseText)['FECHA_VISIT'];
                    document.getElementById("fechaV1").value = JSON.parse(http.responseText)['FECHA_FIN'];
                    document.getElementById("monto1").value = JSON.parse(http.responseText)['TOTAL'];
                    document.getElementById("imagen1").value = JSON.parse(http.responseText)['FOTO'];
                    document.getElementById("pago").value = JSON.parse(http.responseText)['PAGO'];
                    let radioOption = jQuery("input:radio[value=" + JSON.parse(http.responseText)['SEXO'] + "]");
                    radioOption.prop("checked", true);
                } else {
                    msg.className = "alert alert-danger";
                    msg.innerHTML = "Ha ocurrido un error!.";
                }
            }
        }
        http.send(params);

    });

    // hide modal with effect
    $('#add').on('hidden.bs.modal', function (e) {
        $(this).removeClass(function (index, className) {
            return (className.match(/(^|\s)effect-\S+/g) || []).join(' ');
        });
    });



    $('#view').on('show.bs.modal', function (event) {
        var animation = $(event.relatedTarget).data('animation');
        $(this).addClass(animation);
        let idC3 = $(event.relatedTarget).data('id');
        let http = new XMLHttpRequest();
        let url = '../php/info_visit.php';
        let params = 'id=' + idC3;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                if (http.responseText != 0) {
                    document.getElementById("nameCustomer").innerHTML = JSON.parse(http.responseText)['NAMEC'];
                    document.getElementById("emailCustomer").innerHTML = JSON.parse(http.responseText)['EMAIL'];
                    document.getElementById("phoneCustomer").innerHTML = JSON.parse(http.responseText)['PHONE'];
                    document.getElementById("fechaPago").innerHTML = JSON.parse(http.responseText)['FECHA_VISIT'];
                    document.getElementById('img').src = JSON.parse(http.responseText)['FOTO'];
                    var element = document.getElementById("statusCustomer");
                    element.innerHTML = JSON.parse(http.responseText)['ESTADO'];
                    if (JSON.parse(http.responseText)['ESTADO'] == 'ACTIVO') {
                        element.className += "btn btn-pill btn-success";
                    } else {
                        element.className += "btn btn-pill btn-danger";
                    }

                } else {
                    console.log("Error");
                }
            }
        }
        http.send(params);

    });

    // hide modal with effect
    $('#view').on('hidden.bs.modal', function (e) {
        $(this).removeClass(function (index, className) {
            return (className.match(/(^|\s)effect-\S+/g) || []).join(' ');
        });
    });

});

function UpdateCustom() {
    let idCu = document.getElementById("idC").value;
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let sexo = document.querySelector('input[name="customRadio"]:checked').value;
    let fechaP = document.getElementById("fechaP").value;
    let fechaV = document.getElementById("fechaV").value;
    let monto = document.getElementById("monto").value;
    let msg = document.getElementById("msg");
    let http = new XMLHttpRequest();
    let url = '../php/update_visit.php';
    let params = 'idCu=' + idCu + '&email=' + email + '&name=' + name + '&phone=' + phone + '&sexo=' + sexo + '&fechaP=' + fechaP + '&fechaV=' + fechaV + '&monto=' + monto;

    if (name == '' && email == '' && phone == '' && fechaP == '' && fechaV == '' && monto == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar todos los campos para continuar!.";
    } else if (email == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Escribir Correo!.";
    } else if (phone == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Escribir Teléfono!.";
    } else if (fechaP == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Selecciona la fecha de pago!.";
    } else if (fechaV == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Selecciona fecha de vencimiento!.";
    } else if (monto == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar el monto!.";
    } else if (fechaV < fechaP) {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Fecha de vencimiento no debe ser menor que fecha de pago!.";
    } else {
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                if (http.responseText == 1) {
                    msg.className = "alert alert-success";
                    msg.innerHTML = "La visita ha sido actualizada exitosamente!.";
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

function AddVisit() {
    let foto = document.getElementById("imagen1").value;
    let email = document.getElementById("email1").value;
    let name = document.getElementById("name1").value;
    let phone = document.getElementById("phone1").value;
    let sexo = document.querySelector('input[name="customRadio1"]:checked').value;
    let fechaP = document.getElementById("fechaP1").value;
    let fechaV = document.getElementById("fechaV1").value;
    let monto = document.getElementById("monto1").value;
    let pago = document.getElementById("pago").value
    let msg = document.getElementById("msg1");
    let http = new XMLHttpRequest();
    let params = 'foto=' + foto + '&email=' + email + '&name=' + name + '&phone=' + phone + '&sexo=' + sexo + '&fechaP=' + fechaP + '&fechaV=' + fechaV + '&monto=' + monto + '&pago=' + pago;
    console.log(pago);
    let url = '../php/add_new_visit.php';

    if (fechaP == '' && fechaV == '' && monto == '' && pago == 0) {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar todos los campos para continuar!.";
    }  else if (fechaP == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Selecciona la fecha de pago!.";
    } else if (fechaV == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Selecciona fecha de vencimiento!.";
    } else if (monto == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar el monto";
    } else if (pago == 0) {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Seleccionar Pago";
    }else if (fechaV < fechaP) {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Fecha de vencimiento no debe ser menor que fecha de pago!";
    } else {
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                if (http.responseText == 0) {
                    msg.className = "alert alert-success";
                    msg.innerHTML = "Se ha agregado una nueva visita exitosamente!.";
                    window.setInterval('refresh()', 2000);
                } else {
                    msg.className = "alert alert-danger";
                    msg.innerHTML = "Ha ocurrido un error!.";
                    console.log(http.responseText);
                }
            }
        }
        http.send(params);
    }
}

function refresh() {
    window.location.reload();
}