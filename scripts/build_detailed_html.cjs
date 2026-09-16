const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const htmlFilePath = path.join(rootDir, 'detailed_guide_temp.html');
const pdfFilePath = path.join(rootDir, 'ShopHub_Complete_Detailed_Presentation_Guide.pdf');
const profileDir = path.join(rootDir, 'edge_detailed_profile');

console.log('Building Complete Detailed Presentation Guide HTML document...');

const p = (str) => str;

const htmlContent = `<!DOCTYPE html>
<html lang="ur">
<head>
<meta charset="UTF-8">
<title>ShopHub - Complete Detailed Section-by-Section Presentation Guide</title>
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
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    color: #102F2C;
    background-color: #FFFFFF;
    line-height: 1.5;
    font-size: 10.5pt;
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
    margin-bottom: 14px;
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
    border-top: 1px solid #E0F2EE;
    padding-top: 6px;
    font-size: 8pt;
    color: #66727A;
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-size: 18pt;
    font-weight: 800;
    color: #063D37;
    margin-bottom: 8px;
    line-height: 1.2;
    letter-spacing: -0.3px;
  }

  h2 {
    font-size: 12pt;
    font-weight: 800;
    color: #063D37;
    margin-top: 10px;
    margin-bottom: 6px;
    border-left: 3.5px solid #0D7E73;
    padding-left: 8px;
  }

  p {
    font-size: 9.8pt;
    color: #2D4744;
    margin-bottom: 8px;
    line-height: 1.5;
  }

  ul, ol {
    margin-left: 18px;
    margin-bottom: 8px;
    font-size: 9.5pt;
    color: #2D4744;
  }

  li {
    margin-bottom: 4px;
    line-height: 1.45;
  }

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

  .card {
    background: #F7FCFB;
    border: 1px solid #D6EFE9;
    border-radius: 10px;
    padding: 10px 14px;
    margin-bottom: 10px;
  }

  .section-box {
    background: #FFFFFF;
    border: 1.5px solid #078F83;
    border-radius: 10px;
    padding: 11px 15px;
    margin-top: 8px;
    margin-bottom: 12px;
    box-shadow: 0 4px 12px rgba(7, 143, 131, 0.06);
  }

  .step-label {
    font-size: 8.5pt;
    font-weight: 800;
    color: #063D37;
    text-transform: uppercase;
    margin-top: 6px;
    margin-bottom: 2px;
    display: block;
  }

  .step-content {
    font-size: 9.5pt;
    color: #1A3633;
    line-height: 1.48;
    margin-bottom: 4px;
  }

  .speech-banner {
    background: #063D37;
    color: #FFFFFF;
    border-radius: 8px;
    padding: 8px 12px;
    margin-top: 6px;
    margin-bottom: 6px;
    font-size: 9.2pt;
    line-height: 1.45;
  }

  .speech-banner strong {
    color: #7DD8CF;
    display: block;
    font-size: 8pt;
    text-transform: uppercase;
    margin-bottom: 2px;
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
    font-size: 28pt;
    font-weight: 900;
    color: #063D37;
    letter-spacing: -1px;
  }

  .cover-brand span {
    color: #0D7E73;
  }

  .cover-title {
    font-size: 28pt;
    font-weight: 900;
    color: #063D37;
    line-height: 1.18;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .cover-subtitle {
    font-size: 13.5pt;
    color: #0D7E73;
    font-weight: 700;
    margin-bottom: 18px;
  }

  .cover-desc {
    font-size: 10.5pt;
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
    font-size: 9.5pt;
    color: #063D37;
    font-weight: 700;
  }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="page">
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-brand">Shop<span>Hub</span></div>
      <span class="badge" style="background:#063D37; color:#FFFFFF; border:none;">COMPLETE SECTION-BY-SECTION GUIDE</span>
    </div>

    <div style="margin: auto 0;">
      <span class="badge" style="margin-bottom: 12px;">FULL COMPREHENSIVE PRESENTATION MANUAL</span>
      <h1 class="cover-title">ShopHub — Section-by-Section Student Presentation Manual</h1>
      <div class="cover-subtitle">Detailed Explanation &amp; Speaking Scripts for Every Single Website Component</div>
      <p class="cover-desc">
        Yeh PDF document ShopHub website ke ek ek individual section (Mini Header, Main Header, 3D Hero Carousel, Categories, Featured Slider, Flash Sale Banner, Smart Digital Life Cards, Product Cards, Quick View Modal, Cart Drawer, Search Engine, Animated Otter 404, 3-Step Stepper Checkout, Wishlist, Orders History, Auth Pages, Color System, Button Hierarchy, Code Architecture) ko exhaustive detail mein explain karta hai with ready-to-speak Roman Urdu scripts.
      </p>
    </div>

    <div class="cover-footer">
      <div class="meta-col">
        <strong>Target</strong>
        <span>Complete Teacher Viva &amp; Demonstration</span>
      </div>
      <div class="meta-col">
        <strong>Coverage</strong>
        <span>All 20+ Website Components &amp; Pages</span>
      </div>
      <div class="meta-col">
        <strong>Format</strong>
        <span>Easy Roman Urdu + English Tech Terms</span>
      </div>
      <div class="meta-col">
        <strong>Status</strong>
        <span>100% Production Ready</span>
      </div>
    </div>
  </div>
</div>

<!-- PAGE 2: OPENING SPEECH & SECTION 1 - MINI HEADER & MAIN HEADER -->
<div class="page">
  <div class="page-header">
    <span>Opening &amp; Section 01: Header System</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Opening Script &amp; Section 01: Dual Header System</h1>

  <div class="card" style="background:#063D37; color:#FFFFFF;">
    <strong style="color:#7DD8CF; font-size:9.5pt; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:4px;">
      🎙️ Presentation Opening Speech (Start like this):
    </strong>
    <p style="color:#F0FDFB; font-size:10pt; margin-bottom:0;">
      "Assalam-o-Alaikum Sir! Main ne ShopHub ke naam se ek complete electronics e-commerce website develop ki hai. Ab main aapko website ke har ek section ko step by step explain karungi ke maine kya implement kiya, ye design decisions kyun liye, aur technical level par isko kaise build kiya."
    </p>
  </div>

  <h2>1. Top Mini Announcement Header</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Maine top par 32px height ka Top Mini Announcement Bar banaya jisme shipping policy ("Free shipping on orders over $150") aur support phone number hai.</div>
    
    <span class="step-label">MAINE YE KYUN KIYA?</span>
    <div class="step-content">"Sab se upar mini header hai jisme secondary information hai. Maine is mini header ko sticky nahi rakha, kyun ke jab user scroll karta hai to usko secondary info har waqt screen par dikhane ki zarurat nahi hoti. Scroll karne par mini header disappear ho jata hai aur main header rehta hai."</div>

    <span class="step-label">USER BENEFIT:</span>
    <div class="step-content">Scroll karte waqt vertical height waste nahi hoti aur visual clutter kam hota hai.</div>
  </div>

  <h2>2. Main Sticky Navigation Header</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Maine main navigation bar ko <code>sticky top-0 z-40 backdrop-blur-md</code> banaya. Isme trimmed ShopHub logo, Navigation links (Home, Products, Wishlist), Compact Auto-Expanding Search Bar, Live Wishlist &amp; Cart Badges, aur Primary Account Button (&lt;User /&gt; Subrah) shamil hain.</div>
    
    <span class="step-label">TECHNICAL DETAIL:</span>
    <div class="step-content">Context API se live <code>wishlist.length</code> aur <code>totalCartItems</code> badges real-time render hote hain bina kisi page refresh ke.</div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, main header sticky hai taake user website par kahin bhi ho, woh 1 click mein cart, wishlist ya products par jump kar sake."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 2</span>
  </div>
</div>

<!-- PAGE 3: SECTION 2 - COMPACT SEARCH BAR & SECTION 3 - HERO SECTION -->
<div class="page">
  <div class="page-header">
    <span>Sections 02 &amp; 03: Search &amp; Hero</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 02: Search Bar &amp; Section 03: Hero Section</h1>

  <h2>3. Compact Auto-Expanding Search Bar</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Maine header ke search bar ko compact (chota) rakha hai jo hover ya focus hone par smoothly right-side par expand hota hai.</div>
    
    <span class="step-label">MAINE YE KYUN KIYA?</span>
    <div class="step-content">"Maine search bar ko permanently wide nahi rakha. Maine isko compact rakha hai aur yeh hover/focus par expand hota hai. Iska purpose header ko clean aur spacious rakhna hai. Agar search bar wide hota to logo aur navigation ke darmiyan unnecessary space issue hota. Is interaction se user ko search bhi milti hai aur header bhi clean rehta hai."</div>

    <span class="step-label">TECHNICAL IMPLEMENTATION:</span>
    <div class="step-content">React state <code>isSearchFocused</code> se Tailwind width class <code>w-36</code> se <code>w-64</code> expand hoti hai with <code>transition-all duration-300</code>.</div>
  </div>

  <h2>4. Hero Section &amp; 3D Depth Carousel</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Hero section mein left side par Typewriter cursor headline, supporting text, dual action buttons (Primary Gliding Button &amp; Secondary Underline Button), 4 trust pills hain; jabke right side par 3D Depth Coverflow Carousel chal raha hai.</div>
    
    <span class="step-label">MAINE YE KYUN KIYA? (USER JOURNEY)</span>
    <div class="step-content">"User jab website open karta hai to sab se pehle hero dekhta hai, isliye maine yahan website ka main purpose immediately communicate kiya. 3D Depth Carousel top flagship products (MacBook Pro, iPhone 13 Pro) ko 3D perspective mein move karwata hai jis se landing page par hi brand trust build hota hai."</div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, hero section hamare platform ka first 3-second visual impression hai jo Typewriter text aur 3D carousel se brand identity create karta hai."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 3</span>
  </div>
</div>

<!-- PAGE 4: SECTION 4 - CATEGORIES & SECTION 5 - FEATURED CAROUSEL -->
<div class="page">
  <div class="page-header">
    <span>Sections 04 &amp; 05: Categories &amp; Featured</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 04: Categories &amp; Section 05: Featured Carousel</h1>

  <h2>5. Product Category Section (CategorySection.tsx)</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Maine categories ko grid chips ke form mein display kiya hai (Smartphones, Laptops, Audio Gear, Wearables, Gaming) with item count badges.</div>
    
    <span class="step-label">MAINE YE KYUN KIYA?</span>
    <div class="step-content">"ShopHub ek e-commerce website hai, isliye Products menu aur Categories naturally important hain. Maine products ko categories mein organize kiya taake user ko manually hazaron products browse na karne padein aur woh required category tak quickly pohanch sake."</div>

    <span class="step-label">USER BENEFIT:</span>
    <div class="step-content">Category pill click karne par page target section par smooth scroll karta hai aur Filtered catalogue automatically display ho jata hai.</div>
  </div>

  <h2>6. Featured Products Auto-Scrolling Coverflow Carousel</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Top 16 featured products ka auto-scrolling 3D coverflow slider banaya jisme active product card center mein scale-up hota hai with Quick View, Wishlist, aur Add to Cart actions.</div>
    
    <span class="step-label">TECHNICAL IMPLEMENTATION:</span>
    <div class="step-content">Custom React carousel interval with pause-on-hover state taake user scroll karne ke dauran easily product inspect kar sake.</div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, Featured Carousel hamari top-selling items ko 3D coverflow view mein dikhata hai jahan se direct product preview liya ja sakta hai."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 4</span>
  </div>
</div>

<!-- PAGE 5: SECTION 6 - FLASH SALE BANNER & SECTION 7 - SMART DIGITAL LIFE -->
<div class="page">
  <div class="page-header">
    <span>Sections 06 &amp; 07: Banners &amp; Lifestyle</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 06: Flash Sale Banner &amp; Section 07: Smart Digital Life</h1>

  <h2>7. Promotional Flash Sale Banner (PromoBannerSection.tsx)</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">SonicPro Wireless Headphones ke liye dark teal background (<code>#063D37</code>) par High-impact flash sale banner banaya with 40% OFF discount badge aur live Countdown Timer (Hours, Minutes, Seconds).</div>
    
    <span class="step-label">MAINE YE KYUN KIYA? (PSYCHOLOGY)</span>
    <div class="step-content">Countdown timer user mein FOMO (Fear Of Missing Out) create karta hai. User purchase decision delay nahi karta aur deals capture karta hai.</div>
  </div>

  <h2>8. Smart Digital Life Section (SmartDigitalLifeSection.tsx)</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Homepage par 3 Lifestyle category cards banaye: <em>Laptops &amp; Computers</em>, <em>Personal Care</em> (with verified Unsplash image), aur <em>Home &amp; Furniture</em>.</div>
    
    <span class="step-label">MAINE YE KYUN KIYA?</span>
    <div class="step-content">User ko products sirf tech boxes ke roop mein nahi balkay daily lifestyle utility ke tor par visualize karwana.</div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, Flash Sale banner FOMO trigger karta hai aur Smart Digital Life cards user ko product collections ki real-life utility dikhate hain."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 5</span>
  </div>
</div>

<!-- PAGE 6: SECTION 8 - PRODUCT CARDS & BUTTON HIERARCHY -->
<div class="page">
  <div class="page-header">
    <span>Section 08: Product Card Architecture</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 08: Product Card Architecture &amp; Button Hierarchy</h1>

  <h2>9. Modular Product Card Component (ProductCard.tsx)</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Maine reusable ProductCard component design kiya jisme image zoom on hover, discount badges, price strike-through (<code>$549</code> vs <code>$699</code>), 5-star rating scores, Quick View (Eye icon), Wishlist heart toggle, aur Add to Cart button shamil hain.</div>
    
    <span class="step-label">MAINE YE KYUN KIYA? (BUTTON HIERARCHY)</span>
    <div class="step-content">"Main actions ko stronger visual treatment diya gaya hai aur secondary actions ko subtle rakha gaya hai, taake user ko clear ho ke next important action kya hai. Add to Cart primary action hai isliye iska visual weight zyada hai (filled teal button with gliding circle animation). Wishlist secondary action hai isliye usko corner par subtle heart icon rakha gaya hai."</div>

    <span class="step-label">TECHNICAL IMPLEMENTATION:</span>
    <div class="step-content">Card hover hone par image <code>scale-105</code> transition 300ms follow karti hai. Add to Cart click karne par Context API global notification toast bar trigger hota hai.</div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, ProductCard hamara sab se reusable component hai jisme primary action 'Add to Cart' ko high visual weight diya gaya hai."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 6</span>
  </div>
</div>

<!-- PAGE 7: SECTION 9 - PRODUCT DETAILS PAGE & QUICK VIEW MODAL -->
<div class="page">
  <div class="page-header">
    <span>Section 09: Product Details &amp; Modal</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 09: Full Product Details Page &amp; Quick-View Modal</h1>

  <h2>10. Full Product Details Page (/products/:id)</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Dedicated route /products/:id jisme multi-image gallery thumbnail switcher, category breadcrumb, live stock badge, specs table, quantity picker, Buy Now &amp; Add to Cart buttons, aur Related Products recommendations shamil hain.</div>
    
    <span class="step-label">MAINE YE KYUN KIYA?</span>
    <div class="step-content">High-ticket electronics (jaise $1,999 ka MacBook) khareedne se pehle user ko technical specs inspect karni hoti hain. Related Products section same category ke alternative models compare karne mein help karta hai.</div>
  </div>

  <h2>11. Quick-View Modal (ProductDetailsModal.tsx)</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA &amp; KYUN KIYA?</span>
    <div class="step-content">User ko har dafa naye page par jaane ki zarurat nahi parti. Modal click karne par backdrop blur ke sath popup open hota hai jahan se instant gallery preview aur add-to-cart ho sakta hai.</div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, Details Page high-ticket items ke liye full specifications deta hai, jabke Quick View Modal fast browsing allow karta hai."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 7</span>
  </div>
</div>

<!-- PAGE 8: SECTION 10 - CART DRAWER & CART PAGE -->
<div class="page">
  <div class="page-header">
    <span>Section 10: Cart Systems</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 10: Persistent Cart Drawer &amp; Full Cart Page</h1>

  <h2>12. Slide-Over Cart Drawer (CartDrawer.tsx)</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Header ke cart icon click karne par right side se smooth slide-over drawer open hota hai with backdrop blur.</div>
    
    <span class="step-label">MAINE YE KYUN KIYA?</span>
    <div class="step-content">"Cart shopping journey ka core part hai. Maine Cart ko Header mein 1-click persistent placement par rakha hai. Drawer user ka browsing flow toote bina item quantities adjust karne, subtotal dekhne, aur free shipping progress bar check karne deta hai."</div>

    <span class="step-label">FREE SHIPPING PROGRESS BAR (INCENTIVE):</span>
    <div class="step-content">Progress bar dikhati hai ke "$X mazeed add karein free shipping ke liye". Yeh e-commerce psychology Average Order Value (AOV) barhati hai.</div>
  </div>

  <h2>13. Full Cart Page (CartPage.tsx)</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Full-width cart overview page jisme order summary breakdown, promo coupon field, aur Proceed to Checkout CTA button hai.</div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, Cart Drawer user ka browsing flow preserve karta hai aur free shipping meter customer ko extra purchase ke liye motivate karta hai."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 8</span>
  </div>
</div>

<!-- PAGE 9: SECTION 11 - WISHLIST SYSTEM & ORDERS HISTORY -->
<div class="page">
  <div class="page-header">
    <span>Section 11: Wishlist &amp; Orders</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 11: Wishlist Table &amp; Orders History</h1>

  <h2>14. Wishlist Page (WishlistPage.tsx) — Table Layout</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Maine wishlist ko reference table design par banaya hai: Header row (Product Title, Unit Price, Stock Status, Action), Green In-Stock badges, Move to Cart buttons, Clear Wishlist option, aur Shareable Wishlist Link Bar.</div>
    
    <span class="step-label">MAINE YE KYUN KIYA?</span>
    <div class="step-content">"Agar customer ko koi product pasand aa jaye lekin woh us waqt purchase nahi karna chahta, to woh us product ko wishlist mein save kar sakta hai. Iska benefit ye hai ke customer ko baad mein woh product dobara search nahi karna padega."</div>
  </div>

  <h2>15. Customer Orders Page (OrdersPage.tsx)</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA &amp; TECHNICAL DETAIL?</span>
    <div class="step-content">Firebase Firestore database se user ke tamam placed orders real-time fetch hote hain through <code>onSnapshot</code>. Order ID, date, status pill ("Confirmed" / "Shipped"), aur purchased items summary dikhti hai.</div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, Wishlist customer drop-off rokti hai aur Orders page Firebase Firestore database se real-time purchase history sync karta hai."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 9</span>
  </div>
</div>

<!-- PAGE 10: SECTION 12 - SEARCH ENGINE & ANIMATED OTTER 404 -->
<div class="page">
  <div class="page-header">
    <span>Section 12: Search Engine &amp; 404</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 12: Multi-Field Search Engine &amp; Animated Otter 404</h1>

  <h2>16. Multi-Field Live Search Engine</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Search input query product Title, Brand Name (Apple, Samsung, Sony), aur Category Name teeno fields par real-time filter hoti hai with URL params sync (<code>?search=macbook</code>).</div>
    
    <span class="step-label">MAINE YE KYUN KIYA?</span>
    <div class="step-content">User ko exact product title yaad na bhi ho, woh sirf brand name ("Sony") likh kar headphones aur TVs discover kar sakta hai.</div>
  </div>

  <h2>17. 404 &amp; Empty Search Experience (AnimatedOtter.tsx)</h2>
  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA?</span>
    <div class="step-content">Jab search mein item na mile ya invalid URL ho, to cold error ke bajaye 3D photo-realistic cute sad baby otter character render hota hai.</div>
    
    <span class="step-label">ANIMATION &amp; RECOVERY UX:</span>
    <div class="step-content">Otter SVG overlay ke zariye har 2.8s se 6.2s baad natural organic blinking karta hai, aankhon se look-around karta hai, cursor follow karta hai, aur Reset Filters / Back to Home CTAs deta hai.</div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, hamara 404 experience emotional UX par based hai — animated otter character error ko friendly banata hai aur user ko 1 click mein recovery rasta deta hai."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 10</span>
  </div>
</div>

<!-- PAGE 11: SECTION 13 - CHECKOUT STEPPER FLOW -->
<div class="page">
  <div class="page-header">
    <span>Section 13: 3-Step Checkout</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 13: 3-Step Linear Stepper Checkout (CheckoutPage.tsx)</h1>

  <div class="section-box">
    <span class="step-label">1. MAINE KYA KIYA?</span>
    <div class="step-content">
      Maine checkout ko 3-Step Linear Stepper mein divide kiya hai:
      <ul>
        <li><strong>Step 1: Contact</strong> — Full Name, Email, Phone Number.</li>
        <li><strong>Step 2: Delivery</strong> — Address, City, Postal Code.</li>
        <li><strong>Step 3: Payment</strong> — Payment Method Tabs (Cash on Delivery | Bank Card | PayPal) + Order Summary sidebar.</li>
      </ul>
    </div>
    
    <span class="step-label">2. MAINE YE KYUN KIYA? (COGNITIVE LOAD REDUCTION)</span>
    <div class="step-content">
      <strong>Cognitive Load Reduction:</strong> Agar 15 fields ek sath ek lamba form ban kar aayein to 70% users checkout chhor kar bhaag jaate hain. 3-step stepper information ko chote logical chunks mein baantta hai. Step 1 complete karte hi user ko accomplishment mehsoos hoti hai aur checkout abandonment khatam ho jata hai.
    </div>

    <span class="step-label">3. CONDITIONAL FIELD RENDERING:</span>
    <div class="step-content">
      Jab user 'Cash on Delivery' select karta hai to Card Number aur CVV fields dynamically disappear ho jaati hain. Unnecessary fields ko hide rakhna UI ko simple rakhta hai.
    </div>

    <span class="step-label">4. TECHNICAL IMPLEMENTATION:</span>
    <div class="step-content">
      Place Order click karne par unique Order ID generate hota hai, order document Firebase Firestore mein save hota hai, aur cart automatically clear ho jaati hai.
    </div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, Checkout par Cognitive Load Reduction apply kiya hai — 3-step stepper aur conditional cash/card fields checkout abandonment ko minimum karti hain."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 11</span>
  </div>
</div>

<!-- PAGE 12: SECTION 14 - AUTHENTICATION PAGES (LOGIN & SIGNUP) -->
<div class="page">
  <div class="page-header">
    <span>Section 14: Auth Pages</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 14: Light Premium Authentication Pages (LoginPage.tsx &amp; SignupPage.tsx)</h1>

  <div class="section-box">
    <span class="step-label">1. MAINE KYA KIYA?</span>
    <div class="step-content">
      Maine Login aur Signup pages ko 2-column Light Premium Layout mein redesign kiya hai:
      <ul>
        <li><strong>Left Column (Form):</strong> Clean white background, ShopHub logo, 1px subtle border inputs with Mail/Lock/User icons, Password Eye toggle, Primary Blue CTA (<code>#2563EB</code>), "OR" divider, Continue with Google button.</li>
        <li><strong>Right Column (Showcase):</strong> Soft Light Blue background (<code>#F0F9FF</code>), "HARDWARE STORE" badge, *"Everything you need for a smarter tomorrow"*, real Lenovo ThinkPad laptop photograph, compact featured card (<code>$549.00</code>, 4.9 star), aur 3 bottom trust benefits.</li>
      </ul>
    </div>
    
    <span class="step-label">2. MAINE YE KYUN KIYA?</span>
    <div class="step-content">
      Heavy dark green ya navy panels auth page par suffocating lagte hain. Light premium theme SaaS cleanliness aur real commercial hardware brand identity generate karti hai. Unnecessary fake demo credentials ko hata diya gaya hai taake production-ready site feel aaye.
    </div>

    <span class="step-label">3. TECHNICAL IMPLEMENTATION:</span>
    <div class="step-content">
      Firebase Authentication SDK (<code>signInWithEmailAndPassword</code>, <code>createUserWithEmailAndPassword</code>) se authenticated session active hota hai.
    </div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, Login aur Signup ko light premium theme par design kiya hai jahan left side par clean form hai aur right side par ThinkPad hardware showcase."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 12</span>
  </div>
</div>

<!-- PAGE 13: SECTION 15 - COLOR SYSTEM & DESIGN PSYCHOLOGY -->
<div class="page">
  <div class="page-header">
    <span>Section 15: Color System</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 15: Color Palette &amp; Visual Psychology</h1>

  <div class="section-box">
    <span class="step-label">MAINE KYA KIYA &amp; KYUN KIYA?</span>
    <div class="step-content">
      Maine intentional color system construct kiya hai:
    </div>

    <table style="width:100%; border-collapse:collapse; margin-top:6px; font-size:8.5pt;">
      <thead>
        <tr style="background:#063D37; color:white;">
          <th style="padding:6px;">Color Code</th>
          <th style="padding:6px;">Name</th>
          <th style="padding:6px;">Usage</th>
          <th style="padding:6px;">Psychology Rationale</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>#063D37</code></td>
          <td>Deep Teal</td>
          <td>Primary Headings</td>
          <td>Pure black se behtar soft dark green eye fatigue rokti hai.</td>
        </tr>
        <tr>
          <td><code>#078F83</code> / <code>#0D7E73</code></td>
          <td>Primary Teal</td>
          <td>Buttons &amp; Badges</td>
          <td>Vibrant action color jo user ko CTA buttons ki taraf drag karta hai.</td>
        </tr>
        <tr>
          <td><code>#2563EB</code></td>
          <td>ShopHub Blue</td>
          <td>Auth &amp; Accents</td>
          <td>Technology, security aur enterprise trust establish karta hai.</td>
        </tr>
        <tr>
          <td><code>#F7FCFB</code></td>
          <td>Mint Canvas</td>
          <td>Page Background</td>
          <td>Zero glare off-white canvas jo product photos ko pop-out hone deta hai.</td>
        </tr>
      </tbody>
    </table>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, colors main ne visual psychology ke mutabiq chuney hain — Deep Teal, Primary Accent, aur Light Canvas zero eye strain ensure karte hain."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 13</span>
  </div>
</div>

<!-- PAGE 14: SECTION 16 - BUTTON HIERARCHY & MICRO-INTERACTIONS -->
<div class="page">
  <div class="page-header">
    <span>Section 16: Button System</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 16: Button Hierarchy &amp; Micro-Interactions System</h1>

  <div class="section-box">
    <span class="step-label">1. ActionPrimaryButton (AnimatedButtons.tsx)</span>
    <div class="step-content">
      Filled solid teal background (<code>#078F83</code>). Mouse hover hone par right-side ka white circle left-to-right smoothly glide karta hai through dynamic width calculation. Arrow icon forward move karta hai to give directional feedback.
    </div>

    <span class="step-label">2. ActionSecondaryButton</span>
    <div class="step-content">
      Transparent ghost button with 45-degree diagonal arrow (<code>ArrowUpRight</code>). Hover hone par text right shift hota hai aur left-to-right underline expand hoti hai (<code>scale-x-100</code>).
    </div>

    <span class="step-label">3. Header User Account Button (&lt;User /&gt; Subrah)</span>
    <div class="step-content">
      Logged-in state mein account button par Primary Button styling apply ki gayi hai (filled primary teal background, white text, white user icon) to maintain visual consistency.
    </div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, buttons par visual weight rule apply kiya gaya hai: Primary actions par gliding circle animation hai aur secondary actions par ghost underline."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 14</span>
  </div>
</div>

<!-- PAGE 15: SECTION 17 - TECHNICAL ARCHITECTURE & CODE -->
<div class="page">
  <div class="page-header">
    <span>Section 17: Technical Architecture</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 17: Technical Architecture &amp; Code Organization</h1>

  <div class="section-box">
    <span class="step-label">1. COMPONENT-DRIVEN REACT ARCHITECTURE:</span>
    <div class="step-content">
      "Maine components ko separate rakha taake code reusable aur manageable rahe. Agar header mein change karna ho to poori website mein manually same code repeat karne ki zarurat na ho."
    </div>

    <span class="step-label">2. CENTRALIZED STATE (REACT CONTEXT API):</span>
    <div class="step-content">
      <code>StoreContext.tsx</code> Cart, Wishlist, User Auth, Orders, aur Search Query state ko single centralized store mein manage karta hai without any prop-drilling.
    </div>

    <span class="step-label">3. HYBRID DATA LAYER:</span>
    <div class="step-content">
      Live DummyJSON REST API (<code>fetchAllDummyJsonProducts</code>) 100+ items fetch karta hai. Internet breakdown hone par <code>mockData.ts</code> local inventory load hoti hai taake app 100% resilient rahe.
    </div>

    <span class="step-label">4. FIREBASE AUTH &amp; FIRESTORE:</span>
    <div class="step-content">
      User authentication aur completed checkout orders Firestore cloud database par persist hote hain.
    </div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, technical level par app React 19, Context API, DummyJSON live API, aur Firebase Firestore cloud database par based hai."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 15</span>
  </div>
</div>

<!-- PAGE 16: SECTION 18 - RESPONSIVE DESIGN STRATEGY -->
<div class="page">
  <div class="page-header">
    <span>Section 18: Responsive Strategy</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 18: Responsive Strategy Across Mobile, Tablet &amp; Desktop</h1>

  <div class="section-box">
    <span class="step-label">1. MOBILE-FIRST BREAKPOINT ADAPTATION:</span>
    <div class="step-content">
      60% traffic mobile devices se aata hai. ShopHub har screen size par perfectly adapt hota hai:
      <ul>
        <li><strong>Desktop (> 1024px):</strong> 4-column product grid, 3D Coverflow carousel, 2-column auth layouts.</li>
        <li><strong>Tablet (640px - 1024px):</strong> 2-column grid, compact spacing, adaptive sidebars.</li>
        <li><strong>Mobile (< 640px):</strong> Single-column vertical stack, mobile hamburger drawer navigation, minimum 44px finger-friendly tap targets, zero horizontal scroll.</li>
      </ul>
    </div>

    <span class="step-label">2. TOUCH TUNING:</span>
    <div class="step-content">
      Mobile screen par swipeable carousels, backdrop blur drawers, aur large touch targets provide kiye gaye hain.
    </div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, responsive strategy mein mobile par layout single column stack ho jata hai aur touch targets 44px se baray hain taake mobile use easy rahe."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 16</span>
  </div>
</div>

<!-- PAGE 17: SECTION 19 - LIVE DEMO USER JOURNEY & VIVA GUIDE -->
<div class="page">
  <div class="page-header">
    <span>Section 19: Live Demo &amp; Viva</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 19: End-to-End Live Demo Sequence for Teacher</h1>

  <div class="section-box">
    <span class="step-label">LIVE DEMO STEP-BY-STEP SEQUENCE:</span>
    <div class="step-content" style="line-height:1.6;">
      <strong>Step 1 (Homepage):</strong> <code>http://localhost:3000</code> open karein → Hero section mein Typewriter text aur 3D Depth Carousel dikhayein.
      <br>
      <strong>Step 2 (Categories):</strong> Category pill 'Laptops' click karein → Page smooth scroll karke filtered items par aata hai.
      <br>
      <strong>Step 3 (Search Bar):</strong> Top header search bar par hover/click karke expand bar mein "Apple" write karein → Live query filter dikhayein.
      <br>
      <strong>Step 4 (Quick View Modal):</strong> Card par Eye icon click karke <code>ProductDetailsModal</code> open karein.
      <br>
      <strong>Step 5 (Cart &amp; Wishlist):</strong> Add to cart click karke Slide-over Cart Drawer open karein with free shipping meter.
      <br>
      <strong>Step 6 (404 Otter):</strong> Invalid link <code>http://localhost:3000/xyz</code> open karke animated blinking cute otter character dikhayein.
      <br>
      <strong>Step 7 (3-Step Checkout):</strong> Checkout page par Contact → Delivery → Payment (Cash on Delivery selection) test karwayein!
    </div>

    <div class="speech-banner">
      <strong>🎤 Presentation Script:</strong>
      "Sir, yeh hamara complete live user flow hai jo landing se lekar order placement aur error recovery tak smoothly execute hota hai."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 17</span>
  </div>
</div>

<!-- PAGE 18: SECTION 20 - RECOMMENDED IMPROVEMENTS & CLOSING -->
<div class="page">
  <div class="page-header">
    <span>Section 20: Future Roadmap &amp; Closing</span>
    <span>ShopHub Detailed Presentation Guide</span>
  </div>

  <h1>Section 20: Recommended Improvements &amp; Final Conclusion</h1>

  <h2>Future Improvements Roadmap (Self-Evaluation for Teacher)</h2>
  <div class="card">
    <strong style="color:#063D37;">1. Stripe Live Payment Gateway Integration</strong>
    <p style="font-size:8.8pt; margin-top:2px;">Real credit card transactions process karne ke liye Stripe SDK connect karna.</p>
    
    <strong style="color:#063D37; display:block; margin-top:4px;">2. User Review &amp; Photo Rating Form</strong>
    <p style="font-size:8.8pt; margin-top:2px;">Verified buyers ke liye product review and star rating calculator addition.</p>

    <strong style="color:#063D37; display:block; margin-top:4px;">3. Admin CMS Dashboard</strong>
    <p style="font-size:8.8pt; margin-top:2px;">Store manager ke liye inventory management aur sales analytics charts.</p>
  </div>

  <h2>Final Presentation Closing Script</h2>
  <div class="card" style="background:#063D37; color:white; padding:14px 18px; margin-top:12px;">
    <strong style="color:#7DD8CF; font-size:10pt; text-transform:uppercase; display:block; margin-bottom:6px;">
      🎙️ Final Closing Speech:
    </strong>
    <p style="color:#F0FDFB; font-size:10.2pt; line-height:1.6; margin-bottom:0;">
      "Overall Sir, mera focus sirf ek e-commerce website banana nahi tha. Mera focus ye tha ke user ko simple navigation, clear product discovery aur smooth shopping experience mile. Maine koshish ki hai ke website ka har major design decision kisi na kisi user need ko solve kare.
      <br><br>
      Thank you Sir! Ab main aapke masle aur questions welcome karti hoon."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Detailed Presentation Guide</span>
    <span>Page 18</span>
  </div>
</div>

</body>
</html>
`;

fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
console.log('HTML written successfully to:', htmlFilePath);

console.log('Compiling HTML to complete detailed presentation PDF via Microsoft Edge...');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fileUrl = 'file:///' + htmlFilePath.replace(/\\/g, '/');
const cmd = `"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --user-data-dir="${profileDir}" --print-to-pdf="${pdfFilePath}" "${fileUrl}"`;

try {
  execSync(cmd, { stdio: 'pipe' });
  if (fs.existsSync(pdfFilePath)) {
    const stats = fs.statSync(pdfFilePath);
    console.log(`\n======================================================`);
    console.log(`SUCCESS! Complete Detailed Presentation PDF generated!`);
    console.log(`File: ${pdfFilePath}`);
    console.log(`Size: ${(stats.size / 1024).toFixed(1)} KB`);
    console.log(`======================================================\n`);
  } else {
    console.error('PDF file was not created.');
  }
} catch (err) {
  console.error('Error generating PDF:', err.message);
} finally {
  if (fs.existsSync(htmlFilePath)) fs.unlinkSync(htmlFilePath);
  if (fs.existsSync(profileDir)) fs.rmSync(profileDir, { recursive: true, force: true });
}
