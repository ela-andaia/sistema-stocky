import { currentPage, totalPages, PAGE_SIZE, setTotalPages, setCurrentPage } from "./app.js";
import { renderTable, getFiltered } from "./crud.js";

export function renderPagination(total) {
    const info = document.getElementById('page-info');
    const nums = document.getElementById('page-numbers');
    const btnFirst = document.getElementById('btn-first');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnLast = document.getElementById('btn-last');

    const start = (currentPage - 1) * PAGE_SIZE + 1;
    const end = Math.min(currentPage * PAGE_SIZE, total);

    info.textContent = `Mostrando ${start}-${end} de ${total} productos`;

    btnFirst.disabled = currentPage === 1;
    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages;
    btnLast.disabled = currentPage === totalPages;

    let pages = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages = [1];

        let lo = Math.max(2, currentPage - 1);
        let hi = Math.min(totalPages - 1, currentPage + 1);

        if (lo > 2) pages.push('...');

        for (let i = lo; i <= hi; i++) pages.push(i);

        if (hi < totalPages - 1) pages.push('...');

        pages.push(totalPages);
    }

    nums.innerHTML = pages.map(p => {
        if (p === '...') {
            return `<span class="sl-page-num" style="cursor:default;border:none">...</span>`;
        }

        return `
      <button class="sl-page-num ${p === currentPage ? 'active' : ''}">
        ${p}
      </button>

    `;
    }).join('');

    document.querySelectorAll(".sl-page-num").forEach((btn) => {
        btn.addEventListener("click", () => {
            const page = Number(btn.textContent);
            goToPage(page);
        });
    });
}

//cambia de pagina
export function goToPage(n) {
    const filtered = getFiltered();

    setTotalPages(filtered.length);

    setCurrentPage(Math.max(1, Math.min(n, totalPages)));

    renderTable();
}

//siguiente pagina
export function nextPage() {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        renderTable();
    }
}

//anterior pagina
export function prevPage() {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        renderTable();
    }
}
