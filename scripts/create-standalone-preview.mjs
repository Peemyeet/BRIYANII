import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDirectory = path.join(projectRoot, 'dist');
const indexHtml = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
const scriptPath = indexHtml.match(/<script[^>]+src="([^"]+\.js)"[^>]*><\/script>/)?.[1];
const stylePath = indexHtml.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/)?.[1];

if (!scriptPath || !stylePath) {
  throw new Error('Could not find the built JavaScript and CSS assets in dist/index.html');
}

const [scriptAsset, styleAsset, camelImage] = await Promise.all([
  readFile(path.join(distDirectory, scriptPath.replace(/^\//, '')), 'utf8'),
  readFile(path.join(distDirectory, stylePath.replace(/^\//, '')), 'utf8'),
  readFile(path.join(projectRoot, 'public/camel.png'))
]);

const camelDataUrl = `data:image/png;base64,${camelImage.toString('base64')}`;
const inlineScript = scriptAsset.replaceAll('/camel.png', camelDataUrl);
const inlineHtml = indexHtml
  .replace(/<link[^>]+href="[^"]+\.css"[^>]*>/, () => `<style>${styleAsset}</style>`)
  .replace(/<script[^>]+src="[^"]+\.js"[^>]*><\/script>/, () => `<script type="module">${inlineScript}</script>`);
const outputPath = path.join(projectRoot, 'BRIYANII-preview.html');

await writeFile(outputPath, inlineHtml);
console.log(`Created ${path.relative(projectRoot, outputPath)}`);
