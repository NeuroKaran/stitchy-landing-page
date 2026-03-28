document.getElementById("year").textContent = new Date().getFullYear();

// Keep FAQ behavior clean: one item open at a time
const detailsList = Array.from(document.querySelectorAll(".faq details"));
detailsList.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    detailsList.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close the menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Intersection Observer for Scroll Animations
const observeElements = document.querySelectorAll(".reveal-on-scroll");

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    } else {
      entry.target.classList.remove("animate");
    }
  });
}, observerOptions);

observeElements.forEach((el) => {
  observer.observe(el);
});

// CardSwap Animation Logic
function initCardSwap() {
  const container = document.querySelector('.card-swap-container');
  const cards = Array.from(document.querySelectorAll('.card-swap-container .card'));
  if (!container || cards.length === 0 || typeof gsap === 'undefined') return;

  const cardDistance = 60;
  const verticalDistance = 70;
  const delay = 5000;
  const skewAmount = 6;
  const pauseOnHover = true;

  const config = {
    ease: 'elastic.out(0.6,0.9)',
    durDrop: 2,
    durMove: 2,
    durReturn: 2,
    promoteOverlap: 0.9,
    returnDelay: 0.05
  };

  const makeSlot = (i, distX, distY, total) => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
  });

  const placeNow = (el, slot, skew) =>
    gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      skewY: skew,
      transformOrigin: 'center center',
      zIndex: slot.zIndex,
      force3D: true
    });

  const total = cards.length;
  let order = Array.from({ length: total }, (_, i) => i);
  let tlRef = null;
  let intervalRef = null;

  cards.forEach((card, i) => placeNow(card, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

  function swap() {
    if (order.length < 2) return;

    const [front, ...rest] = order;
    const elFront = cards[front];
    const tl = gsap.timeline();
    tlRef = tl;

    tl.to(elFront, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = cards[idx];
      const slot = makeSlot(i, cardDistance, verticalDistance, total);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `promote+=${i * 0.15}`
      );
    });

    const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      },
      undefined,
      'return'
    );
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );

    tl.call(() => {
      order = [...rest, front];
    });
  }

  // Initial call using set timeout to allow DOM/styles to settle
  setTimeout(() => {
    swap();
    intervalRef = setInterval(swap, delay);
  }, 1000);

  if (pauseOnHover) {
    const pause = () => {
      tlRef?.pause();
      clearInterval(intervalRef);
    };
    const resume = () => {
      tlRef?.play();
      intervalRef = setInterval(swap, delay);
    };
    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
  }
}

// ===== GSAP CARD NAV LOGIC =====
function initCardNav() {
  const navContainer = document.getElementById('globalNav');
  const hamburger = document.getElementById('hamburgerMenu');
  const content = document.getElementById('cardNavContent');
  const cards = Array.from(document.querySelectorAll('.nav-card'));

  if (!navContainer || !hamburger || !content || typeof gsap === 'undefined') return;

  let isExpanded = false;
  let tl = null;
  const ease = 'power3.out';

  function calculateHeight() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      // Temporarily make visible to measure
      const wasVisible = content.style.visibility;
      const wasPointer = content.style.pointerEvents;
      const wasPos = content.style.position;
      const wasHeight = content.style.height;

      content.style.visibility = 'visible';
      content.style.pointerEvents = 'auto';
      content.style.position = 'static';
      content.style.height = 'auto';

      content.offsetHeight; // force reflow

      const topBar = 60;
      const padding = 16;
      const contentHeight = content.scrollHeight;

      content.style.visibility = wasVisible;
      content.style.pointerEvents = wasPointer;
      content.style.position = wasPos;
      content.style.height = wasHeight;

      return topBar + contentHeight + padding;
    }
    return 260; // Desktop default expanded height
  }

  function createTimeline() {
    gsap.set(navContainer, { height: 60, overflow: 'hidden' });
    gsap.set(cards, { y: 50, opacity: 0 });

    const newTl = gsap.timeline({ paused: true });

    newTl.to(navContainer, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    newTl.to(cards, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return newTl;
  }

  // Init Timeline
  tl = createTimeline();

  // Resize handler
  window.addEventListener('resize', () => {
    if (isExpanded) {
      const newHeight = calculateHeight();
      gsap.set(navContainer, { height: newHeight });

      tl.kill();
      tl = createTimeline();
      tl.progress(1);
    } else {
      tl.kill();
      tl = createTimeline();
    }
  });

  // Toggle handler
  hamburger.addEventListener('click', () => {
    if (!isExpanded) {
      hamburger.classList.add('open');
      navContainer.classList.add('open');
      isExpanded = true;
      tl.play(0);
    } else {
      hamburger.classList.remove('open');
      tl.eventCallback('onReverseComplete', () => {
        navContainer.classList.remove('open');
      });
      tl.reverse();
      isExpanded = false;
    }
  });

  // Scroll handler for auto-hiding navbar
  const cardNavContainer = document.querySelector('.card-nav-container');
  if (cardNavContainer) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      // Don't hide if menu is expanded
      if (isExpanded) {
        lastScrollY = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY <= 100) {
        cardNavContainer.classList.remove('nav-hidden');
      } else if (currentScrollY > lastScrollY + 5) {
        // Scrolling down past threshold
        cardNavContainer.classList.add('nav-hidden');
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling up
        cardNavContainer.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  }
}

// Ensure GSAP is loaded first before running this
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap !== 'undefined') {
    initCardSwap();
    initCardNav();
  } else {
    // wait for it
    const checkGsap = setInterval(() => {
      if (typeof gsap !== 'undefined') {
        clearInterval(checkGsap);
        initCardSwap();
        initCardNav();
      }
    }, 100);
  }
});

