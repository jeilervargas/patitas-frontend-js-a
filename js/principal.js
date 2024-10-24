window.addEventListener('load', function(){

    // referenciar elementos de la pagina
    const msgSuccess = this.document.getElementById('msgSuccess');
    const logoutButton = document.getElementById('logout');

    // recuperar nombre del usuario del localStorage
    const result = JSON.parse(this.localStorage.getItem('result'));
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);
    logoutButton.addEventListener('click', function() {
        cerrarSesion();
    });

});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

function ocultarAlerta() {
    msgSuccess.innerHTML = '';
    msgSuccess.style.display = 'none';
}

function cerrarSesion() {
    fetch('http://localhost:8084/login/out-feign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tipoDocumento: JSON.parse(localStorage.getItem('result')).tipoDocumento,
            numeroDocumento: JSON.parse(localStorage.getItem('result')).numeroDocumento
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.codigo === "00") {
            localStorage.removeItem('result');
            window.location.href = '/login.html';
            //window.location.replace("indice.html");
        } else {
            alert("Error al cerrar sesión");
        }
    })
    .catch(error => {
        console.error('Error al cerrar sesión:', error);
    });
}