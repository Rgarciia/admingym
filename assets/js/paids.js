$(function () {
    'use strict'
    var table = $('#paids').DataTable({
      "columns": [{
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "title": "ID",
        "data": "ID_PAID"
      },
      /*{
         "title": "ID CLIENTE",
         "data": "ID_CUSTOM"
       },*/
      {
        "title": "NOMBRE",
        "data": "NAME"
      },
      {
        "title": "EMAIL",
        "data": "EMAIL"
      },
      {
        "title": "FECHA DE PAGO",
        "data": "FECHA_INI"
      },
      {
        "title": "FECHA DE VENCIMIENTO",
        "data": "FECHA_FIN"
      },
      {
        "title": "ESTADO",
        "data": "ESTADO"
      },
      {
        "title": "MONTO",
        "data": "MONTO"
      },
      {
        "title": "TIPO DE PAGO",
        "data": "TIPO_PAGO"
      },
      {
        data: null,
        defaultContent: '<a href="#edit" data-id="" title="Editar" class="fa fa-pen Edit" data-toggle="modal" data-animation="effect-newspaper"></a>',
        orderable: false
      },
      {
        data: null,
        defaultContent: '<a href="#delete" data-id="" title="Eliminar" class="fa fa-trash Delete" data-toggle="modal" data-animation="effect-super-scaled"></a>',
        orderable: false
      }
      ],
      rowCallback: function (row, data, index) {
        if (data['ESTADO'] == 'ACTIVO') {
          $(row).find('td:eq(5)').css('color', 'green');
          $(row).find('td:eq(5)').css('font-family', 'fantasy');
        } else if (data['ESTADO'] == 'VENCIDO') {
          $(row).find('td:eq(5)').css('color', 'red');
          $(row).find('td:eq(5)').css('text-decoration', 'line-through');
          $(row).find('td:eq(5)').css('font-family', 'fantasy');
        }
      }
    });

    let http = new XMLHttpRequest();
    let url = '../php/get_paids.php';
    http.open('GET', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        if (http.responseText != '') {
          let datos = JSON.parse(http.responseText);
          table.rows.add(datos['customers']).draw();
          const customers = datos['customers'].map(function (custom) {
            return custom.ID_PAID;
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
      let idPaid = $(event.relatedTarget).data('id');
      let msg = document.getElementById("msg");
      let http = new XMLHttpRequest();
      let url = '../php/get_paid_custom.php';
      let params = 'idP=' + idPaid;
      document.getElementById("idP").value = idPaid;
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          if (http.responseText != 0) {
            // console.log(JSON.parse(http.responseText));
            document.getElementById("name").value = JSON.parse(http.responseText)['NAME'];
            document.getElementById("email").value = JSON.parse(http.responseText)['EMAIL'];
            document.getElementById("fechaP").value = JSON.parse(http.responseText)['FECHA_INI'];
            document.getElementById("fechaV").value = JSON.parse(http.responseText)['FECHA_FIN'];
            document.getElementById("monto").value = JSON.parse(http.responseText)['MONTO'];
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
      let idPaid2 = $(event.relatedTarget).data('id');
      document.getElementById("idP1").value = idPaid2;
    });

    // hide modal with effect
    $('#delete').on('hidden.bs.modal', function (e) {
      $(this).removeClass(function (index, className) {
        return (className.match(/(^|\s)effect-\S+/g) || []).join(' ');
      });
    });

  });

  function UpdatePaid() {
    let idP = document.getElementById("idP").value;
    let email = document.getElementById("email").value;
    let fechaP = document.getElementById("fechaP").value;
    let fechaV = document.getElementById("fechaV").value;
    let monto = document.getElementById("monto").value;
    let msg = document.getElementById("msg");
    let http = new XMLHttpRequest();
    let url = '../php/update_paid.php';
    let params = 'idP=' + idP + '&email=' + email + '&fechaP=' + fechaP + '&fechaV=' + fechaV + '&monto=' + monto;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        if (http.responseText == 1) {
          msg.className = "alert alert-success";
          msg.innerHTML = "El Pago se ha actualizado exitosamente!.";
          window.setInterval('refresh()', 2000);
        } else {
          msg.className = "alert alert-danger";
          msg.innerHTML = "Ha ocurrido un error al actualizar el pago!.";
        }
      }
    }
    http.send(params);
  }

  function DeletePaid() {
    let idP = document.getElementById("idP1").value;
    let msg = document.getElementById("msg2");
    let http = new XMLHttpRequest();
    let url = '../php/delete_paid.php';
    let params = 'idP=' + idP;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        if (http.responseText == 1) {
          msg.className = "alert alert-success";
          msg.innerHTML = "El Pago se ha eliminado exitosamente!.";
          window.setInterval('refresh()', 2000);
        } else {
          msg.className = "alert alert-danger";
          msg.innerHTML = "Ha ocurrido un error al eliminar el pago!.";
        }
      }
    }
    http.send(params);
  }

  function refresh() {
    window.location.reload();
    //location.replace("paids.html");
  }