function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  function Recovery() {
    let email = document.getElementById('email').value;
    let pass = makeid(8);
    let msg = document.getElementById("msg");
    let http = new XMLHttpRequest();
    let url = 'php/recovery_pass.php';
    let params = 'email=' + email + '&password=' + pass;

    if (email != '') {
      console.log(pass);
      msg.innerHTML = "";
      msg.className = "spinner-border text-success";

      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          if (http.responseText == 1) {
            msg.className = "alert alert-success";
            msg.innerHTML = "Se ha enviado un correo con la nueva contraseña!.";
            console.log(JSON.parse(http.responseText));
          } else if (http.responseText == 2) {
            msg.className = "alert alert-danger";
            msg.innerHTML = "Ocurrio un error al actualizar la contraseña!.";
          } else if (http.responseText == 0) {
            msg.className = "alert alert-warning";
            msg.innerHTML = "El usuario no esta registrado!.";
          }
        }
      }
      http.send(params);
    } else {
      msg.className = "alert alert-danger";
      msg.innerHTML = "Debes ingresar tú correo!.";
    }
  }