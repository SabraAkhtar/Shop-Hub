const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const htmlFilePath = path.join(rootDir, 'student_story_temp.html');
const pdfFilePath = path.join(rootDir, 'ShopHub_StepByStep_Explanation_For_Students.pdf');
const profileDir = path.join(rootDir, 'edge_pdf_profile_3');

console.log('Generating Step-by-Step Story PDF...');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ShopHub - Step by Step Story</title>
  <style>
    :root {
      --primary: #078F83;
      --dark: #063D37;
      --light: #EAF8F5;
      --gray: #66727A;
    }
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      color: #111;
      line-height: 1.7;
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
      text-align: center;
    }
    h1 { color: var(--dark); margin: 0 0 10px 0; font-size: 26px; }
    .subtitle { color: var(--gray); font-size: 15px; margin: 0; font-style: italic; }
    h2 { 
      color: white; 
      background: var(--primary); 
      padding: 10px 15px; 
      border-radius: 6px;
      font-size: 20px;
      margin-top: 30px; 
    }
    .chat-box {
      background: #fdfdfd;
      border-left: 5px solid var(--dark);
      border-radius: 0 8px 8px 0;
      padding: 20px;
      margin-bottom: 25px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    }
    .step-list {
      margin-top: 15px;
      padding-left: 20px;
    }
    .step-list li {
      margin-bottom: 12px;
      color: #333;
    }
    .highlight {
      font-weight: bold;
      color: var(--primary);
    }
    .student-q {
      font-weight: bold;
      color: #b30000;
      font-size: 16px;
      margin-bottom: 10px;
      border-bottom: 1px dashed #ccc;
      padding-bottom: 5px;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <h1>Presentation Guide: "Maine API aur Firebase Kese Lagayi?"</h1>
      <p class="subtitle">Doston/Students ko asan alfazon mein samjhane ka muqammal tareeqa</p>
    </div>

    <p style="font-size: 16px; color: #444;">
      <em>(Guide: Jab koi student aapse pooche ke "Yaar tumne yeh kaise banaya, mujhe bhi step-by-step batao?", toh aapne bilkul relax ho kar aisay jawab dena hai jaise neechay likha hai. Is se unko lagega ke aapne practical kaam kiya hai.)</em>
    </p>

    <h2>PART 1: API (DummyJSON) Ki Kahani</h2>

    <div class="chat-box">
      <div class="student-q">🗣️ Student ka Sawal: "Yaar yeh jo laptops aur mobiles tumhari website par aa rahe hain, yeh API kaise connect ki tumne? Google pe kya kiya tha?"</div>
      
      <p><strong>Aapka Jawab:</strong></p>
      <p>"Dekho yaar, sab se pehle jab main frontend ka design bana rahi thi toh mujhe dummy data chahiye tha. Main Google par gayi aur maine search kiya <span class="highlight">'Free Fake E-commerce API'</span>."</p>
      
      <ul class="step-list">
        <li><strong>Step 1:</strong> Google par search karne ke baad mujhe pehli website <strong>DummyJSON.com</strong> mili. Maine unki documentation dekhi toh unho ne ek link diya hua tha: <code>https://dummyjson.com/products</code>.</li>
        <li><strong>Step 2:</strong> Main apne VS Code (code editor) mein wapas aayi. Maine socha ke isko directly har jagah likhne ke bajaye ek alag se service file banati hoon.</li>
        <li><strong>Step 3:</strong> Maine apne project folder mein <code>src/services/productService.ts</code> naam ki file banai.</li>
        <li><strong>Step 4:</strong> Wahan maine JavaScript ka built-in function hota hai <strong><code>fetch()</code></strong>, usko use kiya aur usme DummyJSON wala link paste kar diya.</li>
        <li><strong>Step 5:</strong> Bas! Jab bhi meri website load hoti hai, woh <code>fetch()</code> function chalta hai, us link pe jata hai, aur saare products ka data <strong>JSON format</strong> (yani JavaScript Objects ki shakal) mein download karke meri website ko de deta hai. Phir maine usko apne Cards me map karwa liya.</li>
      </ul>
      <p><em>(End line):</em> "Iska faida yeh hua ke mujhe khud se 100 products ki images aur prices nahi likhni parin, sab API se real-time aa gaya!"</p>
    </div>

    <h2>PART 2: Firebase (Auth & Database) Ki Kahani</h2>

    <div class="chat-box">
      <div class="student-q">🗣️ Student ka Sawal: "Acha aur yeh Firebase account kaise banaya? Isko VS Code ke sath connect kaise kiya step-by-step batao!"</div>
      
      <p><strong>Aapka Jawab:</strong></p>
      <p>"Firebase connect karna asal mein bohat aasan hai, bas thora technical lagta hai. Maine yeh steps follow kiye:"</p>
      
      <ul class="step-list">
        <li><strong>Step 1 (Google Par):</strong> Sab se pehle main Google par gayi aur likha <strong>'Firebase Console'</strong>. Apna Gmail account login kiya aur wahan option aa raha tha <strong>'Add Project'</strong>.</li>
        <li><strong>Step 2 (Project Setup):</strong> Maine us par click kiya, apne project ka naam likha <strong>'ShopHub'</strong> aur Create kar diya.</li>
        <li><strong>Step 3 (Keys Lena):</strong> Project ban-ne ke baad wahan ek chota sa Web ka icon bana tha (<code>&lt;/&gt;</code>). Maine uspe click kiya toh Firebase ne mujhe kuch code aur secret API Keys de din ke inko copy kar lo.</li>
        <li><strong>Step 4 (VS Code Mein):</strong> Phir main VS Code mein aayi. Maine terminal khola aur likha <code>npm install firebase</code> taake mere project mein firebase ka package install ho jaye.</li>
        <li><strong>Step 5 (File Banana):</strong> Phir maine apne code mein <code>src/lib/firebase.ts</code> file banai. Jo Keys maine Google se copy ki thi, woh yahan paste kar din aur end me <code>initializeApp(firebaseConfig)</code> function call kar diya. Is ek line se mera code Firebase se connect ho gaya!</li>
        <li><strong>Step 6 (Features On Karna):</strong> Us ke baad main dobara Firebase website par gayi aur mainay <strong>'Authentication'</strong> walay section me jaa kar Email/Password login On kar diya. Aur dusra <strong>'Firestore Database'</strong> on kar diya jahan hamare orders save hoty hain.</li>
      </ul>
      <p><em>(End line):</em> "Bas uske baad Firebase ki official website se signup, login aur database (addDoc) ke chote chote functions copy kiye aur apne hisab se apni app me set kar diye. Toh ab hamara saara login aur order data cloud par save hota hai!"</p>
    </div>

    <div style="page-break-after: always;"></div>

    <h2>PART 3: Short Q&A (Quick Answers)</h2>

    <div class="chat-box">
      <p class="student-q">🗣️ "Agar main API use na karu aur VS Code me khud products likh lu toh kya nuqsan hai?"</p>
      <p>"Dekho agar tum khud arrays bana kar VS Code me likhogi, toh woh static website ban jayegi. Kal ko agar qeemat change karni hui ya naya product daalna hua toh tumhe code change karna parega. API use karne se humara code dynamically kaam karta hai jese real software companies me hota hai."</p>

      <p class="student-q" style="margin-top: 20px;">🗣️ "Firebase database aur dusre database (SQL) me kya farq laga tumhe?"</p>
      <p>"Firebase ek NoSQL database (Firestore) deta hai. Yani isme tables nahi hote, balke 'Collections' aur 'Documents' hote hain (bilkul JSON files ki tarah). Mujhe yeh frontend ke sath connect karna bohat easy laga kyunki mujhe koi alag se PHP ya Node.js ka server nahi banana para."</p>
      
      <p class="student-q" style="margin-top: 20px;">🗣️ "Tumne Context API ko kahan kahan use kiya hai aur kese kiya?"</p>
      <p>"Maine <code>StoreContext.tsx</code> file banai hai. Usme maine <code>createContext()</code> lagaya. Phir jo bhi mera Cart, Wishlist, ya Firebase ka Login function hai, wo sab maine ek hi file me rakha. Phir <code>&lt;StoreContext.Provider&gt;</code> k zariye usko puri app ke upar wrap (cover) kar diya. Ab main kisi bhi page (jese header ya product page) me ja kar <code>useStore()</code> likhti hoon, aur wahan se mujhy cart ka data aaram se mil jata hai bina bar bar code likhay."</p>
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
