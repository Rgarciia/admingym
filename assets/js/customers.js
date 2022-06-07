$(function () {
    'use strict'
    var table = $('#customers').DataTable({
        "columns": [{
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "title": "ID",
            "data": "ID_CUSTOM"
        },
        {
            "title": "NOMBRE",
            "data": "NAME"
        },
        {
            "title": "EMAIL",
            "data": "EMAIL"
        },
        {
            "title": "TELÉFONO",
            "data": "PHONE"
        },
        {
            "title": "SEXO",
            "data": "SEXO"
        },
        {
            "title": "ESTADO",
            "data": "ESTADO"
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
        },
        {
            data: null,
            defaultContent: '<a href="#view" data-id="" class="fa fa-user View" title="Ver" data-toggle="modal" data-animation="effect-sign"></a>',
            orderable: false
        }
        ],
        rowCallback: function (row, data, index) {
            if (data['ESTADO'] == "ACTIVO") {
                $(row).find('td:eq(5)').css('color', 'green');
                $(row).find('td:eq(5)').css('font-family', 'fantasy');
            } else if (data['ESTADO'] == "NO ACTIVO") {
                $(row).find('td:eq(5)').css('color', 'red');
                $(row).find('td:eq(5)').css('text-decoration', 'line-through');
                $(row).find('td:eq(5)').css('font-family', 'fantasy');
            }
        }
    });

    let http = new XMLHttpRequest();
    let url = '../php/get_customers_list.php';
    http.open('GET', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            if (http.responseText != '') {
                let datos = JSON.parse(http.responseText);
                table.rows.add(datos['customers']).draw();
                const customers = datos['customers'].map(function (custom) {
                    return custom.ID_CUSTOM;
                });

                for (let e = 0; e < customers.length; e++) {
                    var elementsList = document.querySelectorAll('.Edit');
                    var elementsList2 = document.querySelectorAll('.Delete');
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
        let url = '../php/get_custom.php';
        let params = 'idCustom=' + idCustom;
        document.getElementById("idC").value = idCustom;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                if (http.responseText != 0) {
                    // console.log(JSON.parse(http.responseText));
                    document.getElementById("name").value = JSON.parse(http.responseText)['NAME'];
                    document.getElementById("apaterno").value = JSON.parse(http.responseText)['LASTNAME1'];
                    document.getElementById("amaterno").value = JSON.parse(http.responseText)['LASTNAME2'];
                    document.getElementById("phone").value = JSON.parse(http.responseText)['PHONE'];
                    document.getElementById("email").value = JSON.parse(http.responseText)['EMAIL'];
                    document.getElementById("status").value = JSON.parse(http.responseText)['STATUS'];
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

    $('#view').on('show.bs.modal', function (event) {
        var animation = $(event.relatedTarget).data('animation');
        $(this).addClass(animation);
        let idC3 = $(event.relatedTarget).data('id');
        let http = new XMLHttpRequest();
        let url = '../php/info_custom.php';
        let params = 'id=' + idC3;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                if (http.responseText != 0) {
                    document.getElementById("nameCustomer").innerHTML = JSON.parse(http.responseText)['NAME'];
                    document.getElementById("emailCustomer").innerHTML = JSON.parse(http.responseText)['EMAIL'];
                    document.getElementById("phoneCustomer").innerHTML = JSON.parse(http.responseText)['PHONE'];
                    document.getElementById("fechaPago").innerHTML = JSON.parse(http.responseText)['FECHA_INI'];
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
    let apaterno = document.getElementById("apaterno").value;
    let amaterno = document.getElementById("amaterno").value;
    let phone = document.getElementById("phone").value;
    let status = document.getElementById("status").value;
    let sexo = document.querySelector('input[name="customRadio"]:checked').value;
    let msg = document.getElementById("msg");
    let http = new XMLHttpRequest();
    let url = '../php/update_customer.php';
    let params = 'idCu=' + idCu + '&email=' + email + '&name=' + name + '&apaterno=' + apaterno + '&amaterno=' + amaterno + '&phone=' + phone + '&status=' + status + '&sexo=' + sexo;

    if (name == '' && email == '' && apaterno == '' && amaterno == '' && phone == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar todos los campos para continuar!.";
    } else if (apaterno == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Escribir Apellido Paterno!.";
    } else if (amaterno == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Escribir Apellido Materno!.";
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
                    msg.innerHTML = "El cliente se ha actualizado exitosamente!.";
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

function DeletePaid() {
    let idcus = document.getElementById("idC1").value;
    let msg = document.getElementById("msg2");
    let http = new XMLHttpRequest();
    let url = '../php/delete_customer.php';
    let params = 'idcus=' + idcus;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            if (http.responseText == 1) {
                msg.className = "alert alert-success";
                msg.innerHTML = "El Cliente se ha desactivado exitosamente!.";
                window.setInterval('refresh()', 2000);
            } else {
                msg.className = "alert alert-danger";
                msg.innerHTML = "Ha ocurrido un error al desactivar el pago!.";
            }
        }
    }
    http.send(params);
}

function refresh() {
    window.location.reload();
    //location.replace("customers.html");
}