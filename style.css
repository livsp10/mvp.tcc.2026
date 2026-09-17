document.addEventListener('DOMContentLoaded', () => {

    /* 1. Menu Mobile */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    const menuLinks = document.querySelectorAll('.header__link');

    function toggleMenu() {
        const estaAberto = mainNav.classList.contains('is-open');
        mainNav.classList.toggle('is-open');
        hamburgerBtn.classList.toggle('is-active');
        hamburgerBtn.setAttribute('aria-expanded', !estaAberto);
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
    menuLinks.forEach(link => link.addEventListener('click', () => { if (mainNav.classList.contains('is-open')) toggleMenu(); }));

    /* 2. Acessibilidade */
    let tamanhoFonteAtual = 100;
    document.getElementById('btn-aumentar-fonte')?.addEventListener('click', () => { if (tamanhoFonteAtual < 125) { tamanhoFonteAtual += 5; document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`; } });
    document.getElementById('btn-restaurar-fonte')?.addEventListener('click', () => { tamanhoFonteAtual = 100; document.documentElement.style.fontSize = '100%'; });
    document.getElementById('btn-diminuir-fonte')?.addEventListener('click', () => { if (tamanhoFonteAtual > 90) { tamanhoFonteAtual -= 5; document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`; } });

    const btnAltoContraste = document.getElementById('btn-alto-contraste');
    if (btnAltoContraste) {
        btnAltoContraste.addEventListener('click', () => {
            document.body.classList.toggle('alto-contraste');
            localStorage.setItem('altoContrasteAtivo', document.body.classList.contains('alto-contraste'));
        });
        if (localStorage.getItem('altoContrasteAtivo') === 'true') document.body.classList.add('alto-contraste');
    }

    /* 3. Filtros de Professores */
    const botoesFiltroProf = document.querySelectorAll('.professores__filter-btn');
    const cardsProf = document.querySelectorAll('.professores__card');
    botoesFiltroProf.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesFiltroProf.forEach(btn => btn.classList.remove('professores__filter-btn--active'));
            botao.classList.add('professores__filter-btn--active');
            const area = botao.getAttribute('data-filter');
            cardsProf.forEach(card => {
                if (area === 'todos' || card.getAttribute('data-area') === area) card.classList.remove('is-hidden');
                else card.classList.add('is-hidden');
            });
        });
    });

    /* 4. Filtros de Acervo */
    const botoesFiltroAcervo = document.querySelectorAll('.acervo__filter-btn');
    const itensAcervo = document.querySelectorAll('.acervo__item');
    botoesFiltroAcervo.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesFiltroAcervo.forEach(btn => btn.classList.remove('acervo__filter-btn--active'));
            botao.classList.add('acervo__filter-btn--active');
            const cat = botao.getAttribute('data-filter');
            itensAcervo.forEach(item => {
                if (cat === 'todos' || item.getAttribute('data-category') === cat) item.classList.remove('is-hidden');
                else item.classList.add('is-hidden');
            });
        });
    });

    /* 5. Lightbox Galeria */
    const galeriaItens = document.querySelectorAll('.galeria__item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCaption = document.getElementById('lightbox-caption');
    let indiceAtual = 0;

    const legendas = ['Fachada Principal', 'Laboratório Multidisciplinar', 'Pátio Interno', 'Quadra Coberta', 'Biblioteca', 'Sala de Aula'];

    function abrirLightbox(i) {
        indiceAtual = i;
        lightboxCaption.textContent = `[ Foto ${indiceAtual + 1}: ${legendas[indiceAtual]} ]`;
        lightbox.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    }
    function fecharLightbox() {
        lightbox.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    galeriaItens.forEach((item, index) => item.addEventListener('click', () => abrirLightbox(index)));
    lightboxClose?.addEventListener('click', fecharLightbox);
    lightboxBackdrop?.addEventListener('click', fecharLightbox);
    lightboxPrev?.addEventListener('click', () => { indiceAtual = (indiceAtual - 1 + legendas.length) % legendas.length; lightboxCaption.textContent = `[ Foto ${indiceAtual + 1}: ${legendas[indiceAtual]} ]`; });
    lightboxNext?.addEventListener('click', () => { indiceAtual = (indiceAtual + 1) % legendas.length; lightboxCaption.textContent = `[ Foto ${indiceAtual + 1}: ${legendas[indiceAtual]} ]`; });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.hasAttribute('hidden') && e.key === 'Escape') fecharLightbox();
    });

    /* 6. Chatbot */
    const chatbotToggle = document.getElementById('chatbot-toggle-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close-btn');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    chatbotToggle?.addEventListener('click', () => chatbotWindow.toggleAttribute('hidden'));
    chatbotClose?.addEventListener('click', () => chatbotWindow.setAttribute('hidden', ''));

    chatbotForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = chatbotInput.value.trim();
        if (!texto) return;

        chatbotMessages.innerHTML += `<div class="chatbot__message chatbot__message--user"><p>${texto}</p></div>`;
        chatbotInput.value = '';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        setTimeout(() => {
            chatbotMessages.innerHTML += `<div class="chatbot__message chatbot__message--bot"><p>Obrigado pela mensagem! Esta é uma demonstração do assistente.</p></div>`;
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 600);
    });

    /* 7. Voltar ao Topo */
    const btnTopo = document.getElementById('back-to-top-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) btnTopo.classList.add('is-visible');
        else btnTopo.classList.remove('is-visible');
    });
    btnTopo?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
