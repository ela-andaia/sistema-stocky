import { clearForm, setDate, clearError } from "./utils.js";
import { renderTable, saveProduct, resetEditingId} from "./crud.js";
import { validateFieldById } from "./validate_input.js";
import { data } from "./data/products.js";
import categories from "./data/categories.js";

export let products = data;

//Obtengo los elementos del DOM
const nameInput = document.getElementById("f-name");
const categoryInput = document.getElementById("f-cat");
const qtyInput = document.getElementById("f-qty");
const priceInput = document.getElementById("f-price");
const saveBtn = document.querySelector(".sl-btn-primary");
const cancelBtn = document.getElementById("cancel-btn");
const searchInput = document.getElementById("search-input");

// Agrega los event listeners para validar los campos del formulario en tiempo real y al perder el foco
[nameInput, categoryInput, qtyInput, priceInput].forEach((input) => {
  input.addEventListener("input", () => {
    clearError(input.id);
  });
  input.addEventListener("blur", () => {
    validateFieldById(input.id);
  });
});

// Renderiza las opciones del select de categorías a partir de la lista de categorías
categories.forEach((cat) => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categoryInput.appendChild(option);
});

saveBtn.addEventListener("click", () => {
  saveProduct();
});
cancelBtn.addEventListener("click", () => cancelEdit());
searchInput.addEventListener("input", () => renderTable());

// ════════════════════════════════════════════════════════════
//  STATS
// ════════════════════════════════════════════════════════════
export function updateStats() {
  const total = products.length;

  const value = products.reduce((s, p) => {
    const qty = parseFloat(p.qty) || 0;
    const price = parseFloat(p.price) || 0;

    return s + qty * price;
  }, 0);

  const low = products.filter((p) => (parseFloat(p.qty) || 0) < 5).length;

  const cats = new Set(products.map((p) => p.category)).size;

  document.getElementById("stat-total").textContent = total;

  document.getElementById("stat-value").textContent = "$" + value.toFixed(2);

  document.getElementById("stat-low").textContent = low;

  document.getElementById("stat-cats").textContent = cats;
}

export function cancelEdit() {
  clearForm();

  document.getElementById("form-title").textContent = "Agregar producto";

  document.getElementById("btn-label").textContent = "Agregar producto";

  document.getElementById("editing-bar").style.display = "none";

  resetEditingId();
  
}

// ── INIT ─────────────────────────────────────────────────────

setDate();
renderTable();
