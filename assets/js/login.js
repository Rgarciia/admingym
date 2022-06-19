function DoLogin() {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    let role = document.getElementById('role').value;
    let msg = document.getElementById("msg");

    if (email == '' & pass == '' & role == 0) {
      msg.className = "alert alert-danger";
      msg.innerHTML = "Llenar los datos solicitados!.";
    } else if (email == "") {
      msg.className = "alert alert-warning";
      msg.innerHTML = "Llenar Email!.";
    } else if (pass == "") {
      msg.className = "alert alert-warning";
      msg.innerHTML = "Llenar Password!.";
    } else if (role == 0) {
      msg.className = "alert alert-warning";
      msg.innerHTML = "Seleccionar Tipo de Usuario!.";
    } else {
      msg.innerHTML = "";
      msg.className = "spinner-border text-success";
     
      let http = new XMLHttpRequest();
      let url = 'php/get_usr.php';
      let params = 'email=' + email + '&password=' + pass + '&tipo=' + role;
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          if (http.responseText != 0) {
            datos = JSON.parse(http.responseText);
            //sessionStorage.setItem("username", datos['EMAIL']);
            sessionStorage.setItem("ID_USER", datos['ID_USER']);
            //sessionStorage.setItem("foto", datos['PHOTO']);
            //sessionStorage.setItem("role", datos['ROLE']);
            location.replace("app/");
          }else{
          msg.className = "alert alert-danger";
          msg.innerHTML = "Verifica que los datos sean correctos!.";
          }
        }
      }
      http.send(params);
    }

  }