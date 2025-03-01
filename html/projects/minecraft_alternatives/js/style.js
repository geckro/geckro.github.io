export function addStyles(html) {
  const backgroundColor = 'white';
  const backgroundColor2 = '#f9f9f9';
  const pageColor = '#ebf0f0';
  const shadowColor = 'rgba(0, 0, 0, 0.1)'
  const styleTag = `
    <style>
      body {
        background-color: ${pageColor};
        font-family: 'Segoe UI', 'Cantarell', sans-serif;
        padding-bottom: 10em;
        margin: auto;
      }
      .title-container {
        background-color: ${backgroundColor};
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        margin-bottom: 20px;
        max-width: 100%;
        text-align: center;
      }
      .info-container {
        background-color: ${backgroundColor};
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        position: sticky;
        top: 0;
        box-shadow: 0 5px 10px ${shadowColor};
      }
      .info-container .search-container {
        background-color: ${backgroundColor2};
        border-radius: 8px;
        width: 45%;
        display: inline-block;
      }
      .search-container input[type=text] {
        border-radius: 8px;
        padding: 4px;
        font-size: 16px;
      }
      .info-container .filter-container {
        background-color: ${backgroundColor2};
        border-radius: 8px;
        width: 45%;
        display: inline-block;
      }
      .filter-container label {
        font-size: 16px;
      }
      .mod-container {
        max-width: 95%;
        margin: auto;
        background-color: ${backgroundColor};
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px ${shadowColor};
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
      summary {
        cursor: pointer;
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
        background-color: ${backgroundColor2};
        border-radius: 0 8px 8px 0;
        margin-bottom: 10px;
      }
      .replacement-continuation {
        border-left: 3px solid #5182cc;
      }
      .replacement-alt {
        border-left: 3px solid #d48d22;
      }
      .replacement-port {
        border-left: 3px solid #dd6bca;
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