const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SS = path.resolve(__dirname, 'ss');
const OUTPUT_PDF = path.resolve(__dirname, '../ShopHub_Visual_Presentation.pdf');
const TEMP_HTML = path.resolve(__dirname, 'visual_presentation_temp.html');

// Load screenshots as base64
function img(name) {
  const p = path.join(SS, name + '.png');
  if (!fs.existsSync(p)) return '';
  return 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
}

const HOME = img('home');
const PRODUCTS = img('products');
const CART = img('cart');
const WISHLIST = img('wishlist');
const LOGIN = img('login');

// Brand Colors
const C1 = '#078F83';   // Primary teal
const C2 = '#063D37';   // Dark teal
const C3 = '#EAF8F5';   // Light bg
const C4 = '#0D7E73';   // Mid teal
const BG = '#F7FCFB';   // Page bg

const slide = (id, classes, content) => `
<div class="slide ${classes}" id="s${id}">
  ${content}
  <div class="footer-bar"></div>
  <div class="page-num">${String(id).padStart(2,'0')}</div>
</div>`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: 'Inter', -apple-system, sans-serif; background:#111; }

/* ── Slide base ── */
.slide {
  width: 1280px;
  height: 720px;
  position: relative;
  overflow: hidden;
  page-break-after: always;
  page-break-inside: avoid;
  display: flex;
  flex-direction: column;
}

.footer-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, ${C1} 40%, ${C1} 60%, transparent 100%);
  opacity: 0.5;
}
.page-num {
  position: absolute;
  bottom: 14px; right: 36px;
  font-size: 11px; font-weight: 700;
  color: ${C1}; opacity: 0.5;
  letter-spacing: 2px;
}

/* ── Dark base ── */
.dark {
  background: linear-gradient(150deg, #0c1f1d 0%, #060d0c 100%);
  color: #fff;
}
.light {
  background: ${BG};
  color: ${C2};
}

/* ── Typography ── */
.eyebrow {
  font-size: 11px; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase;
  color: ${C1}; opacity: 0.85;
  margin-bottom: 10px;
  display: flex; align-items: center; gap: 10px;
}
.eyebrow::after {
  content: '';
  display: block;
  width: 24px; height: 2px;
  background: ${C1};
  border-radius: 2px;
}

.h-xl { font-size: 60px; font-weight: 900; letter-spacing: -3px; line-height: 1.0; }
.h-lg { font-size: 48px; font-weight: 800; letter-spacing: -2.5px; line-height: 1.05; }
.h-md { font-size: 36px; font-weight: 800; letter-spacing: -1.5px; line-height: 1.1; }
.h-sm { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
.teal { color: ${C1}; }
.body-lg { font-size: 16px; font-weight: 400; line-height: 1.7; color: #9bc8c3; }
.body-md { font-size: 14px; font-weight: 400; line-height: 1.65; color: #7da9a4; }

/* ── Bullets ── */
.bullets { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.bullets li {
  font-size: 15px; font-weight: 400;
  color: #c8e8e4; line-height: 1.5;
  display: flex; align-items: flex-start; gap: 10px;
}
.bullets li::before { content: '▸'; color: ${C1}; font-size: 12px; margin-top: 3px; flex-shrink: 0; }
.bullets li strong { color: #fff; font-weight: 600; }

/* ── Pills / Tags ── */
.pill {
  display: inline-flex; align-items: center;
  background: rgba(7,143,131,0.12);
  border: 1px solid rgba(7,143,131,0.3);
  color: #7DD8CF;
  font-size: 12px; font-weight: 600;
  padding: 6px 14px; border-radius: 100px;
  letter-spacing: 0.3px;
}
.pill-row { display: flex; flex-wrap: wrap; gap: 8px; }

/* ── Cards ── */
.card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(7,143,131,0.18);
  border-radius: 16px;
  padding: 20px 22px;
}

/* ── Screenshot frame ── */
.ss-frame {
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 30px 80px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(7,143,131,0.15);
  background: #000;
  position: relative;
}
.ss-frame img { display: block; width: 100%; }
.ss-frame .top-bar {
  position: absolute; top: 0; left: 0; right: 0;
  height: 28px; background: #1a1a1a;
  display: flex; align-items: center; gap: 6px;
  padding: 0 12px;
}
.dot { width:8px; height:8px; border-radius:50%; }

/* ── Layout helpers ── */
.pad { padding: 56px 70px; }
.pad-sm { padding: 44px 60px; }
.row { display: flex; gap: 40px; }
.col { display: flex; flex-direction: column; }
.flex-1 { flex: 1; }

/* ── Callout label ── */
.callout {
  position: absolute;
  background: #fff;
  color: ${C2};
  font-size: 11px; font-weight: 700;
  padding: 4px 10px; border-radius: 6px;
  white-space: nowrap;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  display: flex; align-items: center; gap: 5px;
}
.callout::before { content: '→'; color: ${C1}; font-size: 12px; }

/* ── Swatch ── */
.swatch { display:flex; flex-direction:column; align-items:center; gap:6px; }
.swatch-dot { width:52px; height:52px; border-radius:50%; border: 2px solid rgba(255,255,255,0.1); }
.swatch-hex { font-size:10px; font-weight:700; font-family:monospace; color:#7a9f9b; }
.swatch-name { font-size:10px; color:#5a9e98; font-weight:500; }

/* ── Flow step ── */
.flow-step {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  flex: 1;
}
.flow-step-num {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(7,143,131,0.15);
  border: 2px solid rgba(7,143,131,0.4);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 800; color: ${C1};
}
.flow-step-label {
  font-size: 13px; font-weight: 600; color: #cce8e5;
  text-align: center;
}
.flow-arrow {
  font-size: 22px; color: rgba(7,143,131,0.4);
  align-self: center; padding-bottom: 22px;
}

/* ── Stat box ── */
.stat-box {
  flex: 1;
  background: rgba(7,143,131,0.08);
  border: 1px solid rgba(7,143,131,0.2);
  border-radius: 16px;
  padding: 22px 20px;
  text-align: center;
}
.stat-value { font-size: 42px; font-weight: 900; color: ${C1}; letter-spacing: -2px; }
.stat-label { font-size: 12px; font-weight: 500; color: #7a9f9b; margin-top: 4px; }

/* ── Cover ── */
.cover-bg {
  background: linear-gradient(140deg, #041e1b 0%, #020c0b 60%, #051a17 100%);
}
.cover-glow-1 {
  position: absolute;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(7,143,131,0.14) 0%, transparent 70%);
  top: -250px; right: -200px; border-radius: 50%;
}
.cover-glow-2 {
  position: absolute;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(13,126,115,0.1) 0%, transparent 70%);
  bottom: -150px; left: -100px; border-radius: 50%;
}
</style>
</head>
<body>

<!-- =====================================================================
  SLIDE 1 — COVER
===================================================================== -->
${slide(1, 'dark cover-bg', `
  <div class="cover-glow-1"></div>
  <div class="cover-glow-2"></div>

  <!-- Left: Text -->
  <div style="position:relative;z-index:2;display:flex;gap:0;height:100%;">
    <div style="width:480px;flex-shrink:0;display:flex;flex-direction:column;justify-content:center;padding:0 0 0 70px;">
      <div style="width:64px;height:64px;border:2.5px solid ${C1};border-radius:16px;display:flex;align-items:center;justify-content:center;background:rgba(7,143,131,0.12);margin-bottom:28px;">
        <span style="font-size:28px;font-weight:900;color:${C1};">S</span>
      </div>
      <div class="eyebrow" style="margin-bottom:14px;">React Frontend Project · 2026</div>
      <div class="h-xl" style="color:#fff;margin-bottom:8px;">Shop<span class="teal">Hub</span></div>
      <div style="font-size:20px;font-weight:400;color:#7a9f9b;margin-bottom:40px;letter-spacing:0.3px;">Modern E-Commerce Website</div>
      <div style="width:48px;height:2px;background:${C1};border-radius:2px;margin-bottom:24px;opacity:0.6;"></div>
      <div style="font-size:15px;font-weight:600;color:#cce8e5;">Presented by Sabra Akhtar</div>
      <div style="font-size:13px;color:#5a9e98;margin-top:4px;">Frontend Development Project</div>
    </div>

    <!-- Right: Homepage screenshot -->
    <div style="flex:1;display:flex;align-items:center;justify-content:flex-end;padding:40px 0 40px 20px;overflow:hidden;">
      ${HOME ? `
      <div class="ss-frame" style="width:700px;height:580px;transform:perspective(1000px) rotateY(-6deg) rotateX(2deg);border-radius:16px;flex-shrink:0;overflow:hidden;">
        <img src="${HOME}" style="width:100%;height:100%;object-fit:cover;object-position:top;" />
        <div style="position:absolute;inset:0;background:linear-gradient(to right, rgba(4,30,27,0.3) 0%, transparent 30%);"></div>
      </div>` : `<div style="width:700px;height:580px;background:rgba(7,143,131,0.1);border:1px solid rgba(7,143,131,0.2);border-radius:16px;display:flex;align-items:center;justify-content:center;color:${C1};font-size:20px;font-weight:700;">ShopHub Website</div>`}
    </div>
  </div>
`)}

<!-- =====================================================================
  SLIDE 2 — WHAT DID I BUILD?
===================================================================== -->
${slide(2, 'dark', `
  <div class="pad" style="display:flex;flex-direction:column;height:100%;">
    <div class="eyebrow">What did I build?</div>
    <div class="h-md" style="margin-bottom:6px;">A complete <span class="teal">online shopping</span> website</div>
    <div class="body-md" style="margin-bottom:28px;">Built with React — a real, working e-commerce frontend.</div>

    <div class="row" style="flex:1;align-items:flex-start;">
      <!-- Screenshot -->
      <div style="flex:1.3;display:flex;align-items:center;">
        ${HOME ? `
        <div class="ss-frame" style="width:100%;">
          <div class="top-bar">
            <div class="dot" style="background:#ff5f57;"></div>
            <div class="dot" style="background:#ffbd2e;"></div>
            <div class="dot" style="background:#28ca41;"></div>
            <div style="flex:1;height:14px;background:#2a2a2a;border-radius:7px;margin-left:8px;max-width:260px;"></div>
          </div>
          <img src="${HOME}" style="width:100%;height:390px;object-fit:cover;object-position:top;margin-top:28px;" />
        </div>` : `<div style="width:100%;height:380px;background:rgba(7,143,131,0.08);border-radius:14px;border:1px solid rgba(7,143,131,0.2);display:flex;align-items:center;justify-content:center;color:#5a9e98;">Homepage Screenshot</div>`}
      </div>

      <!-- Description -->
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:18px;padding-top:10px;">
        <div class="card">
          <div style="font-size:13px;font-weight:700;color:${C1};margin-bottom:8px;letter-spacing:0.5px;">WHAT IS SHOPHUB?</div>
          <div style="font-size:15px;font-weight:400;color:#c8e8e4;line-height:1.7;">ShopHub is a modern e-commerce website where users can browse products, add to cart, save to wishlist, and place orders.</div>
        </div>
        <div class="card">
          <div style="font-size:13px;font-weight:700;color:${C1};margin-bottom:10px;letter-spacing:0.5px;">WHAT CAN A USER DO?</div>
          <ul class="bullets">
            <li><strong>Browse</strong> 200+ live products from real API</li>
            <li><strong>Search & filter</strong> by category or keyword</li>
            <li><strong>Add to cart</strong> and manage quantities</li>
            <li><strong>Save to wishlist</strong> for later</li>
            <li><strong>Login/Signup</strong> with real Firebase auth</li>
            <li><strong>Place orders</strong> saved to cloud (Firestore)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`)}

<!-- =====================================================================
  SLIDE 3 — THE FIRST LOOK (Homepage Annotated)
===================================================================== -->
${slide(3, 'light', `
  <div style="display:flex;height:100%;">
    <!-- Left panel -->
    <div style="width:300px;flex-shrink:0;background:${C2};display:flex;flex-direction:column;justify-content:center;padding:50px 36px;">
      <div class="eyebrow" style="color:rgba(125,216,207,0.8);">Slide 03</div>
      <div class="h-md" style="color:#fff;margin-bottom:12px;">Homepage <br/><span style="color:${C1};">Structure</span></div>
      <div style="font-size:14px;color:#8ab8b3;line-height:1.7;margin-bottom:28px;">This is how the homepage is organized. Each section has a clear purpose.</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${['① Header & Search','② Hero Section','③ Category Section','④ Featured Products','⑤ Promo Banner','⑥ Footer'].map((t,i)=>`
        <div style="display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;color:#c8e8e4;">
          <div style="width:8px;height:8px;border-radius:50%;background:${C1};flex-shrink:0;"></div>
          ${t}
        </div>`).join('')}
      </div>
    </div>

    <!-- Right: Screenshot with overlays -->
    <div style="flex:1;position:relative;overflow:hidden;background:#e8f5f3;">
      ${HOME ? `<img src="${HOME}" style="width:100%;height:100%;object-fit:cover;object-position:top;" />` : ''}
      <!-- Overlay tint -->
      <div style="position:absolute;inset:0;background:rgba(6,61,55,0.05);"></div>

      <!-- Callout labels -->
      <div class="callout" style="top:28px;left:20px;">Header & Navigation</div>
      <div class="callout" style="top:28px;right:20px;">Cart | User Button</div>
      <div class="callout" style="top:165px;left:20px;">Hero Section + Bento Cards</div>
      <div class="callout" style="top:330px;left:20px;">Product Categories</div>
      <div class="callout" style="top:480px;left:20px;">Featured Products Carousel</div>
    </div>
  </div>
`)}

<!-- =====================================================================
  SLIDE 4 — DESIGN DIRECTION
===================================================================== -->
${slide(4, 'dark', `
  <div class="pad" style="display:flex;flex-direction:column;height:100%;">
    <div class="eyebrow">Design Direction</div>
    <div class="h-md" style="margin-bottom:28px;"><span class="teal">Colors, Typography</span> & UI Style</div>

    <div class="row" style="flex:1;gap:48px;">
      <!-- Color Palette -->
      <div class="col" style="flex:1.2;gap:24px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:2px;color:#5a9e98;text-transform:uppercase;margin-bottom:4px;">Color Palette</div>
        <div style="display:flex;gap:20px;align-items:flex-end;">
          <div class="swatch">
            <div class="swatch-dot" style="background:#078F83;width:64px;height:64px;"></div>
            <div class="swatch-hex">#078F83</div>
            <div class="swatch-name">Primary</div>
          </div>
          <div class="swatch">
            <div class="swatch-dot" style="background:#063D37;width:56px;height:56px;"></div>
            <div class="swatch-hex">#063D37</div>
            <div class="swatch-name">Dark</div>
          </div>
          <div class="swatch">
            <div class="swatch-dot" style="background:#0D7E73;width:48px;height:48px;"></div>
            <div class="swatch-hex">#0D7E73</div>
            <div class="swatch-name">Mid</div>
          </div>
          <div class="swatch">
            <div class="swatch-dot" style="background:#EAF8F5;border:2px solid rgba(7,143,131,0.3);width:48px;height:48px;"></div>
            <div class="swatch-hex">#EAF8F5</div>
            <div class="swatch-name">Light</div>
          </div>
          <div class="swatch">
            <div class="swatch-dot" style="background:#F7FCFB;border:2px solid rgba(7,143,131,0.2);width:44px;height:44px;"></div>
            <div class="swatch-hex">#F7FCFB</div>
            <div class="swatch-name">BG</div>
          </div>
        </div>

        <div style="margin-top:20px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:2px;color:#5a9e98;text-transform:uppercase;margin-bottom:12px;">UI Components</div>
          <div class="card" style="margin-bottom:12px;">
            <div style="font-size:12px;font-weight:700;color:${C1};margin-bottom:6px;">BUTTONS</div>
            <div style="font-size:13px;color:#aacac6;">Custom animated ActionPrimaryButton — gliding circle hover effect, teal background</div>
          </div>
          <div class="card">
            <div style="font-size:12px;font-weight:700;color:${C1};margin-bottom:6px;">CARDS</div>
            <div style="font-size:13px;color:#aacac6;">Glassmorphism hero cards with WebGL specular shine on hover (SpecularCard component)</div>
          </div>
        </div>
      </div>

      <!-- Style words + font -->
      <div class="col" style="flex:1;gap:20px;justify-content:flex-start;padding-top:0;">
        <div>
          <div style="font-size:12px;font-weight:700;letter-spacing:2px;color:#5a9e98;text-transform:uppercase;margin-bottom:12px;">Typography</div>
          <div style="font-size:42px;font-weight:800;color:#fff;letter-spacing:-2px;line-height:1;">Inter</div>
          <div style="font-size:14px;color:#7a9f9b;margin-top:4px;">Google Fonts · 400 / 600 / 800 / 900</div>
        </div>
        <div style="margin-top:8px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:2px;color:#5a9e98;text-transform:uppercase;margin-bottom:12px;">Overall Style</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${['Clean','Modern','Minimal','Product-focused','Responsive'].map(w=>`
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:6px;height:6px;border-radius:50%;background:${C1};"></div>
              <span style="font-size:18px;font-weight:700;color:#cce8e5;">${w}</span>
            </div>`).join('')}
          </div>
        </div>
        <div style="margin-top:16px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:2px;color:#5a9e98;text-transform:uppercase;margin-bottom:10px;">Styling Tech</div>
          <div class="pill-row">
            <span class="pill">Tailwind CSS</span>
            <span class="pill">Framer Motion</span>
            <span class="pill">Custom CSS</span>
          </div>
        </div>
      </div>
    </div>
  </div>
`)}

<!-- =====================================================================
  SLIDE 5 — HOW THE USER SHOPS (Flow)
===================================================================== -->
${slide(5, 'dark', `
  <div class="pad" style="display:flex;flex-direction:column;height:100%;">
    <div class="eyebrow">User Journey</div>
    <div class="h-md" style="margin-bottom:6px;">How a user <span class="teal">shops on ShopHub</span></div>
    <div class="body-md" style="margin-bottom:32px;">Step-by-step flow from landing to order</div>

    <!-- Flow row -->
    <div style="display:flex;align-items:flex-end;gap:0;flex:1;">
      <!-- Step 1 -->
      <div class="flow-step">
        <div class="flow-step-num">1</div>
        <div style="width:100%;background:rgba(7,143,131,0.06);border:1px solid rgba(7,143,131,0.15);border-radius:12px;overflow:hidden;height:200px;">
          ${HOME ? `<img src="${HOME}" style="width:100%;height:100%;object-fit:cover;object-position:top;" />` : '<div style="height:200px;"></div>'}
        </div>
        <div class="flow-step-label">Open Homepage<br/><span style="color:#5a9e98;font-size:11px;">Browse categories & featured products</span></div>
      </div>
      <div class="flow-arrow">›</div>

      <!-- Step 2 -->
      <div class="flow-step">
        <div class="flow-step-num">2</div>
        <div style="width:100%;background:rgba(7,143,131,0.06);border:1px solid rgba(7,143,131,0.15);border-radius:12px;overflow:hidden;height:200px;">
          ${PRODUCTS ? `<img src="${PRODUCTS}" style="width:100%;height:100%;object-fit:cover;object-position:top;" />` : '<div style="height:200px;"></div>'}
        </div>
        <div class="flow-step-label">Explore Products<br/><span style="color:#5a9e98;font-size:11px;">Search • Filter • Sort by price</span></div>
      </div>
      <div class="flow-arrow">›</div>

      <!-- Step 3 -->
      <div class="flow-step">
        <div class="flow-step-num">3</div>
        <div style="width:100%;background:rgba(7,143,131,0.06);border:1px solid rgba(7,143,131,0.15);border-radius:12px;overflow:hidden;height:200px;display:flex;align-items:center;justify-content:center;">
          <div style="text-align:center;color:#5a9e98;">
            <div style="font-size:32px;margin-bottom:8px;">🛍️</div>
            <div style="font-size:12px;font-weight:600;">Product Detail Page</div>
            <div style="font-size:11px;margin-top:4px;">/products/:id</div>
          </div>
        </div>
        <div class="flow-step-label">View Product<br/><span style="color:#5a9e98;font-size:11px;">Images • Description • Reviews</span></div>
      </div>
      <div class="flow-arrow">›</div>

      <!-- Step 4 -->
      <div class="flow-step">
        <div class="flow-step-num">4</div>
        <div style="width:100%;background:rgba(7,143,131,0.06);border:1px solid rgba(7,143,131,0.15);border-radius:12px;overflow:hidden;height:200px;">
          ${CART ? `<img src="${CART}" style="width:100%;height:100%;object-fit:cover;object-position:top;" />` : '<div style="height:200px;"></div>'}
        </div>
        <div class="flow-step-label">Add to Cart<br/><span style="color:#5a9e98;font-size:11px;">Manage quantities • See total</span></div>
      </div>
      <div class="flow-arrow">›</div>

      <!-- Step 5 -->
      <div class="flow-step">
        <div class="flow-step-num">5</div>
        <div style="width:100%;background:rgba(7,143,131,0.06);border:1px solid rgba(7,143,131,0.15);border-radius:12px;overflow:hidden;height:200px;display:flex;align-items:center;justify-content:center;">
          <div style="text-align:center;color:#5a9e98;">
            <div style="font-size:32px;margin-bottom:8px;">✅</div>
            <div style="font-size:12px;font-weight:600;">Order Placed</div>
            <div style="font-size:11px;margin-top:4px;">Saved to Firebase</div>
          </div>
        </div>
        <div class="flow-step-label">Place Order<br/><span style="color:#5a9e98;font-size:11px;">Delivery details • Confirmation</span></div>
      </div>
    </div>
  </div>
`)}

<!-- =====================================================================
  SLIDE 6 — PRODUCT EXPERIENCE
===================================================================== -->
${slide(6, 'light', `
  <div style="display:flex;height:100%;">
    <!-- Left dark panel -->
    <div style="width:320px;flex-shrink:0;background:${C2};display:flex;flex-direction:column;justify-content:center;padding:50px 36px;">
      <div class="eyebrow" style="color:rgba(125,216,207,0.7);">Slide 06</div>
      <div class="h-md" style="color:#fff;margin-bottom:16px;">Product <span style="color:${C1};">Experience</span></div>
      <div style="font-size:14px;color:#8ab8b3;line-height:1.7;margin-bottom:24px;">The products page pulls live data from DummyJSON API — 200+ products across multiple categories.</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
        ${['Product image','Product name & brand','Price display','Add to Cart button','♡ Add to Wishlist','Category label','Star rating'].map(t=>`
        <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#c8e8e4;">
          <div style="width:6px;height:6px;background:${C1};border-radius:50%;"></div>${t}
        </div>`).join('')}
      </div>
      <div style="font-size:12px;color:#5a9e98;font-style:italic;line-height:1.6;">"The product interface keeps important information visible while maintaining a clean layout."</div>
    </div>

    <!-- Right: Products screenshot -->
    <div style="flex:1;position:relative;overflow:hidden;background:#f0faf8;display:flex;align-items:flex-start;justify-content:center;padding:24px;">
      ${PRODUCTS ? `
      <div class="ss-frame" style="width:100%;height:100%;overflow:hidden;">
        <div class="top-bar">
          <div class="dot" style="background:#ff5f57;"></div>
          <div class="dot" style="background:#ffbd2e;"></div>
          <div class="dot" style="background:#28ca41;"></div>
          <div style="flex:1;height:14px;background:#2a2a2a;border-radius:7px;margin-left:8px;max-width:260px;"></div>
        </div>
        <img src="${PRODUCTS}" style="width:100%;height:calc(100% - 28px);object-fit:cover;object-position:top;margin-top:28px;" />
      </div>` : '<div style="flex:1;background:rgba(7,143,131,0.08);border-radius:14px;border:1px dashed rgba(7,143,131,0.3);display:flex;align-items:center;justify-content:center;color:#5a9e98;font-size:16px;font-weight:600;">Products Screenshot</div>'}
    </div>
  </div>
`)}

<!-- =====================================================================
  SLIDE 7 — KEY INTERACTIONS
===================================================================== -->
${slide(7, 'dark', `
  <div class="pad" style="display:flex;flex-direction:column;height:100%;">
    <div class="eyebrow">Key Interactions</div>
    <div class="h-md" style="margin-bottom:6px;">Features that make <span class="teal">ShopHub work</span></div>
    <div class="body-md" style="margin-bottom:28px;">These are the core interactions implemented in the project.</div>

    <div class="row" style="flex:1;gap:32px;">
      <!-- Feature grid -->
      <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:14px;align-content:start;">
        ${[
          {icon:'🔍', title:'Live Search', desc:'Header search bar — real-time product filtering as you type'},
          {icon:'🛒', title:'Cart System', desc:'Add/remove items, update quantity, see running total. Persists in localStorage.'},
          {icon:'❤️', title:'Wishlist', desc:'Save products for later. Move directly to cart with one click.'},
          {icon:'🔐', title:'Firebase Auth', desc:'Real login/signup. Auth state persists across page refreshes.'},
          {icon:'📦', title:'Order Placement', desc:'Checkout form → order saved to Firestore cloud database.'},
          {icon:'🗂️', title:'Category Filter', desc:'Filter all products by any category from the DummyJSON API.'},
          {icon:'↕️', title:'Sort by Price', desc:'Sort products Low → High or High → Low instantly.'},
          {icon:'🔔', title:'Toast Notifications', desc:'Every action (add to cart, login, etc.) shows a confirmation message.'},
        ].map(f=>`
        <div class="card" style="display:flex;gap:12px;align-items:flex-start;">
          <span style="font-size:22px;flex-shrink:0;margin-top:2px;">${f.icon}</span>
          <div>
            <div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:4px;">${f.title}</div>
            <div style="font-size:12px;color:#7a9f9b;line-height:1.5;">${f.desc}</div>
          </div>
        </div>`).join('')}
      </div>

      <!-- Cart + Wishlist screenshots stacked -->
      <div style="flex:0.9;display:flex;flex-direction:column;gap:16px;">
        ${CART ? `
        <div class="ss-frame" style="flex:1;overflow:hidden;">
          <img src="${CART}" style="width:100%;height:100%;object-fit:cover;object-position:top;" />
          <div style="position:absolute;bottom:8px;left:8px;background:rgba(6,61,55,0.9);color:${C1};font-size:10px;font-weight:700;padding:4px 10px;border-radius:6px;border:1px solid rgba(7,143,131,0.3);">CART PAGE</div>
        </div>` : ''}
        ${WISHLIST ? `
        <div class="ss-frame" style="flex:1;overflow:hidden;">
          <img src="${WISHLIST}" style="width:100%;height:100%;object-fit:cover;object-position:top;" />
          <div style="position:absolute;bottom:8px;left:8px;background:rgba(6,61,55,0.9);color:${C1};font-size:10px;font-weight:700;padding:4px 10px;border-radius:6px;border:1px solid rgba(7,143,131,0.3);">WISHLIST PAGE</div>
        </div>` : ''}
      </div>
    </div>
  </div>
`)}

<!-- =====================================================================
  SLIDE 8 — BUILT WITH
===================================================================== -->
${slide(8, 'dark', `
  <div class="pad" style="display:flex;flex-direction:column;height:100%;">
    <div class="eyebrow">Built With</div>
    <div class="h-md" style="margin-bottom:6px;">Technologies <span class="teal">used in this project</span></div>
    <div class="body-md" style="margin-bottom:30px;">Every tool listed here is confirmed from the project's actual files.</div>

    <div class="row" style="flex:1;gap:40px;">
      <!-- Tech stack visual -->
      <div style="flex:1;display:flex;flex-direction:column;gap:14px;">
        ${[
          {name:'React 19',          role:'All UI is built as React components',              badge:'Core'},
          {name:'TypeScript',        role:'Type-safe code — types defined in types.ts',       badge:'Core'},
          {name:'Vite',              role:'Build tool & dev server (npm run dev)',            badge:'Tooling'},
          {name:'Tailwind CSS',      role:'All styling — responsive & consistent',           badge:'Styling'},
          {name:'React Router v7',   role:'Page navigation without full reload',             badge:'Routing'},
          {name:'Firebase Auth',     role:'Real user login, signup, and logout',             badge:'Backend'},
          {name:'Cloud Firestore',   role:'Orders saved & synced in real-time',              badge:'Backend'},
          {name:'DummyJSON API',     role:'200+ live products fetched on load',              badge:'API'},
          {name:'Framer Motion',     role:'Smooth animations and transitions',               badge:'Animation'},
        ].map(t=>`
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="font-size:14px;font-weight:700;color:#fff;width:165px;flex-shrink:0;">${t.name}</div>
          <div style="flex:1;height:1px;background:rgba(7,143,131,0.15);"></div>
          <div style="font-size:12px;color:#7a9f9b;flex:2;">${t.role}</div>
          <div style="font-size:10px;font-weight:700;background:rgba(7,143,131,0.12);border:1px solid rgba(7,143,131,0.25);color:${C1};padding:3px 10px;border-radius:100px;white-space:nowrap;">${t.badge}</div>
        </div>`).join('')}
      </div>

      <!-- Visual: App structure -->
      <div style="flex:0.7;display:flex;flex-direction:column;justify-content:center;gap:14px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#5a9e98;text-transform:uppercase;margin-bottom:4px;">App Structure</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div class="card" style="border-color:rgba(7,143,131,0.3);text-align:center;">
            <div style="font-size:12px;font-weight:700;color:${C1};margin-bottom:6px;">PAGES (10 routes)</div>
            <div class="pill-row" style="justify-content:center;">
              <span class="pill" style="font-size:10px;">Home</span>
              <span class="pill" style="font-size:10px;">Products</span>
              <span class="pill" style="font-size:10px;">Cart</span>
              <span class="pill" style="font-size:10px;">Wishlist</span>
              <span class="pill" style="font-size:10px;">Orders</span>
              <span class="pill" style="font-size:10px;">Checkout</span>
              <span class="pill" style="font-size:10px;">Login</span>
              <span class="pill" style="font-size:10px;">Product Detail</span>
            </div>
          </div>
          <div class="card" style="border-color:rgba(7,143,131,0.25);text-align:center;">
            <div style="font-size:12px;font-weight:700;color:${C1};margin-bottom:6px;">COMPONENTS (19)</div>
            <div class="pill-row" style="justify-content:center;">
              <span class="pill" style="font-size:10px;">Header</span>
              <span class="pill" style="font-size:10px;">HeroSection</span>
              <span class="pill" style="font-size:10px;">ProductCard</span>
              <span class="pill" style="font-size:10px;">CartDrawer</span>
              <span class="pill" style="font-size:10px;">Footer</span>
              <span class="pill" style="font-size:10px;">+ 14 more</span>
            </div>
          </div>
          <div class="card" style="border-color:rgba(7,143,131,0.2);text-align:center;">
            <div style="font-size:12px;font-weight:700;color:${C1};margin-bottom:6px;">GLOBAL STATE</div>
            <div style="font-size:12px;color:#7a9f9b;">React Context API — StoreContext<br/>Cart • Wishlist • User • Orders • Search</div>
          </div>
        </div>
      </div>
    </div>
  </div>
`)}

<!-- =====================================================================
  SLIDE 9 — RESPONSIVE EXPERIENCE
===================================================================== -->
${slide(9, 'dark', `
  <div class="pad" style="display:flex;flex-direction:column;height:100%;">
    <div class="eyebrow">Responsive Design</div>
    <div class="h-md" style="margin-bottom:6px;">Designed for <span class="teal">different screens</span></div>
    <div class="body-md" style="margin-bottom:28px;">The layout automatically adjusts for any device size using Tailwind CSS breakpoints.</div>

    <div style="flex:1;display:flex;gap:24px;align-items:flex-end;">
      <!-- Desktop -->
      <div style="flex:2.2;display:flex;flex-direction:column;gap:12px;">
        <div style="font-size:12px;font-weight:700;color:${C1};letter-spacing:2px;text-transform:uppercase;display:flex;align-items:center;gap:8px;">
          <span>🖥️</span> Desktop <span style="font-size:10px;color:#5a9e98;font-weight:500;">1280px+</span>
        </div>
        ${HOME ? `
        <div class="ss-frame" style="height:360px;overflow:hidden;">
          <img src="${HOME}" style="width:100%;height:100%;object-fit:cover;object-position:top;" />
        </div>` : '<div style="height:360px;background:rgba(7,143,131,0.08);border-radius:14px;border:1px dashed rgba(7,143,131,0.3);"></div>'}
        <div style="font-size:12px;color:#7a9f9b;">Full side-by-side grid • All sections visible</div>
      </div>

      <!-- Tablet -->
      <div style="flex:1.2;display:flex;flex-direction:column;gap:12px;">
        <div style="font-size:12px;font-weight:700;color:${C1};letter-spacing:2px;text-transform:uppercase;display:flex;align-items:center;gap:8px;">
          <span>📱</span> Tablet <span style="font-size:10px;color:#5a9e98;font-weight:500;">768px</span>
        </div>
        ${HOME ? `
        <div class="ss-frame" style="height:280px;overflow:hidden;">
          <img src="${HOME}" style="width:130%;height:100%;object-fit:cover;object-position:top;margin-left:-15%;" />
        </div>` : '<div style="height:280px;background:rgba(7,143,131,0.06);border-radius:14px;border:1px dashed rgba(7,143,131,0.3);"></div>'}
        <div style="font-size:12px;color:#7a9f9b;">2-column grid • Compact header</div>
      </div>

      <!-- Mobile -->
      <div style="flex:0.7;display:flex;flex-direction:column;gap:12px;align-items:center;">
        <div style="font-size:12px;font-weight:700;color:${C1};letter-spacing:2px;text-transform:uppercase;display:flex;align-items:center;gap:8px;">
          <span>📲</span> Mobile <span style="font-size:10px;color:#5a9e98;font-weight:500;">375px</span>
        </div>
        <div style="width:140px;background:#111;border-radius:22px;padding:8px;border:6px solid #1a1a1a;box-shadow:0 20px 50px rgba(0,0,0,0.5);overflow:hidden;">
          <div style="width:40px;height:4px;background:#333;border-radius:2px;margin:0 auto 6px;"></div>
          ${HOME ? `<img src="${HOME}" style="width:100%;height:240px;object-fit:cover;object-position:top;border-radius:14px;" />` : '<div style="width:100%;height:240px;background:rgba(7,143,131,0.08);border-radius:14px;"></div>'}
        </div>
        <div style="font-size:11px;color:#7a9f9b;text-align:center;">Single column<br/>Stack layout</div>
      </div>
    </div>
  </div>
`)}

<!-- =====================================================================
  SLIDE 10 — FINAL RESULT
===================================================================== -->
${slide(10, 'dark', `
  <div style="display:flex;height:100%;">
    <!-- Left -->
    <div style="width:340px;flex-shrink:0;background:linear-gradient(180deg,#041e1b,#020c0b);display:flex;flex-direction:column;justify-content:center;padding:56px 40px;position:relative;overflow:hidden;">
      <div style="position:absolute;width:300px;height:300px;background:radial-gradient(circle,rgba(7,143,131,0.12) 0%,transparent 70%);bottom:-100px;left:-100px;border-radius:50%;"></div>
      <div class="eyebrow" style="color:rgba(125,216,207,0.7);position:relative;">Final Result</div>
      <div class="h-md" style="color:#fff;margin-bottom:16px;position:relative;">The ShopHub <span style="color:${C1};">Experience</span></div>
      <div style="font-size:14px;color:#8ab8b3;line-height:1.8;position:relative;margin-bottom:28px;">A complete e-commerce frontend focused on clean UI, clear navigation and a smooth product browsing experience.</div>

      <div style="display:flex;gap:14px;flex-wrap:wrap;position:relative;">
        <div class="stat-box" style="flex:1;min-width:90px;">
          <div class="stat-value" style="font-size:32px;">10</div>
          <div class="stat-label">Pages</div>
        </div>
        <div class="stat-box" style="flex:1;min-width:90px;">
          <div class="stat-value" style="font-size:32px;">19</div>
          <div class="stat-label">Components</div>
        </div>
      </div>
      <div style="display:flex;gap:14px;flex-wrap:wrap;position:relative;margin-top:14px;">
        <div class="stat-box" style="flex:1;min-width:90px;">
          <div class="stat-value" style="font-size:32px;">200+</div>
          <div class="stat-label">Live Products</div>
        </div>
        <div class="stat-box" style="flex:1;min-width:90px;">
          <div class="stat-value" style="font-size:32px;">🔥</div>
          <div class="stat-label">Firebase</div>
        </div>
      </div>

      <div style="margin-top:28px;position:relative;">
        <div style="width:32px;height:2px;background:${C1};margin-bottom:10px;opacity:0.5;"></div>
        <div style="font-size:13px;font-weight:700;color:#cce8e5;">Designed & Developed by</div>
        <div style="font-size:16px;font-weight:800;color:#fff;margin-top:2px;">Sabra Akhtar</div>
      </div>
    </div>

    <!-- Right: Screenshots collage -->
    <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;padding:24px;background:#060e0d;">
      ${HOME ? `<div class="ss-frame" style="grid-column:1/2;grid-row:1/3;overflow:hidden;"><img src="${HOME}" style="width:100%;height:100%;object-fit:cover;object-position:top;" /><div style="position:absolute;bottom:10px;left:10px;background:rgba(6,61,55,0.9);color:${C1};font-size:10px;font-weight:700;padding:4px 10px;border-radius:6px;border:1px solid rgba(7,143,131,0.3);">HOMEPAGE</div></div>` : ''}
      ${PRODUCTS ? `<div class="ss-frame" style="overflow:hidden;"><img src="${PRODUCTS}" style="width:100%;height:100%;object-fit:cover;object-position:top;" /><div style="position:absolute;bottom:8px;left:8px;background:rgba(6,61,55,0.9);color:${C1};font-size:10px;font-weight:700;padding:4px 10px;border-radius:6px;border:1px solid rgba(7,143,131,0.3);">PRODUCTS</div></div>` : ''}
      ${CART ? `<div class="ss-frame" style="overflow:hidden;"><img src="${CART}" style="width:100%;height:100%;object-fit:cover;object-position:top;" /><div style="position:absolute;bottom:8px;left:8px;background:rgba(6,61,55,0.9);color:${C1};font-size:10px;font-weight:700;padding:4px 10px;border-radius:6px;border:1px solid rgba(7,143,131,0.3);">CART & CHECKOUT</div></div>` : ''}
    </div>
  </div>
`)}

<!-- =====================================================================
  SLIDE 11 — WHAT I LEARNED (Closing)
===================================================================== -->
${slide(11, 'dark cover-bg', `
  <div class="cover-glow-1" style="opacity:0.6;"></div>
  <div class="cover-glow-2" style="opacity:0.5;"></div>

  <div style="position:relative;z-index:2;display:flex;height:100%;gap:0;">
    <!-- Left: What I learned -->
    <div style="flex:1.1;display:flex;flex-direction:column;justify-content:center;padding:60px 56px;">
      <div class="eyebrow">Final Slide</div>
      <div class="h-md" style="margin-bottom:8px;">What I <span class="teal">Learned</span></div>
      <div style="font-size:15px;color:#7a9f9b;margin-bottom:32px;line-height:1.7;">Building ShopHub taught me real frontend development skills that go beyond the classroom.</div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        ${[
          'How to structure a React app with multiple pages and components',
          'How to fetch real data from an API and display it dynamically',
          'How to manage global state (cart, wishlist, user) with Context API',
          'How to connect a real backend — Firebase Authentication & Firestore',
          'How to build responsive layouts using Tailwind CSS breakpoints',
          'How to add smooth animations with Framer Motion',
          'How a complete shopping flow works from browsing to checkout',
        ].map(s=>`
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <div style="width:20px;height:20px;border-radius:50%;background:rgba(7,143,131,0.15);border:1.5px solid rgba(7,143,131,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
            <div style="width:6px;height:6px;border-radius:50%;background:${C1};"></div>
          </div>
          <div style="font-size:14px;color:#c8e8e4;line-height:1.5;">${s}</div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Right: Thank You -->
    <div style="flex:0.9;display:flex;flex-direction:column;align-items:center;justify-content:center;border-left:1px solid rgba(7,143,131,0.12);padding:60px 48px;gap:20px;">
      <div style="width:70px;height:70px;border:2.5px solid ${C1};border-radius:18px;display:flex;align-items:center;justify-content:center;background:rgba(7,143,131,0.1);margin-bottom:8px;">
        <span style="font-size:30px;font-weight:900;color:${C1};">S</span>
      </div>
      <div style="font-size:56px;font-weight:900;color:#fff;letter-spacing:-3px;line-height:1;">Thank<br/><span style="color:${C1};">You</span></div>
      <div style="width:40px;height:2px;background:${C1};border-radius:2px;opacity:0.5;"></div>
      <div style="text-align:center;">
        <div style="font-size:18px;font-weight:700;color:#cce8e5;margin-bottom:4px;">Sabra Akhtar</div>
        <div style="font-size:13px;color:#5a9e98;">Frontend Development Project</div>
        <div style="margin-top:16px;" class="pill-row" style="justify-content:center;">
          <span class="pill">ShopHub</span>
          <span class="pill">React</span>
          <span class="pill">Firebase</span>
        </div>
      </div>
    </div>
  </div>
`)}

</body>
</html>`;

fs.writeFileSync(TEMP_HTML, html, 'utf8');
console.log('HTML written (' + Math.round(fs.statSync(TEMP_HTML).size / 1024) + ' KB). Generating PDF...');

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const EDGE2 = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const EDGE_PATH = fs.existsSync(EDGE) ? EDGE : EDGE2;

if (!fs.existsSync(EDGE_PATH)) {
  console.error('Edge not found'); process.exit(1);
}

try {
  execSync(
    `"${EDGE_PATH}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${OUTPUT_PDF}" --print-to-pdf-no-header --no-pdf-header-footer "${TEMP_HTML}"`,
    { stdio: 'inherit', timeout: 120000 }
  );
  console.log('✅ PDF generated:', OUTPUT_PDF);
  console.log('Size:', Math.round(fs.statSync(OUTPUT_PDF).size / 1024), 'KB');
} catch (e) {
  console.error('PDF error:', e.message);
}
fs.unlinkSync(TEMP_HTML);
