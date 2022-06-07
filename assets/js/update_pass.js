let userID = sessionStorage.getItem('ID_USER');
let https = new XMLHttpRequest();
let urls = '../php/get_usr_data.php';
let param = 'ID_USER=' + userID;

https.open('POST', urls, true);
https.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
https.onreadystatechange = function () {
    if (https.readyState == 4 && https.status == 200) {
        if (https.responseText != 0) {
            datos = JSON.parse(https.responseText);
            document.getElementById('img').src = datos['PHOTO'];

        } else {
            msg.className = "alert alert-danger";
            msg.innerHTML = "Ha ocurrido un error!.";
          }
    }
}
https.send(param);


function ChangePass() {
    let pass1 = document.getElementById("pass1").value;
    let pass2 = document.getElementById("pass2").value;

    if (pass1 == '' && pass2 == '') {
        msg.className = "alert alert-danger";
        msg.innerHTML = "Llenar los datos solicitados!.";
    } else if (pass1 == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Llenar Contraseña!.";
    } else if (pass2 == '') {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Repetir Contraseña!.";
    } else if (pass1 != pass2) {
        msg.className = "alert alert-warning";
        msg.innerHTML = "Las contraseñas no coinciden!.";
    } else {

        let https = new XMLHttpRequest();
        let urls = '../php/update_pass.php';
        let parameters = 'id=' + userID + '&pass=' + pass1;

        https.open('POST', urls, true);
        https.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        https.onreadystatechange = function () {
            if (https.readyState == 4 && https.status == 200) {
                if (https.responseText == 1) {
                    msg.className = "alert alert-success";
                    msg.innerHTML = "La constraseña ha sido actualizada exitosamente!.";
                    window.setInterval('refresh()', 2000);
                } else {
                    msg.className = "alert alert-danger";
                    msg.innerHTML = "Ha ocurrido un error!.";
                }
            }
        }
        https.send(parameters);

    }
}

function refresh() {
    sessionStorage.clear();
    location.replace("../login.html");
}