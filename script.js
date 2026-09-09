/* ==========================================================================
   MAYANK RAJ — SENIOR PRODUCT DESIGNER PORTFOLIO
   Interactive Client-Side Systems & Micro-Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 01. ONE-CLICK EMAIL COPY WITH TOAST ── */
  const copyButtons = document.querySelectorAll('[data-copy-email]');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'mayank58.singh@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  /* ── 02. ONE-CLICK PHONE COPY WITH TOAST ── */
  const copyPhoneButtons = document.querySelectorAll('[data-copy-phone]');

  copyPhoneButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '+91 9015119802';
      navigator.clipboard.writeText(phone).then(() => {
        showToast(`Copied ${phone} to clipboard`);
      }).catch(() => {
        showToast(`Phone: ${phone}`);
      });
    });
  });

  /* ── 03. MOBILE NAVIGATION TOGGLE ── */
  const navToggle = document.getElementById('navToggle');
  const navMobileMenu = document.getElementById('navMobileMenu');

  const closeMobileMenu = () => {
    if (!navToggle || !navMobileMenu) return;
    navToggle.classList.remove('active');
    navMobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const openMobileMenu = () => {
    if (!navToggle || !navMobileMenu) return;
    navToggle.classList.add('active');
    navMobileMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
  };

  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close when any mobile nav link is clicked
  document.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  // Also close mobile menu when clicking mobile action buttons inside the drawer
  if (navMobileMenu) {
    navMobileMenu.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => closeMobileMenu());
    });
  }

  // Close on outside click
  document.addEventListener('click', (e) => {
    const header = document.getElementById('mainNav');
    if (header && !header.contains(e.target) && navMobileMenu && navMobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMobileMenu && navMobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* ── 04. RESUME MODAL HANDLERS ── */
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtns = document.querySelectorAll('[data-open-resume]');
  const closeResumeBtns = document.querySelectorAll('[data-close-resume]');

  const openResume = () => {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeResume = () => {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openResumeBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openResume();
  }));

  closeResumeBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeResume();
  }));

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal?.classList.contains('active')) {
      closeResume();
    }
  });

  /* ── 05. INTERACTIVE BEFORE/AFTER PROPERTY SLIDER (PROPTIFI) ── */
  const baContainers = document.querySelectorAll('.ba-container');

  baContainers.forEach(container => {
    const afterOverlay = container.querySelector('.ba-after');
    const handle = container.querySelector('.ba-slider-handle');
    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = container.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      let percentage = (offsetX / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      if (afterOverlay) afterOverlay.style.width = `${percentage}%`;
      if (handle) handle.style.left = `${percentage}%`;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(clientX);
    };

    const stopDragging = () => {
      isDragging = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', stopDragging);
    };

    const startDragging = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(clientX);
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('touchend', stopDragging);
    };

    container.addEventListener('mousedown', startDragging);
    container.addEventListener('touchstart', startDragging, { passive: true });
  });

  /* ── 06. DESIGN SYSTEM TOKEN & COMPONENT INSPECTOR (NIMBUS) ── */
  const dsTabBtns = document.querySelectorAll('.ds-tab-btn');
  const dsPreviewPanel = document.getElementById('dsPreviewPanel');

  const dsContentMap = {
    buttons: `
      <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:center;">
        <button class="btn-primary" style="padding:8px 16px; font-size:0.8rem;">Primary Action</button>
        <button class="btn-secondary" style="padding:8px 16px; font-size:0.8rem;">Secondary Action</button>
        <button style="padding:8px 16px; font-size:0.8rem; background:rgba(244,63,94,0.12); color:#f43f5e; border:1px solid rgba(244,63,94,0.3); border-radius:6px; font-weight:600; cursor:pointer;">Destructive</button>
        <button style="padding:8px 16px; font-size:0.8rem; background:rgba(255,255,255,0.03); color:#64748b; border:1px solid rgba(255,255,255,0.06); border-radius:6px; cursor:not-allowed;" disabled>Disabled State</button>
      </div>
    `,
    inputs: `
      <div style="width:100%; max-width:340px; display:flex; flex-direction:column; gap:10px;">
        <div>
          <label style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-secondary); display:block; margin-bottom:4px;">label.input.default</label>
          <input type="text" value="api_gateway_us_east_1" style="width:100%; background:var(--surface); border:1px solid var(--border-strong); border-radius:6px; padding:8px 12px; font-family:var(--font-mono); font-size:0.8rem; color:var(--text-primary); outline:none;" readonly />
        </div>
        <div>
          <label style="font-family:var(--font-mono); font-size:0.7rem; color:var(--emerald); display:block; margin-bottom:4px;">label.input.success (Validated)</label>
          <input type="text" value="cluster-prod-04.ready" style="width:100%; background:rgba(16,185,129,0.04); border:1px solid var(--emerald); border-radius:6px; padding:8px 12px; font-family:var(--font-mono); font-size:0.8rem; color:var(--text-primary); outline:none;" readonly />
        </div>
      </div>
    `,
    badges: `
      <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:center;">
        <span class="badge-tag indigo">Status: In Review</span>
        <span class="badge-tag emerald">&#9679; Operational (99.9%)</span>
        <span class="badge-tag amber">&#9650; Degraded Latency</span>
        <span class="badge-tag sky">v2.4.0 Release</span>
        <span class="badge-tag">Role: Administrator</span>
      </div>
    `,
    tokens: `
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(80px,1fr)); gap:8px; width:100%;">
        <div style="background:#6366f1; border-radius:6px; padding:12px 8px; text-align:center;">
          <div style="font-family:var(--font-mono); font-size:0.65rem; color:#fff; font-weight:700;">--brand-500</div>
          <div style="font-family:var(--font-mono); font-size:0.6rem; color:rgba(255,255,255,0.7);">#6366F1</div>
        </div>
        <div style="background:#10b981; border-radius:6px; padding:12px 8px; text-align:center;">
          <div style="font-family:var(--font-mono); font-size:0.65rem; color:#fff; font-weight:700;">--success-500</div>
          <div style="font-family:var(--font-mono); font-size:0.6rem; color:rgba(255,255,255,0.7);">#10B981</div>
        </div>
        <div style="background:#f59e0b; border-radius:6px; padding:12px 8px; text-align:center;">
          <div style="font-family:var(--font-mono); font-size:0.65rem; color:#000; font-weight:700;">--warning-500</div>
          <div style="font-family:var(--font-mono); font-size:0.6rem; color:rgba(0,0,0,0.7);">#F59E0B</div>
        </div>
        <div style="background:#1e293b; border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:12px 8px; text-align:center;">
          <div style="font-family:var(--font-mono); font-size:0.65rem; color:#fff; font-weight:700;">--surface-300</div>
          <div style="font-family:var(--font-mono); font-size:0.6rem; color:#94a3b8;">#1E293B</div>
        </div>
      </div>
    `
  };

  dsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dsTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.dsTab;
      if (dsPreviewPanel && dsContentMap[key]) {
        dsPreviewPanel.innerHTML = dsContentMap[key];
      }
    });
  });

  /* ── 07. PROJECT DIRECTORY FILTER TABS ── */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const dirCards = document.querySelectorAll('.dir-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      dirCards.forEach(card => {
        const cat = card.dataset.cat;
        const match = filter === 'all' || cat === filter;
        card.style.display = match ? 'flex' : 'none';
      });
    });
  });

  /* ── 08. ACTIVE NAVIGATION SPY & SMOOTH SCROLL ── */
  const navLinks = document.querySelectorAll('.nav-link-item[data-nav-target]');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.navTarget === id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  // Smooth scroll with dynamic header height offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#resumeModal') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        closeMobileMenu();
        const header = document.getElementById('mainNav') || document.querySelector('.cs-nav');
        const headerOffset = header ? header.offsetHeight + 8 : 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── 09. CAROUSEL INIT ── */
  const carouselEl = document.querySelector('#carouselExampleControls');
  if (carouselEl) {
    new bootstrap.Carousel(carouselEl, {
      interval: 2000,
      wrap: true
    });
  }
  

  

});


