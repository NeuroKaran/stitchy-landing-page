/**
 * build.js — Stitchy Landing Page Build Script
 *
 * Replaces nav/footer in all HTML files using partials from _includes/,
 * fixes font references (Inter → Outfit), and updates cache-bust versions.
 *
 * Usage: node build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const INCLUDES = path.join(ROOT, '_includes');
const VERSION = Date.now();

// Read partials
const navHTML = fs.readFileSync(path.join(INCLUDES, 'nav.html'), 'utf8').trim();
const footerHTML = fs.readFileSync(path.join(INCLUDES, 'footer.html'), 'utf8').trim();

// Find all HTML files in root
const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

let updatedCount = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(ROOT, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // 1. Replace nav between markers
    const navRegex = /<!-- BEGIN:NAV -->[\s\S]*?<!-- END:NAV -->/;
    if (navRegex.test(content)) {
        content = content.replace(navRegex, `<!-- BEGIN:NAV -->\n${navHTML}\n  <!-- END:NAV -->`);
    }

    // 2. Replace footer between markers
    const footerRegex = /<!-- BEGIN:FOOTER -->[\s\S]*?<!-- END:FOOTER -->/;
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, `<!-- BEGIN:FOOTER -->\n${footerHTML}\n  <!-- END:FOOTER -->`);
    }

    // 3. Fix font: Inter → Outfit (handles multiline link tags)
    if (content.includes('family=Inter')) {
        content = content.replace(
            /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^"]*"[\s\S]*?rel="stylesheet" \/>/g,
            '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"\n    rel="stylesheet" />'
        );
    }

    // 4. Update cache-bust version on styles.css and script.js
    content = content.replace(
        /styles\.css\?v=\d+/g,
        `styles.css?v=${VERSION}`
    );
    content = content.replace(
        /script\.js\?v=\d+/g,
        `script.js?v=${VERSION}`
    );

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`✓ Updated ${file}`);
    } else {
        console.log(`- Skipped ${file} (no changes)`);
    }
});

console.log(`\nDone. ${updatedCount}/${htmlFiles.length} files updated (v=${VERSION}).`);
