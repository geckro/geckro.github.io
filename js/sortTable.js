function sortTable(column, id) {
  var table = document.getElementById(id);
  var switching = true;
  var dir = 'asc';
  var switchcount = 0;
  while (switching) {
    switching = false;
    var rows = table.rows;
    var rowCount = rows.length - 1;
    for (var i = 1; i < rowCount; i++) {
      var shouldSwitch = false;
      var x = rows[i].getElementsByTagName('td')[column];
      var y = rows[i + 1].getElementsByTagName('td')[column];
      var xText = x.innerHTML.toLowerCase();
      var yText = y.innerHTML.toLowerCase();
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
