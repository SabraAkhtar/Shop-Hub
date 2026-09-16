const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const EDGE2 = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const EDGE_PATH = fs.existsSync(EDGE) ? EDGE : EDGE2;

const OUT = path.resolve(__dirname, 'ss');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const pages = [
  { name: 'home', url: 'http://localhost:3000/' },
  { name: 'products', url: 'http://localhost:3000/products' },
  { name: 'cart', url: 'http://localhost:3000/cart' },
  { name: 'wishlist', url: 'http://localhost:3000/wishlist' },
  { name: 'login', url: 'http://localhost:3000/login' },
];

for (const p of pages) {
  const out = path.join(OUT, p.name + '.png');
  const cmd = `"${EDGE_PATH}" --headless --disable-gpu --window-size=1280,900 --screenshot="${out}" "${p.url}"`;
  try {
    execSync(cmd, { timeout: 25000, stdio: 'pipe' });
    const exists = fs.existsSync(out);
    console.log('Captured:', p.name, exists ? fs.statSync(out).size + ' bytes' : 'MISSING');
  } catch(e) {
    console.log('Error on', p.name, e.message.slice(0, 150));
  }
}
console.log('Done. Files in:', OUT);
