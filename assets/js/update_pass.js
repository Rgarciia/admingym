let user = sessionStorage.getItem('username');
        let foto = sessionStorage.getItem('foto');
        let msg = document.getElementById("msg");
        document.getElementById('img').src = foto;


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
                let parameters = 'email=' + user + '&pass=' + pass1;

                https.open('POST', urls, true);
                https.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                https.onreadystatechange = function () {
                    if (https.readyState == 4 && https.status == 200) {
                        if (https.responseText == 1) {
                            msg.className = "alert alert-success";
                            msg.innerHTML = "La constraseña fue actualizada!.";
                            window.setInterval('refresh()', 2000);
                        } else {
                            msg.className = "alert alert-danger";
                            msg.innerHTML = "Error al actualizar contraseña!.";
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