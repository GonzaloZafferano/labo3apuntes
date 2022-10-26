function validarCampoVacio (e) {
  const input = e.target;
  input.value.trim() ? clearError(input) : setError(input, "Campo requerido");
};

function validarEmail(e) {
  const pattern = /^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/;
  const input = e.target;
  const email = input.value.trim();

  if (email.length > 6) {
    pattern.test(email) ? clearError(input) : setError(input, "Email Invalido");
  }
};

function validarPassword (e) {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  const input = e.target;
  const password = input.value.trim();

  if (!validarLongitudMinima(input, 8)) {
    setError(input, "Debe tener al menos 8 caracteres");
  } else {
    pattern.test(password)
      ? clearError(input)
      : setError(
          input,
          "Debe contener una mayuscula, una minuscula y algun numero"
        );
  }
};

function validarExtension (e) {
  const extensiones = ["gif", "jpg", "png", "jpeg"];

  const input = e.target;

  const nombre = input.files[0].name;
  const ext = nombre.split(".").pop();
  extensiones.includes(ext)
    ? clearError(input)
    : setError(input, "Archivo invalido");
};

function validarLongitudMinima (input, minimo){
  input.value.trim().length >= minimo;
} 

function setError (input, mensaje) {
  const $small = input.nextElementSibling;
  $small.textContent = mensaje || "Campo requerido";
  input.classList.add("inputError");
  $small.classList.add("smallError");
};

function clearError (input) {
  const $small = input.nextElementSibling;
  $small.textContent = "";
  input.classList.remove("inputError");
  $small.classList.remove("smallError");
};

function cargarValidacionesEnFormulario($formulario){

  if($formulario){
    const controles = $formulario.elements;

    for (let i = 0; i < controles.length; i++) {
      const control = controles.item(i);

      if (control.matches("input")) {

        if (control.matches("[type=email]") ||
          control.matches("[type=text]") ||
          control.matches("[type=password]") ||
          control.matches("[type=number]"))
         {          
          control.addEventListener("blur", validarCampoVacio);
          if (control.matches("[type=email]")) {
            control.addEventListener("blur", validarEmail);
          } else if (control.matches("[type=password]")) {
            control.addEventListener("blur", validarPassword);
          }
        } else if (control.matches("[type=file]")) {
          control.addEventListener("change", validarExtension);
        }
      }
    }
  }
}

function limpiarFormulario(formulario){

  const controles = formulario.elements;
  for(let i = 0;i < controles.length;i++){

    console.log(controles[i]);
    if(controles[i] && controles[i].nextElementSibling && controles[i].nextElementSibling.tagName.toLowerCase() == "small"){
      controles[i].nextElementSibling.classList.remove("smallError");
      controles[i].nextElementSibling.innerHTML = "";
    } 
  }
}

export {cargarValidacionesEnFormulario, limpiarFormulario};