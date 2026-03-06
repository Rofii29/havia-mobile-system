const fs = require('fs');
const path = require('path');

const pageFile = path.resolve('c:/xampp/htdocs/project-havia/havia-mobile-system/app/page.tsx');
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Replace Gold Custom Hex
pageContent = pageContent.replace(/#D4AF37/gi, '#C69C3D');

// Replace old dark background #111 with the brand's dark grey #2C2A29
pageContent = pageContent.replace(/#111/g, '#2C2A29');

// Replace old dark card #1f1f1f with a slightly different shade or #2C2A29
pageContent = pageContent.replace(/#1f1f1f/g, '#413E3D'); // Lighter variant for cards if bg is 2C2A29

// Replace Font references
pageContent = pageContent.replace(/Plus Jakarta Sans/g, 'Open Sans');

// Attempt to use Helvetica for titles where h1, h2, h3 are used by injecting font-serif or a custom class if we had one.
// We will set the body to Open Sans in global.css, and headings will rely on utility classes or global rules.

fs.writeFileSync(pageFile, pageContent);


const cssFile = path.resolve('c:/xampp/htdocs/project-havia/havia-mobile-system/app/globals.css');
let cssContent = fs.readFileSync(cssFile, 'utf8');
cssContent = cssContent.replace(/#D4AF37/gi, '#C69C3D');
cssContent = cssContent.replace(/#111/g, '#2C2A29');
cssContent = cssContent.replace(/#1f1f1f/g, '#413E3D');
cssContent = cssContent.replace(/Plus Jakarta Sans/g, 'Open Sans');
// Improve specific gradients
cssContent = cssContent.replace(/#b59020/g, '#a88434'); // complementary for gold-gradient
cssContent = cssContent.replace(/#997a00/g, '#8c6e2b'); // complementary for btn-3d-hover

// Ensure background uses #2C2A29 and titles use Helvetica
cssContent = cssContent.replace(/--background: #0a0a0a;/, '--background: #1D1C1B;'); // Darker variant of #2C2A29 for ultimate bg
// Add heading style
cssContent += `\n\nh1, h2, h3, h4, h5, h6 {\n  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\n}\n`;

fs.writeFileSync(cssFile, cssContent);

const layoutFile = path.resolve('c:/xampp/htdocs/project-havia/havia-mobile-system/app/layout.tsx');
let layoutContent = fs.readFileSync(layoutFile, 'utf8');
layoutContent = layoutContent.replace(/family=Plus\+Jakarta\+Sans:ital,wght@0,200\.\.800;1,200\.\.800/g, 'family=Open+Sans:ital,wght@0,300..800;1,300..800');
fs.writeFileSync(layoutFile, layoutContent);

console.log("Assets Replaced");
