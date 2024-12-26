import { readFileSync, writeFileSync } from 'fs';

// Function to get mod details from mods.json using the id
function getModDetails(modId, modsData) {
    return modsData.find(mod => mod.id === modId);
}

function isContinuation(mod) {
    if (mod.replacements && Array.isArray(mod.replacements)) {
        for (let replacement of mod.replacements) {
            if (replacement.replacing && replacement.replacing.includes("Continuation")) {
                return " replacement-continuation";
            }
            if (replacement.replacing && replacement.replacing.includes("Alternative")) {
                return " replacement-alt";
            }
        }
    }
    return " replacement-normal";
}

function formatVersionInfo(versionLimit) {
    if (!Array.isArray(versionLimit) || versionLimit.length === 0) {
        return 'Unknown';
    }

    return versionLimit.map(versionObj => {
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

        const replacedModloaders = modloaders.map(loader => {
            switch (loader) {
              case 'nf':
                return '<span class="modloader-nf">NeoForge</span>';
              case 'fr':
                return '<span class="modloader-fr">Forge</span>';
              case 'fb':
                return '<span class="modloader-fb">Fabric</span>';
              case 'sd':
                return '<span class="modloader-sd">Standalone</span>';
              case 'rf':
                return '<span class="modloader-rf">Rift</span>';
              default:
                return loader;
            }
          });

        if (!modloaders || !Array.isArray(modloaders) || modloaders.length === 0) {
            return `${versionNumber} (Unknown)`;
        }

        return `${versionNumber} <span class="modloader">(${replacedModloaders.join(', ')})</span>`;
    }).join(', ') || 'Unknown';
}

// Function to generate HTML content for the mods
function generateModContent(data, modsData) {
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
                    <img src="./img/${modDetails.id}.webp" alt="${modDetails.name} icon" class="mod-icon">
                    <a class="mod-header-url" href="${modDetails.modrinth_url}">${modDetails.name}</a>
                </div>
            </div>
            <div class="replacements-container">
            ${mod.replacements.map(replacement => {
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
                <div class="replacement${isContinuation(mod)}">
                    <div class="replacement-header">
                        <img src="./img/${replacementDetails.id}.webp" alt="${replacementDetails.name} icon" class="mod-icon">
                        <a href="${replacementDetails.modrinth_url}" class="replacement-name" target="_blank">${replacementDetails.name}</a>
                    </div>
                    <div class="replacing-info">
                        <div>${replacement.replacing.join(', ')} | ${replacementVersions}</div>
                    </div>
                </div>
                `;
            }).join('')}
            </div>
            <span class="version-info">${versionSummary}</span>
        </div>
        `;
    }).join('');
}

function addStyles(html) {
    const styleTag = `
    <style>
        .mod-container {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .mod-summary-container {
            color: #333;
            margin-bottom: 15px;
        }
        .mod-header-container {
            font-size: 24px;
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 5px;
        }
        .mod-header-url {
            color: #000;
        }
        .mod-header-url:hover {
            color: #5da3c9;
        }
        .mod-header-url:visited {
            color: #000;
        }
        .mod-header-url:visited:hover {
            color: #5da3c9;
        }
        .modloader {
            font-size: 0.8em;
        }
        .modloader-nf {
            color: #46ad2f;
        }
        .modloader-fb {
            color: #219da3;
        }
        .modloader-sd {
            color: #c638d9;
        }
        .modloader-fr {
            color: #a32014;
        }
        .version-info {
            font-size: 0.75em;
            font-style: italic;
            color: #666;
            display: block;
            margin-top: 10px;
        }
        .replacements-container {
            margin-top: 15px;
        }
        .replacement {
            margin-left: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 0 8px 8px 0;
            margin-bottom: 10px;
        }
        .replacement-continuation {
            border-left: 3px solid #5182cc;
        }
        .replacement-alt {
            border-left: 3px solid #d48d22;
        }
        .replacement-normal {
            border-left: 3px solid #4CAF50;
        }
        .replacement:last-child {
            margin-bottom: 0;
        }
        .replacement-header {
            display: flex;
            align-items: center;
            font-size: 1.2em;
            gap: 10px;
            margin-bottom: 8px;
        }
        .mod-icon {
            width: 24px;
            height: 24px;
            border-radius: 4px;
        }
        .replacement-name {
            color: #000;
            font-weight: bold;
            font-family: sans-serif;
            text-decoration: none;
        }
        .replacement-name:hover {
            text-decoration: underline;
        }
        .replacement-name:visited {
            color: #000;
        }
        .replacing-info {
            color: #666;
            font-style: italic;
            font-size: 0.9em;
            line-height: 1.4;
        }
        .replacing-info div {
            margin-bottom: 4px;
        }
        .replacing-info div:last-child {
            margin-bottom: 0;
        }
        #search-box {
            margin-top: 1em;
            margin-bottom: 1em;
        }
    </style>`;

    return html.replace('</head>', `${styleTag}\n  </head>`);
}

const jsonData = JSON.parse(readFileSync('./html/projects/minecraft_alternatives/data.json', 'utf8'));
const modsData = JSON.parse(readFileSync('./html/projects/minecraft_alternatives/mods.json', 'utf8'));
let htmlTemplate = readFileSync('./html/projects/minecraft_alternatives/minecraft_alternatives_base.html', 'utf8');

const modContent = generateModContent(jsonData, modsData);

htmlTemplate = addStyles(htmlTemplate);
htmlTemplate = htmlTemplate.replace('<main>', `<main><input type="text" id="search-box" placeholder="Search..">\n      ${modContent}`);

writeFileSync('./html/projects/minecraft_alternatives/minecraft_alternatives.html', htmlTemplate);

console.log('HTML file has been updated with mod replacements');
