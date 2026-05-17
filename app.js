// ── DATOS ────────────────────────────────────────────────────
let products = [
  { name: "Mouse Gamer", category: "Tecnología", qty: 12, price: 25 },
  { name: "Teclado RGB", category: "Tecnología", qty: 5, price: 40 },
  { name: "Audífonos Bluetooth", category: "Tecnología", qty: 3, price: 35 },
  { name: "Silla de Oficina", category: "Hogar", qty: 8, price: 120 },
  { name: "Cuaderno A4", category: "Oficina", qty: 2, price: 4 },
  { name: "Lámpara LED", category: "Hogar", qty: 14, price: 18 },
  { name: "Mochila Ejecutiva", category: "Ropa", qty: 6, price: 55 },
  { name: "USB Hub 7 puertos", category: "Tecnología", qty: 9, price: 22 },
  { name: "Grapadora Metálica", category: "Oficina", qty: 20, price: 8 },
  { name: "Webcam HD 1080p", category: "Tecnología", qty: 4, price: 48 },
  { name: "Camiseta Polo", category: "Ropa", qty: 30, price: 15 },
  { name: 'Monitor 24"', category: "Tecnología", qty: 2, price: 180 },
];

let editingIndex = -1;

// ════════════════════════════════════════════════════════════
//  VALIDACIONES DESACTIVADAS
// ════════════════════════════════════════════════════════════

function onlyNumbers(input, fieldId) {
  const val = input.value.replace(/[^0-9]/g, "");
  input.value = val;
  clearError(fieldId);
}
function onlyDecimals(input, fieldId) {
  let val = input.value.replace(/[^0-9.]/g, "");
  const parts = val.split(".");
  if (parts.length > 2) {
    val = parts[0] + "." + parts.slice(1).join("");
  }
  input.value = val;
  clearError(fieldId);
}
function setError(fieldId, msg) {
  const input = document.getElementById(fieldId);
  const err = document.getElementById("err-" + fieldId.replace("f-", ""));
  if (input) input.classList.add("is-error");
  if (input) input.classList.remove("is-ok");
  if (err) err.textContent = msg;
}
function setOk(fieldId) {
  const input = document.getElementById(fieldId);
  const err = document.getElementById("err-" + fieldId.replace("f-", ""));
  if (input) input.classList.remove("is-error");
  if (input) input.classList.add("is-ok");
  if (err) err.textContent = "";
}
function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  const err = document.getElementById("err-" + fieldId.replace("f-", ""));
  if (input) {
    input.classList.remove("is-error", "is-ok");
  }
  if (err) err.textContent = "";
}
function validateName() {
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
  const dup = products.some(
    (p, i) =>
      i !== editingIndex && p.name.trim().toLowerCase() === val.toLowerCase(),
  );
  if (dup) {
    setError("f-name", "Ya existe un producto con ese nombre.");
    return false;
  }
  setOk("f-name");
  return true;
}
function validateCat() {
  const val = document.getElementById("f-cat").value;
  if (!val) {
    setError("f-cat", "Selecciona una categoría.");
    return false;
  }
  setOk("f-cat");
  return true;
}
function validateQty() {
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
function validatePrice() {
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
function validateAll() {
  const a = validateName();
  const b = validateCat();
  const c = validateQty();
  const d = validatePrice();
  return a && b && c && d;
}

// ════════════════════════════════════════════════════════════
//  STATS
// ════════════════════════════════════════════════════════════

function updateStats() {
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

// ════════════════════════════════════════════════════════════
//  FILTRADO
// ════════════════════════════════════════════════════════════

function getFiltered() {
  const q = document.getElementById("search-input").value.toLowerCase().trim();

  if (!q) return products;

  return products.filter(
    (p) =>
      String(p.name).toLowerCase().includes(q) ||
      String(p.category).toLowerCase().includes(q),
  );
}

// ════════════════════════════════════════════════════════════
//  RENDER TABLA
// ════════════════════════════════════════════════════════════

function renderTable() {
  const filtered = getFiltered();

  const tb = document.getElementById("product-table");

  const empty = document.getElementById("empty-state");

  if (filtered.length === 0) {
    tb.innerHTML = "";

    empty.style.display = "block";

    updateStats();

    return;
  }

  empty.style.display = "none";

  tb.innerHTML = filtered
    .map((p, idx) => {
      const realIdx = products.indexOf(p);

      const qtyValue = parseFloat(p.qty) || 0;

      const priceVal = parseFloat(p.price) || 0;

      const stockBadge =
        qtyValue < 5
          ? `<span class="sl-badge sl-badge-low">
           <i class="ti ti-alert-triangle"
             style="font-size:11px"></i>${p.qty}
         </span>`
          : `<span class="sl-badge sl-badge-ok">
           ${p.qty}
         </span>`;

      return `

      <tr>

        <td class="row-num">
          ${idx + 1}
        </td>

        <td style="font-weight:600;color:#1e293b">
          ${escHtml(String(p.name))}
        </td>

        <td>
          <span class="sl-badge sl-badge-cat">
            ${escHtml(String(p.category))}
          </span>
        </td>

        <td>
          ${stockBadge}
        </td>

        <td>
          $${priceVal.toFixed(2)}
        </td>

        <td style="color:#64748b">
          $${(qtyValue * priceVal).toFixed(2)}
        </td>

        <td>

          <div class="sl-actions">

            <button
              class="sl-act-btn"
              onclick="editProduct(${realIdx})">

              <i class="ti ti-pencil"></i>
              Editar

            </button>

            <button
              class="sl-act-btn del"
              onclick="deleteProduct(${realIdx})">

              <i class="ti ti-trash"></i>
              Eliminar

            </button>

          </div>

        </td>

      </tr>

    `;
    })
    .join("");

  updateStats();
}

// ── Sanitizar HTML ────────────────────────────────────────

function escHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ════════════════════════════════════════════════════════════
//  CRUD
// ════════════════════════════════════════════════════════════

function saveProduct() {
  if (!validateAll()) return;
  const product = {
    name: document.getElementById("f-name").value.trim(),
    category: document.getElementById("f-cat").value,
    qty: parseInt(document.getElementById("f-qty").value),
    price: parseFloat(document.getElementById("f-price").value),
  };
  if (editingIndex >= 0) {
    products[editingIndex] = product;
    cancelEdit();
  } else {
    products.push(product);
    clearForm();
  }
  renderTable();
}

// ───────────────────────────────────────────────────────────

function editProduct(i) {
  editingIndex = i;

  const p = products[i];

  document.getElementById("f-name").value = p.name;

  document.getElementById("f-cat").value = p.category;

  document.getElementById("f-qty").value = p.qty;

  document.getElementById("f-price").value = p.price;

  document.getElementById("form-title").textContent = "Editar producto";

  document.getElementById("btn-label").textContent = "Guardar cambios";

  document.getElementById("cancel-btn").style.display = "flex";

  document.getElementById("editing-bar").style.display = "flex";

  document.getElementById("f-name").focus();

  document.querySelector(".sl-form-card").scrollIntoView({
    behavior: "smooth",
  });
}

// ───────────────────────────────────────────────────────────

function deleteProduct(i) {
  if (!confirm(`¿Eliminar "${products[i].name}"?`)) {
    return;
  }

  if (editingIndex === i) {
    cancelEdit();
  }

  products.splice(i, 1);

  renderTable();
}

// ───────────────────────────────────────────────────────────

function cancelEdit() {
  editingIndex = -1;

  clearForm();

  document.getElementById("form-title").textContent = "Agregar producto";

  document.getElementById("btn-label").textContent = "Agregar producto";

  document.getElementById("cancel-btn").style.display = "none";

  document.getElementById("editing-bar").style.display = "none";
}

// ───────────────────────────────────────────────────────────

function clearForm() {
  ["f-name", "f-cat", "f-qty", "f-price"].forEach((id) => {
    document.getElementById(id).value = "";
  });
}

// ════════════════════════════════════════════════════════════
//  FECHA
// ════════════════════════════════════════════════════════════

function setDate() {
  const opts = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  document.getElementById("sl-date").textContent =
    new Date().toLocaleDateString("es-ES", opts);
}

// ── INIT ─────────────────────────────────────────────────────

setDate();

renderTable();
