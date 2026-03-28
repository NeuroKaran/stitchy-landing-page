const fs = require('fs');

const cssToAppend = `
/* ===== CARD NAV ===== */
.card-nav-container {
  position: fixed;
  top: 1.5em;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  max-width: 960px;
  z-index: 100;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
}

.card-nav-container.nav-hidden {
  transform: translateX(-50%) translateY(calc(-100% - 2em));
}

.card-nav {
  display: block;
  height: 60px;
  padding: 0;
  background-color: white;
  border: 1px solid var(--border);
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(17, 24, 39, 0.08);
  position: relative;
  overflow: hidden;
  will-change: height;
}

.card-nav-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.6rem 0.5rem 1.2rem;
  z-index: 2;
  background-color: #fff;
}

.hamburger-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 5px;
  padding: 0 10px;
}

.hamburger-menu:hover .hamburger-line {
  opacity: 0.7;
}

.hamburger-line {
  width: 26px;
  height: 2px;
  background-color: currentColor;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
  transform-origin: center;
}

.hamburger-menu.open .hamburger-line:first-child {
  transform: translateY(3.5px) rotate(45deg);
}

.hamburger-menu.open .hamburger-line:last-child {
  transform: translateY(-3.5px) rotate(-45deg);
}

.logo-container {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.logo {
  height: 28px;
}

.card-nav-cta-button {
  border: none;
  border-radius: 0.6rem;
  padding: 0 1.2rem;
  height: 42px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s;
  align-items: center;
  justify-content: center;
}

.card-nav-cta-button:hover {
  transform: scale(1.03);
}

.card-nav-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 60px;
  bottom: 0;
  padding: 0.6rem;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  visibility: hidden;
  pointer-events: none;
  z-index: 1;
}

.card-nav.open .card-nav-content {
  visibility: visible;
  pointer-events: auto;
}

.nav-card {
  height: 100%;
  flex: 1 1 0;
  min-width: 0;
  border-radius: 0.8rem;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  gap: 8px;
  user-select: none;
}

.nav-card-label {
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  color: var(--text-muted);
}

.nav-card-links {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-card-link {
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  letter-spacing: -0.01em;
}

.nav-card-link:hover {
  opacity: 0.7;
  transform: translateX(3px);
}

.nav-card-link-icon {
  font-size: 1.1em;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .card-nav-container {
    width: 94%;
    top: 1em;
  }
  
  .card-nav-top {
    padding: 0.5rem 1rem;
    justify-content: space-between;
  }

  .hamburger-menu {
    order: 2;
    padding: 0;
  }

  .logo-container {
    position: static;
    transform: none;
    order: 1;
  }

  .card-nav-cta-button {
    display: none;
  }

  .card-nav-content {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 0.6rem;
    bottom: 0;
    justify-content: flex-start;
  }

  .nav-card {
    height: auto;
    min-height: auto;
    flex: 1 1 auto;
    padding: 16px;
  }

  .nav-card-label {
    font-size: 0.9rem;
    margin-bottom: 8px;
  }

  .nav-card-link {
    font-size: 1.1rem;
    margin-bottom: 4px;
  }
  
  /* Give enough top padding to content so hero isn't hidden under the nav */
  body {
    padding-top: 80px;
  }
}
`;

fs.appendFileSync('c:/Users/karan/Stitchy_landing_page/styles.css', '\\n' + cssToAppend, 'utf8');
console.log('Appended CSS successfully.');
