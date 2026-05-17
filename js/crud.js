import { setOk, escHtml, clearForm } from "./utils.js";
import { updateStats, cancelEdit, products, PAGE_SIZE, currentPage, setTotalPages } from "./app.js";
import { validateAll } from "./validate_input.js";
import { renderPagination } from "./pagination.js";

export let editingId = null;

// Reinicia el estado de edición
export const resetEditingId = () => editingId = null;

// Renderiza la tabla de productos con los datos actuales y agrega los event listeners a los botones de acción
export function renderTable() {


  const filtered = getFiltered();


  const tb = document.getElementById("product-table");
  const empty = document.getElementById("empty-state");
  const pagWrap = document.getElementById('sl-pagination');

  setTotalPages(filtered.length);


  if (filtered.length === 0) {
    tb.innerHTML = "";
    empty.style.display = "block";
    pagWrap.style.display = 'none';
    updateStats();
    return;
  }

  pagWrap.style.display = 'flex';

  empty.style.display = "none";

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const slice = filtered.slice(start, end);

  tb.innerHTML = slice
    .map((p) => {

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
          ${p.id}
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
              class="sl-act-btn btn-edit"
              data-id="${p.id}">
              <i class="ti ti-pencil"></i>
              Editar
            </button>

            <button
              class="sl-act-btn del btn-delete"
              data-id="${p.id}">
              <i class="ti ti-trash"></i>
              Eliminar
            </button>

          </div>

        </td>

      </tr>

    `;
    })
    .join("");

  // Agrega los event listeners a los botones de editar y eliminar después de renderizar la tabla
  document.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      editingId = id;
      editProduct(id);
    });
  });

  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      deleteProduct(id);
    });
  });

  // Actualiza la paginación
  renderPagination(filtered.length);
  updateStats();
}

// Guarda un nuevo producto o los cambios a uno existente según el estado de edición
export function saveProduct() {
  if (!validateAll()) return;

  const maxId = Math.max(...products.map(p => p.id), 0);


  const product = {
    id: editingId !== null ? editingId : maxId + 1,
    name: document.getElementById("f-name").value.trim(),
    category: document.getElementById("f-cat").value,
    qty: parseInt(document.getElementById("f-qty").value),
    price: parseFloat(document.getElementById("f-price").value),
  };

  if (editingId !== null) {
    const pEdit = products.find((p) => p.id === editingId);
    if (!pEdit) return;
    Object.assign(pEdit, product);


    cancelEdit();
    editingId = null;

  } else {
    products.push(product);
    clearForm();
  }
  renderTable();
}

// Muestra el formulario con los datos del producto a editar
export function editProduct(i) {



  const p = products.find(p => p.id === i);

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

  ["f-name", "f-cat", "f-qty", "f-price"].forEach((id) => {
    setOk(id);
  });
}

// Elimina un producto de la lista
export function deleteProduct(i) {
  const p = products.find(p => p.id === i);
  if (!confirm(`¿Eliminar "${p.name}"?`)) {
    return;
  }

  if (editingId === i) {
    cancelEdit();
  }

  const index = products.findIndex((p) => p.id === i);
  products.splice(index, 1);

  renderTable();
}

// Obtiene la lista de productos filtrada según el término de búsqueda ingresado
export function getFiltered() {
  const q = document.getElementById("search-input").value.toLowerCase().trim();

  if (!q) return products;

  return products.filter(
    (p) =>
      String(p.name).toLowerCase().includes(q) ||
      String(p.category).toLowerCase().includes(q) ||
      String(p.price).includes(q) ||
      String(p.qty).includes(q)


  );
}