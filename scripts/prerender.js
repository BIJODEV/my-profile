// scripts/prerender.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE_PATH = '/my-profile';
const BUILD_DIR = path.join(__dirname, '..', 'build');
const PORT = 45678;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json'
};

function serveStatic(req, res) {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.startsWith(BASE_PATH)) {
    urlPath = urlPath.slice(BASE_PATH.length);
  }
  if (urlPath === '' || urlPath === '/') {
    urlPath = '/index.html';
  }
  const filePath = path.join(BUILD_DIR, urlPath);
  if (!filePath.startsWith(BUILD_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

async function main() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve) => server.listen(PORT, resolve));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}${BASE_PATH}/`, { waitUntil: 'networkidle0' });

  const html = await page.content();
  const outputPath = path.join(BUILD_DIR, 'index.html');
  fs.writeFileSync(outputPath, html);

  await browser.close();
  await new Promise((resolve) => server.close(resolve));

  console.log(`Prerendered ${outputPath} (${html.length} bytes).`);
}

main().catch((error) => {
  console.error('Prerendering failed:', error);
  process.exit(1);
});
