const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const htmlFilePath = path.join(rootDir, 'student_guide_temp.html');
const pdfFilePath = path.join(rootDir, 'ShopHub_Student_Presentation_Guide.pdf');
const profileDir = path.join(rootDir, 'edge_guide_profile');

console.log('Building Student Presentation Guide HTML document...');

const htmlContent = `<!DOCTYPE html>
<html lang="ur">
<head>
<meta charset="UTF-8">
<title>ShopHub - Student Presentation Guide for Teacher</title>
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
    font-size: 19pt;
    font-weight: 800;
    color: #063D37;
    margin-bottom: 8px;
    line-height: 1.2;
    letter-spacing: -0.3px;
  }

  h2 {
    font-size: 12.5pt;
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

  /* Badges & Containers */
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

  /* 4-Step Student Presentation Structure Box */
  .speech-box {
    background: #FFFFFF;
    border: 1.5px solid #078F83;
    border-radius: 10px;
    padding: 11px 15px;
    margin-top: 8px;
    margin-bottom: 12px;
    box-shadow: 0 4px 12px rgba(7, 143, 131, 0.08);
  }

  .speech-box-title {
    font-size: 9.5pt;
    font-weight: 800;
    color: #078F83;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
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

  /* Intro Speaking Script Container */
  .intro-box {
    background: linear-gradient(135deg, #063D37 0%, #0A524A 100%);
    color: #FFFFFF;
    border-radius: 12px;
    padding: 14px 18px;
    margin-bottom: 14px;
    box-shadow: 0 4px 14px rgba(6, 61, 55, 0.15);
  }

  .intro-box p {
    color: #F0FDFB;
    font-size: 10.2pt;
    line-height: 1.6;
    margin-bottom: 0;
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
    font-size: 30pt;
    font-weight: 900;
    color: #063D37;
    line-height: 1.18;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .cover-subtitle {
    font-size: 14pt;
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

<!-- ======================================================================= -->
<!-- COVER PAGE                                                              -->
<!-- ======================================================================= -->
<div class="page">
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-brand">Shop<span>Hub</span></div>
      <span class="badge" style="background:#063D37; color:#FFFFFF; border:none;">TEACHER PRESENTATION GUIDE</span>
    </div>

    <div style="margin: auto 0;">
      <span class="badge" style="margin-bottom: 12px;">STUDENT SPEAKING &amp; DEMO GUIDE</span>
      <h1 class="cover-title">ShopHub — E-Commerce Website</h1>
      <div class="cover-subtitle">Step-by-Step Live Project Presentation Guide for Teacher</div>
      <p class="cover-desc">
        Yeh PDF document teacher ke samne live website project present karte waqt exact speaking guide ke tor par use karne ke liye banaya gaya hai. Yeh natural <strong>Roman Urdu</strong> mein hai aur har section ko 4 key steps mein explain karta hai: <em>Maine Kya Kiya</em>, <em>Maine Ye Kyun Kiya</em>, <em>User Benefit</em>, aur <em>Technical Detail</em>.
      </p>
    </div>

    <div class="cover-footer">
      <div class="meta-col">
        <strong>Presentation Target</strong>
        <span>Live Teacher Evaluation &amp; Project Viva</span>
      </div>
      <div class="meta-col">
        <strong>Format</strong>
        <span>Natural Student Speaking Guide</span>
      </div>
      <div class="meta-col">
        <strong>Language</strong>
        <span>Easy Roman Urdu + Technical Terms</span>
      </div>
      <div class="meta-col">
        <strong>Status</strong>
        <span>100% Completed &amp; Verified</span>
      </div>
    </div>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 2: OPENING SPEECH & SECTION 01 — PROJECT OVERVIEW                  -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Opening Speech &amp; Section 01</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Opening Speech &amp; Section 01 — Project Overview</h1>

  <div class="intro-box">
    <strong style="color:#7DD8CF; font-size:9.5pt; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:6px;">
      🎙️ Presentation Opening Script (Start like this):
    </strong>
    <p>
      "Assalam-o-Alaikum everyone. Sir ne humein e-commerce shop ka task diya tha, aur maine is task ko ShopHub ke naam se develop kiya hai. Ab main aapko step by step explain karungi ke maine website mein kya kya implement kiya, ye decisions kyun liye, aur user experience ko better banane ke liye maine kin cheezon ka khayal rakha."
    </p>
  </div>

  <h2>Section 01: Project Introduction &amp; Purpose</h2>

  <div class="speech-box">
    <div class="speech-box-title">📌 Section 01 Presentation Breakdown:</div>

    <span class="step-label">1. MAINE KYA KIYA?</span>
    <div class="step-content">
      Maine ShopHub ke naam se ek complete modern consumer electronics e-commerce web application develop ki hai. Isme live product catalogue browsing, dynamic search, interactive category filtering, wishlist saving, cart management, 3-step checkout, aur custom 404 error recovery page shamil hain.
    </div>

    <span class="step-label">2. MAINE YE KYUN KIYA?</span>
    <div class="step-content">
      Aaj kal ki bohot si e-commerce websites par bohot clutter, unwanted popups aur confusing menus hote hain jinki wajah se user confuse ho jata hai. Maine ShopHub ko is liye banaya taake user ko ek clean, fast aur reliable platform mile jahan woh kisi bhi gadget ko bina kisi visual chaos ke browse aur purchase kar sake.
    </div>

    <span class="step-label">3. USER KO ISKA KYA BENEFIT HAI?</span>
    <div class="step-content">
      User website par aakar foran category select kar sakta hai, search se specific product tak 1 click mein pohanch sakta hai, bina page leave kiye Quick View modal mein specs dekh sakta hai, aur 3 simple steps mein checkout complete kar sakta hai.
    </div>

    <span class="step-label">4. TECHNICAL IMPLEMENTATION:</span>
    <div class="step-content">
      Website ko React 19 aur Vite ke sath single-page application (SPA) model par build kiya hai with React Router v7 for instant client-side route transitions without any full-page reload.
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 2</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 3: SECTION 02 — DESIGN & COLOR DECISIONS                          -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 02 // Design &amp; Colors</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Section 02 — Design &amp; Color Decisions</h1>
  <p>
    Teacher ko explain karein ke aapne colors randomly pick nahi kiye balkay purpose-driven visual psychology follow ki hai.
  </p>

  <div class="speech-box">
    <div class="speech-box-title">📌 Section 02 Presentation Breakdown:</div>

    <span class="step-label">1. MAINE KYA KIYA?</span>
    <div class="step-content">
      Maine website ka color palette Deep Forest Teal (<code>#063D37</code>), Vibrant Primary Teal (<code>#078F83</code> / <code>#0D7E73</code>), Blue Accent (<code>#2563EB</code>), Soft Mint Canvas (<code>#F7FCFB</code>), aur Crisp White Surfaces par base kiya hai.
    </div>

    <span class="step-label">2. MAINE YE KYUN KIYA?</span>
    <div class="step-content">
      "Maine primary colors mein Teal aur Blue ko rakha kyun ke ShopHub electronics aur hardware website hai, aur ye colors technology, trust, safety aur reliability ko represent karte hain. Maine light off-white background (<code>#F7FCFB</code>) use kiya taake interface ultra-clean aur professional lage aur product photos highlight ho sakein. Maine unnecessary rainbow colors bilkul avoid kiye kyun ke e-commerce mein zyada colors user ka focus distract kar dete hain."
    </div>

    <span class="step-label">3. USER KO ISKA KYA BENEFIT HAI?</span>
    <div class="step-content">
      Harsh black text ke bajaye Deep Teal text screen par eye strain (aankhon ki thakawat) nahi hone deta. Light background se products visual hero ban jaati hain aur contrast ratio high hone se readability 100% effortless ho jaati hai.
    </div>

    <span class="step-label">4. TECHNICAL IMPLEMENTATION:</span>
    <div class="step-content">
      Tailwind CSS v4 ki utility classes aur custom design tokens (<code>bg-[#F7FCFB]</code>, <code>text-[#063D37]</code>, <code>bg-[#078F83]</code>) use kiye hain jo poore codebase mein strict color consistency ensure karte hain.
    </div>
  </div>

  <div class="card">
    <strong style="color:#063D37;">Teacher ko bolne ke liye short point:</strong>
    <p style="font-size:9.2pt; margin-bottom:0; color:#334E4B;">
      "Sir, main ne rainbow colors ke bajaye strict 3-tier color palette use kiya hai taake brand trust establish ho aur products visual focus mein rahen."
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 3</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 4: SECTION 03 — HEADER & DUAL NAVIGATION                           -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 03 // Header Architecture</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Section 03 — Header &amp; Dual Navigation System</h1>

  <div class="speech-box">
    <div class="speech-box-title">📌 Section 03 Presentation Breakdown:</div>

    <span class="step-label">1. MAINE KYA KIYA?</span>
    <div class="step-content">
      Maine header ko 2 levels mein divide kiya hai: Top Mini Announcement Bar (Secondary info jaise free shipping policy aur support number) aur Main Sticky Navigation Bar (Logo, Main Menu, Compact Search, Wishlist counter, Cart badge, aur Primary Account Button).
    </div>

    <span class="step-label">2. MAINE YE KYUN KIYA?</span>
    <div class="step-content">
      "Sab se upar mini header hai jisme secondary information hai. Maine is mini header ko sticky nahi rakha, kyun ke jab user scroll karta hai to usko secondary information har waqt screen par available rakhne ki zarurat nahi hoti. Isliye scroll karne par mini header disappear ho jata hai aur main sticky navigation easily accessible rehti hai."
    </div>

    <span class="step-label">3. USER KO ISKA KYA BENEFIT HAI?</span>
    <div class="step-content">
      Scroll karte waqt screen par faltu vertical space waste nahi hoti. User page par kisi bhi jagah ho, woh 1 click mein Home, Products, Wishlist ya Cart tak pohanch sakta hai. Account button par primary filled styling hone se logged-in status transparently dikhta hai.
    </div>

    <span class="step-label">4. TECHNICAL IMPLEMENTATION:</span>
    <div class="step-content">
      Header <code>sticky top-0 z-40 backdrop-blur-md</code> container ke andar wrapper component hai jo Context API se live wishlist length (<code>wishlist.length</code>) aur cart item count (<code>totalCartItems</code>) real-time render karta hai.
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 4</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 5: SECTION 04 & 05 — MENU, SEARCH BAR & CARTS                     -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Sections 04 &amp; 05 // Menu &amp; Search</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Sections 04 &amp; 05 — Menu, Compact Search, Wishlist &amp; Cart</h1>

  <h2>Section 04: Navigation Menu Design</h2>
  <div class="speech-box">
    <div class="speech-box-title">📌 Section 04 Breakdown:</div>
    <span class="step-label">MAINE KYA KIYA &amp; KYUN KIYA?</span>
    <div class="step-content">
      "ShopHub ek e-commerce website hai, isliye Products menu naturally sab se important hai. Maine products ko Categories mein organize kiya taake user ko manually hazaron products browse na karne padein aur woh required category (Laptops, Smartphones, Audio) tak quickly pohanch sake."
    </div>
  </div>

  <h2>Section 05: Compact Auto-Expanding Search Bar</h2>
  <div class="speech-box">
    <div class="speech-box-title">📌 Section 05 Breakdown:</div>
    <span class="step-label">MAINE KYA KIYA &amp; KYUN KIYA?</span>
    <div class="step-content">
      "Maine search bar ko permanently wide nahi rakha. Maine isko compact rakha hai aur yeh hover ya focus par smoothly expand hota hai. Iska main purpose header ko clean aur spacious rakhna hai. Agar search bar permanently wide hota to logo aur right-side actions ke darmiyan spacing issue hota. Is interaction se user ko search functionality bhi milti hai aur header bhi visually clean rehta hai."
    </div>
    <span class="step-label">TECHNICAL DETAIL:</span>
    <div class="step-content">
      React state <code>isSearchFocused</code> aur <code>isSearchHovered</code> toggles se Tailwind width class dynamic expand hoti hai (<code>w-36</code> se <code>w-56</code>/<code>w-64</code>) with <code>transition-all duration-300</code>.
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 5</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 6: SECTION 06 — HERO SECTION & USER JOURNEY                        -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 06 // Hero Section</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Section 06 — Hero Section &amp; User Journey</h1>

  <div class="speech-box">
    <div class="speech-box-title">📌 Section 06 Presentation Breakdown:</div>

    <span class="step-label">1. MAINE KYA KIYA?</span>
    <div class="step-content">
      Maine Homepage ke hero section mein Edge-to-edge layout banaya hai jisme left side par Typewriter cursor animation se badalne wali headline, supporting paragraph, dual CTA buttons (ActionPrimaryButton &amp; ActionSecondaryButton), aur 4 trust pills hain; jabke right side par 3D Coverflow Depth Carousel chal raha hai.
    </div>

    <span class="step-label">2. MAINE YE KYUN KIYA? (USER JOURNEY)</span>
    <div class="step-content">
      "User jab website open karta hai to sab se pehle hero dekhta hai, isliye maine yahan website ka main purpose immediately communicate kiya. Single static image boring lagti hai, isliye 3D Depth Carousel integrate kiya jo top flagship devices (MacBook Pro, iPhone 13 Pro, AirPods Max) ko automatic 3D perspective mein dikhata hai. Pehle 3 seconds mein hi user ko pata chal jata hai ke ShopHub authentic electronics marketplace hai."
    </div>

    <span class="step-label">3. USER KO ISKA KYA BENEFIT HAI?</span>
    <div class="step-content">
      User ka time waste nahi hota. woh hero section se hi direct Explore Products par click karke featured list par jump kar sakta hai, ya 4 trust badges (Official Warranty, Free Fast Delivery, 30-Day Return, Secure Checkout) dekh kar confident ho sakta hai.
    </div>

    <span class="step-label">4. TECHNICAL IMPLEMENTATION:</span>
    <div class="step-content">
      <code>DepthCarousel.tsx</code> CSS 3D transforms (<code>rotateY</code>, <code>translateZ</code>, <code>scale</code>) use karta hai. TypewriterText component React <code>useEffect</code> interval se text array cycle karwata hai with blinking cursor effect.
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 6</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 7: SECTION 07 & 08 — CATEGORIES & PRODUCT CARDS                    -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Sections 07 &amp; 08 // Categories &amp; Cards</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Sections 07 &amp; 08 — Categories &amp; Product Cards</h1>

  <h2>Section 07: Product Categories (CategorySection)</h2>
  <div class="speech-box">
    <div class="speech-box-title">📌 Section 07 Breakdown:</div>
    <span class="step-label">MAINE KYA KIYA, KYUN KIYA &amp; USER BENEFIT?</span>
    <div class="step-content">
      "Maine categories ko visually separated interactive chips/cards ke form mein rakha hai (Laptops, Smartphones, Audio, Wearables). Iska purpose user ko instant filtered discovery dena hai. Jab user kisi category pill par click karta hai, to page smooth-scroll ho kar target catalogue dikhata hai. User ko multiple pages par wander nahi karna parta."
    </div>
  </div>

  <h2>Section 08: Product Cards &amp; Action Hierarchy</h2>
  <div class="speech-box">
    <div class="speech-box-title">📌 Section 08 Breakdown:</div>
    <span class="step-label">MAINE KYA KIYA &amp; KYUN KIYA?</span>
    <div class="step-content">
      Maine <code>ProductCard.tsx</code> component design kiya jisme image hover zoom, discount badges, price strike-through, star rating scores, Quick View (Eye icon), Wishlist heart toggle, aur Add to Cart button shamil hain.
    </div>
    <span class="step-label">BUTTON HIERARCHY EXPLANATION:</span>
    <div class="step-content">
      "Card par Maine Button Hierarchy ka strict rule follow kiya hai: 'Add to Cart' main conversion action hai, isliye iska visual weight sab se zyada hai (filled teal button with gliding circle animation). Wishlist secondary action hai, isliye usko corner par subtle heart icon ke tor par rakha gaya hai taake card visually crowded na lage."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 7</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 8: SECTION 09 & 10 — WISHLIST & CART JOURNEY                       -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Sections 09 &amp; 10 // Wishlist &amp; Cart</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Sections 09 &amp; 10 — Wishlist &amp; Shopping Cart</h1>

  <h2>Section 09: Wishlist Functionality</h2>
  <div class="speech-box">
    <div class="speech-box-title">📌 Section 09 Presentation Breakdown:</div>

    <span class="step-label">1. MAINE KYA KIYA?</span>
    <div class="step-content">
      Maine persistent Wishlist system implement kiya hai jo user ko kisi bhi product card ya details page se heart icon click karke item save karne deta hai, jisko <code>/wishlist</code> page par structured table format mein manage kiya ja sakta hai.
    </div>

    <span class="step-label">2. MAINE YE KYUN KIYA?</span>
    <div class="step-content">
      "Agar customer ko koi product pasand aa jaye lekin woh us waqt purchase nahi karna chahta, to woh us product ko wishlist mein save kar sakta hai. Iska benefit ye hai ke customer ko baad mein woh product dobara search nahi karna padega."
    </div>

    <span class="step-label">3. USER &amp; BUSINESS BENEFIT:</span>
    <div class="step-content">
      User tension-free ho kar baad mein aakar 1 click mein items ko cart mein transfer kar sakta hai ("Move to Cart" / "Add All to Cart"). Business ke liye user drop-off kam ho jata hai.
    </div>
  </div>

  <h2>Section 10: Cart Drawer &amp; Cart Page</h2>
  <div class="speech-box">
    <div class="speech-box-title">📌 Section 10 Presentation Breakdown:</div>
    <span class="step-label">MAINE KYA KIYA &amp; KYUN KIYA?</span>
    <div class="step-content">
      "Cart shopping journey ka core part hai. Maine Cart ko Header mein 1-click persistent placement par rakha hai (Slide-over drawer &amp; dedicated <code>/cart</code> page). Drawer user ka browsing flow toote bina item quantities (+/-) adjust karne, subtotal dekhne, aur free-shipping meter check karne deta hai."
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 8</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 9: SECTION 11 & 12 — BUTTON HIERARCHY & SPACING                    -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Sections 11 &amp; 12 // Hierarchy &amp; Spacing</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Sections 11 &amp; 12 — Button Hierarchy &amp; Spacing System</h1>

  <h2>Section 11: Button Hierarchy (Visual Weight Rule)</h2>
  <div class="speech-box">
    <div class="speech-box-title">📌 Section 11 Breakdown:</div>
    <span class="step-label">MAINE KYA KIYA &amp; KYUN KIYA?</span>
    <div class="step-content">
      "Main actions ko stronger visual treatment diya gaya hai aur secondary actions ko subtle rakha gaya hai, taake user ko clear ho ke next important action kya hai."
    </div>
    <ul style="font-size:9pt; margin-top:4px; margin-left:14px;">
      <li><strong>Primary CTAs (Shop Products, Add to Cart, Log In, Checkout):</strong> Filled solid background with gliding white circle arrow (<code>ActionPrimaryButton</code>). Highest visual weight.</li>
      <li><strong>Secondary CTAs (Explore Products, View Catalog):</strong> Transparent ghost style with expanding underline and 45-degree diagonal arrow (<code>ActionSecondaryButton</code>).</li>
      <li><strong>Utility Buttons (Filters, Quantity +/-):</strong> Clean border styling with subtle hover backgrounds.</li>
    </ul>
  </div>

  <h2>Section 12: Spacing &amp; Layout Rhythm</h2>
  <div class="speech-box">
    <div class="speech-box-title">📌 Section 12 Breakdown:</div>
    <span class="step-label">MAINE KYA KIYA &amp; KYUN KIYA?</span>
    <div class="step-content">
      Maine 8px grid system maintain kiya hai: Section spacing (48px–64px), Card padding (16px–24px), aur Container widths (<code>max-w-[1360px]</code>). Unnecessary empty gaps avoid kiye gaye hain taake content disconnected na lage.
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 9</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 10: SECTION 13 & 14 — RESPONSIVE & TECHNICAL                       -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Sections 13 &amp; 14 // Responsive &amp; Tech</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Sections 13 &amp; 14 — Responsive Design &amp; Code Architecture</h1>

  <h2>Section 13: Responsive Design Strategy</h2>
  <div class="speech-box">
    <div class="speech-box-title">📌 Section 13 Breakdown:</div>
    <span class="step-label">MAINE KYA KIYA &amp; KYUN KIYA?</span>
    <div class="step-content">
      E-commerce par 60% traffic mobile se aata hai. Maine website ko Mobile, Tablet aur Desktop teeno ke liye responsive banaya hai:
    </div>
    <ul style="font-size:9pt; margin-top:4px; margin-left:14px;">
      <li><strong>Desktop (> 1024px):</strong> 4-column product grid, split 2-column layouts, 3D carousel.</li>
      <li><strong>Tablet (640px - 1024px):</strong> 2-column grid, compact spacing, responsive drawer.</li>
      <li><strong>Mobile (< 640px):</strong> Single-column vertical stack, mobile hamburger menu, 44px finger-friendly buttons, zero horizontal scroll.</li>
    </ul>
  </div>

  <h2>Section 14: Technical Implementation</h2>
  <div class="speech-box">
    <div class="speech-box-title">📌 Section 14 Breakdown:</div>
    <span class="step-label">TEACHER KO BOLNE KA SCRIPT:</span>
    <div class="step-content">
      "Maine components ko separate rakha taake code reusable aur manageable rahe. Agar header mein change karna ho to poori website mein manually same code repeat karne ki zarurat na ho."
    </div>
    <ul style="font-size:9pt; margin-top:4px; margin-left:14px;">
      <li><code>React 19 &amp; Vite 6:</code> Ultra-fast development aur instant HMR updates ke liye.</li>
      <li><code>React Context API (StoreContext):</code> Centralized state management for Cart, Wishlist, Auth, and Search Query.</li>
      <li><code>DummyJSON REST API:</code> Live 100+ product catalogue fetching with <code>mockData.ts</code> offline fallback.</li>
      <li><code>Firebase Auth &amp; Firestore:</code> User login sessions aur order history cloud persistence ke liye.</li>
    </ul>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 10</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 11: SECTION 15 — COMPLETE USER JOURNEY                             -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 15 // User Journey</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Section 15 — Complete Live User Journey Example</h1>
  <p>
    Teacher ko live demo dikhate waqt is step-by-step sequence ko follow karein:
  </p>

  <div class="speech-box">
    <div class="speech-box-title">📌 Live Presentation Demo Journey Script:</div>
    <p style="font-size:9.8pt; line-height:1.6; color:#1A3633; margin-bottom:0;">
      "Sir, ab main aapko ek complete end-to-end user shopping flow live operate karke dikhati hoon:
      <br><br>
      <strong>Step 1: Landing on Home</strong> → User <code>http://localhost:3000</code> par aata hai aur Hero section mein 3D Depth Carousel dekhta hai.
      <br>
      <strong>Step 2: Category Selection</strong> → User 'Laptops' category pill click karta hai, page smooth-scroll ho kar laptops filter dikhata hai.
      <br>
      <strong>Step 3: Instant Search</strong> → Header search bar mein user 'MacBook' typing start karta hai, auto-expand bar real-time search query URL par sync karta hai.
      <br>
      <strong>Step 4: Quick View Inspection</strong> → User product card par Eye icon click karke <code>ProductDetailsModal</code> mein high-res gallery aur specs dekhta hai.
      <br>
      <strong>Step 5: Wishlist &amp; Cart</strong> → User item wishlist mein save karta hai (heart turns active) ya 'Add to Cart' click karta hai. Instantly floating toast message aata hai aur Cart Drawer slide-in hota hai.
      <br>
      <strong>Step 6: 3-Step Checkout</strong> → User 'Proceed to Checkout' dabata hai → Contact info → Delivery Address → Payment Method (Cash on Delivery select karne par card fields dynamically hide hoti hain) → Order Confirm ho kar Firestore mein save ho jata hai!"
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 11</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 12: SECTION 16 — RECOMMENDED IMPROVEMENTS                         -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 16 // Future Improvements</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Section 16 — Recommended Improvements Before Final Presentation</h1>
  <p>
    Teacher ko honest self-evaluation dikhane se presentation ki credibility bohot barh jati hai.
  </p>

  <div class="card">
    <span class="badge" style="background:#FFF5F5; color:#C53030; border-color:#FED7D7;">1. HIGH PRIORITY: LIVE PAYMENT GATEWAY INTEGRATION</span>
    <p style="font-size:9pt; margin-top:4px;">
      <em>Current State:</em> Payment methods (Card, COD, PayPal) form state mein simulate hote hain.<br>
      <em>Recommended Improvement:</em> Real-world credit card transactions process karne ke liye Stripe Elements API connect karna.<br>
      <em>Expected UX Benefit:</em> Customers actual bank cards se secure payment complete kar sakenge.
    </p>
  </div>

  <div class="card">
    <span class="badge" style="background:#FEFCBF; color:#744210; border-color:#FEEBC8;">2. MEDIUM PRIORITY: USER PRODUCT REVIEWS &amp; RATINGS SUBMISSION</span>
    <p style="font-size:9pt; margin-top:4px;">
      <em>Current State:</em> Ratings API se static score ke tor par display hoti hain.<br>
      <em>Recommended Improvement:</em> Verified buyers ke liye photo review submission form aur star rating calculator add karna.<br>
      <em>Expected UX Benefit:</em> Social proof aur customer trust 2x increase hoga.
    </p>
  </div>

  <div class="card">
    <span class="badge" style="background:#EBF8FF; color:#2B6CB0; border-color:#BEE3F8;">3. MEDIUM PRIORITY: ADVANCED MULTI-FACET FILTER SIDEBAR</span>
    <p style="font-size:9pt; margin-top:4px;">
      <em>Current State:</em> Category pills aur search term se filtering hoti hai.<br>
      <em>Recommended Improvement:</em> Products page par price range slider ($0 - $2000) aur brand checkboxes add karna.
    </p>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 12</span>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 13: SECTION 17 — FINAL CONCLUSION                                 -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-header">
    <span>Section 17 // Final Conclusion</span>
    <span>ShopHub Student Presentation Guide</span>
  </div>

  <h1>Section 17 — Final Presentation Conclusion</h1>

  <div class="intro-box" style="padding:16px 20px; margin-top:10px;">
    <strong style="color:#7DD8CF; font-size:10pt; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:8px;">
      🎙️ Presentation Closing Script (End like this):
    </strong>
    <p style="font-size:10.5pt; line-height:1.65;">
      "Overall, mera focus sirf ek e-commerce website banana nahi tha. Mera focus ye tha ke user ko simple navigation, clear product discovery aur smooth shopping experience mile. Maine koshish ki hai ke website ka har major design decision kisi na kisi user need ko solve kare.
      <br><br>
      Thank you, Sir! Ab agar aapka koi question hai to main usay answer karne ke liye ready hoon."
    </p>
  </div>

  <div class="card-grid" style="margin-top:16px;">
    <div class="card" style="text-align:center;">
      <strong style="color:#063D37; font-size:10pt;">✅ All Requirements Satisfied</strong>
      <p style="font-size:8.8pt; color:#4A6360; margin-top:2px; margin-bottom:0;">
        10 Live Routes, DummyJSON API, Context API, 3-Step Checkout, Cute Otter 404, Responsive Design.
      </p>
    </div>
    <div class="card" style="text-align:center;">
      <strong style="color:#063D37; font-size:10pt;">🎉 Ready for Teacher Viva</strong>
      <p style="font-size:8.8pt; color:#4A6360; margin-top:2px; margin-bottom:0;">
        Present with confidence, navigate live through the site, and use this PDF as your speaking guide!
      </p>
    </div>
  </div>

  <div class="page-footer">
    <span>ShopHub Student Presentation Guide</span>
    <span>Page 13</span>
  </div>
</div>

</body>
</html>
`;

fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
console.log('HTML written successfully to:', htmlFilePath);

console.log('Compiling HTML to presentation guide PDF via Microsoft Edge...');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fileUrl = 'file:///' + htmlFilePath.replace(/\\/g, '/');
const cmd = `"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --user-data-dir="${profileDir}" --print-to-pdf="${pdfFilePath}" "${fileUrl}"`;

try {
  execSync(cmd, { stdio: 'pipe' });
  if (fs.existsSync(pdfFilePath)) {
    const stats = fs.statSync(pdfFilePath);
    console.log(`\n======================================================`);
    console.log(`SUCCESS! Student Presentation Guide PDF generated!`);
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
