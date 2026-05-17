import { products } from "./app.js";
import { setError, setOk, clearError } from "./utils.js";
import { editingId } from "./crud.js";

// Permite solo números enteros en el campo de cantidad
export function onlyNumbers(input, fieldId) {
  const val = input.value.replace(/[^0-9]/g, "");
  input.value = val;
  clearError(fieldId);
}

// Permite solo números decimales en el campo de precio
export function onlyDecimals(input, fieldId) {
  let val = input.value.replace(/[^0-9.]/g, "");
  const parts = val.split(".");
  if (parts.length > 2) {
    val = parts[0] + "." + parts.slice(1).join("");
  }
  input.value = val;
  clearError(fieldId);
}

// Valida el nombre del producto con varias reglas y verifica duplicados
export function validateName() {
  let productsNow = products;
  const val = document.getElementById("f-name").value.trim();
  if (!val) {
    setError("f-name", "El nombre es obligatorio.");
    return false;
  }
  if (val.length < 2) {
    setError("f-name", "Mínimo 2 caracteres.");
    return false;
  }
  const regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s\-\(\)\.]+$/;
  if (!regex.test(val)) {
    setError("f-name", "No se permiten símbolos especiales.");
    return false;
  }

  if (editingId !== null) {
    productsNow = products.filter((p) => p.id !== editingId);
  }

  const dup = productsNow.some(
    (p, i) =>
      i !== editingId && p.name.trim().toLowerCase() === val.toLowerCase(),
  );
  if (dup) {
    setError("f-name", "Ya existe un producto con ese nombre.");
    return false;
  }
  setOk("f-name");
  return true;
}

// Valida que se haya seleccionado una categoría
export function validateCat() {
  const val = document.getElementById("f-cat").value;
  if (!val) {
    setError("f-cat", "Selecciona una categoría.");
    return false;
  }
  setOk("f-cat");
  return true;
}

// Valida que la cantidad sea un número entero no negativo
export function validateQty() {
  const raw = document.getElementById("f-qty").value.trim();
  if (raw === "") {
    setError("f-qty", "La cantidad es obligatoria.");
    return false;
  }
  const n = parseInt(raw);
  if (isNaN(n) || n < 0) {
    setError("f-qty", "Ingresa un número válido.");
    return false;
  }
  setOk("f-qty");
  return true;
}

// Valida que el precio sea un número decimal no negativo
export function validatePrice() {
  const raw = document.getElementById("f-price").value.trim();
  if (raw === "") {
    setError("f-price", "El precio es obligatorio.");
    return false;
  }
  const n = parseFloat(raw);
  if (isNaN(n) || n < 0) {
    setError("f-price", "Ingresa un precio válido.");
    return false;
  }
  setOk("f-price");
  return true;
}

// Valida un campo específico según su ID
export function validateFieldById(id) {
  switch (id) {
    case "f-name":
      validateName();
      break;
    case "f-cat":
      validateCat();
      break;
    case "f-qty":
      validateQty();
      break;
    case "f-price":
      validatePrice();
      break;
  }
}

// Valida todos los campos del formulario y muestra los errores correspondientes
export function validateAll() {
  const a = validateName();
  const b = validateCat();
  const c = validateQty();
  const d = validatePrice();
  return a && b && c && d;
}
