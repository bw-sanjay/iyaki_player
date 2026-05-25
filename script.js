// Cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
    const animRing = () => { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); };
    animRing();

    // Nav scroll
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 60); });

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => obs.observe(el));

    // Stagger reveal children
    document.querySelectorAll('.features-grid .feat-card').forEach((card, i) => {
      card.style.transitionDelay = (i * 0.07) + 's';
    });

    // Download Count Logic
    const DL_COUNT_KEY = 'iyaki_download_count';
    const DEFAULT_DL_COUNT = 14285;

    let currentCount = localStorage.getItem(DL_COUNT_KEY);
    if (!currentCount) {
      currentCount = DEFAULT_DL_COUNT;
      localStorage.setItem(DL_COUNT_KEY, currentCount);
    } else {
      currentCount = parseInt(currentCount, 10);
    }

    const updateDlDisplay = (count) => {
      const el = document.getElementById('mac-dl-count');
      if (el) {
        el.textContent = count.toLocaleString();
      }
    };

    updateDlDisplay(currentCount);

    const macDlLink = document.getElementById('mac-download-link');
    if (macDlLink) {
      macDlLink.addEventListener('click', () => {
        currentCount += 1;
        localStorage.setItem(DL_COUNT_KEY, currentCount);
        updateDlDisplay(currentCount);
      });
    }