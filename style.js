/* ==========================================================================
   O COMANDANTE — Portfólio pessoal
   JavaScript puro: menu mobile, scroll, animações e painel de status
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------- 1. Menu mobile ----------------------------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  function closeNav() {
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleNav() {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  navToggle.addEventListener('click', toggleNav);

  // Fecha o menu ao clicar em qualquer link (útil no mobile)
  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  // Fecha o menu com a tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* -------------------- 2. Header com fundo ao rolar ---------------------- */
  const header = document.getElementById('header');

  function updateHeaderState() {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }

  updateHeaderState();

  /* ------------- 3. Barra de progresso dupla (ouro / ciano) --------------- */
  const progressGold = document.getElementById('progressGold');
  const progressCyan = document.getElementById('progressCyan');

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? scrollTop / docHeight : 0;

    // A trilha "ouro" recua da direita para o centro; a "ciano" avança do
    // centro para a direita — juntas formam uma única barra de progresso.
    progressGold.style.transform = `scaleX(${ratio})`;
    progressCyan.style.transform = `scaleX(${ratio})`;
  }

  /* ---------------------- 4. Botão "voltar ao topo" ------------------------ */
  const toTopBtn = document.getElementById('toTop');

  function updateToTopVisibility() {
    toTopBtn.classList.toggle('is-visible', window.scrollY > 600);
  }

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Agrupa os listeners de scroll para performance (um único handler)
  window.addEventListener('scroll', () => {
    updateHeaderState();
    updateProgress();
    updateToTopVisibility();
  }, { passive: true });

  /* ------------------- 5. Rolagem suave para âncoras internas -------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return; // ignora "#" vazio

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 72;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });

  /* --------------------- 6. Relógio local — Teresina (PI) ------------------ */
  const localTimeEl = document.getElementById('localTime');

  function updateLocalTime() {
    const now = new Date();
    // Teresina está no fuso horário America/Fortaleza (UTC-3)
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Fortaleza',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    localTimeEl.textContent = formatter.format(now);
  }

  updateLocalTime();
  setInterval(updateLocalTime, 1000);

  /* ------------------- 7. Ano automático no rodapé -------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------- 8. Animações ao rolar (Intersection Observer) ----------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ------------- 9. Barras de habilidade animadas ao entrar em vista -------- */
  const skillsGrid = document.querySelector('.skills__grid');

  if (skillsGrid) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillsGrid.classList.add('is-filled');
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsGrid);
  }

});