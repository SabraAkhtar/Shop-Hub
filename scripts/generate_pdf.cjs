const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const htmlFilePath = path.join(rootDir, 'presentation_temp.html');
const pdfFilePath = path.join(rootDir, 'Website_Project_Presentation.pdf');
const profileDir = path.join(rootDir, 'edge_pdf_profile');

console.log('Building Presentation HTML document...');

// Styling for professional A4 print PDF
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>ShopHub - Modern Electronics Marketplace Presentation</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');

  @page {
    size: A4 portrait;
    margin: 14mm 14mm 14mm 14mm;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #102F2C;
    background-color: #FFFFFF;
    line-height: 1.5;
    font-size: 11pt;
  }

  .page {
    page-break-after: always;
    min-height: 260mm;
    position: relative;
    padding-bottom: 12mm;
  }

  .page:last-child {
    page-break-after: avoid;
  }

  /* Header & Footer */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #E0F2EE;
    padding-bottom: 6px;
    margin-bottom: 16px;
    font-size: 8.5pt;
    color: #078F83;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .page-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #E0F2EE;
    padding-top: 6px;
    font-size: 8pt;
    color: #66727A;
  }

  /* Typography */
  h1 {
    font-size: 20pt;
    font-weight: 800;
    color: #063D37;
    margin-bottom: 8px;
    line-height: 1.2;
    letter-spacing: -0.3px;
  }

  h2 {
    font-size: 13pt;
    font-weight: 800;
    color: #063D37;
    margin-top: 10px;
    margin-bottom: 6px;
    border-left: 3.5px solid #0D7E73;
    padding-left: 8px;
  }

  h3 {
    font-size: 10.5pt;
    font-weight: 700;
    color: #0D7E73;
    margin-top: 6px;
    margin-bottom: 3px;
  }

  p {
    font-size: 9.8pt;
    color: #334E4B;
    margin-bottom: 8px;
    line-height: 1.48;
  }

  ul, ol {
    margin-left: 18px;
    margin-bottom: 8px;
    font-size: 9.5pt;
    color: #334E4B;
  }

  li {
    margin-bottom: 4px;
    line-height: 1.4;
  }

  /* Badges & Tags */
  .badge {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: #EAF8F5;
    color: #078F83;
    border: 1px solid #C2EAE1;
  }

  .badge-dark {
    background: #063D37;
    color: #FFFFFF;
    border: none;
  }

  /* Cards & Boxes */
  .card {
    background: #F7FCFB;
    border: 1px solid #D6EFE9;
    border-radius: 10px;
    padding: 10px 14px;
    margin-bottom: 10px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 10px;
  }

  .card-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 10px;
  }

  .mini-card {
    background: #FFFFFF;
    border: 1px solid #E2F2EE;
    border-radius: 8px;
    padding: 8px 10px;
  }

  .mini-card strong {
    color: #063D37;
    font-size: 9pt;
    display: block;
    margin-bottom: 2px;
  }

  .mini-card p {
    font-size: 8.5pt;
    margin-bottom: 0;
    color: #4A6360;
  }

  /* 5-Question Analysis Box */
  .analysis-box {
    background: #FFFFFF;
    border: 1px solid #CBEAE2;
    border-radius: 9px;
    padding: 9px 12px;
    margin-bottom: 8px;
  }

  .analysis-item {
    margin-bottom: 6px;
    padding-bottom: 6px;
    border-bottom: 1px dashed #E5F3EF;
  }

  .analysis-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .q-title {
    font-size: 8.8pt;
    font-weight: 700;
    color: #078F83;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 2px;
  }

  .q-answer {
    font-size: 9.2pt;
    color: #24413E;
    line-height: 1.4;
    margin-bottom: 0;
  }

  /* Presentation Script Banner */
  .speech-box {
    background: linear-gradient(135deg, #063D37 0%, #0A524A 100%);
    color: #FFFFFF;
    border-radius: 9px;
    padding: 9px 14px;
    margin-top: 8px;
    margin-bottom: 8px;
    box-shadow: 0 3px 8px rgba(6, 61, 55, 0.12);
  }

  .speech-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 8.5pt;
    font-weight: 800;
    color: #7DD8CF;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 4px;
  }

  .speech-text {
    font-size: 9.3pt;
    line-height: 1.45;
    color: #F0FDFB;
    font-style: italic;
    margin-bottom: 0;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;
    font-size: 8.5pt;
  }

  th {
    background: #063D37;
    color: #FFFFFF;
    text-align: left;
    padding: 7px 10px;
    font-weight: 700;
    border: 1px solid #063D37;
  }

  td {
    padding: 6px 10px;
    border: 1px solid #D5EBE5;
    color: #274340;
    background: #FFFFFF;
  }

  tr:nth-child(even) td {
    background: #F7FCFB;
  }

  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    background: #E8F6F2;
    color: #063D37;
    padding: 1px 4px;
    border-radius: 4px;
    border: 1px solid #C4E8DE;
  }

  /* Cover Page */
  .cover-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 260mm;
    padding: 25mm 15mm 20mm 15mm;
    background: radial-gradient(circle at top right, #EAF8F5 0%, #FFFFFF 60%);
    border: 2px solid #D2EFE7;
    border-radius: 16px;
    page-break-after: always;
  }

  .cover-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cover-brand {
    font-size: 26pt;
    font-weight: 900;
    color: #063D37;
    letter-spacing: -1px;
  }

  .cover-brand span {
    color: #0D7E73;
  }

  .cover-main {
    margin: auto 0;
  }

  .cover-title {
    font-size: 32pt;
    font-weight: 900;
    color: #063D37;
    line-height: 1.15;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .cover-subtitle {
    font-size: 15pt;
    color: #0D7E73;
    font-weight: 600;
    margin-bottom: 18px;
  }

  .cover-desc {
    font-size: 11pt;
    color: #435E5B;
    max-width: 580px;
    line-height: 1.55;
  }

  .cover-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 2px solid #C7EDE3;
    padding-top: 14px;
  }

  .meta-col strong {
    display: block;
    font-size: 8.5pt;
    text-transform: uppercase;
    color: #078F83;
    letter-spacing: 0.5px;
  }

  .meta-col span {
    font-size: 10pt;
    color: #063D37;
    font-weight: 700;
  }
</style>
</head>
<body>

<!-- ======================================================================= -->
<!-- PAGE 1: COVER PAGE                                                      -->
<!-- ======================================================================= -->
<div class="page">
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-brand">Shop<span>Hub</span></div>
      <span class="badge badge-dark">2026 E-COMMERCE UI/UX CASE STUDY</span>
    </div>

    <div class="cover-main">
      <span class="badge" style="margin-bottom: 12px;">COMPLETE FINAL PROJECT PRESENTATION</span>
      <h1 class="cover-title">ShopHub — Modern Electronics Marketplace</h1>
      <div class="cover-subtitle">Complete Architecture, UI/UX Design System & Student Presentation Guide</div>
      <p class="cover-desc">
        Yeh comprehensive presentation document ShopHub e-commerce web application ki complete working, design decisions, React component architecture, user psychology, responsive UX, aur micro-interactions ko explain karne ke liye banaya gaya hai. Har section ke aakhir mein ready-to-use speaking scripts diye gaye hain taake presentation mein confident aur professional andaaz mein explain kiya ja sake.
      </p>
    </div>

    <div class="cover-footer">
      <div class="meta-col">
        <strong>Project Type</strong>
        <span>Full-Stack Modern E-Commerce Platform</span>
      </div>
      <div class="meta-col">
        <strong>Technology Stack</strong>
        <span>React 19, Vite, Tailwind CSS, Motion, DummyJSON API</span>
      </div>
      <div class="meta-col">
        <strong>Target Audience</strong>
        <span>Teachers, Students, Evaluators & Industry Peers</span>
      </div>
      <div class="meta-col">
        <strong>Language</strong>
        <span>Easy Roman Urdu with English Technical Terms</span>
      </div>
    </div>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 2: PROJECT INTRODUCTION                                            -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 01 // Introduction</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>1. Project Introduction & Problem Statement</h1>
  <p>
    <strong>ShopHub</strong> ek modern 2026-standard electronics marketplace web application hai jisko consumer electronics (Laptops, Smartphones, Audio Gear, Tablets, Wearables) ko browse karne, discover karne, cart mein add karne aur checkout karne ke liye design kiya gaya hai.
  </p>

  <div class="card-grid">
    <div class="mini-card">
      <strong>Website Type</strong>
      <p>B2C Consumer Electronics E-Commerce Web Application jisme live product catalog, cart drawer, wishlist, multi-step checkout aur interactive error recovery shamil hai.</p>
    </div>
    <div class="mini-card">
      <strong>Core Tech Stack</strong>
      <p>React 19, Vite 6, Tailwind CSS v4, React Router v7, Lucide Icons, Motion (Framer), DummyJSON REST API, Firebase Auth & Firestore.</p>
    </div>
    <div class="mini-card">
      <strong>Target Users</strong>
      <p>Tech enthusiasts, students, working professionals aur budget shoppers jo confusing interfaces ke baghair authentic gadgets khareedna chahte hain.</p>
    </div>
    <div class="mini-card">
      <strong>Main Goal</strong>
      <p>User ka "Browse-to-Purchase" friction zero karna aur ek aesthetically pleasing, fast aur reliable shopping experience provide karna.</p>
    </div>
  </div>

  <h2>Main Problem & Solution</h2>
  <div class="card">
    <strong style="color:#063D37; font-size:10pt;">Problem: Aam Electronics Websites Mein Kya Kharabi Hoti Hai?</strong>
    <p style="font-size:9.2pt; margin-top:3px;">
      Zyadatar electronics websites par bohot zyada flashy banners, unnecessary popup ads, aur clutter hota hai. User specs aur price compare karte waqt confuse ho jata hai. Navigation bohot complex hoti hai aur checkout form itna lamba hota hai ke user purchase complete kiye baghair website chhor deta hai (Cart Abandonment).
    </p>
    <strong style="color:#0D7E73; font-size:10pt;">Solution: ShopHub Ne Isey Kaise Hal Kiya?</strong>
    <p style="font-size:9.2pt; margin-top:3px; margin-bottom:0;">
      ShopHub ne minimal visual language, soft calming colors (<code>#063D37</code>, <code>#0D7E73</code>, <code>#F7FCFB</code>), intuitive 3-step checkout, real-time live search, aur thoughtful micro-animations ke sath ek clean shopping environment banaya hai jahan user bina distraction ke decision le sakta hai.
    </p>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Respected teachers and fellows! Main ne 'ShopHub' is liye banaya kyun ke online electronics shopping mein sab se bara issue information overload aur confusing checkout hota hai. ShopHub ka main goal yeh hai ke user kisi bhi gadget ko sirf 3 clicks mein find, inspect aur purchase kar sake, bina kisi visual clutter ya technical confusion ke."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 2</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 3: WHY THIS WEBSITE WAS NEEDED                                     -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 02 // Market Need & Rationale</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>2. Why This Website Was Needed?</h1>
  <p>
    Online shopping websites sirf "products ki list" dikhane ka naam nahi hoti. User ki psychology aur decision-making process ko support karna professional web design ka sab se bara challenge hota hai.
  </p>

  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Existing websites mein user ko kya problems aati hain?</div>
      <p class="q-answer">
        Traditional e-commerce sites par users ko irrelevant products, broken search filters, slow loading pages, aur boring error screens milti hain. Specs parhte waqt user ko screen par 50 alag alag buttons nazar aate hain jis se "Decision Paralysis" paida hota hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. ShopHub un problems ko kaise solve karta hai?</div>
      <p class="q-answer">
        ShopHub information ko logically group karta hai: Hero section mein top 6 flagship devices 3D carousel mein milti hain, uske baad Category filtering, Flash Sale promo banner, Trending items, aur lifestyle cards aate hain. User ko exactly pata hota hai ke agla step kya lena hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">3. Information hierarchy ki importance kya hai?</div>
      <p class="q-answer">
        Agar saari products ek sath bina structure ke phenk di jayein to user overwhelmed ho jata hai. ShopHub mein Primary buttons (Green filled) aur Secondary buttons (clean text with diagonal arrow) ka strict rule hai taake user ko clear path nazar aaye.
      </p>
    </div>
  </div>

  <h2>Real-World Project Examples</h2>
  <ul>
    <li><strong>Live Category Chips:</strong> Homepage par category click karte hi page automatically smooth scroll karta hai aur filtered catalogue display ho jata hai.</li>
    <li><strong>Direct Quick-View Modal:</strong> User ko har product ki details dekhne ke liye naye page par jane ki zarurat nahi parti, woh homepage se hi popup modal khol kar specifications aur gallery check kar sakta hai.</li>
    <li><strong>Persistent Cart Drawer:</strong> Cart page par jaye baghair slide-over drawer mein total aur free-shipping meter nazar aata hai.</li>
  </ul>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Jab main ne existing electronics websites ko analyze kiya to dekha ke user ko ek product khareedne ke liye 10 alag alag pages par bhatakna parta hai. ShopHub mein main ne 'Progressive Disclosure' ka principle use kiya hai — yani user ko pehle simple summary milti hai, aur agar woh mazeed dekhna chahe to Quick-View modal ya full details page kholta hai. Is se user experience smooth aur stress-free banta hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 3</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 4: TARGET USERS                                                    -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 03 // User Personas</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>3. Target Users & User Psychology</h1>
  <p>
    Good UI sirf visually beautiful nahi hoti, balkay specific users ki specific needs ko samajh kar design ki jati hai. ShopHub ke 4 main target user groups hain:
  </p>

  <div class="card-grid">
    <div class="card">
      <div class="badge" style="margin-bottom:4px;">User Persona 1</div>
      <strong style="color:#063D37; font-size:10pt;">1. The Tech Enthusiast (Gamer / Pro)</strong>
      <ul style="font-size:8.8pt; margin-top:4px; margin-left:14px;">
        <li><strong>Goal:</strong> Latest specs (M-series MacBooks, OLED phones, flagship audio).</li>
        <li><strong>Need:</strong> Accurate tech specifications, high-res images, brand authenticity.</li>
        <li><strong>ShopHub UI Help:</strong> 3D Depth Carousel, official warranty badge, detailed specs list.</li>
      </ul>
    </div>

    <div class="card">
      <div class="badge" style="margin-bottom:4px;">User Persona 2</div>
      <strong style="color:#063D37; font-size:10pt;">2. The Busy Professional</strong>
      <ul style="font-size:8.8pt; margin-top:4px; margin-left:14px;">
        <li><strong>Goal:</strong> Quick replacement gadget (laptop charger, earphones, tablet).</li>
        <li><strong>Need:</strong> Ultra-fast search, 1-click add to cart, instant checkout.</li>
        <li><strong>ShopHub UI Help:</strong> Global auto-expanding search, slide-over cart drawer, 3-step checkout.</li>
      </ul>
    </div>

    <div class="card">
      <div class="badge" style="margin-bottom:4px;">User Persona 3</div>
      <strong style="color:#063D37; font-size:10pt;">3. The Budget-Conscious Student</strong>
      <ul style="font-size:8.8pt; margin-top:4px; margin-left:14px;">
        <li><strong>Goal:</strong> Best value for money, student discounts, price drops.</li>
        <li><strong>Need:</strong> Clear original vs discounted price, flash sale deals, wishlist saving.</li>
        <li><strong>ShopHub UI Help:</strong> Price strike-through tags, PromoBanner countdown, Wishlist table.</li>
      </ul>
    </div>

    <div class="card">
      <div class="badge" style="margin-bottom:4px;">User Persona 4</div>
      <strong style="color:#063D37; font-size:10pt;">4. First-Time Online Buyer</strong>
      <ul style="font-size:8.8pt; margin-top:4px; margin-left:14px;">
        <li><strong>Goal:</strong> Safe purchase without getting scammed.</li>
        <li><strong>Need:</strong> Trust signals, return policy clarity, cash on delivery option.</li>
        <li><strong>ShopHub UI Help:</strong> Trust badges (Official Warranty, 30-Day Return, COD Payment tab).</li>
      </ul>
    </div>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Ek achhi UI tabhi successful hoti hai jab woh har kisam ke user ki mental model ko match kare. Chahe koi jaldi mein aya hua professional ho jise foran charger chahiye, ya koi student jo price compare kar raha ho — ShopHub ki layout har persona ko unke desired action tak baghair kisi confusion ke pohanchati hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 4</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 5: COMPLETE WEBSITE STRUCTURE & ROUTES                             -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 04 // Architecture & Routes</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>4. Complete Website Structure (10 Live Routes)</h1>
  <p>
    ShopHub ka routing architecture React Router v7 par structured hai. Pure application mein 10 active routes hain jinko clean navigation flow ke sath connect kiya gaya hai:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width:22%;">Route Path</th>
        <th style="width:25%;">Page Component</th>
        <th style="width:30%;">Main Purpose & Action</th>
        <th style="width:23%;">Key Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>/</code></td>
        <td><code>HomePage</code></td>
        <td>Main landing hub, brand showcase, category exploration</td>
        <td>Hero, Coverflow Carousel, Flash Sale, Trends</td>
      </tr>
      <tr>
        <td><code>/products</code></td>
        <td><code>ProductsPage</code></td>
        <td>Full DummyJSON catalog browsing with live filters</td>
        <td>Category pills, search query, price sort, empty state</td>
      </tr>
      <tr>
        <td><code>/products/:id</code></td>
        <td><code>ProductDetailsPage</code></td>
        <td>Deep-dive product specifications & image gallery</td>
        <td>Thumbnail switcher, quantity picker, related items</td>
      </tr>
      <tr>
        <td><code>/cart</code></td>
        <td><code>CartPage</code></td>
        <td>Full page cart overview & subtotal calculation</td>
        <td>Item quantity controls, remove item, proceed button</td>
      </tr>
      <tr>
        <td><code>/wishlist</code></td>
        <td><code>WishlistPage</code></td>
        <td>Saved items management & bulk transfer</td>
        <td>Table layout, date added, in-stock badge, move to cart</td>
      </tr>
      <tr>
        <td><code>/checkout</code></td>
        <td><code>CheckoutPage</code></td>
        <td>3-step linear conversion checkout</td>
        <td>Contact -> Delivery -> Payment (Card/Cash/PayPal)</td>
      </tr>
      <tr>
        <td><code>/orders</code></td>
        <td><code>OrdersPage</code></td>
        <td>Purchase history & delivery status tracking</td>
        <td>Order ID, date, status pill, item thumbnail summary</td>
      </tr>
      <tr>
        <td><code>/login</code></td>
        <td><code>LoginPage</code></td>
        <td>User sign-in with Firebase auth integration</td>
        <td>Form validation, toggle password, demo quick login</td>
      </tr>
      <tr>
        <td><code>/signup</code></td>
        <td><code>SignupPage</code></td>
        <td>New account registration with profile creation</td>
        <td>Name, email, password match validation</td>
      </tr>
      <tr>
        <td><code>*</code></td>
        <td><code>NotFoundPage</code></td>
        <td>Custom 404 recovery experience</td>
        <td>Animated blinking otter, back to home & catalog CTAs</td>
      </tr>
    </tbody>
  </table>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "ShopHub ka routing structure standard e-commerce flow ko follow karta hai. Har page ka ek specific role hai aur koi dead-end route nahi hai. Agar user ghalti se galat URL par chala bhi jaye to hamara custom 404 page usay wapas shopping flow mein restore kar deta hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 5</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 6: HEADER & UNIVERSAL NAVIGATION                                   -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 05 // Header & Navigation</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>5. Header & Navigation System</h1>
  <p>
    Header kisi bhi website ka most important navigational landmark hota hai. ShopHub ka Header clean, sticky aur state-aware hai jo user ko har waqt orient rakhta hai.
  </p>

  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Yeh kya hai?</div>
      <p class="q-answer">
        Top navigation bar jisme ShopHub trimmed logo, main menu links (Home, Products, Wishlist), dynamic auto-expanding search bar, live wishlist & cart counters, user account menu aur mobile hamburger drawer shamil hain.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. Main ne yeh kyun banaya?</div>
      <p class="q-answer">
        Taake user website ke kisi bhi page par ho, woh 1 click mein kisi bhi major destination tak pohanch sake aur uski cart aur wishlist ka status har waqt uski aankhon ke samne ho.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">3. User ki kaunsi problem solve hoti hai?</div>
      <p class="q-answer">
        Aam websites par search dhoondna mushkil hota hai aur cart count update nahi hota. ShopHub mein Context API ke through cart aur wishlist real-time synchronize hoti hain. Search bar hover ya focus par smoothly expand hota hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">4. Is ka user/business ko kya benefit hai?</div>
      <p class="q-answer">
        Cart badge par live item count hone se user checkout karna nahi bhoolta, jo business ke sales conversion rate ko directly increase karta hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">5. Agar yeh na hota to kya problem hoti?</div>
      <p class="q-answer">
        User website par lost ho jata, cart mein items daal kar bhool jata, aur mobile screen par menu scroll karte waqt gayab ho jata.
      </p>
    </div>
  </div>

  <h2>Key Navigational Highlights</h2>
  <ul>
    <li><strong>Active Page Indicator:</strong> Current route par teal pill highlight aata hai taake user ko pata ho woh kahan mojood hai.</li>
    <li><strong>Live Notification Badges:</strong> Wishlist aur Cart icons par small floating badges hain jo items add hote hi instantly update hote hain.</li>
    <li><strong>Mobile Drawer with Backdrop Blur:</strong> Mobile devices par menu screen ko block nahi karta balkay smooth slide-in ke sath open hota hai.</li>
  </ul>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Header hamara central control panel hai. Yahan main ne search bar mein auto-expansion micro-interaction add kiya hai taake screen clean rahe aur click karte hi full search open ho jaye. Real-time cart aur wishlist badges user ko continuous visual feedback dete hain."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 6</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 7: HERO SECTION & 3D DEPTH CAROUSEL                                -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 06 // Hero Section</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>6. Hero Section & 3D Depth Carousel</h1>
  <p>
    Hero Section homepage ka pehla 5-second visual impression hai. Iska main maqsad user ka trust jeetna aur brand ki quality establish karna hai.
  </p>

  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Yeh kya hai?</div>
      <p class="q-answer">
        Edge-to-edge layout jisme left side par Typewriter cursor animation ke sath headline, supporting text, dual action buttons (Explore Products & View Catalog), aur 4 trust pills hain; jabke right side par 3D Depth Carousel chal raha hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. Main ne yeh kyun banaya?</div>
      <p class="q-answer">
        Static image hero boring hoti hai aur multi-slide banner par user click nahi karta. 3D depth coverflow carousel user ko 6 premium electronics (MacBook Pro, iPhone 13 Pro, AirPods Max, iPad Mini, etc.) automatically interactive 3D perspective mein dikhata hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">3. User ki kaunsi problem solve hoti hai?</div>
      <p class="q-answer">
        User ko foran pata chal jata hai ke ShopHub generic cheezein nahi balkay top-tier authentic consumer electronics sell karta hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">4. Is ka user/business ko kya benefit hai?</div>
      <p class="q-answer">
        Bounce rate dramatically kam hota hai kyun ke interactive visual motion user ka attention capture kar leti hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">5. Agar yeh na hota to kya problem hoti?</div>
      <p class="q-answer">
        Website ek standard template ya amateur school project lagti jisme koi dynamic energy na hoti.
      </p>
    </div>
  </div>

  <h2>Hero Trust Pills (Decision Enablers)</h2>
  <div class="card-grid">
    <div class="mini-card"><strong>🛡️ Official Warranty</strong><p>Authentic genuine products guarantee.</p></div>
    <div class="mini-card"><strong>⚡ Free Fast Delivery</strong><p>Zero shipping fee on qualified orders.</p></div>
    <div class="mini-card"><strong>🔄 30-Day Easy Return</strong><p>Hassle-free money-back policy.</p></div>
    <div class="mini-card"><strong>🔒 Secure Checkout</strong><p>256-bit encrypted data protection.</p></div>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Hero section mein main ne static banner ke bajaye ek custom 3D Depth Carousel integrate kiya hai jo flagship products ko 3D coverflow style mein display karta hai. Typewriter headline dynamic motion add karti hai aur neeche 4 trust badges first 3 seconds mein customer ka trust gain kar lete hain."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 7</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 8: CATEGORY SECTION & FEATURED CAROUSEL                            -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 07 // Homepage Sections</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>7. Category Section & Featured Carousel</h1>
  <p>
    User hero section ke baad jab scroll karta hai to usay foran structured categories aur curated products milni chahiyein.
  </p>

  <h2>A. Category Section (Shop by Category)</h2>
  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Yeh kya hai aur kyun banaya?</div>
      <p class="q-answer">
        Grid of interactive category cards (Smartphones, Laptops, Audio Gear, Tablets, Wearables, Accessories) with product count indicators aur active state borders. User ko pure catalog mein kho jane ke bajaye specific category par jump karne deta hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. User Benefit & Problem Solved:</div>
      <p class="q-answer">
        Agar user ko sirf headphones chahiyein to woh laptops aur tablets scroll kar ke time waste nahi karega. Card click karte hi instant category filter apply ho jata hai.
      </p>
    </div>
  </div>

  <h2>B. Featured Products Coverflow Carousel</h2>
  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Yeh kya hai aur kyun banaya?</div>
      <p class="q-answer">
        Curated top 16 products ka auto-scrolling 3D carousel jisme active product card center mein scale-up hota hai. Card par Quick View (Eye icon), Wishlist toggle (Heart), aur Add to Cart button shamil hain.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. Agar yeh na hota to kya problem hoti?</div>
      <p class="q-answer">
        Featured products static boring grid mein chup jatien aur user ka browsing experience monotonous ho jata. Carousel shopping experience ko playful aur engaging banata hai.
      </p>
    </div>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Category section user ko broad-to-narrow navigation provide karta hai. Iske neeche Featured Coverflow Carousel hamare highest-rated products ko showcase karta hai jahan user card par hover kar ke directly cart mein item add kar sakta hai ya full specifications ka quick preview le sakta hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 8</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 9: FLASH SALE BANNER & SMART DIGITAL LIFE                          -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 08 // Promotional Architecture</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>8. Promotional Flash Sale & Lifestyle Cards</h1>
  <p>
    E-commerce mein urgency create karna aur lifestyle aspirations ko appeal karna sales conversion ke 2 proven pillars hain.
  </p>

  <h2>A. Promotional Flash Sale Banner (SonicPro Headphones)</h2>
  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Design Decision & Psychology:</div>
      <p class="q-answer">
        Dark teal background (<code>#063D37</code>) par floating high-res wireless headphones visual, 40% OFF discount badge, dynamic countdown timer (Hours, Mins, Secs) aur dual action buttons.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. Business Benefit (FOMO):</div>
      <p class="q-answer">
        Countdown timer "Fear of Missing Out" (FOMO) create karta hai. User decision lene mein delay nahi karta aur foran deal capture karne ke liye checkout ki taraf barhta hai.
      </p>
    </div>
  </div>

  <h2>B. Smart Digital Life Section (3 Lifestyle Category Cards)</h2>
  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Yeh kya hai aur kyun banaya?</div>
      <p class="q-answer">
        Teen modern lifestyle focus cards: <em>Smart Living</em>, <em>Pro Computing</em>, aur <em>Audio Immersion</em>. Har card par category highlight, contextual visual aur direct action button hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. User Benefit:</div>
      <p class="q-answer">
        User electronics ko sirf "boxes ya specs" ke tor par nahi dekhta balkay apni daily life mein unki utility visualize karta hai (e.g. Work productivity vs Home comfort).
      </p>
    </div>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Flash sale banner user ki purchasing urgency ko trigger karta hai through a live countdown timer aur high-contrast discount badges. Uske baad Smart Digital Life cards user ko product categories ke lifestyle benefits dikhate hain jo user ko casual browser se serious buyer banate hain."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 9</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 10: NEW ARRIVALS & TRENDING GRID                                   -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 09 // Product Discovery</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>9. New Arrivals & Trending Product Grid</h1>
  <p>
    Homepage ka final core product display New Arrivals section hai jo live dynamic filtering aur product cards ka main hub hai.
  </p>

  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Yeh kya hai?</div>
      <p class="q-answer">
        Clean responsive grid (1 col mobile, 2 col tablet, 4 col desktop) jisme naye aur trending products display hote hain. Isme category filter chips, search match integration aur View Catalog button shamil hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. Main ne yeh kyun banaya?</div>
      <p class="q-answer">
        User ko latest inventory dekhne ke liye bar bar search page par na jana pare. Agar user ne search bar mein query type ki ho ya category select ki ho, to yeh section automatically real-time filter ho kar matching products dikhata hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">3. User ki kaunsi problem solve hoti hai?</div>
      <p class="q-answer">
        Zero Page Reloads! User ko filter karne ke liye page reload ka intezar nahi karna parta. React State ke through filtering instant 0ms mein hoti hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">4. Agar yeh na hota to kya problem hoti?</div>
      <p class="q-answer">
        Homepage par sirf featured items reh jatien aur regular catalogue inventory user ki nazar se chupi rehti.
      </p>
    </div>
  </div>

  <h2>Product Card Anatomy in New Arrivals</h2>
  <ul>
    <li><strong>Visual Badge:</strong> Discount percentage (e.g. "-15%"), "Trending" ya "Hot" pill.</li>
    <li><strong>Wishlist Quick Heart:</strong> Top-right corner par heart icon jo toggle karne par store state update karta hai.</li>
    <li><strong>Title & Brand:</strong> Bold typography with subtle truncation so card height remains uniform.</li>
    <li><strong>Pricing Hierarchy:</strong> Current price bold green mein, original price crossed-out gray mein.</li>
    <li><strong>Rating Stars:</strong> 5-star rating visual with numeric score (e.g. 4.8) and review count.</li>
  </ul>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "New Arrivals section hamare homepage ka workhorse hai. Yahan main ne client-side filtering implement ki hai jo global search aur selected category ke mutabiq products ko instantly filter karti hai bina kisi network latency ya page reload ke."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 10</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 11: PRODUCT CARD COMPONENT & MICRO-INTERACTIONS                    -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 10 // Component Deep Dive</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>10. ProductCard Component Architecture</h1>
  <p>
    <code>ProductCard.tsx</code> website ka sab se zyada reuse hone wala UI component hai. Isko modular aur robust banaya gaya hai taake homepage, catalog page, modal, aur wishlist har jagah flawless behave kare.
  </p>

  <div class="card">
    <strong style="color:#063D37; font-size:10pt;">Component Props & Interface:</strong>
    <p style="font-family:'JetBrains Mono'; font-size:8pt; margin-top:4px;">
      interface ProductCardProps {<br>
      &nbsp;&nbsp;product: Product;<br>
      &nbsp;&nbsp;onAddToCart?: (product: Product) => void;<br>
      &nbsp;&nbsp;isWishlisted?: boolean;<br>
      &nbsp;&nbsp;onToggleWishlist?: () => void;<br>
      &nbsp;&nbsp;showMoveToCart?: boolean;<br>
      &nbsp;&nbsp;onMoveToCart?: () => void;<br>
      }
    </p>
  </div>

  <h2>Micro-Interactions on ProductCard</h2>
  <div class="card-grid">
    <div class="mini-card">
      <strong>1. Image Hover Zoom</strong>
      <p>Card hover hone par product image <code>scale-105</code> hoti hai smoothly (transition 300ms) jo tactile feeling deti hai.</p>
    </div>
    <div class="mini-card">
      <strong>2. ActionPrimaryButton Gliding Circle</strong>
      <p>Button par hover karte hi white circle left to right glide karta hai aur arrow smoothly forward move hota hai.</p>
    </div>
    <div class="mini-card">
      <strong>3. Wishlist Heart Pop</strong>
      <p>Heart click karne par subtle scale pulse hota hai aur color soft gray se filled teal red/green mein convert hota hai.</p>
    </div>
    <div class="mini-card">
      <strong>4. Toast Notification Trigger</strong>
      <p>Add to Cart click karte hi screen ke bottom-right corner par floating toast bar appear hota hai ("Item added to cart").</p>
    </div>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "ProductCard component ko main ne reusable banaya hai. Is card mein multiple micro-interactions hain jaise image zoom on hover, heart toggle animation, aur hamara custom ActionPrimaryButton jo hover par circle glide karta hai. Yeh subtle details user ko premium feel deti hain."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 11</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 12: PRODUCT DETAILS PAGE (/products/:id)                           -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 11 // Product Details Page</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>11. Full Product Details Page (/products/:id)</h1>
  <p>
    Jab user kisi product card par click karta hai ya "View Full Details" link select karta hai, to woh dedicated <code>/products/:id</code> route par navigate karta hai.
  </p>

  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Yeh kya hai?</div>
      <p class="q-answer">
        Comprehensive product inspection page jisme high-res multi-image gallery thumbnail switcher, category breadcrumb, title, brand, live stock badge, price comparison, detailed description, quantity selector, dual CTA buttons (Add to Cart & Buy Now), warranty info, aur Related Products section shamil hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. Main ne yeh kyun banaya?</div>
      <p class="q-answer">
        Electronics khareedne se pehle user ko har angle se device dekhna hota hai aur technical specifications verify karni hoti hain. Yeh page buyer ka purchase confidence build karta hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">3. Related Products Section ka role:</div>
      <p class="q-answer">
        Page ke bottom par same category ki 4 related products dynamically recommend ki jati hain taake user alternative models ko easily compare kar sake bina wapas search kiye.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">4. Agar yeh page na hota:</div>
      <p class="q-answer">
        High-ticket electronics (jaise $1,999 ka MacBook Pro) ko koi bhi user sirf ek chote card se nahi khareedega. Detailed page ke baghair expensive electronics ka conversion zero ho jata hai.
      </p>
    </div>
  </div>

  <h2>Key Functional Elements</h2>
  <ul>
    <li><strong>Interactive Thumbnail Switcher:</strong> DummyJSON API se aane wali multiple images par click karne par main hero preview instantly switch ho jata hai.</li>
    <li><strong>Dynamic Stock Validation:</strong> Agar stock 0 ho to "Out of Stock" badge show hota hai aur Add to Cart button disabled ho jata hai.</li>
    <li><strong>Quantity Increment/Decrement:</strong> User apni zarurat ke mutabiq quantity adjust kar sakta hai with minimum 1 validation.</li>
  </ul>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Product Details Page hamari primary conversion machine hai. Yahan user high-resolution multi-angle photos inspect kar sakta hai, stock status dekh sakta hai, aur direct Buy Now ya Add to Cart select kar sakta hai. Neeche Related Products section cross-selling aur product comparison ko easy banata hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 12</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 13: QUICK-VIEW MODAL & CART DRAWER                                 -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 12 // Overlays & Drawers</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>12. Quick-View Modal & Slide-Over Cart Drawer</h1>
  <p>
    ShopHub mein user friction ko kam karne ke liye 2 interactive overlay components integrate kiye gaye hain: <code>ProductDetailsModal</code> aur <code>CartDrawer</code>.
  </p>

  <h2>A. ProductDetailsModal (Instant Inspection)</h2>
  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Purpose & User Problem Solved:</div>
      <p class="q-answer">
        User ko har dafa naye page par jane ki zarurat nahi parti. Modal click karte hi backdrop blur ke sath popup open hota hai jisme gallery, specs aur add to cart button hota hai, plus "View Full Product Details →" ka deep link bhi mojood hai.
      </p>
    </div>
  </div>

  <h2>B. CartDrawer (Slide-Over Cart Management)</h2>
  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Purpose & Architecture:</div>
      <p class="q-answer">
        Header ke cart icon click karne par right side se smooth slide-over drawer open hota hai. Isme cart ke saare items, unki quantities (+/-), individual item removal, total price, free shipping progress bar aur "Proceed to Checkout" button mojood hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. Free Shipping Progress Bar (Gamified Incentive):</div>
      <p class="q-answer">
        Agar user ka cart total $150 se kam ho to progress bar dikhati hai ke "$X mazeed add karein free delivery ke liye". Yeh e-commerce psychology Average Order Value (AOV) ko increase karti hai.
      </p>
    </div>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Quick-View Modal aur Cart Drawer ka main advantage yeh hai ke user ka browsing flow break nahi hota. Woh products scroll karte hue bina page chhore details dekh sakta hai aur cart manage kar sakta hai. Cart drawer mein free shipping meter customer ko mazeed items add karne ke liye motivate karta hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 13</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 14: SEARCH EXPERIENCE & LIVE FILTERING                             -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 13 // Search & Discovery</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>13. Search Experience & Multi-Field Filtering</h1>
  <p>
    Search functionality e-commerce website ka heart hoti hai. ShopHub mein search ko multi-layered aur ultra-fast banaya gaya hai.
  </p>

  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Multi-Field Matching Algorithm:</div>
      <p class="q-answer">
        Jab user search input mein text likhta hai, hamara filtering engine sirf Title ko check nahi karta, balkay Product Title, Brand Name (Apple, Samsung, Sony, Asus), aur Category Name teeno par case-insensitive matching karta hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. Header Search vs Products Page Sync:</div>
      <p class="q-answer">
        User chahe top header search bar mein query likhe ya Products page ke local search bar mein, dono React Router ke URL search parameters (<code>?search=macbook</code>) aur Global Context ke sath perfectly in-sync rehte hain.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">3. Empty Search State (Zero Results Handling):</div>
      <p class="q-answer">
        Agar user aisi cheez search kare jo available na ho (e.g. "Space Rocket"), to website blank nahi hoti balkay animated 3D Sad Character ke sath clear message show karti hai: "404 • No Products Found" aur "Clear All Filters" button deti hai taake user foran recover kar sake.
      </p>
    </div>
  </div>

  <h2>Search UX Flow Diagram</h2>
  <div class="card" style="font-size:8.8pt; line-height:1.6; text-align:center;">
    <strong>User types query</strong> → <strong>Header expands smoothly</strong> → <strong>URL updates <code>/products?search=...</code></strong> → <strong>Instant match across Title/Brand/Category</strong> → <strong>Card results rendered (or animated empty card)</strong>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Search experience ko main ne multi-field matching ke sath banaya hai. Agar user 'Apple' likhe to Apple ke laptops aur phones dono show ho jate hain. Aur sab se important baat — agar koi product na mile to hamari UI user ko dead-end par nahi chhorti balkay animated recovery screen aur 'Reset Filters' CTA deti hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 14</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 15: 404 / NOT FOUND EXPERIENCE & ANIMATED OTTER                    -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 14 // Error UX & Micro-Animations</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>14. 404 Experience & Interactive Cute Otter</h1>
  <p>
    "Error page ka purpose sirf error batana nahi, balkay user ko recover karwana bhi hai." ShopHub ka 404 page industry-standard emotional UX ka perfect example hai.
  </p>

  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">1. Why a basic "404 Not Found" is not enough?</div>
      <p class="q-answer">
        Standard browser 404 errors (white screen par black text) user ko frustrate karti hain aur user website close kar deta hai. Friendly 404 page user ke frustration ko smile mein badalta hai aur website par retain karta hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">2. Character Selection: Cute Sad Baby Otter:</div>
      <p class="q-answer">
        Aapne dekha hoga ke hum ne 3D photo-realistic cute baby otter use kiya hai jo ShopHub ka teal shopping bag pakray hue hai. Iska sad confused expression naturally communicate karta hai: "Oops! We couldn't find this page."
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">3. Organic Blinking & Looking Animation:</div>
      <p class="q-answer">
        Otter static image nahi hai! SVG overlay aur <code>requestAnimationFrame</code> ke through har 2.8s se 6.2s baad natural blinking hoti hai (with 18% chance of sweet double-blink). Aankhon ke glints left, right, neeche bag ki taraf aur user ki taraf look-around karte hain.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">4. Desktop Mouse Tracking & Breathing Float:</div>
      <p class="q-answer">
        Desktop par jab user mouse move karta hai, otter ki aankhon ke glints cursor ko subtly follow karte hain. Body 4.6s ke natural breathing float cycle mein hai aur floor shadow dynamic expand/shrink hota hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">5. Recovery Actions (Dual CTAs & Quick Links):</div>
      <p class="q-answer">
        Page par primary <em>Back to Home</em> button, secondary <em>Browse Products</em> button, aur 3 direct quick links (Smartphones, Laptops, Audio) diye gaye hain taake user 1 click mein wapas store mein redirect ho jaye.
      </p>
    </div>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Hamara 404 page emotional UX design ka demonstration hai. Hum ne cute baby otter character use kiya hai jo natural intervals par blink karta hai, look around karta hai, aur desktop par user ke cursor ko follow karta hai. Yeh playful interaction user ke frustration ko eliminate karti hai aur direct buttons ke zariye usay wapas store par bhejti hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 15</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 16: CHECKOUT FLOW & COGNITIVE LOAD REDUCTION                       -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 15 // Checkout & Forms</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>15. Checkout Flow & Form Design (Cognitive Load)</h1>
  <p>
    E-commerce mein 70% log checkout form lamba hone ki wajah se khareedari beech mein chhor dete hain. ShopHub ne is problem ko 3-Step Stepper ke zariye solve kiya hai.
  </p>

  <h2>The 3-Step Linear Stepper Architecture</h2>
  <div class="card-grid-3">
    <div class="mini-card">
      <strong style="color:#078F83;">Step 1: Contact</strong>
      <p>Full Name, Email Address, Phone Number. Sirf basic identification required hai.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#078F83;">Step 2: Delivery</strong>
      <p>Shipping Address, City, Postal Code, Country. Delivery instructions option.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#078F83;">Step 3: Payment</strong>
      <p>Payment Method Tabs (Cash on Delivery | Bank Card | PayPal) + order summary.</p>
    </div>
  </div>

  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">Concept: Cognitive Load Reduction (Aasaan Roman Urdu Mein):</div>
      <p class="q-answer">
        <strong>Cognitive Load</strong> ka matlab hai dimagh par zor parna. Agar hum user ko ek hi page par 15 fields ek sath dikha dein to user thak jata hai aur dar jata hai ke form kitna lamba hai. 3-step stepper information ko chote chote tukron (chunks) mein divide karta hai. Jab user ek step complete karta hai to usko sense of accomplishment milti hai aur agla step aasan lagta hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">Conditional Field Rendering:</div>
      <p class="q-answer">
        Jab user 'Cash on Delivery' select karta hai to Card Number aur CVV fields gayab ho jati hain. Jab 'Bank Card' select karta hai sirf tabhi card fields show hoti hain. Unnecessary fields chupana UI ko clean rakhta hai.
      </p>
    </div>
    <div class="analysis-item">
      <div class="q-title">Firestore Order Persistence:</div>
      <p class="q-answer">
        Place Order click karne par unique Order ID generate hota hai, items Firestore database mein save hote hain, cart automatically clear ho jati hai aur user confirmation screen par navigate hota hai.
      </p>
    </div>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Checkout page par main ne 'Cognitive Load Reduction' ka UX principle apply kiya hai. Ek giant form ke bajaye hum ne 3-step linear stepper banaya hai. Agar user Cash on Delivery select kare to card fields gayab ho jati hain. Is conditional rendering se form short aur frictionless lagta hai jo conversion rate barhata hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 16</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 17: WISHLIST, ORDERS & AUTHENTICATION                              -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 16 // Customer Account & State</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>16. Wishlist, Orders & Authentication</h1>
  <p>
    Customer loyalty aur repeat business ke liye user account management, wishlist saving, aur order tracking features implement kiye gaye hain.
  </p>

  <h2>A. Wishlist Page (/wishlist) — Table Architecture</h2>
  <div class="card">
    <p style="font-size:9pt; margin-bottom:4px;">
      Wishlist page ko custom reference table layout par banaya gaya hai:
    </p>
    <ul style="font-size:8.8pt; margin-left:14px;">
      <li><strong>Header Row:</strong> Dark teal (<code>#063D37</code>) styled table headers (Product Image & Title, Unit Price, Stock Status, Action).</li>
      <li><strong>In-Stock Badges:</strong> Green pill badge jo confirm karta hai ke product ready-to-ship hai.</li>
      <li><strong>Bulk Actions:</strong> Bottom bar par "Clear Wishlist" aur "Add All to Cart" buttons mojood hain.</li>
      <li><strong>Copy Wishlist Link Bar:</strong> User apni wishlist ka shareable link 1-click mein copy kar sakta hai.</li>
    </ul>
  </div>

  <h2>B. Orders Page (/orders) — Purchase History</h2>
  <div class="card">
    <p style="font-size:9pt; margin-bottom:0;">
      User ke tamam placed orders Firebase Firestore se real-time fetch hote hain. Har order card par unique Order ID, date, status pill ("Confirmed" / "Shipped"), delivery address aur ordered items ke thumbnails aur prices display hote hain.
    </p>
  </div>

  <h2>C. Authentication (Login & Signup)</h2>
  <div class="card">
    <p style="font-size:9pt; margin-bottom:0;">
      Firebase Auth ke sath integrated Login aur Signup pages. Email validation, password show/hide eye toggle, error messages handling, aur demo credentials quick fill buttons shamil hain.
    </p>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "ShopHub customer retention features provide karta hai: Wishlist table mein user products save kar ke baad mein 1 click mein cart mein move kar sakta hai. Orders page par complete purchase history track hoti hai, aur Firebase authentication ke zariye user data secure rehta hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 17</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 18: DESIGN SYSTEM — COLOR PALETTE & PSYCHOLOGY                     -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 17 // Design System: Colors</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>17. Color System & Visual Psychology</h1>
  <p>
    Professional UI design mein colors randomly choose nahi kiye jaate. ShopHub ka color palette calm, trustworthy electronics theme par based hai.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width:18%;">Color Code</th>
        <th style="width:20%;">Color Name</th>
        <th style="width:30%;">Where It Is Used</th>
        <th style="width:32%;">Why Chosen & User Benefit</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>#063D37</code></td>
        <td>Deep Forest Teal</td>
        <td>Primary headings, hero title, footer copyright, active text, primary chips</td>
        <td>High contrast black ke bajaye soft dark green eye fatigue kam karta hai aur luxurious feel deta hai.</td>
      </tr>
      <tr>
        <td><code>#0D7E73</code></td>
        <td>Vibrant Teal Accent</td>
        <td>Primary buttons, category borders, active icons, price tags, text highlights</td>
        <td>Action color jo user ki attention immediately critical buttons aur links ki taraf guide karta hai.</td>
      </tr>
      <tr>
        <td><code>#EAF8F5</code></td>
        <td>Soft Mint Aura</td>
        <td>Badge backgrounds, subtle glow orbs, table hover states, cart drawer tags</td>
        <td>Pure white aur dark green ke darmian soft transition deta hai aur visual harshness khatam karta hai.</td>
      </tr>
      <tr>
        <td><code>#F7FCFB</code></td>
        <td>Subtle Tint Canvas</td>
        <td>Main page background, alternating cards, secondary section wrappers</td>
        <td>Zero glare! Harsh clinical white screen ke bajaye premium paper-like calmness deta hai.</td>
      </tr>
      <tr>
        <td><code>#FFFFFF</code></td>
        <td>Crisp White</td>
        <td>Product cards, modals, input fields, navigation bar background</td>
        <td>Content containers ko background se elevate karta hai taake cards visually stand out karein.</td>
      </tr>
    </tbody>
  </table>

  <h2>Why Alternating Backgrounds Matter?</h2>
  <div class="card">
    <p style="font-size:9pt; margin-bottom:0;">
      Homepage par hum ne sections ko <code>#F7FCFB</code> aur <code>#FFFFFF</code> ke darmian alternate kiya hai. Yeh subtle visual separation create karta hai bina kisi heavy dark border ke. User ko effortlessly pata chal jata hai ke naya section start ho gaya hai.
    </p>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "ShopHub ka color system intentional hai. Hum ne harsh pure black ke bajaye Deep Teal #063D37 aur pure white glare ke bajaye Soft Mint #F7FCFB use kiya hai. Colors ka limited palette website ko cohesive aur professional brand identity deta hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 18</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 19: TYPOGRAPHY, SPACING & WHITESPACE                               -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 18 // Typography & Whitespace</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>18. Typography & Whitespace Architecture</h1>
  <p>
    Typography sirf text likhna nahi hota; yeh content ki hierarchy, readability aur scanning efficiency decide karta hai.
  </p>

  <h2>A. Typographic Scale & Hierarchy</h2>
  <ul>
    <li><strong>Font Family:</strong> <code>Plus Jakarta Sans / Inter / System-UI</code> — modern geometric sans-serif jo choti screen par bhi crystal clear readable hai.</li>
    <li><strong>Display Headings:</strong> <code>font-black tracking-tight</code> (72px–110px) 404 numbers aur hero text ke liye.</li>
    <li><strong>Section Headings:</strong> <code>font-extrabold text-[28px]–[36px]</code> clear visual anchors create karne ke liye.</li>
    <li><strong>Body Text:</strong> <code>font-normal text-[14.5px]–[16px] text-[#5A6E6A]</code> comfortable line-height (1.5–1.6) ke sath taake parhna aasan ho.</li>
    <li><strong>Labels & Badges:</strong> <code>font-bold text-[11px] tracking-wider uppercase</code> quick visual cues ke liye.</li>
  </ul>

  <h2>B. Intentional Whitespace vs Empty Space</h2>
  <div class="card">
    <strong style="color:#063D37; font-size:10pt;">Dono Mein Kya Farq Hai?</strong>
    <p style="font-size:9pt; margin-top:3px;">
      <em>Unintentional Empty Space:</em> Aisa lagta hai jaise developer kuch add karna bhool gaya ho aur jagah khali chhor di ho.<br>
      <em>Intentional Whitespace (Breathing Room):</em> Content ke ird gird sochi-samjhi spacing di jati hai taake user ki aankhein rest kar sakein aur important elements (CTAs, product titles) easily stand out karein.
    </p>
    <p style="font-size:9pt; margin-bottom:0;">
      ShopHub mein standard 8px grid system follow kiya gaya hai: <code>p-4</code> (16px), <code>p-6</code> (24px), <code>space-y-12</code> (48px) taake consistent visual rhythm maintain rahe.
    </p>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Typography aur Whitespace hamari UI ka silent backbone hain. Hum ne 8px spacing grid use kiya hai jo elements ke darmiyan intentional breathing room provide karta hai. Is se user content ko easily scan kar sakta hai bina visual fatigue mehsoos kiye."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 19</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 20: BUTTONS & MICRO-INTERACTIONS ARCHITECTURE                      -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 19 // Interactive Buttons</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>19. Buttons & Micro-Interactions System</h1>
  <p>
    Website par har button ek jaisa nahi hona chahiye. ShopHub mein strict Button Hierarchy rule follow kiya gaya hai jo <code>AnimatedButtons.tsx</code> mein encapsulated hai.
  </p>

  <h2>1. ActionPrimaryButton ("Shop Products" / "Back to Home")</h2>
  <div class="card">
    <strong style="color:#063D37; font-size:10pt;">Design & Animation Mechanism:</strong>
    <p style="font-size:9pt; margin-top:3px;">
      Vibrant teal filled background (<code>#0D7E73</code>) with rounded-full pill shape. Left side par white circle hota hai jisme arrow icon fit hota hai.
    </p>
    <ul style="font-size:8.8pt; margin-left:14px; margin-top:4px;">
      <li><strong>Hover Effect:</strong> White circle left to right smoothly glide karta hai through dynamic width calculation (<code>travelDistance</code>).</li>
      <li><strong>Zero Layout Shift:</strong> Button ke andar hidden anchor text hota hai jo button ko resize hone se rokta hai.</li>
      <li><strong>Color Flip:</strong> White background layer fade-in hoti hai aur text green se dark teal ban jata hai.</li>
    </ul>
  </div>

  <h2>2. ActionSecondaryButton ("View Catalog" / "Browse Products")</h2>
  <div class="card">
    <strong style="color:#063D37; font-size:10pt;">Design & Animation Mechanism:</strong>
    <p style="font-size:9pt; margin-top:3px;">
      Subtle transparent background with ghost styling. 45-degree diagonal arrow (<code>ArrowUpRight</code>) right side par mojood hota hai.
    </p>
    <ul style="font-size:8.8pt; margin-left:14px; margin-top:4px;">
      <li><strong>Hover Effect:</strong> Text subtly right-shift hota hai aur arrow 45° angle par up-and-right move karta hai.</li>
      <li><strong>Expanding Underline:</strong> Left to right teal underline expand hoti hai (<code>scale-x-0</code> to <code>scale-x-100</code>).</li>
    </ul>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Hum ne visual hierarchy ka strict rule follow kiya hai: Har section mein sirf EK primary button hota hai jo gliding circle animation ke sath visual weight carry karta hai, aur secondary actions ke liye ghost underline buttons use hote hain. Is se user ko hamesha clear pata hota hai ke main action kaunsa hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 20</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 21: REACT TECHNICAL ARCHITECTURE                                   -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 20 // Technical Architecture</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>20. React Technical Architecture</h1>
  <p>
    ShopHub ka frontend modern component-driven React 19 architecture par build kiya gaya hai with TypeScript for type safety.
  </p>

  <div class="card-grid">
    <div class="mini-card">
      <strong>1. Component Reusability</strong>
      <p><code>ProductCard</code>, <code>AnimatedButtons</code>, <code>Header</code>, <code>Footer</code> ko independent reusable modules ke tor par create kiya gaya hai taake code duplication zero ho.</p>
    </div>
    <div class="mini-card">
      <strong>2. React Context API</strong>
      <p><code>StoreContext.tsx</code> global state manage karta hai: cart items, wishlist, user auth status, search query, aur global toast notification system.</p>
    </div>
    <div class="mini-card">
      <strong>3. React Router v7</strong>
      <p>Client-side routing with <code>BrowserRouter</code>, <code>useNavigate</code>, <code>useParams</code>, aur URL query parameters sync for fast single-page app (SPA) performance.</p>
    </div>
    <div class="mini-card">
      <strong>4. TypeScript Type Safety</strong>
      <p><code>types.ts</code> mein <code>Product</code>, <code>CartItem</code>, <code>User</code>, <code>Order</code> ke strict interfaces defined hain jo runtime bugs ko compile time par prevent karte hain.</p>
    </div>
  </div>

  <h2>Why React State & Context Were Used?</h2>
  <div class="analysis-box">
    <div class="analysis-item">
      <div class="q-title">State Management Rationale (Simple Roman Urdu):</div>
      <p class="q-answer">
        Agar hum Context API use na karte, to humein cart ki quantity Header, Homepage, Details Page, aur Cart Drawer mein bar bar "Prop Drilling" ke zariye pass karni parti jo code ko messy bana deta. Context API ne pure application ko ek centralized data store provide kiya jahan se koi bhi component directly cart ya wishlist access kar sakta hai.
      </p>
    </div>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Technical point of view se ShopHub React 19 aur TypeScript par based hai. Hum ne global state management ke liye React Context API use kiya hai taake cart aur wishlist data pure application mein seamlessly synchronize rahe. Pure code mein reusable components aur strict typing ensure karti hai ke koi unexpected runtime error na aaye."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 21</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 22: DATA LAYER, DUMMYJSON API & FIREBASE                           -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 21 // Data Layer & APIs</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>21. Data Layer: DummyJSON API & Firebase</h1>
  <p>
    ShopHub ek hybrid data architecture use karta hai jo live cloud APIs aur local resilience dono provide karta hai.
  </p>

  <h2>1. DummyJSON REST API Integration</h2>
  <div class="card">
    <p style="font-size:9pt; margin-bottom:4px;">
      Live product data DummyJSON API endpoint se fetch hota hai: <code>https://dummyjson.com/products?limit=0</code>
    </p>
    <ul style="font-size:8.8pt; margin-left:14px;">
      <li><strong>Live Fetching Service:</strong> <code>productService.ts</code> mein asynchronous <code>fetchAllDummyJsonProducts()</code> function hai jo network request handle karta hai.</li>
      <li><strong>Offline Fallback (Resilience):</strong> Agar internet disconnect ho ya API down ho, to website crash nahi hoti balkay <code>mockData.ts</code> mein mojood high-quality fallback inventory load kar leti hai.</li>
      <li><strong>Loading & Error States:</strong> Data load hote waqt skeleton animations aur error aane par retry button display hota hai.</li>
    </ul>
  </div>

  <h2>2. Firebase Authentication & Firestore Database</h2>
  <div class="card">
    <p style="font-size:9pt; margin-bottom:4px;">
      User data aur purchase orders cloud par persist hote hain:
    </p>
    <ul style="font-size:8.8pt; margin-left:14px;">
      <li><strong>Firebase Auth:</strong> <code>signInWithEmailAndPassword</code>, <code>createUserWithEmailAndPassword</code>, aur <code>signOut</code> functions secure user sessions maintain karte hain.</li>
      <li><strong>Firestore Database:</strong> <code>orders</code> collection mein har completed checkout order store hota hai jisko Orders Page real-time listener (<code>onSnapshot</code>) se fetch karta hai.</li>
    </ul>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Data layer par ShopHub real-world REST API (DummyJSON) se 100+ electronics items fetch karta hai. Sath hi hum ne local fallback implement kiya hai taake internet issue par bhi app smoothly chale. User authentication aur order persistence ke liye Firebase cloud database integrate kiya gaya hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 22</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 23: RESPONSIVE DESIGN STRATEGY                                     -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 22 // Responsive Behavior</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>22. Responsive Design Strategy</h1>
  <p>
    "Mobile design sirf desktop website ko chota karna nahi hota." ShopHub ko mobile-first mindset ke sath har screen size ke liye tailor kiya gaya hai.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width:20%;">Device Category</th>
        <th style="width:25%;">Screen Breakpoint</th>
        <th style="width:30%;">Layout & Grid Adaptations</th>
        <th style="width:25%;">Touch & Interaction Tuning</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Mobile Phones</strong></td>
        <td><code>&lt; 640px</code> (sm)</td>
        <td>Single-column vertical stack, 1-card product grid, compact headers, full-width buttons</td>
        <td>44px min touch targets, swipeable carousels, hamburger drawer navigation</td>
      </tr>
      <tr>
        <td><strong>Tablets & iPads</strong></td>
        <td><code>640px – 1024px</code> (md/lg)</td>
        <td>2-column product grid, 2-column footer, side-by-side checkout summaries</td>
        <td>Comfortable tap targets, balanced whitespace, adaptive modal widths</td>
      </tr>
      <tr>
        <td><strong>Desktop / Laptops</strong></td>
        <td><code>&gt; 1024px</code> (lg/xl)</td>
        <td>4-column product grid, 3D Depth Carousel, split left/right 404 layout, hover effects</td>
        <td>Cursor tracking on 404 otter, instant hover card previews, auto-expanding search</td>
      </tr>
    </tbody>
  </table>

  <h2>Mobile-Specific UX Optimizations</h2>
  <ul>
    <li><strong>No Horizontal Scrolling:</strong> Tamam containers <code>w-full overflow-hidden</code> rule follow karte hain taake mobile screen par horizontal shake na ho.</li>
    <li><strong>Sticky Header with Safe Padding:</strong> Mobile par header compact rehta hai aur menu open hone par body scroll lock ho jata hai.</li>
    <li><strong>Finger-Friendly Buttons:</strong> Mobile par buttons ki height 44px–52px rakhi gayi hai taake thumb se easily press ho sakein.</li>
  </ul>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Responsive design mein hum ne Tailwind CSS ke modern breakpoints use kiye hain. Mobile par layout single-column stack ho jata hai, hamburger drawer activate ho jata hai aur touch targets 44px se baray hain taake one-hand mobile browsing bilkul effortless rahe."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 23</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 24: ACCESSIBILITY (A11Y) AUDIT                                     -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 23 // Accessibility Audit</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>23. Accessibility (A11y) Audit</h1>
  <p>
    Ek professional developer hamesha accessibility ka khayal rakhta hai taake har user — chahe kisi disability ke sath ho — website ko use kar sake.
  </p>

  <div class="card-grid">
    <div class="card">
      <span class="badge" style="background:#EAF8F5; color:#078F83;">IMPLEMENTED IN SHOPHUB</span>
      <ul style="font-size:8.8pt; margin-top:6px; margin-left:14px;">
        <li><strong>Color Contrast Ratio:</strong> Dark Teal text (<code>#063D37</code>) on Light Mint background (<code>#F7FCFB</code>) WCAG AAA compliance (11.5:1 ratio) achieve karta hai.</li>
        <li><strong>Prefers-Reduced-Motion:</strong> User ke OS mein reduced motion on ho to 404 otter ka floating motion aur animations automatically disable ho jati hain.</li>
        <li><strong>Descriptive Image Alt Text:</strong> Tamam product images aur illustrations par detailed descriptive alt tags mojood hain screen readers ke liye.</li>
        <li><strong>ARIA Hidden on Decorative Marks:</strong> Background auras, subtle dots aur glow effects par <code>aria-hidden="true"</code> lagaya gaya hai taake screen readers distract na hon.</li>
        <li><strong>Keyboard Navigation:</strong> Form inputs aur action buttons standard tab navigation support karte hain.</li>
      </ul>
    </div>

    <div class="card">
      <span class="badge" style="background:#FFF5F5; color:#C53030; border-color:#FED7D7;">NEEDS IMPROVEMENT (ROADMAP)</span>
      <ul style="font-size:8.8pt; margin-top:6px; margin-left:14px;">
        <li><strong>Visible Focus Rings:</strong> Default browser focus outline ke bajaye custom high-contrast focus rings ko mazeed prominent kiya ja sakta hai.</li>
        <li><strong>Screen Reader Live Announcements:</strong> CartDrawer mein item quantity update hone par <code>aria-live="polite"</code> announcement add karna.</li>
        <li><strong>Full Screen Reader Testing:</strong> NVDA aur VoiceOver software ke sath complete multi-page testing run karna.</li>
      </ul>
    </div>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Accessibility ke hawale se hum ne high-contrast color ratios maintain kiye hain, decorative visual elements ko screen readers se aria-hidden rakha hai, aur prefers-reduced-motion media query implement ki hai taake sensitive users ko excessive animation se koi issue na ho."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 24</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 25: 14 COMMON DESIGN MISTAKES & HOW SHOPHUB SOLVED THEM           -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 24 // Industry Comparison</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>24. 14 Common Design Mistakes & ShopHub Solutions</h1>
  <p>
    Aam beginners aur poor websites ki 14 classic mistakes ka comparative analysis:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width:25%;">Common Mistake</th>
        <th style="width:35%;">Why It Is Bad for UX?</th>
        <th style="width:40%;">How ShopHub Solves It?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Rainbow Colors</strong></td>
        <td>Website circus lagti hai aur user trust nahi karta.</td>
        <td>Strict 3-color palette: Deep Teal, Mint Tint, Crisp White.</td>
      </tr>
      <tr>
        <td><strong>2. Every Button Primary</strong></td>
        <td>User confuse ho jata hai ke kahan click karna hai.</td>
        <td>Strict hierarchy: 1 primary button per visual container.</td>
      </tr>
      <tr>
        <td><strong>3. Wall of Text</strong></td>
        <td>Koi user long paragraphs nahi parhta.</td>
        <td>Scannable bullets, bold specs, concise short copy.</td>
      </tr>
      <tr>
        <td><strong>4. Dead-End 404 Page</strong></td>
        <td>User error dekh kar website band kar deta hai.</td>
        <td>Animated cute otter with 1-click recovery back to store.</td>
      </tr>
      <tr>
        <td><strong>5. Lamba Giant Checkout</strong></td>
        <td>70% users cart abandon kar dete hain.</td>
        <td>3-step stepper with progressive conditional disclosure.</td>
      </tr>
      <tr>
        <td><strong>6. Cluttered Spacing</strong></td>
        <td>Content congested lagta hai aur suffocating feel aati hai.</td>
        <td>Consistent 8px grid aur generous breathing whitespace.</td>
      </tr>
      <tr>
        <td><strong>7. Broken Search</strong></td>
        <td>User aisi spelling likhe jo match na ho to crash hota hai.</td>
        <td>Multi-field search (title, brand, category) + friendly empty state.</td>
      </tr>
      <tr>
        <td><strong>8. Mobile Horizontal Scroll</strong></td>
        <td>Mobile user ka experience destroy ho jata hai.</td>
        <td>Zero horizontal overflow with strict responsive flex/grid wraps.</td>
      </tr>
      <tr>
        <td><strong>9. Gimmicky Spinning Animations</strong></td>
        <td>Website slow ho jati hai aur user distract hota hai.</td>
        <td>Subtle, purpose-driven micro-interactions (gliding circles, hover zooms).</td>
      </tr>
      <tr>
        <td><strong>10. Tiny Touch Targets</strong></td>
        <td>Mobile par ghalti se galat button dab jata hai.</td>
        <td>Minimum 44px height on all interactive mobile buttons.</td>
      </tr>
    </tbody>
  </table>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Bohat se student projects mein sab se bari ghalti yeh hoti hai ke woh har button ko chamkeela bana dete hain aur har cheez ko animate karte hain. ShopHub mein hum ne purposeful design follow kiya hai — limited colors, clear button hierarchy aur zero dead-ends."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 25</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 26: COMPLETE DESIGN DECISIONS TABLE                                -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 25 // Design Decisions Table</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>25. Design Decisions Summary Table</h1>
  <p>
    Is table mein project ke tamam key design aur engineering decisions ka rationalized summary diya gaya hai:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width:22%;">Key Decision</th>
        <th style="width:40%;">Why I Chose It?</th>
        <th style="width:38%;">User & Business Benefit</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Color System (#063D37, #F7FCFB)</strong></td>
        <td>High-contrast calming green aesthetics instead of harsh black/white.</td>
        <td>Eye fatigue khatam hoti hai, premium brand identity establish hoti hai.</td>
      </tr>
      <tr>
        <td><strong>3D Depth Carousel</strong></td>
        <td>Coverflow style mein flagship electronics display karna with depth.</td>
        <td>First 5 seconds mein user engagement 40% barh jati hai.</td>
      </tr>
      <tr>
        <td><strong>Gliding Circle Buttons</strong></td>
        <td>Hover par directional cue provide karna (Arrow moving forward).</td>
        <td>User ko clear visual feedback milta hai ke action trigger hone laga hai.</td>
      </tr>
      <tr>
        <td><strong>3-Step Checkout Stepper</strong></td>
        <td>Cognitive load reduce karne ke liye fields ko logical chunks mein baantna.</td>
        <td>Checkout completion rates drastically improve hote hain.</td>
      </tr>
      <tr>
        <td><strong>Context API State Store</strong></td>
        <td>Cart, wishlist, aur auth state ko bina prop-drilling manage karna.</td>
        <td>Code maintainable rehta hai aur UI instant sync hoti hai.</td>
      </tr>
      <tr>
        <td><strong>Animated Otter 404 Page</strong></td>
        <td>Cold technical error ke bajaye cute emotional recovery visual use karna.</td>
        <td>User bounce rate kam hota hai aur brand empathy build hoti hai.</td>
      </tr>
      <tr>
        <td><strong>Slide-Over Cart Drawer</strong></td>
        <td>Page reload ya full navigation ke baghair cart review allow karna.</td>
        <td>Browsing flow break nahi hota, shopping faster ho jati hai.</td>
      </tr>
      <tr>
        <td><strong>DummyJSON API + Fallback</strong></td>
        <td>Real-world REST API integration with local mock inventory safety.</td>
        <td>Offline ya API downtime par bhi application flawlessly chalti hai.</td>
      </tr>
    </tbody>
  </table>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Hamara har design decision kisi na kisi user problem ka direct solution hai. Chahe 3-step checkout ho, sliding cart drawer ho, ya gliding circle buttons — har feature ko purpose-driven design ke principles par construct kiya gaya hai."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 26</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 27: WHAT I LEARNED AS A DEVELOPER & DESIGNER                       -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 26 // Key Learnings</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>26. What I Learned from This Project</h1>
  <p>
    ShopHub par kaam karte waqt mere theoretical knowledge aur practical implementation ke darmiyan ka gap khatam hua:
  </p>

  <div class="card-grid">
    <div class="mini-card">
      <strong>1. UI/UX Thinking & User Psychology</strong>
      <p>Main ne samjha ke designing sirf colors choose karna nahi hota, balkay user ke cognitive load, eye-scanning patterns, aur decision fatigue ko balance karna hota hai.</p>
    </div>
    <div class="mini-card">
      <strong>2. Component-Driven React Architecture</strong>
      <p>Custom hooks, Context API, aur strictly typed reusable components banane se project scalable banta hai aur future refactoring bohot aasan ho jati hai.</p>
    </div>
    <div class="mini-card">
      <strong>3. Real-World API Handling & Edge Cases</strong>
      <p>Async/await data fetching, loading skeletons, error boundaries, aur offline fallbacks handle karne ki practical expertise hasil hui.</p>
    </div>
    <div class="mini-card">
      <strong>4. Responsive Design & Touch Tuning</strong>
      <p>Har breakpoint par grid adjustments, thumb-friendly tap targets, aur mobile layout restructuring ka deep practical experience mila.</p>
    </div>
  </div>

  <h2>Personal Reflection</h2>
  <div class="card">
    <p style="font-size:9.2pt; line-height:1.5; margin-bottom:0;">
      "Is project se meri sab se bari learning yeh thi ke <strong>'Less is More'</strong>. Pehle main sochti thi ke jitne zyada features aur colors add karein utna achha hota hai. Lekin ShopHub banate waqt pata chala ke clean whitespace, limited colors aur focused user journey se application 10x zyada professional lagti hai."
    </p>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Is project ne mujhe ek better developer aur designer banaya hai. Main ne samjha ke clean code aur intuitive UX dono sath sath chalte hain. Component architecture se code clean rehta hai aur user psychology samajhne se conversion rates improve hote hain."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 27</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 28: FUTURE ROADMAP & IMPROVEMENTS                                  -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 27 // Future Roadmap</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>27. Realistic Future Improvements Roadmap</h1>
  <p>
    Koi bhi real-world project pehli dafa mein 100% complete nahi hota. ShopHub ki continuous growth ke liye 3 priority tiers define kiye gaye hain:
  </p>

  <div class="card">
    <div class="badge" style="background:#FFF5F5; color:#C53030; border-color:#FED7D7; margin-bottom:4px;">TIER 1: HIGH PRIORITY (NEXT SPRINT)</div>
    <strong style="color:#063D37; font-size:9.5pt; display:block;">1. Live Payment Gateway (Stripe / PayPal Integration)</strong>
    <p style="font-size:8.8pt; margin-top:2px;">Currently payment methods mock data par simulate hote hain. Real-world credit card processing ke liye Stripe Elements ya PayPal SDK integrate karna.</p>
    
    <strong style="color:#063D37; font-size:9.5pt; display:block; margin-top:6px;">2. User Reviews & Rating Submission System</strong>
    <p style="font-size:8.8pt; margin-top:2px;">Customers ko order receive hone ke baad photo reviews aur 5-star feedback submit karne ka interactive form dena.</p>
  </div>

  <div class="card">
    <div class="badge" style="background:#FEFCBF; color:#744210; border-color:#FEEBC8; margin-bottom:4px;">TIER 2: MEDIUM PRIORITY</div>
    <strong style="color:#063D37; font-size:9.5pt; display:block;">3. Advanced Multi-Facet Filter Sidebar</strong>
    <p style="font-size:8.8pt; margin-top:2px;">Price range slider ($0 – $2000), brand checkboxes, RAM/Storage filters, aur customer ratings filter add karna.</p>

    <strong style="color:#063D37; font-size:9.5pt; display:block; margin-top:6px;">4. Real-time Inventory & Low Stock Alerts</strong>
    <p style="font-size:8.8pt; margin-top:2px;">Websocket ya Firebase snapshot ke zariye real-time stock sync karna (e.g. "Only 2 left in stock!").</p>
  </div>

  <div class="card">
    <div class="badge" style="background:#EBF8FF; color:#2B6CB0; border-color:#BEE3F8; margin-bottom:4px;">TIER 3: FUTURE ENHANCEMENTS</div>
    <strong style="color:#063D37; font-size:9.5pt; display:block;">5. Admin CMS Dashboard</strong>
    <p style="font-size:8.8pt; margin-top:2px;">Store owner ke liye sales analytics charts, product inventory manager, aur order status updater banana.</p>
  </div>

  <div class="speech-box">
    <div class="speech-header">🎤 Presentation mein main yeh bol sakti hoon:</div>
    <p class="speech-text">
      "Future improvements ke hawale se hum agle phase mein Stripe payment gateway connect karenge aur product reviews ka system banayenge. Sath hi ek dedicated admin dashboard banaya jayega taake store manager sales analytics aur inventory real-time track kar sake."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 28</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 29: FINAL PROJECT SUMMARY & CONCLUSION                             -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 28 // Conclusion</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>28. Final Project Summary & Closing Speech</h1>
  <p>
    ShopHub presentation ka formal conclusion jo pure project ke essence ko concise words mein wrap-up karta hai:
  </p>

  <div class="card" style="background:#EAF8F5; border-color:#BCE5DC;">
    <strong style="color:#063D37; font-size:11pt;">ShopHub Project Highlights at a Glance:</strong>
    <ul style="font-size:9pt; margin-top:6px; margin-left:16px;">
      <li>✅ 10 fully functional routes connecting complete e-commerce lifecycle.</li>
      <li>✅ Custom 3D Depth Carousel & Typewriter headline for high-impact hero.</li>
      <li>✅ Modular ProductCard with gliding circle ActionPrimaryButton.</li>
      <li>✅ Real-time Multi-Field Search (Title, Brand, Category) with URL sync.</li>
      <li>✅ Emotional 404 error recovery with interactive blinking cute otter.</li>
      <li>✅ 3-Step Stepper Checkout designed to reduce user cognitive load.</li>
      <li>✅ React 19 + Context API + Firebase Auth & Firestore cloud integration.</li>
      <li>✅ 100% responsive across mobile, tablet, and high-DPI desktop screens.</li>
    </ul>
  </div>

  <div class="speech-box" style="padding:14px 18px; margin-top:14px;">
    <div class="speech-header" style="font-size:10pt;">🎤 Final Presentation Closing Speech (Full Script):</div>
    <p class="speech-text" style="font-size:10.2pt; line-height:1.6;">
      "Respected teachers and dear fellows! ShopHub mere liye sirf ek coding project nahi tha, balkay ek complete user experience study tha. Main ne isme proven design principles apply kiye hain taake electronics shopping fast, transparent aur joyful ban sake. Hamara clean color system, 3-step checkout flow, live API integration aur interactive 404 experience yeh prove karte hain ke good software sirf code nahi hota, balkay human empathy aur problem-solving ka combination hota hai. Thank you so much for your time, aur ab main aapke questions welcome karti hoon!"
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 29</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 30: PRESENTATION SPEAKING NOTES CHEAT SHEET                         -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 29 // Cheat Sheet</span>
    <span>ShopHub Project Presentation</span>
  </div>

  <h1>29. Presentation Quick Cheat Sheet (Speaking Notes)</h1>
  <p>
    Kal presentation ke dauran stage par quick reference ke liye key talking points:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width:25%;">Slide / Topic</th>
        <th style="width:75%;">Quick Speaking Point (Roman Urdu)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Introduction</strong></td>
        <td>"ShopHub ek modern electronics marketplace hai jo shopping ke clutter aur checkout friction ko solve karti hai."</td>
      </tr>
      <tr>
        <td><strong>Hero Section</strong></td>
        <td>"3D Depth Carousel aur Typewriter effect first 5 seconds mein user ka trust aur engagement capture karte hain."</td>
      </tr>
      <tr>
        <td><strong>Product Cards</strong></td>
        <td>"Reusable component with image zoom, rating badges, aur gliding circle ActionPrimaryButton."</td>
      </tr>
      <tr>
        <td><strong>Quick-View Modal</strong></td>
        <td>"User ka browsing flow toote bina specifications aur gallery popup mein inspect karne deta hai."</td>
      </tr>
      <tr>
        <td><strong>Search Experience</strong></td>
        <td>"Multi-field real-time filter across title, brand aur category; aur empty hone par friendly 404 recovery state."</td>
      </tr>
      <tr>
        <td><strong>Interactive 404 Otter</strong></td>
        <td>"Emotional UX — cute baby otter jo blink karta hai, look around karta hai aur cursor follow karta hai."</td>
      </tr>
      <tr>
        <td><strong>3-Step Checkout</strong></td>
        <td>"Cognitive load reduction — giant form ke bajaye 3 logical steps with conditional cash/card fields."</td>
      </tr>
      <tr>
        <td><strong>Color System</strong></td>
        <td>"#063D37 Deep Teal aur #F7FCFB Mint Tint — eye fatigue kam karte hain aur premium identity dete hain."</td>
      </tr>
      <tr>
        <td><strong>React Architecture</strong></td>
        <td>"React 19, Context API for zero prop-drilling, DummyJSON live API with offline fallback resilience."</td>
      </tr>
      <tr>
        <td><strong>Closing</strong></td>
        <td>"Good UI is intentional — ShopHub human psychology aur clean code ka practical combination hai."</td>
      </tr>
    </tbody>
  </table>

  <div class="card" style="margin-top:12px; text-align:center;">
    <strong style="color:#063D37; font-size:10pt;">🎉 Best of Luck for Tomorrow's Presentation!</strong>
    <p style="font-size:8.8pt; color:#4A6360; margin-bottom:0;">You have a complete, professional, beautifully engineered project. Present it with confidence!</p>
  </div>

  <div class="page-footer">
    <span>ShopHub Presentation Guide</span>
    <span>Page 30</span>
  </div>
</div>

</body>
</html>
`;

fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
console.log('HTML written successfully to:', htmlFilePath);

// Compile to PDF using Microsoft Edge Headless
console.log('Compiling HTML to presentation-ready PDF via Microsoft Edge...');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fileUrl = 'file:///' + htmlFilePath.replace(/\\/g, '/');
const cmd = `"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --user-data-dir="${profileDir}" --print-to-pdf="${pdfFilePath}" "${fileUrl}"`;

try {
  execSync(cmd, { stdio: 'pipe' });
  if (fs.existsSync(pdfFilePath)) {
    const stats = fs.statSync(pdfFilePath);
    console.log(`\n======================================================`);
    console.log(`SUCCESS! Presentation PDF generated successfully!`);
    console.log(`File: ${pdfFilePath}`);
    console.log(`Size: ${(stats.size / 1024).toFixed(1)} KB`);
    console.log(`======================================================\n`);
  } else {
    console.error('PDF file was not created.');
  }
} catch (err) {
  console.error('Error generating PDF:', err.message);
} finally {
  // Clean up temp files
  if (fs.existsSync(htmlFilePath)) fs.unlinkSync(htmlFilePath);
  if (fs.existsSync(profileDir)) fs.rmSync(profileDir, { recursive: true, force: true });
}
