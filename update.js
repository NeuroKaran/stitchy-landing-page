const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/karan/Stitchy_landing_page';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const navHTML = `
  <div class="card-nav-container">
    <nav class="card-nav" id="globalNav" style="background-color: #fff;">
      <div class="card-nav-top">
        <div class="hamburger-menu" id="hamburgerMenu" role="button" aria-label="Open menu" tabindex="0" style="color: #000;">
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
        </div>

        <a class="logo-container" href="./index.html" style="text-decoration:none;">
          <img src="./mascots/logo.svg" alt="Stitchy Logo" class="logo" />
        </a>

        <a href="./pricing.html" class="card-nav-cta-button" style="background-color: #111; color: white; display: flex; text-decoration: none;">Get Started</a>
      </div>

      <div class="card-nav-content" id="cardNavContent" aria-hidden="true">
        <div class="nav-card" style="background-color: #f3f4f6; color: #111827;">
          <div class="nav-card-label">Product</div>
          <div class="nav-card-links">
            <a class="nav-card-link" href="./index.html#how">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="nav-card-link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
              How it Works
            </a>
            <a class="nav-card-link" href="./index.html#features">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="nav-card-link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
              Features
            </a>
            <a class="nav-card-link" href="./index.html#insights">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="nav-card-link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
              AI Insights
            </a>
          </div>
        </div>
        <div class="nav-card" style="background-color: #e5e7eb; color: #111827;">
          <div class="nav-card-label">Company</div>
          <div class="nav-card-links">
            <a class="nav-card-link" href="./about.html">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="nav-card-link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
              About Us
            </a>
            <a class="nav-card-link" href="./contact.html">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="nav-card-link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
              Contact
            </a>
            <a class="nav-card-link" href="./pricing.html">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="nav-card-link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
              Pricing
            </a>
          </div>
        </div>
        <div class="nav-card" style="background-color: #f9fafb; color: #111827;">
          <div class="nav-card-label">Legal</div>
          <div class="nav-card-links">
            <a class="nav-card-link" href="./privacy.html">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="nav-card-link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
              Privacy Policy
            </a>
            <a class="nav-card-link" href="./terms.html">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="nav-card-link-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalContent = content;

    // Replace font: Inter with Outfit
    if (content.includes('family=Inter')) {
        content = content.replace(
            /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^"]*" rel="stylesheet" \/>/g,
            '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />'
        );
    }

    // Add GSAP if not present, before styles.css
    if (!content.includes('gsap.min.js')) {
        content = content.replace(
            '<link rel="stylesheet" href="./styles.css" />',
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>\n  <link rel="stylesheet" href="./styles.css" />'
        );
    }

    // Replace header
    const headerRegex = /<header class="site-header.*?">([\s\S]*?)<\/header>/g;
    content = content.replace(headerRegex, navHTML);

    if (originalContent !== content) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
console.log('Done replacing headers & fonts');
