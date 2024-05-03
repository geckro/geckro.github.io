/* eslint-disable no-unused-vars */
function searchBox(tableId, search, columnDropdown) {
  let table = document.getElementById(tableId)
  let searchInput = document.getElementById(search);
  let column = document.getElementById(columnDropdown);

  const rows = table.querySelectorAll("tr");
  column.addEventListener("change", () => {
    for (let i = 1; i < rows.length; i++) {
      let row = rows[i];
      let cellIndex = parseInt(column.value);
      let cell = row.querySelectorAll("td, th")[cellIndex];
      let cellText = cell.textContent.toLowerCase();
      let searchTerm = searchInput.value.toLowerCase();
      if (cellText.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
}
