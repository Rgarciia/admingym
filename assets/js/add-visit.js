
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

function GuardarVisit() {
  let fotoDefault = document.getElementById('img').src;
  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;
  let email = document.getElementById('email').value;
  let fecha_ini = document.getElementById('fecha_pago').value;
  let fecha_vencimiento = document.getElementById('fecha_vencimiento').value;
  let total = document.getElementById('total').value;
  let pago = document.getElementById('pago').value;
  let msg = document.getElementById("msg");
  let sexo = document.querySelector('input[name="customRadio"]:checked');

  if (name == "" & phone == "" & email == "" & sexo == null) {
    msg.className = "alert alert-danger";
    msg.innerHTML = "Llenar los datos solicitados!.";
  } else if (name == "") {
    msg.className = "alert alert-warning";
    msg.innerHTML = "Llenar Nombre!.";
  } else if (phone == "") {
    msg.className = "alert alert-warning";
    msg.innerHTML = "Llenar Teléfono!.";
  } else if (email == "") {
    msg.className = "alert alert-warning";
    msg.innerHTML = "Llenar Correo!.";
  } else if (sexo == null) {
    msg.className = "alert alert-warning";
    msg.innerHTML = "Seleccionar Sexo!.";
   } else if (pago == 0) {
    msg.className = "alert alert-warning";
    msg.innerHTML = "Seleccionar el tipo de pago";
  } else if (total == '') {
    msg.className = "alert alert-warning";
    msg.innerHTML = "Llenar el monto";
  }else if (fecha_ini == '') {
    msg.className = "alert alert-warning";
    msg.innerHTML = "Llenar fecha de pago";
  } else if (fecha_vencimiento == '') {
    msg.className = "alert alert-warning";
    msg.innerHTML = "Llenar fecha de vencimiento";
  } else if (fecha_vencimiento < fecha_ini) {
    msg.className = "alert alert-warning";
    msg.innerHTML = "Fecha de vencimiento no debe ser menor que fecha de pago!";
  } else {
    msg.className = "spinner-border text-success";
    msg.innerHTML = "";

    if (foto != '') {
      fotoG = document.getElementById('baseimg').value;
    } else {
      fotoG = fotoDefault;
    }

    let http = new XMLHttpRequest();
    let url = '../php/add_visit.php';
    let params = 'name=' + name + '&phone=' + phone + '&email=' + email + '&sexo=' + sexo.value + '&photo=' + fotoG + '&fecha_ini=' + fecha_ini + '&fecha_vencimiento=' + fecha_vencimiento + '&pago=' + pago + '&total=' + total;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        if (http.responseText == 0) {
          msg.className = "alert alert-success";
          msg.innerHTML = "La visita ha sido registrada exitosamente!.";
          window.setInterval('refresh()', 2000);
        } else {
          msg.className = "alert alert-danger";
          msg.innerHTML = "Ha ocurrido un error!.";
          //console.log(http.responseText);
        }
      }
    }
    http.send(params);
  }

}
function refresh() {
  location.replace("visits.html");
}
