const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	info: /^.{14,100}$/, // 14 a 100 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const campos = {
  nombres: false,
  email: false,
  info:false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');                    
        break; 
        case "email":
            validarCampo(expresiones.email, e.target, 'email');                    
        break;   
        case "info":
            validarCampo(expresiones.info, e.target, 'info');                    
        break;       
    }

}
 
const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){ 
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto')
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto')  
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle')
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle')  
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo')
        campos[campo] = true;
    } else {
            document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto')
            document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto')
            document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle')
            document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle') 
            document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add('formulario_input-error-activo') 
            campos[campo] = false                 
        }
    }

inputs.forEach((input) => {
    input.addEventListener('keyup' , validarFormulario);
    input.addEventListener('blur' , validarFormulario);
});

formulario.addEventListener('submit' , (e) => {
    e.preventDefault ();

    if(campos.nombre && campos.nombre && campos.info){ 
        formulario.reset();
        document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito-activo')
                },3000)

        document.querySelectorAll('.formulario_grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario_grupo-correcto');
        });
    }
});