const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const htmlFilePath = path.join(rootDir, 'architecture_qa_temp.html');
const pdfFilePath = path.join(rootDir, 'ShopHub_Firebase_API_Presentation_Guide.pdf');
const profileDir = path.join(rootDir, 'edge_pdf_profile_2');

console.log('Generating PDF guide...');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ShopHub Technical & Q&A Guide</title>
  <style>
    :root {
      --primary: #078F83;
      --dark: #063D37;
      --light: #EAF8F5;
      --gray: #66727A;
      --border: #D5EFE8;
    }
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      color: #111;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background: white;
    }
    .page {
      padding: 40px 50px;
      max-width: 800px;
      margin: auto;
    }
    .header {
      border-bottom: 3px solid var(--primary);
      padding-bottom: 15px;
      margin-bottom: 30px;
    }
    h1 { color: var(--dark); margin: 0 0 10px 0; font-size: 28px; }
    .subtitle { color: var(--gray); font-size: 16px; margin: 0; }
    h2 { color: var(--primary); border-bottom: 1px solid var(--border); padding-bottom: 5px; margin-top: 30px; }
    h3 { color: var(--dark); margin-top: 25px; margin-bottom: 10px; }
    .box {
      background: var(--light);
      border-left: 4px solid var(--primary);
      padding: 15px 20px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .qa-box {
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 15px 20px;
      margin-bottom: 15px;
    }
    .q-text { font-weight: bold; color: #b30000; margin-bottom: 8px; }
    .a-text { color: var(--dark); font-style: italic; margin-bottom: 0; }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
      color: #d63384;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <h1>ShopHub - Technical & Q&A Guide (Firebase & API)</h1>
      <p class="subtitle">Complete explanation for Presentation in simple Roman Urdu + English</p>
    </div>

    <h2>1. Firebase Connection & Logic</h2>
    
    <h3>a. Firebase Kaise Connect Kiya? (Setup)</h3>
    <p>Humne <code>firebase</code> ka npm package install kiya. Project mein <strong><code>src/lib/firebase.ts</code></strong> naam ki file banai hui hai. Is file mein humne Google Firebase dashboard se mili hui API Keys (credentials) daali hain. Phir <code>initializeApp()</code> function ko use kar ke app ko Firebase ke sath connect kar diya hai.</p>

    <h3>b. Firebase Kis Liye Use Ho Raha Hai?</h3>
    <div class="box">
      <strong>1. Authentication (Login / Signup):</strong><br>
      Hum khud ka login system banate toh passwords secure karna mushkil hota. Is liye humne <strong>Firebase Auth</strong> use kiya hai. <code>StoreContext.tsx</code> mein <code>createUserWithEmailAndPassword</code> (signup ke liye) aur <code>signInWithEmailAndPassword</code> (login ke liye) ke built-in methods call kiye gaye hain. Firebase user details ko secure rakhta hai.
      <br><br>
      <strong>2. Firestore Database (Orders Save Karne Ke Liye):</strong><br>
      Sirf login hi nahi, balkay user jo orders karta hai usko permanently save karna lazmi tha. Is liye humne <strong>Firebase Firestore</strong> (jo ek NoSQL database hai) use kiya. <code>addDoc</code> method use kar ke order ki details (cart items, total price, shipping address) seedha <code>orders</code> naam ki collection me save kar di jati hai.
    </div>

    <h2>2. DummyJSON API (Products Fetching)</h2>
    
    <h3>a. Yeh API Kahan Aur Kaise Connect Ki?</h3>
    <p>API ko connect karne ke liye <strong><code>src/services/productService.ts</code></strong> file banai gayi hai. Yahan JavaScript ka built-in <strong><code>fetch()</code></strong> method use kiya gaya hai.</p>
    <p>Endpoint URL: <code>https://dummyjson.com/products?limit=0</code></p>
    <p>Jab website start hoti hai, toh yeh function call hota hai aur wahan se json format me data lata hai. Phir hum us data ko map karke apni website ke structure ke mutabiq <code>Product</code> objects me badal lete hain.</p>

    <h3>b. API Kyun Use Ki? Manually Kyun Nahi Daale Products?</h3>
    <p>Ek e-commerce website ko dynamic hona chahiye. Agar main manually har product ka naam, qeemat aur image code mein hardcode karta toh woh ek static (fixed) website hoti. API use karne se yeh faida hai ke website <strong>real-time</strong> data le rahi hai. Asal practical industry mein bhi hamesha backend API se data fetch hota hai, is liye maine real-world approach follow ki.</p>

    <h2>3. Deep Dive: Carts aur Payments Logic</h2>
    
    <h3>a. Cart System Kaise Kaam Karta Hai?</h3>
    <p>Cart ka saara hisaab <strong><code>src/context/StoreContext.tsx</code></strong> mein hota hai. Humne React Context API use ki hai as a Global State. Cart items ko ek Array <code>[]</code> mein store kiya jata hai.</p>
    <ul>
      <li><strong>Add to Cart:</strong> Jab koi <em>"Add to Cart"</em> par click karta hai, function pehle check karta hai ke kya yeh product already array mein majood hai? Agar majood (exist) hai, toh sirf uski <code>quantity + 1</code> kar deta hai. Agar nahi hai, toh ek naya object array mein daal deta hai.</li>
      <li><strong>Total Price Calculation:</strong> Cart menu mein total amount nikalne ke liye JavaScript ka <code>reduce()</code> method lagaya gaya hai. Yeh har item ki price ko uski quantity se multiply kar ke sab ko sum kar leta hai.</li>
    </ul>

    <h3>b. Payment Logic (Checkout)</h3>
    <p>Kyunki yeh ek student frontend project hai, is liye isme Stripe ya kisi bank ka asali real money payment gateway embed nahi kiya gaya. Humne <strong>"Cash on Delivery" (COD)</strong> logic banai hai.</p>
    <p>User details (Name, Address, City, Number) form me fill karta hai. Submit karne pe validation hoti hai ke saari details darust hain ya nahi. Agar theek hain, toh pura order object ban kar <strong>Firebase Firestore</strong> mein bheja jata hai aur cart empty kar diya jata hai, stah hi user ko success notification aa jata hai.</p>

    <div style="page-break-after: always;"></div>

    <h2>4. Interview Q&A (Teacher ke Sawalaat aur Aapke Jawabaat)</h2>
    <p style="margin-bottom: 20px;"><em>In questions ki achi tarah practice karein. Aapka andaz confident aur technical hona chahiye.</em></p>

    <div class="qa-box">
      <div class="q-text">Sir: "Acha beta yeh batao, yeh products ka data tumne kahan se laya hai? Code me khud likha hai sab?"</div>
      <div class="a-text"><strong>Aapka Jawab:</strong> "Nahi sir, main isko real e-commerce feel dena chahta tha is liye maine khud data nahi likha. Maine internet se ek open API 'DummyJSON' connect ki hai. Jab page load hota hai, meri website us API ko request bhejti hai aur products wahan se aate hain. Agar kal ko API me products change hongy, toh meri website pe bhi automatically update ho jayenge."</div>
    </div>

    <div class="qa-box">
      <div class="q-text">Sir: "Cart me jo total amount calculate ho raha hai, woh logic kahan likhi hai aur kaise bani hai?"</div>
      <div class="a-text"><strong>Aapka Jawab:</strong> "Sir woh maine Context API wali file (StoreContext.tsx) me handle ki hai. Array ke uper JavaScript ka reduce function chal raha hai, jo har item ki (price × quantity) ko aapas mein plus karke total nikalta hai har bar jab cart update hota hai."</div>
    </div>

    <div class="qa-box">
      <div class="q-text">Sir: "Tumne database konsa use kiya hai aur kyun?"</div>
      <div class="a-text"><strong>Aapka Jawab:</strong> "Sir maine Google Firebase ka Firestore database use kiya hai. Iska faida yeh hai ke yeh NoSQL database hai jo seedha frontend se connect ho jata hai, aur mujhe alag se backend node.js server host nahi karna para. Hamare orders wahin secure rehte hain."</div>
    </div>

    <div class="qa-box">
      <div class="q-text">Sir: "User authentication khud banai hai ya third party hai?"</div>
      <div class="a-text"><strong>Aapka Jawab:</strong> "Sir maine Firebase Authentication lagai hai. Usme user signup, login aur sessions officially secure tareeqy se manage hoty hain, qk security khud build karne se vulnerable (weak) ho sakti hai."</div>
    </div>

    <div class="qa-box">
      <div class="q-text">Sir: "Yeh State Global kese manage ki? Redux use ki hai?"</div>
      <div class="a-text"><strong>Aapka Jawab:</strong> "Sir maine React Context API use ki hai. Kyunki website ka scale moderate tha, toh Redux jaisi heavy library daalne ki bajaye, Context API zayada behtar aur fast approach thi."</div>
    </div>

    <div class="qa-box">
      <div class="q-text">Students: "Bhai agar humne bhi firebase lagana ho apni app mein toh kitna time lagta hai?"</div>
      <div class="a-text"><strong>Aapka Jawab:</strong> "Bohat aasan hai. Sirf Firebase console pe project banate hain, config keys uthate hain, NPM se 'firebase' install karke keys apni ek file me daal dete hain, phir bas functions documentation se read kar ke lagany hoty hain."</div>
    </div>

  </div>
</body>
</html>
`;

fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fileUrl = 'file:///' + htmlFilePath.replace(/\\/g, '/');
const cmd = `"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --user-data-dir="${profileDir}" --print-to-pdf="${pdfFilePath}" "${fileUrl}"`;

try {
  execSync(cmd, { stdio: 'pipe' });
  console.log('PDF Generated Successfully at:', pdfFilePath);
} catch (err) {
  console.error('Error generating PDF:', err.message);
} finally {
  if (fs.existsSync(htmlFilePath)) fs.unlinkSync(htmlFilePath);
  if (fs.existsSync(profileDir)) fs.rmSync(profileDir, { recursive: true, force: true });
}
