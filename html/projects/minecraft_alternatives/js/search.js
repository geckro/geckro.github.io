document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('search-box');
  if (!searchBox) {
      console.error('Search box element not found');
      return;
  }

  // Function to filter mod containers based on search input
  function filterMods(searchText) {
      const modContainers = document.querySelectorAll('.mod-container');
      const searchTerm = searchText.toLowerCase().trim();

      modContainers.forEach(container => {
          // Only search in mod titles
          const modName = container.querySelector('.mod-header-url')?.textContent?.toLowerCase() || '';

          // Show/hide container based on search match
          if (searchTerm === '' || modName.includes(searchTerm)) {
              container.style.display = '';
          } else {
              container.style.display = 'none';
          }
      });
  }

  // Add input event listener with debounce
  let debounceTimeout;
  searchBox.addEventListener('input', (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
          filterMods(e.target.value);
      }, 300); // Debounce for 300ms to prevent excessive filtering
  });
});