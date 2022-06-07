let idUserF = sessionStorage.getItem('ID_USER');
let msg = document.getElementById("msg");
const btnTomarFoto = document.getElementById('btnCamera');
var foto = "";
var fotoG = "";
let https = new XMLHttpRequest();
let urls = '../php/get_usr_data.php';
let param = 'ID_USER=' + idUserF;

https.open('POST', urls, true);
https.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
https.onreadystatechange = function () {
    if (https.readyState == 4 && https.status == 200) {
        if (https.responseText != 0) {
            datos = JSON.parse(https.responseText);
            document.getElementById('img').src = datos['PHOTO'];

        } else {
            msg.className = "alert alert-danger";
            msg.innerHTML = "Error al foto información!.";
          }
    }
}
https.send(param);


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

function UpdatePhoto() {

    if (foto != '') {
        fotoG = document.getElementById('baseimg').value;
    } else {
        fotoG = fotoUser;
    }

    let https = new XMLHttpRequest();
    let urls = '../php/update_photo.php';
    let parameters = 'id=' + idUserF + '&foto=' + fotoG;

    https.open('POST', urls, true);
    https.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    https.onreadystatechange = function () {
        if (https.readyState == 4 && https.status == 200) {
            if (https.responseText == 1) {
                msg.className = "alert alert-success";
                msg.innerHTML = "La foto ha sido actualizada!.";
                window.setInterval('refresh()', 2000);
            } else {
                msg.className = "alert alert-danger";
                msg.innerHTML = "Ha ocurrido un error!.";
            }
        }
    }
    https.send(parameters);
}

function refresh() {
    window .location.reload();
}