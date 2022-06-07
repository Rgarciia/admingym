    let id = sessionStorage.getItem('ID_USER');
    let msg = document.getElementById("msg");
    let https = new XMLHttpRequest();
    let link = '../php/get_usr_data.php';
    let param = 'ID_USER=' + id;

    https.open('POST', link, true);
    https.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    https.onreadystatechange = function () {
      if (https.readyState == 4 && https.status == 200) {
        if (https.responseText != 0) {
          datos = JSON.parse(https.responseText);
          document.getElementById('img').src = datos['PHOTO'];
          document.getElementById("name").value = datos['NAME'];
          document.getElementById("lastname1").value = datos['LASTNAME1'];
          document.getElementById("lastname2").value = datos['LASTNAME2'];
          document.getElementById("phone").value = datos['PHONE'];
          document.getElementById("email").value = datos['EMAIL'];
        } else {
          msg.className = "alert alert-danger";
          msg.innerHTML = "Ha ocurrido un error!.";
        }
      }
    }
    https.send(param);

    function UpdateProfile() {
      let name = document.getElementById("name").value;
      let lastname1 = document.getElementById("lastname1").value;
      let lastname2 = document.getElementById("lastname2").value;
      let phone = document.getElementById("phone").value;
      let email = document.getElementById("email").value;

      if (name == '' && lastname1 == '' && lastname2 == '' && phone == '' && email == '') {
        msg.className = "alert alert-danger";
        msg.innerHTML = "Llenar los datos solicitados!.";
      } else if (name == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar nombre!.";
      } else if (lastname1 == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar Apellido Paterno!.";
      } else if (lastname2 == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar Apellido Materno!.";
      } else if (phone == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar Teléfono!.";
      } else if (email == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar Correo!.";
      } else {
        let https = new XMLHttpRequest();
        let link = '../php/update_profile.php';
        let param = 'id=' + id + '&name=' + name + '&lastname1=' + lastname1 + '&lastname2=' + lastname2 + '&phone=' + phone + '&email=' + email;

        https.open('POST', link, true);
        https.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        https.onreadystatechange = function () {
          if (https.readyState == 4 && https.status == 200) {
            if (https.responseText == 1) {
              msg.className = "alert alert-success";
              msg.innerHTML = "Información actualizada exitosamente!.";
              window.setInterval('refresh()', 2000);
            } else {
              msg.className = "alert alert-danger";
              msg.innerHTML = "Ha ocurrido un error!.";
            }
          }
        }
        https.send(param);
      }

    }
    function refresh() {
        window .location.reload();
    }
