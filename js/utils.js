// Limpia el formulario y su estado de error
export function clearForm() {
  ["f-name", "f-cat", "f-qty", "f-price"].forEach((id) => {
    document.getElementById(id).value = "";
    clearError(id);
  });
}

// Marca un campo como erróneo y muestra un mensaje de error
export function setError(fieldId, msg) {
  const input = document.getElementById(fieldId);
  const err = document.getElementById("err-" + fieldId.replace("f-", ""));
  if (input) input.classList.add("is-error");
  if (input) input.classList.remove("is-ok");
  if (err) err.textContent = msg;
}

// Marca un campo como correcto y limpia cualquier mensaje de error
export function setOk(fieldId) {
  const input = document.getElementById(fieldId);
  const err = document.getElementById("err-" + fieldId.replace("f-", ""));
  if (input) input.classList.remove("is-error");
  if (input) input.classList.add("is-ok");
  if (err) err.textContent = "";
}

// Limpia el estado de error de un campo sin marcarlo como correcto
export function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  const err = document.getElementById("err-" + fieldId.replace("f-", ""));
  if (input) {
    input.classList.remove("is-error", "is-ok");
  }
  if (err) err.textContent = "";
}


// Sanitiza una cadena para mostrarla como texto sin interpretar etiquetas HTML
export function escHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function setDate() {
  const opts = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  document.getElementById("sl-date").textContent =
    new Date().toLocaleDateString("es-ES", opts);
}