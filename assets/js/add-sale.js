document.getElementById("desc").value = "";

function GuardarVent(){
  let desc = document.getElementById("desc").value;
  let total = document.getElementById("total").value;
  let msg = document.getElementById("msg");

  if(desc == '' && total == ''){
    msg.className = "alert alert-danger";
    msg.innerHTML = "Llenar los datos solicitados!.";
  }else if(desc == ''){
    msg.className = "alert alert-warning";
    msg.innerHTML = "Llenar Descripción!.";
  }else if(total == ''){
    msg.className = "alert alert-warning";
    msg.innerHTML = "Llenar total!.";
  }else{
    let http = new XMLHttpRequest();
    let url = '../php/add_sale.php';
    let params = 'desc=' + desc + '&total=' + total;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        if (http.responseText == 0) {
          msg.className = "alert alert-success";
          msg.innerHTML = "La venta ha sido registrado exitosamente!.";
          window.setInterval('refresh()', 2000);
        } else {
          msg.className = "alert alert-danger";
          msg.innerHTML = "Ha ocurrido un error!.";
          console.log(http.responseText);
        }
      }
    }
    http.send(params);
  }
}

function refresh() {
    //window .location.reload();
    location.replace("sales.html");
}