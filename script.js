 const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // ── HAMBURGER ──
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ── SMOOTH SCROLL ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        });
    });

    // ── SCROLL REVEAL ──
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── FILTER PROJECTS ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            cards.forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.style.opacity = show ? '1' : '0.2';
                card.style.transform = show ? '' : 'scale(0.95)';
                card.style.pointerEvents = show ? '' : 'none';
                card.style.transition = 'all 0.35s ease';
                // Handle featured
                if (filter !== 'all' && card.classList.contains('featured')) {
                    card.style.gridColumn = show ? 'span 2' : 'span 1';
                } else if (filter === 'all') {
                    card.style.gridColumn = card.classList.contains('featured') ? 'span 2' : '';
                }
            });
        });
    });

    // ── WHATSAPP FORM ──
    document.getElementById('contactForm').addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !message) { alert('Por favor completa nombre y mensaje.'); return; }
        let msg = `*Nuevo mensaje desde AS.Desarrolladores:*%0A%0A`;
        msg += `*Nombre:* ${name}%0A`;
        if (phone) msg += `*Teléfono:* ${phone}%0A`;
        msg += `*Mensaje:*%0A${message}`;
        window.open(`https://wa.me/584246018457?text=${msg}`, '_blank');
        e.target.reset();
    });

    // ── YEAR ──
    document.getElementById('year').textContent = new Date().getFullYear();