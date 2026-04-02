
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));

    const chips = document.querySelectorAll('.skill-chip');
    const chipObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          chips.forEach((chip, i) => setTimeout(() => chip.classList.add('visible'), i * 90));
          chipObs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    if (chips.length) chipObs.observe(chips[0].parentElement);

    const counters = document.querySelectorAll('[data-count]');
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count);
        let start = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { el.textContent = target + '+'; clearInterval(timer); }
          else el.textContent = start + '+';
        }, 35);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObs.observe(c));

    /* PARTICLES */
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let dots = [];
    function resize() {
      canvas.width  = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initDots(); });
    function initDots() {
      dots = [];
      const n = Math.floor((canvas.width * canvas.height) / 14000);
      for (let i = 0; i < n; i++) {
        dots.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height,
          r: Math.random()*1.5+0.5, vx: (Math.random()-0.5)*0.3,
          vy: (Math.random()-0.5)*0.3, alpha: Math.random()*0.4+0.1 });
      }
    }
    initDots();
    function drawDots() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width; if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height; if (d.y > canvas.height) d.y = 0;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(200,169,110,${d.alpha})`; ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i+1; j < dots.length; j++) {
          const dx = dots[i].x-dots[j].x, dy = dots[i].y-dots[j].y;
          const dist = Math.sqrt(dx*dx+dy*dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(200,169,110,${0.06*(1-dist/100)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawDots);
    }
    drawDots();

    const tw = document.querySelector('.typewriter');
    if (tw) {
      const text = tw.textContent; tw.textContent = ''; let i = 0;
      setTimeout(() => {
        const t = setInterval(() => {
          tw.textContent += text[i++];
          if (i >= text.length) clearInterval(t);
        }, 90);
      }, 700);
    }