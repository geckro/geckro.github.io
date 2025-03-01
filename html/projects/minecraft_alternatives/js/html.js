const CSS = {
  REPLACEMENT: {
    ERROR: 'replacement-error',
    CONTINUATION: 'replacement-continuation',
    ALTERNATIVE: 'replacement-alt',
    PORT: 'replacement-port',
    NORMAL: 'replacement-normal'
  },
  MODLOADER: {
    NEOFORGE: 'modloader-nf',
    FORGE: 'modloader-fr',
    FABRIC: 'modloader-fb',
    STANDALONE: 'modloader-sd',
    RIFT: 'modloader-rf',
    QUILT: 'modloader-ql',
    LITELOADER: 'modloader-ll',
    RISULOADER: 'modloader-rm'
  }
};

const MODLOADER_NAMES = {
  nf: { name: 'NeoForge', class: CSS.MODLOADER.NEOFORGE },
  fr: { name: 'Forge', class: CSS.MODLOADER.FORGE },
  fb: { name: 'Fabric', class: CSS.MODLOADER.FABRIC },
  sd: { name: 'Standalone', class: CSS.MODLOADER.STANDALONE },
  rf: { name: 'Rift', class: CSS.MODLOADER.RIFT },
  ql: { name: 'Quilt', class: CSS.MODLOADER.QUILT },
  ll: { name: 'LiteLoader', class: CSS.MODLOADER.LITELOADER },
  rm: { name: 'Risugami\'s Modloader', class: CSS.MODLOADER.RISULOADER }
};

/**
 * Retrieves mod details from the mods data using the provided ID
 * @param {string} modId - The ID of the mod to find
 * @param {Array} modsData - Array of mod data objects
 * @returns {Object|undefined} The mod details object or undefined if not found
 */
function getModDetails(modId, modsData) {
  if (!modId || !modsData?.length) {
    console.warn('Invalid parameters provided to getModDetails');
    return undefined;
  }
  return modsData.find(mod => mod.id === modId);
}

/**
 * Determines the replacement type based on the replacement object
 * @param {Object} replacement - The replacement object containing replacing information
 * @returns {string} The CSS class for the replacement type
 */
function getReplacementType(replacement) {
  if (!replacement?.replacing) {
    return CSS.REPLACEMENT.ERROR;
  }

  const replacingStr = replacement.replacing.join(' ').toLowerCase();

  if (replacingStr.includes('continuation')) return CSS.REPLACEMENT.CONTINUATION;
  if (replacingStr.includes('alternative')) return CSS.REPLACEMENT.ALTERNATIVE;
  if (replacingStr.includes('port')) return CSS.REPLACEMENT.PORT;
  return CSS.REPLACEMENT.NORMAL;
}

/**
 * Formats the version information with modloader details
 * @param {Array} versionLimit - Array of version objects
 * @returns {string} Formatted HTML string with version and modloader information
 */
function formatVersionInfo(versionLimit) {
  if (!Array.isArray(versionLimit) || versionLimit.length === 0) {
    return 'Unknown';
  }

  return versionLimit
    .map(versionObj => {
      if (!versionObj || typeof versionObj !== 'object') {
        console.warn('Invalid version object:', versionObj);
        return 'Unknown';
      }

      const versionNumber = Object.keys(versionObj)[0];
      if (!versionNumber) {
        console.warn('No version number found for:', versionObj);
        return 'Unknown';
      }

      const modloaders = versionObj[versionNumber];
      if (!Array.isArray(modloaders) || modloaders.length === 0) {
        return `${versionNumber} (Unknown)`;
      }

      const formattedModloaders = modloaders
        .map(loader => {
          const modloader = MODLOADER_NAMES[loader];
          return modloader
            ? `<span class="${modloader.class}">${modloader.name}</span>`
            : loader;
        })
        .join(', ');

      return `${versionNumber} <span class="modloader">(${formattedModloaders})</span>`;
    })
    .join(', ') || 'Unknown';
}

/**
 * Generates HTML content for a replacement mod
 * @param {Object} replacement - The replacement mod object
 * @param {Array} modsData - Array of all mod data
 * @returns {string} HTML string for the replacement mod
 */
function generateReplacementHTML(replacement, modsData, currentModId) {
  const replacementDetails = getModDetails(replacement.id, modsData);
  if (!replacementDetails) {
    console.error(`Replacement details not found for ID: ${replacement.id}`);
    return '';
  }

  const replacementVersions = formatVersionInfo(
    modsData
      .filter(m => m.id === replacement.id)
      .flatMap(m => m.version_limit || [])
  );

  return `
    <div class="replacement ${getReplacementType(replacement)}" id="${currentModId}_${replacement.id}-mod">
      <div class="replacement-header">
        <img src="./img/${replacementDetails.id}.webp" 
             alt="${replacementDetails.name} icon" 
             class="mod-icon">
        <a href="${replacementDetails.modrinth_url}" 
           class="replacement-name" 
           target="_blank">${replacementDetails.name}</a>
      </div>
      <div class="replacing-info">
        <div>${replacement.replacing.join(', ')}
          <details>
            <summary>Version information</summary>
            <span class="version-info">${replacementVersions}</span>
          </details>
        </div>
      </div>
    </div>`;
}

/**
 * Generates HTML content for all mods
 * @param {Array} data - Array of mod data to process
 * @param {Array} modsData - Array of all mod information
 * @returns {string} Complete HTML string for all mods
 */
export function generateModContent(data, modsData) {
  if (!Array.isArray(data) || !Array.isArray(modsData)) {
    console.error('Invalid input data provided to generateModContent');
    return '';
  }

  return data.map(mod => {
    const modDetails = getModDetails(mod.id, modsData);
    if (!modDetails) {
      console.error(`Mod details not found for ID: ${mod.id}`);
      return '';
    }

    const versionSummary = formatVersionInfo(
      modsData
        .filter(m => m.id === mod.id)
        .flatMap(m => m.version_limit || [])
    );

    return `
      <div class="mod-container" id="${modDetails.id}-mod">
        <div class="mod-summary-container">
          <div class="mod-header-container">
            <img src="./img/${modDetails.id}.webp" 
                 alt="${modDetails.name} icon" 
                 class="mod-icon">
            <a class="mod-header-url" 
               href="${modDetails.modrinth_url}">${modDetails.name}</a>
          </div>
        </div>
        <div class="replacements-container">
          ${mod.replacements.map(replacement =>
      generateReplacementHTML(replacement, modsData, mod.id)
    ).join('')}
        </div>
        <details>
          <summary>Version information</summary>
          <span class="version-info">${versionSummary}</span>
        </details>
      </div>`;
  }).join('');
}