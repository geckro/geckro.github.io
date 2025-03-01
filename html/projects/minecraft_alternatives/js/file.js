import { readFileSync, writeFileSync } from 'fs';

export function readJSONFile(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

export function readHTMLFile(filePath) {
  return readFileSync(filePath, 'utf8');
}

export function writeHTMLFile(filePath, content) {
  writeFileSync(filePath, content);
  console.log('HTML file has been updated with mod replacements');
}