function validarCampoVacio(e) {
  const input = e.target;
  input.value.trim() ? limpiarInputDeError(input) : setearErrorEnInput(input, "Campo requerido");
};

function validarEmail(e) {
  const pattern = /^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/;
  const input = e.target;
  const email = input.value.trim();

  if (email.length > 6) {
    pattern.test(email) ? limpiarInputDeError(input) : setearErrorEnInput(input, "Email Invalido");
  }
};

function validarPassword(e) {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  const input = e.target;
  const password = input.value.trim();

  if (!validarLongitudMinima(input, 8)) {
    setearErrorEnInput(input, "Debe tener al menos 8 caracteres");
  } else {
    pattern.test(password) ? limpiarInputDeError(input) : setearErrorEnInput(input, "Debe contener una mayuscula, una minuscula y algun numero");
  }
};

function validarNumero(e) {
  const numero = e.target.value;

  isNaN(numero) ? setearErrorEnInput(e.target, "Debe ingresar un numero.") : limpiarInputDeError();
}

function validarExtension(e) {
  const extensiones = ["gif", "jpg", "png", "jpeg"];

  const input = e.target;

  const nombre = input.files[0].name;
  const ext = nombre.split(".").pop();
  extensiones.includes(ext) ? limpiarInputDeError(input) : setearErrorEnInput(input, "Archivo invalido");
};

function validarLongitudMinima(input, minimo) {
  input.value.trim().length >= minimo;
}

function setearErrorEnInput(input, mensaje) {
  const $small = input.nextElementSibling;
  $small.textContent = mensaje || "Campo requerido";
  input.classList.add("inputError");
  $small.classList.add("smallError");
};

function limpiarInputDeError(input) {
  if(input)
  {
    const $small = input.nextElementSibling;
    $small.textContent = "";
    input.classList.remove("inputError");
    $small.classList.remove("smallError");
  }
};

function cargarValidacionesEnFormulario($formulario) {

  if ($formulario) {
    const controles = $formulario.elements;

    for (let i = 0; i < controles.length; i++) {
      const control = controles.item(i);

      if (control.matches("input")) {

        if (control.matches("[type=email]") ||
          control.matches("[type=text]") ||
          control.matches("[type=password]") ||
          control.matches("[type=number]")) {

          control.addEventListener("blur", validarCampoVacio);
          if (control.matches("[type=email]")) {
            control.addEventListener("blur", validarEmail);
          } else if (control.matches("[type=password]")) {
            control.addEventListener("blur", validarPassword);
          }
          else if (control.matches("[type=number]")) {
            control.addEventListener("blur", validarNumero);
          }
          
        } else if (control.matches("[type=file]")) {
          control.addEventListener("change", validarExtension);
        }
      }
    }
  }
}

function limpiarFormularioDeErroresDeValidacion(formulario) {

  const controles = formulario.elements;
  for (let i = 0; i < controles.length; i++) {

    controles[i].classList.remove("inputError");

    if (controles[i] && controles[i].nextElementSibling && controles[i].nextElementSibling.tagName.toLowerCase() == "small") {
      controles[i].nextElementSibling.classList.remove("smallError");
      controles[i].nextElementSibling.innerHTML = "";
    }
  }
}

function existenInputsInvalidos(inputs) {
  if (inputs) {
    for (const input of inputs) {
      if (input.classList.contains("inputError")) {
        return true;
      }
    }
  }
}

export { cargarValidacionesEnFormulario, limpiarFormularioDeErroresDeValidacion, existenInputsInvalidos };