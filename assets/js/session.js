let idUser = sessionStorage.getItem('ID_USER');
let userSession = document.getElementById('userSession');
let role = document.getElementById('role');
let imgUser = document.getElementById('userIMG');
let http = new XMLHttpRequest();
let url = '../php/get_usr_data.php';
let params = 'ID_USER=' + idUser;

http.open('POST', url, true);
http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

if (idUser != null) {
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            if (http.responseText != 0) {
                datos = JSON.parse(http.responseText);
                userSession.textContent = datos['NAME'] + ' ' + datos['LASTNAME1'] + ' ' + datos['LASTNAME2'];
                role.textContent = datos['ROLE'];
                imgUser.src = datos['PHOTO'];
                
            }else{
            console.log("Verifica que los datos sean correctos!.");
            }
        }
    }
    http.send(params);

} else {
    location.replace("../login.html");
}

function Logout() {
    sessionStorage.clear();
    location.replace("../login.html");
}
