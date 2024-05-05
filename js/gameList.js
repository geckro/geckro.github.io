/* eslint-disable no-unused-vars */
function getElement(id) {
  return document.getElementById(id);
}
function getTagsFromTable(tableIdsColNumbers) {
  const allTags = new Set();
  for (const tableIdColNumberList of tableIdsColNumbers) {
    const tableId = tableIdColNumberList[0];
    const columnNumber = tableIdColNumberList[1];
    const table = getElement(tableId);
    const rows = table.rows;
    for (let i = 1; i < table.rows.length; i++) {
      const row = rows[i];
      const cell = row.cells[columnNumber];
      const content = cell.textContent.trim();
      const tags = content.split(/\s*,\s*(?=[^"]*(?:[^"]*"[^"]*)*[^"]*$)/);
      tags.forEach(tag => allTags.add(tag.trim()));
    }
  }
  return Array.from(allTags).sort();
}
function taggingSystem(tagArray) {
  const tag_area = getElement('filterTagArea');
  const year_area = getElement('filterYearArea');
  
  for (const tag of tagArray) {
    const span = document.createElement("span");
    span.classList.add("cbc");

    const checkbox = document.createElement("input");
    const lowercaseNoSpaces = tag.toLowerCase().replace(/\s+/g, "_");

    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `cb-${lowercaseNoSpaces}`);
    checkbox.setAttribute("value", tag);

    const label = document.createElement("label");
    label.textContent = tag;
    label.setAttribute("for", `cb-${lowercaseNoSpaces}`);

    span.appendChild(checkbox);
    span.appendChild(label);
    if (isYear(tag)) {
      label.classList.add("tagYear");
      year_area.appendChild(span);
    } else {
      tag_area.appendChild(span);
    }
  }
}
function isYear(tag) {
  return !isNaN(parseInt(tag));
}
function filterTable(tableIdsColNumbers, tagArea) {
  for (const tableIdColNumber of tableIdsColNumbers) {
    const tableId = tableIdColNumber[0];
    const colNumber = tableIdColNumber[1];
    const table = getElement(tableId);
    const rows = table.rows;

    const selectedTags = Array.from(document.querySelectorAll(`${tagArea} input[type='checkbox']:checked`)).map(checkbox => checkbox.value);

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cell = row.cells[colNumber];
      const content = cell.textContent.trim();
      const tags = content.split(/,(?=(?:[^"]*"[^"]*")*(?![^"]*"))/);

      let showRow = false;
      if (selectedTags.length === 0) {
        showRow = true;
      } else {
        for (const tag of selectedTags) {
          if (tags.includes(tag)) {
            showRow = true;
            break;
          }
        }
      }

      row.style.display = showRow ? "" : "none";
    }
  }
}
function sortTable(column, tableId) {
  const table = getElement(tableId);
  let switching = true;
  let dir = 'asc';

  let switchcount = 0;
  while (switching) {
    let shouldSwitch = false;
    switching = false;
    let rows = table.rows;
    let rowCount = rows.length - 1;
    for (var i = 1; i < rowCount; i++) {
      const xText = rows[i].getElementsByTagName('td')[column].innerHTML.toLowerCase();
      const yText = rows[i + 1].getElementsByTagName('td')[column].innerHTML.toLowerCase();
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
function countTableRows(tableId, spanId) {
  const table = getElement(tableId);
  const rowCount = table.rows.length - 1;
  const span = getElement(spanId);
  span.textContent = `(${rowCount})`;
}
