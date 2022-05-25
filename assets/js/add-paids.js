$(function () {
    'use strict'
    var substringMatcher = function (strs) {
      return function findMatches(q, cb) {
        var matches, substrRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');

        $.each(strs, function (i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });

        cb(matches);

        $('.tt-suggestion').on('click', function () {
          $('#search_row').show();
        });
      };
    };

    let http = new XMLHttpRequest();
    let url = '../php/get_customers.php';
    let array = [];
    http.open('GET', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        if (http.responseText != 1) {
          let datos = JSON.parse(http.responseText);
          let datosC = (datos['customers']);
          for (let i = 0; i < datosC.length; i++) {
            //array.push(datosC[i]['PHONE']+' - '+datosC[i]['EMAIL']);
            array.push(datosC[i]['EMAIL']);
          }

          $('#theBasics').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
          },
            {
              name: 'array',
              source: substringMatcher(array)
            });

        } else if (http.responseText == 0) {
          msg.className = "alert alert-danger";
          msg.innerHTML = "No hay clientes registrados!.";
        } else {
          msg.className = "alert alert-danger";
          msg.innerHTML = "Ha ocurrido un error!.";
        }
      }
    }
    http.send();

  });

  function GetInfoUsr() {
    document.getElementById('fecha_pago').value = '';
    document.getElementById('fecha_vencimiento').value = '';
    document.getElementById('total').value = '';
    document.getElementById('pago').value = 0;
    $('#msg').hide();
    let http = new XMLHttpRequest();
    let email = document.getElementById('theBasics').value;
    let msg = document.getElementById("msg");
    let url = '../php/get_customer.php';
    let params = 'email=' + email;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        if (http.responseText != 0) {
          let info = (JSON.parse(http.responseText));
          document.getElementById('phone').value = info['PHONE'];
          document.getElementById('img').src = info['FOTO'];
          document.getElementById('idCustomer').value = info['ID_CUSTOM'];

          $('#phone').show();
          $('#fecha_pago').show();
          $('#fecha_vencimiento').show();
          $('#pagoInfo').show();
          $('#total').show();
          $('#divImg').show();

        } else if (http.responseText == 0) {
          msg.className = "alert alert-danger";
          msg.innerHTML = "Cliente no registrado!.";
        } else {
          msg.className = "alert alert-danger";
          msg.innerHTML = "Ha ocurrido un error!.";
        }
      }
    }
    http.send(params);
  }

  function ResgistrarPaid() {
    let idC = document.getElementById('idCustomer').value;
    let fecha_ini = document.getElementById('fecha_pago').value;
    let fecha_vencimiento = document.getElementById('fecha_vencimiento').value;
    let total = document.getElementById('total').value;
    let em = document.getElementById('theBasics').value;
    let pago = document.getElementById('pago').value;
    let msg = document.getElementById("msg");

    $('#msg').show();

    if (fecha_ini == '' && fecha_vencimiento == '' && total == '' && pago == 0) {
      msg.className = "alert alert-danger";
      msg.innerHTML = "Debes llenar los campos";
    } else if (fecha_ini == '') {
      msg.className = "alert alert-warning";
      msg.innerHTML = "Llenar fecha de pago";
    } else if (fecha_vencimiento == '') {
      msg.className = "alert alert-warning";
      msg.innerHTML = "Llenar fecha de vencimiento";
    } else if (pago == 0) {
      msg.className = "alert alert-warning";
      msg.innerHTML = "Seleccionar el tipo de pago";
    } else if (total == '') {
      msg.className = "alert alert-warning";
      msg.innerHTML = "Llenar el monto";
    } else if (fecha_vencimiento < fecha_ini) {
      msg.className = "alert alert-warning";
      msg.innerHTML = "Fecha de vencimiento no debe ser menor que fecha de pago!";
    } else {
      let http = new XMLHttpRequest();
      let msg = document.getElementById("msg");
      let url = '../php/add_paids.php';
      let params = 'id=' + idC + '&email=' + em + '&fecha_ini=' + fecha_ini + '&fecha_vencimiento=' + fecha_vencimiento + '&pago=' + pago + '&total=' + total;
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          if (http.responseText == 1) {
            msg.className = "alert alert-success";
            msg.innerHTML = "El pago ha sido registrado exitosamente!.";
            window.setInterval('refresh()', 2000);
          } else {
            msg.className = "alert alert-danger";
            msg.innerHTML = "El pago no ha sido registrado!.";
          }
        }
      }
      http.send(params);
    }
  }

  function refresh() {
    window.location.reload();
  }