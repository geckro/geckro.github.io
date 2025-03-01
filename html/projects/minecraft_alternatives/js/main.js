import { readJSONFile, readHTMLFile, writeHTMLFile } from './file.js';
import { generateModContent } from './html.js'
import { addStyles } from './style.js'


const jsonData = readJSONFile('./html/projects/minecraft_alternatives/json/data.json');
const modsData = readJSONFile('./html/projects/minecraft_alternatives/json/mods.json');
let htmlTemplate = readHTMLFile('./html/projects/minecraft_alternatives/minecraft_alternatives_base.html');

const modContent = generateModContent(jsonData, modsData);

htmlTemplate = addStyles(htmlTemplate);
htmlTemplate = htmlTemplate.replace('<main>', `<main>
    <div class="info-container">
        <div class="search-container">
            <input type="text" id="search-box" placeholder="Search..">
        </div>
        <div class="filter-container">
            <input type="checkbox" id="test" name="test" />
            <label for="test">test</label>
        </div>
    </div>
    \n      ${modContent}`);

writeHTMLFile('./html/projects/minecraft_alternatives/minecraft_alternatives.html', htmlTemplate);
