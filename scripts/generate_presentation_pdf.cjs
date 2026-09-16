const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_PDF = path.resolve(__dirname, '../ShopHub_Presentation.pdf');
const TEMP_HTML = path.resolve(__dirname, '../scripts/presentation_temp.html');

const TEAL = '#078F83';
const DARK_TEAL = '#063D37';
const LIGHT_TEAL = '#EAF8F5';
const MID_TEAL = '#0D7E73';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ShopHub Presentation</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #0a0a0a;
    color: #ffffff;
  }

  /* ========================================
     SLIDE BASE
  ======================================== */
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

  /* ========================================
     SLIDE 1 — COVER
  ======================================== */
  .slide-cover {
    background: linear-gradient(135deg, ${DARK_TEAL} 0%, #041e1b 40%, #020e0d 100%);
    align-items: center;
    justify-content: center;
  }

  .slide-cover::before {
    content: '';
    position: absolute;
    width: 700px; height: 700px;
    background: radial-gradient(circle, ${TEAL}22 0%, transparent 70%);
    top: -200px; right: -200px;
    border-radius: 50%;
  }
  .slide-cover::after {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    background: radial-gradient(circle, ${MID_TEAL}15 0%, transparent 70%);
    bottom: -100px; left: -100px;
    border-radius: 50%;
  }

  .cover-content {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .cover-logo-ring {
    width: 90px; height: 90px;
    border: 3px solid ${TEAL};
    border-radius: 24px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 28px;
    background: ${TEAL}20;
  }
  .cover-logo-ring span {
    font-size: 38px; font-weight: 900;
    color: ${TEAL};
    letter-spacing: -2px;
  }
  .cover-tag {
    display: inline-block;
    background: ${TEAL}22;
    border: 1px solid ${TEAL}55;
    color: #7DD8CF;
    font-size: 12px; font-weight: 600;
    letter-spacing: 3px; text-transform: uppercase;
    padding: 6px 18px; border-radius: 100px;
    margin-bottom: 20px;
  }
  .cover-title {
    font-size: 80px; font-weight: 900;
    color: #ffffff;
    letter-spacing: -4px;
    line-height: 1;
    margin-bottom: 12px;
  }
  .cover-title span { color: ${TEAL}; }
  .cover-subtitle {
    font-size: 20px; font-weight: 400;
    color: #9bbfbb;
    margin-bottom: 48px;
    letter-spacing: 0.5px;
  }
  .cover-divider {
    width: 60px; height: 2px;
    background: linear-gradient(90deg, transparent, ${TEAL}, transparent);
    margin: 0 auto 24px;
  }
  .cover-name {
    font-size: 16px; font-weight: 600;
    color: #cce8e5;
    letter-spacing: 1px;
  }
  .cover-role {
    font-size: 13px; font-weight: 400;
    color: #7a9f9b;
    margin-top: 4px;
  }

  /* ========================================
     SLIDE BASE — DARK CONTENT SLIDES
  ======================================== */
  .slide-dark {
    background: linear-gradient(160deg, #0e1f1d 0%, #071210 100%);
    padding: 56px 72px;
  }

  .slide-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 44px;
  }
  .slide-num {
    font-size: 11px; font-weight: 700;
    color: ${TEAL};
    letter-spacing: 3px;
    text-transform: uppercase;
    opacity: 0.7;
  }
  .slide-divline {
    width: 30px; height: 2px;
    background: ${TEAL};
    opacity: 0.5;
  }
  .slide-label {
    font-size: 11px; font-weight: 600;
    color: #5a9e98;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .slide-title {
    font-size: 44px; font-weight: 800;
    color: #ffffff;
    letter-spacing: -2px;
    line-height: 1.1;
    margin-bottom: 6px;
  }
  .slide-title span { color: ${TEAL}; }

  .slide-subtitle {
    font-size: 15px; font-weight: 400;
    color: #7a9f9b;
    margin-bottom: 36px;
  }

  /* ========================================
     SLIDE LAYOUT: Two Column
  ======================================== */
  .two-col {
    display: flex;
    gap: 40px;
    flex: 1;
    align-items: flex-start;
  }
  .col-left { flex: 1; }
  .col-right { flex: 1; display: flex; flex-direction: column; gap: 14px; }

  /* ========================================
     COMPONENTS — FEATURE CARDS
  ======================================== */
  .feat-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(7,143,131,0.15);
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 14px;
  }
  .feat-card-title {
    font-size: 14px; font-weight: 700;
    color: #7DD8CF;
    margin-bottom: 6px;
    display: flex; align-items: center; gap: 8px;
  }
  .feat-card-title::before {
    content: '◆';
    font-size: 8px;
    color: ${TEAL};
  }
  .feat-card-body {
    font-size: 13px; font-weight: 400;
    color: #aacac6;
    line-height: 1.6;
  }

  /* BULLET POINTS */
  .bullets { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .bullets li {
    display: flex; align-items: flex-start; gap: 12px;
    font-size: 15px; font-weight: 400; color: #cce8e5;
    line-height: 1.5;
  }
  .bullets li::before {
    content: '→';
    color: ${TEAL};
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .bullets li strong { color: #ffffff; font-weight: 600; }

  /* COLOR SWATCHES */
  .swatch-row {
    display: flex; gap: 16px; flex-wrap: wrap; margin-top: 20px;
  }
  .swatch {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
  .swatch-circle {
    width: 56px; height: 56px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.1);
  }
  .swatch-hex {
    font-size: 11px; font-weight: 600;
    color: #7a9f9b; font-family: monospace;
    letter-spacing: 0.5px;
  }
  .swatch-name {
    font-size: 11px; font-weight: 500;
    color: #aacac6;
  }

  /* TECH PILL */
  .tech-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .tech-pill {
    background: rgba(7,143,131,0.12);
    border: 1px solid rgba(7,143,131,0.25);
    color: #7DD8CF;
    font-size: 13px; font-weight: 600;
    padding: 8px 18px; border-radius: 100px;
    letter-spacing: 0.3px;
  }

  /* PAGE SECTION MOCK */
  .page-mock {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(7,143,131,0.2);
    border-radius: 20px;
    padding: 20px;
    flex: 1;
  }
  .page-mock-bar {
    display: flex; align-items: center; gap: 6px; margin-bottom: 14px;
  }
  .mock-dot { width: 8px; height: 8px; border-radius: 50%; }

  /* ROUTE ROW */
  .route-row {
    display: flex; align-items: center; gap: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(7,143,131,0.12);
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 10px;
  }
  .route-method {
    font-size: 11px; font-weight: 700;
    background: ${TEAL}25;
    color: ${TEAL};
    padding: 2px 8px; border-radius: 6px;
    min-width: 50px; text-align: center;
  }
  .route-path {
    font-family: monospace;
    font-size: 14px; color: #cce8e5;
    font-weight: 500;
  }
  .route-desc { font-size: 12px; color: #7a9f9b; margin-left: auto; }

  /* STATS ROW */
  .stats-row { display: flex; gap: 20px; margin-bottom: 32px; }
  .stat-card {
    flex: 1;
    background: rgba(7,143,131,0.08);
    border: 1px solid rgba(7,143,131,0.2);
    border-radius: 16px;
    padding: 20px;
    text-align: center;
  }
  .stat-value {
    font-size: 36px; font-weight: 900;
    color: ${TEAL};
    letter-spacing: -2px;
    line-height: 1;
  }
  .stat-label {
    font-size: 12px; font-weight: 500;
    color: #7a9f9b;
    margin-top: 6px;
    letter-spacing: 0.5px;
  }

  /* ========================================
     LAST SLIDE — SPEAKING NOTES
  ======================================== */
  .slide-notes {
    background: linear-gradient(160deg, #0a1a18 0%, #060f0e 100%);
    padding: 48px 60px;
    overflow-y: hidden;
  }
  .note-block {
    display: flex; gap: 20px; margin-bottom: 18px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(7,143,131,0.12);
    border-radius: 12px;
    padding: 16px 18px;
  }
  .note-num {
    font-size: 22px; font-weight: 900;
    color: ${TEAL}; opacity: 0.4;
    min-width: 28px; line-height: 1.2;
  }
  .note-content { flex: 1; }
  .note-title {
    font-size: 12px; font-weight: 700;
    color: ${TEAL};
    letter-spacing: 1px; text-transform: uppercase;
    margin-bottom: 5px;
  }
  .note-text {
    font-size: 13px; font-weight: 400;
    color: #aacac6;
    line-height: 1.6;
  }
  .note-text strong { color: #e0f0ed; font-weight: 600; }

  /* FOOTER BAR */
  .slide-footer {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${TEAL}, transparent);
    opacity: 0.4;
  }
  .brand-watermark {
    position: absolute;
    bottom: 18px; right: 72px;
    font-size: 11px; font-weight: 600;
    color: ${TEAL}; opacity: 0.4;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
</style>
</head>
<body>

<!-- =====================================================
     SLIDE 1 — COVER
====================================================== -->
<div class="slide slide-cover">
  <div class="cover-content">
    <div class="cover-logo-ring"><span>S</span></div>
    <div class="cover-tag">React Frontend Project · 2026</div>
    <div class="cover-title">Shop<span>Hub</span></div>
    <div class="cover-subtitle">A Modern Full-Stack E-Commerce Web Application</div>
    <div class="cover-divider"></div>
    <div class="cover-name">Sabra Akhtar</div>
    <div class="cover-role">Frontend Development Project</div>
  </div>
  <div class="slide-footer"></div>
</div>

<!-- =====================================================
     SLIDE 2 — WHAT IS SHOPHUB?
====================================================== -->
<div class="slide slide-dark">
  <div class="slide-header">
    <span class="slide-num">02</span>
    <div class="slide-divline"></div>
    <span class="slide-label">Introduction</span>
  </div>
  <div class="slide-title">ShopHub <span>kya hai?</span></div>
  <div class="slide-subtitle">Ek complete, modern online shopping experience</div>

  <div class="two-col">
    <div class="col-left">
      <div class="feat-card">
        <div class="feat-card-title">E-Commerce Web Application</div>
        <div class="feat-card-body">ShopHub ek React-based online shopping website hai jisme user real products dekh sakta hai, cart mein add kar sakta hai, aur order place kar sakta hai.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-title">Real Product Data — DummyJSON API</div>
        <div class="feat-card-body">Website 200+ real products automatically ek external API (DummyJSON.com) se fetch karti hai — electronics, beauty, furniture, fragrances aur bahut kuch.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-title">Live Backend — Firebase</div>
        <div class="feat-card-body">User authentication (login/signup) aur orders Firebase service se connected hain — yani data real time mein save hota hai.</div>
      </div>
    </div>
    <div class="col-right" style="justify-content:center; padding-top:20px;">
      <ul class="bullets" style="margin-top:0;">
        <li><strong>User login/signup</strong> kar sakta hai</li>
        <li><strong>Products browse</strong> aur search kar sakta hai</li>
        <li><strong>Category se filter</strong> kar sakta hai</li>
        <li>Products ko <strong>wishlist</strong> mein save kar sakta hai</li>
        <li><strong>Cart</strong> mein add kar ke checkout kar sakta hai</li>
        <li><strong>Order place</strong> kar sakta hai aur track kar sakta hai</li>
      </ul>
    </div>
  </div>
  <div class="brand-watermark">ShopHub</div>
  <div class="slide-footer"></div>
</div>

<!-- =====================================================
     SLIDE 3 — PROJECT GOALS
====================================================== -->
<div class="slide slide-dark">
  <div class="slide-header">
    <span class="slide-num">03</span>
    <div class="slide-divline"></div>
    <span class="slide-label">Project Goals</span>
  </div>
  <div class="slide-title">Main <span>Goals</span></div>
  <div class="slide-subtitle">Is project ko banate waqt kya achieve karna tha</div>

  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-value">10+</div>
      <div class="stat-label">Pages / Screens</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">200+</div>
      <div class="stat-label">Live Products</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">19</div>
      <div class="stat-label">React Components</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">100%</div>
      <div class="stat-label">Responsive Design</div>
    </div>
  </div>

  <div class="two-col">
    <div class="col-left">
      <ul class="bullets">
        <li>Ek <strong>clean aur modern UI</strong> banana jo professional lage</li>
        <li><strong>Real API integration</strong> karke live product data dikhana</li>
        <li><strong>Firebase Authentication</strong> se real user login system banana</li>
        <li><strong>Reusable React Components</strong> ka use karna (Header, Footer, Cards, etc.)</li>
      </ul>
    </div>
    <div class="col-right">
      <ul class="bullets">
        <li><strong>Cart + Wishlist</strong> functionality properly implement karna</li>
        <li>Orders ko <strong>Firebase Firestore</strong> mein save karna</li>
        <li>Website ko <strong>mobile-friendly</strong> (responsive) banana</li>
        <li>Sab routes (pages) ko <strong>React Router</strong> se connect karna</li>
      </ul>
    </div>
  </div>
  <div class="brand-watermark">ShopHub</div>
  <div class="slide-footer"></div>
</div>

<!-- =====================================================
     SLIDE 4 — DESIGN & COLORS
====================================================== -->
<div class="slide slide-dark">
  <div class="slide-header">
    <span class="slide-num">04</span>
    <div class="slide-divline"></div>
    <span class="slide-label">Design System</span>
  </div>
  <div class="slide-title">Design <span>&amp; Colors</span></div>
  <div class="slide-subtitle">ShopHub ka visual identity — consistent aur premium</div>

  <div class="two-col">
    <div class="col-left">
      <div style="font-size:13px; font-weight:600; color:#7a9f9b; margin-bottom:14px; letter-spacing:1px; text-transform:uppercase;">Brand Color Palette</div>
      <div class="swatch-row">
        <div class="swatch">
          <div class="swatch-circle" style="background:#078F83;"></div>
          <div class="swatch-hex">#078F83</div>
          <div class="swatch-name">Primary Teal</div>
        </div>
        <div class="swatch">
          <div class="swatch-circle" style="background:#063D37;"></div>
          <div class="swatch-hex">#063D37</div>
          <div class="swatch-name">Dark Teal</div>
        </div>
        <div class="swatch">
          <div class="swatch-circle" style="background:#0D7E73;"></div>
          <div class="swatch-hex">#0D7E73</div>
          <div class="swatch-name">Mid Teal</div>
        </div>
        <div class="swatch">
          <div class="swatch-circle" style="background:#EAF8F5; border:2px solid #078F8330;"></div>
          <div class="swatch-hex">#EAF8F5</div>
          <div class="swatch-name">Light BG</div>
        </div>
        <div class="swatch">
          <div class="swatch-circle" style="background:#F7FCFB; border:2px solid #078F8320;"></div>
          <div class="swatch-hex">#F7FCFB</div>
          <div class="swatch-name">Page BG</div>
        </div>
      </div>
      <div style="margin-top:28px;">
        <div style="font-size:13px; font-weight:600; color:#7a9f9b; margin-bottom:14px; letter-spacing:1px; text-transform:uppercase;">Typography</div>
        <ul class="bullets">
          <li>Font: <strong>Inter</strong> (Google Fonts)</li>
          <li>Headings: <strong>800–900 weight</strong></li>
          <li>Body: <strong>400–500 weight</strong></li>
        </ul>
      </div>
    </div>
    <div class="col-right">
      <div style="font-size:13px; font-weight:600; color:#7a9f9b; margin-bottom:14px; letter-spacing:1px; text-transform:uppercase;">UI Style Choices</div>
      <div class="feat-card">
        <div class="feat-card-title">Glassmorphism Cards</div>
        <div class="feat-card-body">Hero section mein floating glass-effect cards — white/transparent background with subtle teal border glow.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-title">Animated Buttons</div>
        <div class="feat-card-body">Custom ActionPrimaryButton component with gliding hover animation — smooth aur interactive feel.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-title">Smooth Page Transitions</div>
        <div class="feat-card-body">Framer Motion (motion/react) library se smooth fade/slide animations har jagah use ki gayi hain.</div>
      </div>
    </div>
  </div>
  <div class="brand-watermark">ShopHub</div>
  <div class="slide-footer"></div>
</div>

<!-- =====================================================
     SLIDE 5 — HOMEPAGE
====================================================== -->
<div class="slide slide-dark">
  <div class="slide-header">
    <span class="slide-num">05</span>
    <div class="slide-divline"></div>
    <span class="slide-label">Homepage</span>
  </div>
  <div class="slide-title">Home<span>Page</span></div>
  <div class="slide-subtitle">Website ka main landing page — complete e-commerce experience</div>

  <div class="two-col">
    <div class="col-left">
      <ul class="bullets">
        <li><strong>Header / Navbar:</strong> Logo, navigation links, search bar, cart icon with item count, user account button</li>
        <li><strong>Hero Section:</strong> Animated typewriter heading, CTA buttons, rotating Bento Grid with live product images</li>
        <li><strong>Category Section:</strong> Product categories with icons — browse karne ka shortcut</li>
        <li><strong>Featured Products Carousel:</strong> Top products horizontal scroll carousel</li>
        <li><strong>New Arrivals Section:</strong> Latest products section</li>
        <li><strong>Promo Banner:</strong> Full-width promotional section</li>
        <li><strong>Smart Digital Life Section:</strong> Highlighted feature cards</li>
        <li><strong>Footer:</strong> Links, newsletter subscribe, social icons</li>
      </ul>
    </div>
    <div class="col-right">
      <div class="page-mock">
        <div class="page-mock-bar">
          <div class="mock-dot" style="background:#ff5f57;"></div>
          <div class="mock-dot" style="background:#ffbd2e;"></div>
          <div class="mock-dot" style="background:#28ca41;"></div>
          <div style="flex:1; height:8px; background:rgba(255,255,255,0.05); border-radius:4px; margin-left:8px;"></div>
        </div>
        <!-- Mock Header -->
        <div style="background:rgba(255,255,255,0.04); border-radius:8px; padding:10px 14px; display:flex; align-items:center; gap:10px; margin-bottom:10px;">
          <div style="font-size:13px; font-weight:800; color:#078F83;">ShopHub</div>
          <div style="flex:1; height:6px; background:rgba(255,255,255,0.06); border-radius:3px;"></div>
          <div style="width:20px; height:20px; border-radius:50%; background:#078F8330;"></div>
        </div>
        <!-- Mock Hero -->
        <div style="background:linear-gradient(135deg,#EAF8F530,#F2FCF920); border-radius:10px; padding:16px; margin-bottom:10px; display:flex; gap:10px; align-items:center;">
          <div style="flex:1;">
            <div style="height:8px; background:#078F83; border-radius:4px; margin-bottom:8px; width:80%;"></div>
            <div style="height:6px; background:rgba(255,255,255,0.1); border-radius:3px; margin-bottom:6px;"></div>
            <div style="height:6px; background:rgba(255,255,255,0.06); border-radius:3px; width:60%;"></div>
            <div style="margin-top:12px; display:flex; gap:8px;">
              <div style="width:70px; height:18px; background:#078F83; border-radius:6px;"></div>
              <div style="width:60px; height:18px; background:rgba(7,143,131,0.2); border-radius:6px;"></div>
            </div>
          </div>
          <div style="width:110px; height:80px; background:rgba(7,143,131,0.08); border-radius:10px; border:1px solid rgba(7,143,131,0.2);"></div>
        </div>
        <!-- Mock Product Grid -->
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          ${[1,2,3,4,5,6].map(i => `
          <div style="background:rgba(255,255,255,0.03); border-radius:8px; padding:10px; border:1px solid rgba(7,143,131,0.1);">
            <div style="height:32px; background:rgba(7,143,131,0.08); border-radius:6px; margin-bottom:6px;"></div>
            <div style="height:5px; background:rgba(255,255,255,0.08); border-radius:3px; margin-bottom:4px;"></div>
            <div style="height:5px; background:#078F83; border-radius:3px; width:50%;"></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
  <div class="brand-watermark">ShopHub</div>
  <div class="slide-footer"></div>
</div>

<!-- =====================================================
     SLIDE 6 — NAVIGATION & USER EXPERIENCE
====================================================== -->
<div class="slide slide-dark">
  <div class="slide-header">
    <span class="slide-num">06</span>
    <div class="slide-divline"></div>
    <span class="slide-label">Navigation & UX</span>
  </div>
  <div class="slide-title">User <span>Experience</span></div>
  <div class="slide-subtitle">User website mein kaise navigate karta hai</div>

  <div class="two-col">
    <div class="col-left">
      <div style="font-size:13px; font-weight:600; color:#7a9f9b; margin-bottom:14px; letter-spacing:1px; text-transform:uppercase;">All Pages (Routes)</div>
      <div class="route-row">
        <div class="route-method">HOME</div>
        <div class="route-path">/</div>
        <div class="route-desc">Homepage</div>
      </div>
      <div class="route-row">
        <div class="route-method">PAGE</div>
        <div class="route-path">/products</div>
        <div class="route-desc">All Products + Filters</div>
      </div>
      <div class="route-row">
        <div class="route-method">PAGE</div>
        <div class="route-path">/products/:id</div>
        <div class="route-desc">Product Detail</div>
      </div>
      <div class="route-row">
        <div class="route-method">PAGE</div>
        <div class="route-path">/cart</div>
        <div class="route-desc">Shopping Cart</div>
      </div>
      <div class="route-row">
        <div class="route-method">PAGE</div>
        <div class="route-path">/wishlist</div>
        <div class="route-desc">Saved Items</div>
      </div>
      <div class="route-row">
        <div class="route-method">PAGE</div>
        <div class="route-path">/checkout</div>
        <div class="route-desc">Place Order</div>
      </div>
      <div class="route-row">
        <div class="route-method">PAGE</div>
        <div class="route-path">/orders</div>
        <div class="route-desc">Order History</div>
      </div>
    </div>
    <div class="col-right">
      <div style="font-size:13px; font-weight:600; color:#7a9f9b; margin-bottom:14px; letter-spacing:1px; text-transform:uppercase;">Implemented Features</div>
      <ul class="bullets">
        <li><strong>Global Search:</strong> Header mein search bar — products filter ho jaate hain</li>
        <li><strong>Cart Drawer:</strong> Side se slide hota hua cart panel — bina page change kiye</li>
        <li><strong>Toast Notifications:</strong> Har action ke baad "Added to cart" jaise messages</li>
        <li><strong>Auto Scroll to Top:</strong> Har page change par page upar aa jaata hai</li>
        <li><strong>Protected UX:</strong> Checkout ke liye login required</li>
        <li><strong>404 Page:</strong> Agar koi galat URL daale toh custom Not Found page</li>
        <li><strong>Wishlist ↔ Cart:</strong> Move to cart button directly wishlist se</li>
      </ul>
    </div>
  </div>
  <div class="brand-watermark">ShopHub</div>
  <div class="slide-footer"></div>
</div>

<!-- =====================================================
     SLIDE 7 — PRODUCT SECTION
====================================================== -->
<div class="slide slide-dark">
  <div class="slide-header">
    <span class="slide-num">07</span>
    <div class="slide-divline"></div>
    <span class="slide-label">Products</span>
  </div>
  <div class="slide-title">Product <span>Section</span></div>
  <div class="slide-subtitle">200+ live products — search, filter aur sort karne ki suvidha</div>

  <div class="two-col">
    <div class="col-left">
      <div style="font-size:13px; font-weight:600; color:#7a9f9b; margin-bottom:14px; letter-spacing:1px; text-transform:uppercase;">Product Card mein kya hota hai?</div>
      <div class="feat-card">
        <div class="feat-card-title">Product Image</div>
        <div class="feat-card-body">DummyJSON API se aane wali high-quality product image, properly framed inside the card.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-title">Title, Brand &amp; Price</div>
        <div class="feat-card-body">Product ka naam, brand name, aur price clearly display hoti hai. Original price bhi show hoti hai agar discount ho.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-title">Add to Cart / Wishlist Buttons</div>
        <div class="feat-card-body">"Add to Cart" aur ♡ Wishlist buttons — instantly cart ya wishlist mein add karte hain, toast notification ke saath.</div>
      </div>
    </div>
    <div class="col-right">
      <div style="font-size:13px; font-weight:600; color:#7a9f9b; margin-bottom:14px; letter-spacing:1px; text-transform:uppercase;">Filtering &amp; Sorting</div>
      <ul class="bullets">
        <li><strong>Search:</strong> Product name se real-time search</li>
        <li><strong>Category Filter:</strong> Kisi bhi category se filter karein (Electronics, Beauty, Furniture, Fragrances, etc.)</li>
        <li><strong>Sort by Price:</strong> Low to High / High to Low</li>
        <li><strong>Loading State:</strong> Jab products load ho rahe hoon — spinner dikhta hai</li>
        <li><strong>Error State:</strong> Agar internet problem ho toh proper error message</li>
      </ul>
      <div style="margin-top:20px;">
        <div style="font-size:13px; font-weight:600; color:#7a9f9b; margin-bottom:10px; letter-spacing:1px; text-transform:uppercase;">Product Categories Available</div>
        <div class="tech-row">
          <span class="tech-pill">Electronics</span>
          <span class="tech-pill">Beauty</span>
          <span class="tech-pill">Furniture</span>
          <span class="tech-pill">Fragrances</span>
          <span class="tech-pill">Groceries</span>
          <span class="tech-pill">Laptops</span>
          <span class="tech-pill">Smartphones</span>
          <span class="tech-pill">Clothing</span>
        </div>
      </div>
    </div>
  </div>
  <div class="brand-watermark">ShopHub</div>
  <div class="slide-footer"></div>
</div>

<!-- =====================================================
     SLIDE 8 — TECHNOLOGIES USED
====================================================== -->
<div class="slide slide-dark">
  <div class="slide-header">
    <span class="slide-num">08</span>
    <div class="slide-divline"></div>
    <span class="slide-label">Technologies</span>
  </div>
  <div class="slide-title">Technologies <span>Used</span></div>
  <div class="slide-subtitle">Ye sab actual project files se confirm ki gayi technologies hain</div>

  <div class="two-col">
    <div class="col-left">
      <div style="font-size:13px; font-weight:600; color:#7a9f9b; margin-bottom:14px; letter-spacing:1px; text-transform:uppercase;">Core Technologies</div>
      <div class="feat-card">
        <div class="feat-card-title">React 19 + TypeScript</div>
        <div class="feat-card-body">Saara UI React components se bana hai. TypeScript use ki hai type-safety ke liye (types.ts file mein Product, Order, Cart types defined hain).</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-title">Vite (Build Tool)</div>
        <div class="feat-card-body">Project Vite se run hota hai — bohat fast development server aur build system. npm run dev se website start hoti hai.</div>
      </div>
      <div class="feat-card">
        <div class="feat-card-title">Tailwind CSS</div>
        <div class="feat-card-body">Saari styling Tailwind CSS utility classes se ki gayi hai — responsive design, colors, spacing sab Tailwind mein.</div>
      </div>
    </div>
    <div class="col-right">
      <div style="font-size:13px; font-weight:600; color:#7a9f9b; margin-bottom:14px; letter-spacing:1px; text-transform:uppercase;">Libraries &amp; Services</div>
      <div class="tech-row" style="margin-top:0; margin-bottom:16px;">
        <span class="tech-pill">React Router v7</span>
        <span class="tech-pill">Firebase Auth</span>
        <span class="tech-pill">Firestore DB</span>
        <span class="tech-pill">Framer Motion</span>
        <span class="tech-pill">Lucide React</span>
        <span class="tech-pill">GSAP</span>
        <span class="tech-pill">OGL (WebGL)</span>
        <span class="tech-pill">DummyJSON API</span>
      </div>
      <ul class="bullets">
        <li><strong>React Router v7:</strong> Pages ke beech navigation aur URL routing</li>
        <li><strong>Firebase Auth:</strong> Real user login / signup / logout</li>
        <li><strong>Firestore:</strong> Orders cloud mein save hote hain real-time</li>
        <li><strong>Framer Motion:</strong> Smooth animations aur transitions</li>
        <li><strong>DummyJSON API:</strong> Live product data source (200+ products)</li>
        <li><strong>LocalStorage:</strong> Cart aur Wishlist browser mein persist rehte hain</li>
      </ul>
    </div>
  </div>
  <div class="brand-watermark">ShopHub</div>
  <div class="slide-footer"></div>
</div>

<!-- =====================================================
     SLIDE 9 — RESPONSIVE DESIGN & FEATURES
====================================================== -->
<div class="slide slide-dark">
  <div class="slide-header">
    <span class="slide-num">09</span>
    <div class="slide-divline"></div>
    <span class="slide-label">Responsive & Features</span>
  </div>
  <div class="slide-title">Responsive <span>Design</span></div>
  <div class="slide-subtitle">Mobile se desktop tak — sab jagah perfect</div>

  <div class="two-col">
    <div class="col-left">
      <div style="font-size:13px; font-weight:600; color:#7a9f9b; margin-bottom:14px; letter-spacing:1px; text-transform:uppercase;">Key Implemented Features</div>
      <ul class="bullets">
        <li><strong>Context API (Global State):</strong> Cart, Wishlist, User, Orders, Notifications — sab ek jagah manage hain StoreContext mein</li>
        <li><strong>Firebase Real-time Sync:</strong> Login karte hi orders automatically cloud se load ho jaate hain</li>
        <li><strong>Product Details Modal + Page:</strong> Product ka complete detail — images, description, stock, reviews</li>
        <li><strong>Checkout Flow:</strong> Delivery details form, order confirmation</li>
        <li><strong>Orders History Page:</strong> Placed orders list, status tracking</li>
        <li><strong>Animated Otter:</strong> ShopHub ka custom mascot animation — unique brand element</li>
      </ul>
    </div>
    <div class="col-right">
      <div style="display:flex; gap:16px; align-items:flex-start;">
        <!-- Desktop mock -->
        <div>
          <div style="font-size:11px; color:#5a9e98; margin-bottom:8px; text-align:center; font-weight:600; letter-spacing:1px;">DESKTOP</div>
          <div style="width:200px; background:rgba(255,255,255,0.03); border:1px solid rgba(7,143,131,0.2); border-radius:12px; padding:10px;">
            <div style="height:8px; background:#078F83; border-radius:4px; margin-bottom:8px;"></div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:6px;">
              ${[1,2,3].map(() => `<div style="height:40px; background:rgba(255,255,255,0.05); border-radius:6px;"></div>`).join('')}
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px;">
              ${[1,2,3].map(() => `<div style="height:40px; background:rgba(255,255,255,0.03); border-radius:6px;"></div>`).join('')}
            </div>
          </div>
        </div>
        <!-- Mobile mock -->
        <div>
          <div style="font-size:11px; color:#5a9e98; margin-bottom:8px; text-align:center; font-weight:600; letter-spacing:1px;">MOBILE</div>
          <div style="width:90px; background:rgba(255,255,255,0.03); border:1px solid rgba(7,143,131,0.2); border-radius:16px; padding:8px;">
            <div style="width:30px; height:4px; background:rgba(255,255,255,0.1); border-radius:2px; margin:0 auto 8px;"></div>
            <div style="height:6px; background:#078F83; border-radius:3px; margin-bottom:6px;"></div>
            <div style="height:50px; background:rgba(7,143,131,0.08); border-radius:6px; margin-bottom:6px;"></div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
              ${[1,2,3,4].map(() => `<div style="height:30px; background:rgba(255,255,255,0.04); border-radius:5px;"></div>`).join('')}
            </div>
          </div>
        </div>
        <!-- Tablet mock -->
        <div>
          <div style="font-size:11px; color:#5a9e98; margin-bottom:8px; text-align:center; font-weight:600; letter-spacing:1px;">TABLET</div>
          <div style="width:130px; background:rgba(255,255,255,0.03); border:1px solid rgba(7,143,131,0.2); border-radius:12px; padding:8px;">
            <div style="height:6px; background:#078F83; border-radius:3px; margin-bottom:6px;"></div>
            <div style="height:40px; background:rgba(7,143,131,0.08); border-radius:6px; margin-bottom:6px;"></div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:5px;">
              ${[1,2,3,4].map(() => `<div style="height:35px; background:rgba(255,255,255,0.04); border-radius:5px;"></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top:20px;">
        <ul class="bullets">
          <li>Tailwind CSS <strong>responsive breakpoints</strong> (sm, md, lg) use kiye hain</li>
          <li><strong>Flexible Grid layouts</strong> jo screen size ke hisaab se adjust hoti hain</li>
          <li><strong>Mobile navigation</strong> properly kaam karti hai</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="brand-watermark">ShopHub</div>
  <div class="slide-footer"></div>
</div>

<!-- =====================================================
     SLIDE 10 — CONCLUSION
====================================================== -->
<div class="slide slide-dark" style="align-items:center; justify-content:center; text-align:center; padding:72px;">
  <div style="max-width:720px;">
    <div class="slide-header" style="justify-content:center; margin-bottom:24px;">
      <span class="slide-num">10</span>
      <div class="slide-divline"></div>
      <span class="slide-label">Conclusion</span>
    </div>
    <div class="slide-title" style="font-size:52px; text-align:center; margin-bottom:16px;">Project <span>Complete ✓</span></div>
    <div class="slide-subtitle" style="text-align:center; font-size:18px; margin-bottom:40px;">ShopHub ne mujhe bahut kuch sikhaya</div>

    <div style="display:flex; gap:16px; justify-content:center; margin-bottom:40px;">
      <div class="feat-card" style="text-align:left; flex:1;">
        <div class="feat-card-title">Jo main ne seekha</div>
        <div class="feat-card-body">React components, Props, State, Context API, Hooks (useState, useEffect, useMemo) — ye sab practically use kiye</div>
      </div>
      <div class="feat-card" style="text-align:left; flex:1;">
        <div class="feat-card-title">Real-world Skills</div>
        <div class="feat-card-body">API integration, Firebase backend connect karna, routing, aur responsive UI design — ye sab real projects mein kaam aane wali cheezein hain</div>
      </div>
    </div>

    <div style="font-size:14px; color:#7a9f9b; margin-bottom:32px; line-height:1.8;">
      ShopHub demonstrate karta hai ke sirf ek React project se <strong style="color:#cce8e5;">API integration</strong>, <strong style="color:#cce8e5;">Firebase backend</strong>, <strong style="color:#cce8e5;">modern UI design</strong> aur <strong style="color:#cce8e5;">complete e-commerce flow</strong> sab ek saath implement kiya ja sakta hai.
    </div>

    <div style="font-size:48px; font-weight:900; color:#078F83; letter-spacing:-2px;">Thank You</div>
    <div style="font-size:16px; color:#5a9e98; margin-top:8px;">Sabra Akhtar</div>
  </div>
  <div class="brand-watermark">ShopHub</div>
  <div class="slide-footer"></div>
</div>

<!-- =====================================================
     BONUS SLIDE — SPEAKING NOTES (Mujhe kya bolna hai)
====================================================== -->
<div class="slide slide-notes">
  <div style="font-size:28px; font-weight:800; color:#ffffff; letter-spacing:-1px; margin-bottom:6px;">
    Mujhe Presentation mein <span style="color:#078F83;">kya bolna hai</span>
  </div>
  <div style="font-size:13px; color:#5a9e98; margin-bottom:20px; font-weight:500;">Har slide ke liye teacher ke saamne bolne wale points</div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
    <div class="note-block">
      <div class="note-num">2</div>
      <div class="note-content">
        <div class="note-title">ShopHub kya hai?</div>
        <div class="note-text">"Sir/Ma'am, ShopHub ek <strong>React-based online shopping website</strong> hai. Is mein user products dekh sakta hai, cart mein add kar sakta hai, aur order place kar sakta hai. Products real time mein ek API se aate hain — maine koi fake data hardcode nahi kiya."</div>
      </div>
    </div>
    <div class="note-block">
      <div class="note-num">3</div>
      <div class="note-content">
        <div class="note-title">Project Goals</div>
        <div class="note-text">"Is project ka main goal tha ek <strong>complete e-commerce experience</strong> banana — sirf ek page nahi, balke 10 pages, real API, aur Firebase backend ke sath. Maine 19 React components banaye hain jo ek dusre se connected hain."</div>
      </div>
    </div>
    <div class="note-block">
      <div class="note-num">4</div>
      <div class="note-content">
        <div class="note-title">Design & Colors</div>
        <div class="note-text">"Maine puri website ke liye ek <strong>Teal color palette</strong> choose ki — #078F83 primary color hai. Buttons mein hover animation hai, cards mein glass effect hai, aur sab kuch Tailwind CSS se style kiya hai."</div>
      </div>
    </div>
    <div class="note-block">
      <div class="note-num">5</div>
      <div class="note-content">
        <div class="note-title">Homepage</div>
        <div class="note-text">"Homepage par <strong>Hero Section</strong> hai jisme typewriter animation chalti hai, aur products automatically change hote rehte hain. Neeche categories, featured products carousel, aur promo sections hain."</div>
      </div>
    </div>
    <div class="note-block">
      <div class="note-num">6</div>
      <div class="note-content">
        <div class="note-title">Navigation & UX</div>
        <div class="note-text">"Maine <strong>React Router</strong> use ki hai — jab aap /products likhte hain toh products page khulta hai, /cart se cart — bina page reload kiye. Toast notifications bhi hain jo batate hain ke cart mein add hua ya nahi."</div>
      </div>
    </div>
    <div class="note-block">
      <div class="note-num">7</div>
      <div class="note-content">
        <div class="note-title">Products</div>
        <div class="note-text">"Products DummyJSON API se aate hain — 200+ products, multiple categories. User search kar sakta hai, category se filter, aur price ke hisaab se sort bhi kar sakta hai. Har product card par Add to Cart aur Wishlist buttons hain."</div>
      </div>
    </div>
    <div class="note-block">
      <div class="note-num">8</div>
      <div class="note-content">
        <div class="note-title">Technologies</div>
        <div class="note-text">"Main ne <strong>React 19</strong> aur <strong>TypeScript</strong> use ki hai. Styling ke liye Tailwind CSS, animations ke liye Framer Motion, aur backend ke liye Firebase — ye sab package.json mein verify kiye ja sakte hain."</div>
      </div>
    </div>
    <div class="note-block">
      <div class="note-num">9</div>
      <div class="note-content">
        <div class="note-title">Responsive Design</div>
        <div class="note-text">"Website mobile, tablet aur desktop — teeno par sahi kaam karti hai. Maine Tailwind ke <strong>sm, md, lg breakpoints</strong> use kiye hain. Mobile par grid columns kam ho jaate hain aur layout adjust ho jaata hai."</div>
      </div>
    </div>
  </div>
  <div class="slide-footer"></div>
</div>

</body>
</html>`;

fs.writeFileSync(TEMP_HTML, html, 'utf8');
console.log('HTML written. Generating PDF...');

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

let edgePath = edgePaths.find(p => fs.existsSync(p));
if (!edgePath) {
  console.error('Microsoft Edge not found.');
  process.exit(1);
}

try {
  execSync(`"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${OUTPUT_PDF}" --print-to-pdf-no-header --no-pdf-header-footer "${TEMP_HTML}"`, {
    stdio: 'inherit',
    timeout: 60000
  });
  console.log('PDF generated at:', OUTPUT_PDF);
} catch (e) {
  console.error('Error generating PDF:', e.message);
}

fs.unlinkSync(TEMP_HTML);
