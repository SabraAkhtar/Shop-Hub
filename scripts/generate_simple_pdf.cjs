const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const htmlFilePath = path.join(rootDir, 'simple_guide_temp.html');
const pdfFilePath = path.join(rootDir, 'ShopHub_Simple_Presentation_Guide.pdf');
const profileDir = path.join(rootDir, 'edge_simple_profile');

console.log('Building Simple Presentation Guide HTML document...');

const htmlContent = `<!DOCTYPE html>
<html lang="ur">
<head>
<meta charset="UTF-8">
<title>ShopHub - Super Simple Presentation Guide</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

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

  .header {
    border-bottom: 2px solid #078F83;
    padding-bottom: 8px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    font-size: 22pt;
    font-weight: 900;
    color: #063D37;
  }

  .subtitle {
    font-size: 11pt;
    font-weight: 700;
    color: #078F83;
  }

  .card {
    background: #F7FCFB;
    border: 1.5px solid #D6EFE9;
    border-radius: 12px;
    padding: 12px 16px;
    margin-bottom: 14px;
  }

  .card-title {
    font-size: 13pt;
    font-weight: 800;
    color: #063D37;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .speak-box {
    background: #063D37;
    color: #FFFFFF;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 10.5pt;
    line-height: 1.55;
    margin-top: 6px;
  }

  .speak-box strong {
    color: #7DD8CF;
    display: block;
    margin-bottom: 4px;
  }

  ul {
    margin-left: 18px;
    margin-top: 4px;
  }

  li {
    margin-bottom: 4px;
    font-size: 10pt;
    color: #2D4744;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #E0F2EE;
    padding-top: 6px;
    font-size: 8.5pt;
    color: #66727A;
    display: flex;
    justify-content: space-between;
  }
</style>
</head>
<body>

<!-- PAGE 1 -->
<div class="page">
  <div class="header">
    <div class="title">Shop<span>Hub</span></div>
    <div class="subtitle">Super Simple Student Presentation Guide</div>
  </div>

  <div class="card" style="background:#EAF8F5; border-color:#078F83;">
    <div class="card-title" style="color:#078F83;">🎯 Is Guide Ka Maqsad</div>
    <p style="font-size:10.2pt; color:#063D37;">
      Yeh guide bilkul simple Roman Urdu mein banayi gayi hai taake koi bhi student teacher ke samne bina kisi mushkil ke ShopHub website ko confident tareeqe se explain aur operate kar sake.
    </p>
  </div>

  <!-- PART 1 -->
  <div class="card">
    <div class="card-title">1. Introduction (Pehla Sentence Kya Bolna Hai)</div>
    <p style="font-size:10pt;">Website shuru karte waqt teacher ko yeh boleiñ:</p>
    <div class="speak-box">
      <strong>🗣️ Bolne Ka Script:</strong>
      "Assalam-o-Alaikum Sir! Main ne 'ShopHub' ke naam se ek modern electronics e-commerce website banayi hai. Iska main maqsad yeh hai ke users laptops, smartphones, aur audio gadgets ko aasaani se dhoond sakein, wishlist mein save kar sakein aur fast checkout kar sakein."
    </div>
  </div>

  <!-- PART 2 -->
  <div class="card">
    <div class="card-title">2. Design &amp; Colors (Colors Kyun Choose Kiye?)</div>
    <ul>
      <li><strong>Deep Teal &amp; Blue (#063D37 / #078F83):</strong> Technology, trust aur safety show karte hain.</li>
      <li><strong>Off-White Background (#F7FCFB):</strong> Dark black ki jagah light background use kiya taake aankhon ko thakawat na ho aur products saaf dikhein.</li>
      <li><strong>No Extra Colors:</strong> Faltu colors avoid kiye taake user confuse na ho.</li>
    </ul>
    <div class="speak-box">
      <strong>🗣️ Bolne Ka Script:</strong>
      "Sir, colors main ne soch samajh kar choose kiye hain. Deep Teal aur Blue technology aur trust represent karte hain, jabke off-white background products ko prominent banata hai."
    </div>
  </div>

  <!-- PART 3 -->
  <div class="card">
    <div class="card-title">3. Header &amp; Compact Search Bar</div>
    <ul>
      <li><strong>Top Mini Header:</strong> Extra info (free shipping) ke liye hai aur scroll karne par gayab ho jata hai.</li>
      <li><strong>Main Sticky Header:</strong> Logo, navigation menu, cart badge aur account button hamesha screen par rehte hain.</li>
      <li><strong>Compact Search Bar:</strong> Search bar chota hai lekin mouse laane par expand hota hai taake header clean rahe.</li>
    </ul>
    <div class="speak-box">
      <strong>🗣️ Bolne Ka Script:</strong>
      "Sir, main nav bar sticky hai jabke search bar compact rakha hai jo hover karne par expand hota hai taake screen spacious aur clean lage."
    </div>
  </div>

  <div class="footer">
    <span>ShopHub Simple Presentation Guide</span>
    <span>Page 1</span>
  </div>
</div>

<!-- PAGE 2 -->
<div class="page">
  <div class="header">
    <div class="title">Shop<span>Hub</span></div>
    <div class="subtitle">Super Simple Student Presentation Guide</div>
  </div>

  <!-- PART 4 -->
  <div class="card">
    <div class="card-title">4. Main Website Features (Kya Kya Chal Raha Hai)</div>
    <ul>
      <li><strong>Hero Section 3D Carousel:</strong> Homepage par top products (MacBook Pro, iPhone) 3D perspective mein move hoti hain.</li>
      <li><strong>Product Categories:</strong> Laptops, Smartphones, Audio pills par click karne se page smooth scroll karta hai.</li>
      <li><strong>Product Cards:</strong> Image hover par zoom hoti hai, price strike-through hai, aur Add to Cart button par gliding circle animation hai.</li>
      <li><strong>Wishlist System:</strong> Items ko heart icon click karke save kiya ja sakta hai taake baad mein aasaani se purchase ho sakein.</li>
      <li><strong>Cart Drawer:</strong> Cart icon click karne par slide-over drawer khulta hai jisme free shipping progress bar aur total price nazar aati hai.</li>
      <li><strong>Animated Otter 404 Page:</strong> 404 error ya empty search par cute animated baby otter character blink karta hai aur user ko recover karwata hai.</li>
      <li><strong>3-Step Checkout:</strong> Contact → Delivery → Payment (Cash on Delivery select karne par card details automatic hide ho jati hain).</li>
    </ul>
    <div class="speak-box">
      <strong>🗣️ Bolne Ka Script:</strong>
      "Sir, website mein 3D Carousel, Category Filtering, Wishlist, Slide-Over Cart Drawer, Cute Otter 404 recovery, aur 3-step simple checkout shamil hain."
    </div>
  </div>

  <!-- PART 5 -->
  <div class="card">
    <div class="card-title">5. Technical Code (Tools &amp; Libraries)</div>
    <ul>
      <li><strong>React 19 &amp; Vite:</strong> Fast single-page app (SPA) performance ke liye.</li>
      <li><strong>React Context API:</strong> Cart, Wishlist aur User Login state ko centralized manage karne ke liye.</li>
      <li><strong>DummyJSON REST API:</strong> Live 100+ electronics items fetch karne ke liye (with offline mock fallback).</li>
      <li><strong>Tailwind CSS v4:</strong> Responsive mobile-first design ke liye.</li>
    </ul>
    <div class="speak-box">
      <strong>🗣️ Bolne Ka Script:</strong>
      "Sir, technical side par main ne React 19 aur Context API use kiya hai. Products live REST API se aati hain aur state centralized update hoti hai."
    </div>
  </div>

  <!-- PART 6 -->
  <div class="card">
    <div class="card-title">6. Ending (Aakhri Sentence)</div>
    <div class="speak-box" style="background:#078F83;">
      <strong>🗣️ Bolne Ka Script:</strong>
      "Overall Sir, mera focus sirf ek website banana nahi tha, balkay user ko ek simple aur enjoyable shopping experience dena tha. Thank you Sir!"
    </div>
  </div>

  <div class="footer">
    <span>ShopHub Simple Presentation Guide</span>
    <span>Page 2</span>
  </div>
</div>

</body>
</html>
`;

fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
console.log('HTML written successfully to:', htmlFilePath);

console.log('Compiling HTML to simple presentation PDF via Microsoft Edge...');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fileUrl = 'file:///' + htmlFilePath.replace(/\\/g, '/');
const cmd = `"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --user-data-dir="${profileDir}" --print-to-pdf="${pdfFilePath}" "${fileUrl}"`;

try {
  execSync(cmd, { stdio: 'pipe' });
  if (fs.existsSync(pdfFilePath)) {
    const stats = fs.statSync(pdfFilePath);
    console.log(`\n======================================================`);
    console.log(`SUCCESS! Simple Presentation PDF generated!`);
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
