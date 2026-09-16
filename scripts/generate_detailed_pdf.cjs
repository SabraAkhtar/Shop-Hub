const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const htmlFilePath = path.join(rootDir, 'detailed_guide_temp.html');
const pdfFilePath = path.join(rootDir, 'ShopHub_Complete_Detailed_Presentation_Guide.pdf');
const profileDir = path.join(rootDir, 'edge_detailed_profile');

console.log('Building Complete Detailed Presentation Guide HTML document...');

let rawHtml = fs.readFileSync(path.join(__dirname, 'generate_detailed_pdf.cjs'), 'utf-8');
// Extract the HTML string safely
const startIdx = rawHtml.indexOf('const htmlContent = `') + 'const htmlContent = `'.length;
const endIdx = rawHtml.lastIndexOf('`;\n\nfs.writeFileSync(htmlFilePath');

let htmlContent = rawHtml.substring(startIdx, endIdx);

// Replace any remaining unescaped backticks in HTML text with code tags
htmlContent = htmlContent.replace(/`([^`]+)`/g, '<code>$1</code>');

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
