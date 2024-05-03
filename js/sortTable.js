/* eslint-disable no-unused-vars */
function sortTable(column, tableId) {
  const table = document.getElementById(tableId);
  let switching = true;
  let dir = 'asc';
  let switchcount = 0;
  while (switching) {
    let shouldSwitch = false;
    switching = false;
    let rows = table.rows;
    let rowCount = rows.length - 1;
    for (var i = 1; i < rowCount; i++) {
      let x = rows[i].getElementsByTagName('td')[column];
      let y = rows[i + 1].getElementsByTagName('td')[column];
      let xText = x.innerHTML.toLowerCase();
      let yText = y.innerHTML.toLowerCase();
      if (
        (dir === 'asc' && xText.localeCompare(yText) > 0) ||
        (dir === 'desc' && xText.localeCompare(yText) < 0)
      ) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount === 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}
