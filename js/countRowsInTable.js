/* eslint-disable no-unused-vars */
function countTableRows(tableId, spanId) {
  const table = document.getElementById(tableId);
  const rowCount = table.rows.length - 1;
  const span = document.getElementById(spanId);
  span.textContent = `(${rowCount})`;
}
