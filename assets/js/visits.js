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
                    var elementsList3 = document.querySelectorAll('.View');
                    for (var i = 0; i < elementsList.length; i++) {
                        elementsList[i].setAttribute("data-id", customers[i]);
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
                    if(JSON.parse(http.responseText)['ESTADO'] == 'ACTIVO'){
                        element.className += "btn btn-pill btn-success";
                    }else{
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
    let msg = document.getElementById("msg");
    let http = new XMLHttpRequest();
    let url = '../php/update_visit.php';
    let params = 'idCu=' + idCu + '&email=' + email + '&name=' + name + '&phone=' + phone + '&sexo=' + sexo;

    if (name == '' && email == '' && phone == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar todos los campos para continuar!.";
    } else if (email == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Escribir Correo!.";
    } else if (phone == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Escribir Teléfono!.";
    } else {
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                if (http.responseText == 1) {
                    msg.className = "alert alert-success";
                    msg.innerHTML = "La visita se ha actualizado exitosamente!.";
                    window.setInterval('refresh()', 2000);
                } else {
                    msg.className = "alert alert-danger";
                    msg.innerHTML = "Ha ocurrido un error al actualizar información!.";
                }
            }
        }
        http.send(params);
    }
}

function refresh() {
    window.location.reload();
}