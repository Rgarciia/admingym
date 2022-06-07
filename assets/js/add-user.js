
    /*=============================================
    VARIABLES
    =============================================*/
    const btnTomarFoto = document.getElementById('btnCamera');
    var foto = "";
    var fotoG = "";


    /*=============================================
    ACTIVAR LA CAMARA
    =============================================*/
    const activarCamara = () => {
      const activar = document.getElementById('customSwitch1').checked;
      const divCamera = document.getElementById('divCamera');
      const camara = new Camara($('#player')[0]);
      console.log(activar)

      if (activar === true) {
        console.log('activando la camara');
        $('#img').hide();
        $('#player').show();
        $('#btnCamera').show();
        camara.encender();
      } else {
        console.log('apagar la camara');
        $('#img').show();
        $('#player').hide();
        $('#btnCamera').hide();
        foto = "";
        document.getElementById('baseimg').value = '';
        camara.apagar();
      }
    }

    /*=============================================
    Tomar Foto
    =============================================*/
    btnTomarFoto.addEventListener('click', () => {
      const camara = new Camara($('#player')[0]);
      foto = camara.tomarFoto();
      document.getElementById('baseimg').value = foto;
      camara.apagar();
      console.log('se tomo la foto')
    });

    /*=============================================
    Guardar cliente
    =============================================*/

    function GuardarCli() {
      let fotoDefault = document.getElementById('img').src;
      let name = document.getElementById('name').value;
      let lastname1 = document.getElementById('lastname1').value;
      let lastname2 = document.getElementById('lastname2').value;
      let phone = document.getElementById('phone').value;
      let email = document.getElementById('email').value;
      let msg = document.getElementById("msg");
      let role = document.getElementById("role1").value;
      let pass1 = document.getElementById("pass1").value;
      let pass2 = document.getElementById("pass2").value;

      if (name == "" & lastname1 == "" & lastname2 == "" & phone == "" & email == "" & role == 0 & pass1 == "" & pass2 == "") {
        msg.className = "alert alert-danger";
        msg.innerHTML = "Llenar los datos solicitados!.";
      } else if (name == "") {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar Nombre!.";
      } else if (lastname1 == "") {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar Apellido Paterno!.";
      } else if (lastname2 == "") {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar Apellido Materno!.";
      } else if (phone == "") {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar Teléfono!.";
      } else if (email == "") {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar Correo!.";
      } else if (role == "0") {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Seleccionar Tipo de Usuario!.";
      }else if (pass1 == "") {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar Contraseña!.";
      }else if (pass2 == "") {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Repetir Contraseña!.";
      }else if (pass1 != pass2) {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Las contraseñas no coinciden, intentar de nuevo!.";
      }else {
        msg.className = "spinner-border text-success";
        msg.innerHTML = "";

        if (foto != '') {
          fotoG = document.getElementById('baseimg').value;
        } else {
          fotoG = fotoDefault;
        }
        
        let http = new XMLHttpRequest();
        let url = '../php/add_user.php';
        let params = 'name=' + name + '&lastname1=' + lastname1 + '&lastname2=' + lastname2 + '&phone=' + phone + '&email=' + email + '&role=' + role + '&pass1=' + pass1 + '&photo=' + fotoG;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
          if (http.readyState == 4 && http.status == 200) {
            if (http.responseText == 1) {
              msg.className = "alert alert-danger";
              msg.innerHTML = "El usuario ya ha sido registrado!.";
            } else if (http.responseText == 0) {
              msg.className = "alert alert-success";
              msg.innerHTML = "El usuario ah sido registrado exitosamente!.";
              window.setInterval('refresh()', 2000);
            } else {
              msg.className = "alert alert-danger";
              msg.innerHTML = "Ha ocurrido un error!.";
             // console.log(http.responseText);
            }
          }
        }
        http.send(params);
      }

    }
    function refresh() {
       // window .location.reload();
       location.replace("users.html");
    }
