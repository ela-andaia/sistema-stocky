import { products } from "./app.js";

// funcion para exportar datos a csv
function exportCSV() {
    const rows = [
        [
            '#',
            'Producto',
            'Categoría',
            'Cantidad',
            'Precio (USD)',
            'Subtotal (USD)'
        ],

        ...products.map((p, i) => [
            i + 1,
            p.name,
            p.category,
            p.qty,
            p.price.toFixed(2),
            (p.qty * p.price).toFixed(2)
        ])
    ];

    const csv = rows.map(r =>
        r.map(cell =>
            `"${String(cell).replace(/"/g, '""')}"`
        ).join(',')
    ).join('\r\n');

    const blob = new Blob(
        ['\uFEFF' + csv],
        { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;

    a.download = `stocky_inventario_${today()}.csv`;

    a.click();

    URL.revokeObjectURL(url);
}

function today() {
    const d = new Date();

    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}


export default exportCSV