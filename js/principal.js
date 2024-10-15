window.addEventListener('load', function(){

    // referenciar elementos de la pagina
    const msgSuccess = this.document.getElementById('msgSuccess');

    // recuperar nombre del usuario del localStorage
    const result = JSON.parse(this.localStorage.getItem('result'));
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

    // creamos la variable btnCerrar para el cerrado de sesión
    const btnCerrar = this.document.getElementById('btnCerrarSesion');

    btnCerrarSesion.addEventListener('click', function() {
        cerrarSesion(btnCerrarSesion);
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

async function cerrarSesion(boton, msg){
    const url = 'http://localhost:8082/login/close-async';
    const data = {
        tipoDocumento: localStorage.getItem('tipoDocumento'),
        numeroDocumento: localStorage.getItem('numeroDocumento')
    };
    try{
        const response = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            mostrarAlerta('Error: No se pudo cerrar la sesión correctamente.');
            throw new Error(`Error: ${response.statusText}`)
        }

        const result = await response.json();
        console.log('Respuesta del servidor', result);

        if(result.codigo == '00'){
            localStorage.removeItem('result');
            localStorage.removeItem('tipoDocumento');
            localStorage.removeItem('numeroDocumento');
            window.location.replace('index.html');
        } else {
            mostrarAlerta(result.mensaje, msg);
        }

    }catch (error) {
        console.error('Error: No se puede cerrar la sesión correctamente.', error)
        mostrarAlerta('Error: No se puede cerrar la sesión correctamente.', msg)
    }
}