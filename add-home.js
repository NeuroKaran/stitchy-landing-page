const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/karan/Stitchy_landing_page';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const homeLink = `
            <a class="nav-card-link" href="./index.html">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="nav-card-link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
              Home
            </a>`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    const targetStr = '<a class="nav-card-link" href="./index.html#how">';
    console.log(`Checking ${file}. Includes target: ${content.includes(targetStr)}`);

    if (content.includes(targetStr)) {
        content = content.replace(targetStr, homeLink + '\n            ' + targetStr);
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Added Home to ${file}`);
    }
});
console.log('Done.');
