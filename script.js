document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. CONTROLE DO MENU MOBILE
       ============================================================ */

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    const menuLinks = document.querySelectorAll('.header__link');

    function toggleMenu() {
        if (!mainNav || !hamburgerBtn) return;

        const estaAberto = mainNav.classList.contains('is-open');

        mainNav.classList.toggle('is-open');
        hamburgerBtn.classList.toggle('is-active');
        hamburgerBtn.setAttribute('aria-expanded', String(!estaAberto));

        if (!estaAberto && menuLinks.length > 0) {
            menuLinks[0].focus();
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMenu);
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav && mainNav.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

    /* ============================================================
       2. ACESSIBILIDADE
       ============================================================ */

    const btnAumentarFonte = document.getElementById('btn-aumentar-fonte');
    const btnRestaurarFonte = document.getElementById('btn-restaurar-fonte');
    const btnDiminuirFonte = document.getElementById('btn-diminuir-fonte');

    let tamanhoFonteAtual = 100;
    const limiteMaximoFonte = 125;
    const limiteMinimoFonte = 90;

    if (btnAumentarFonte) {
        btnAumentarFonte.addEventListener('click', () => {
            if (tamanhoFonteAtual < limiteMaximoFonte) {
                tamanhoFonteAtual += 5;
                document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
            }
        });
    }

    if (btnRestaurarFonte) {
        btnRestaurarFonte.addEventListener('click', () => {
            tamanhoFonteAtual = 100;
            document.documentElement.style.fontSize = '100%';
        });
    }

    if (btnDiminuirFonte) {
        btnDiminuirFonte.addEventListener('click', () => {
            if (tamanhoFonteAtual > limiteMinimoFonte) {
                tamanhoFonteAtual -= 5;
                document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
            }
        });
    }

    const btnAltoContraste = document.getElementById('btn-alto-contraste');

    if (btnAltoContraste) {
        btnAltoContraste.addEventListener('click', () => {
            document.body.classList.toggle('alto-contraste');

            const contrasteAtivo =
                document.body.classList.contains('alto-contraste');

            localStorage.setItem('altoContrasteAtivo', String(contrasteAtivo));
        });

        if (localStorage.getItem('altoContrasteAtivo') === 'true') {
            document.body.classList.add('alto-contraste');
        }
    }

    /* ============================================================
       3. FILTROS DOS PROFESSORES
       ============================================================ */

    const botoesFiltroProfessores = document.querySelectorAll('.professores__filter-btn');
    const cardsProfessores = document.querySelectorAll('.professores__card');

    botoesFiltroProfessores.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesFiltroProfessores.forEach(btn =>
                btn.classList.remove('professores__filter-btn--active')
            );

            botao.classList.add('professores__filter-btn--active');

            const areaSelecionada = botao.getAttribute('data-filter');

            cardsProfessores.forEach(card => {
                const areaCard = card.getAttribute('data-area');

                if (areaSelecionada === 'todos' || areaSelecionada === areaCard) {
                    card.classList.remove('is-hidden');
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });

    /* ============================================================
       4. FILTROS DO ACERVO
       ============================================================ */

    const botoesFiltroAcervo = document.querySelectorAll('.acervo__filter-btn');
    const itensAcervo = document.querySelectorAll('.acervo__item');

    botoesFiltroAcervo.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesFiltroAcervo.forEach(btn =>
                btn.classList.remove('acervo__filter-btn--active')
            );

            botao.classList.add('acervo__filter-btn--active');

            const categoriaSelecionada = botao.getAttribute('data-filter');

            itensAcervo.forEach(item => {
                const categoriaItem = item.getAttribute('data-category');

                if (categoriaSelecionada === 'todos' || categoriaSelecionada === categoriaItem) {
                    item.classList.remove('is-hidden');
                } else {
                    item.classList.add('is-hidden');
                }
            });
        });
    });

    /* ============================================================
       5. LIGHTBOX DA GALERIA
       ============================================================ */

    const galeriaItens = document.querySelectorAll('.galeria__item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCaption = document.getElementById('lightbox-caption');

    let indiceAtual = 0;

    const legendasGaleria = [
        'Fachada Principal da Escola',
        'Laboratório Multidisciplinar',
        'Pátio Interno e Área Verde',
        'Quadra Poliesportiva Coberta',
        'Biblioteca e Espaço de Estudos',
        'Sala de Aula e Ambientes de Aprendizagem'
    ];

    function atualizarLightbox() {
        if (lightboxCaption && legendasGaleria[indiceAtual]) {
            lightboxCaption.textContent =
                `[ Foto ${indiceAtual + 1}: ${legendasGaleria[indiceAtual]} ]`;
        }
    }

    function abrirLightbox(index) {
        if (!lightbox) return;

        indiceAtual = index;
        atualizarLightbox();
        lightbox.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    }

    function fecharLightbox() {
        if (!lightbox) return;

        lightbox.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    function imagemAnterior() {
        indiceAtual =
            (indiceAtual - 1 + legendasGaleria.length) %
            legendasGaleria.length;

        atualizarLightbox();
    }

    function proximaImagem() {
        indiceAtual =
            (indiceAtual + 1) %
            legendasGaleria.length;

        atualizarLightbox();
    }

    galeriaItens.forEach((item, index) => {
        item.addEventListener('click', () => abrirLightbox(index));
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', fecharLightbox);
    }

    if (lightboxBackdrop) {
        lightboxBackdrop.addEventListener('click', fecharLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', imagemAnterior);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', proximaImagem);
    }

    document.addEventListener('keydown', e => {
        if (lightbox && !lightbox.hasAttribute('hidden')) {
            if (e.key === 'Escape') fecharLightbox();
            if (e.key === 'ArrowLeft') imagemAnterior();
            if (e.key === 'ArrowRight') proximaImagem();
        }
    });

    /* ============================================================
       6. FORMULÁRIO DE CONTATO
       ============================================================ */

    const formularioContato = document.getElementById('contact-form');

    if (formularioContato) {
        formularioContato.addEventListener('submit', e => {
            e.preventDefault();

            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');

            if (!nome || !email || !mensagem) return;

            if (
                nome.value.trim() === '' ||
                email.value.trim() === '' ||
                mensagem.value.trim() === ''
            ) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            alert('Mensagem enviada com sucesso!');
            formularioContato.reset();
        });
    }

    /* ============================================================
       7. CHATBOT FLUTUANTE - CULTINHO
       ============================================================ */

    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    if (chatbotToggleBtn && chatbotWindow) {
        chatbotToggleBtn.addEventListener('click', () => {
            const estaOculto = chatbotWindow.hasAttribute('hidden');

            if (estaOculto) {
                chatbotWindow.removeAttribute('hidden');
                chatbotToggleBtn.setAttribute('aria-expanded', 'true');

                if (chatbotInput) {
                    chatbotInput.focus();
                }
            } else {
                chatbotWindow.setAttribute('hidden', '');
                chatbotToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (chatbotCloseBtn) {
        chatbotCloseBtn.addEventListener('click', () => {
            if (chatbotWindow) {
                chatbotWindow.setAttribute('hidden', '');
            }

            if (chatbotToggleBtn) {
                chatbotToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (chatbotForm && chatbotInput) {
        chatbotForm.addEventListener('submit', e => {
            e.preventDefault();

            const textoMensagem = chatbotInput.value.trim();

            if (textoMensagem === '') return;

            adicionarMensagemChatbot(textoMensagem, 'user');
            chatbotInput.value = '';

            setTimeout(() => {
                const resposta = gerarRespostaMascote(textoMensagem);
                adicionarMensagemChatbot(resposta, 'bot');
            }, 800);
        });
    }

    function adicionarMensagemChatbot(texto, remetente) {
        if (!chatbotMessages) return;

        const divMensagem = document.createElement('div');
        divMensagem.classList.add(
            'chatbot__message',
            `chatbot__message--${remetente}`
        );

        const p = document.createElement('p');
        p.textContent = texto;

        divMensagem.appendChild(p);
        chatbotMessages.appendChild(divMensagem);

        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function gerarRespostaMascote(mensagem) {
        const msg = mensagem.toLowerCase();

        if (
            msg.includes('horario') ||
            msg.includes('horário') ||
            msg.includes('1') ||
            msg.includes('atendimento')
        ) {
            return 'A secretaria atende de segunda a sexta-feira, das 07h00 às 19h00!';
        }

        if (
            msg.includes('matricula') ||
            msg.includes('matrícula') ||
            msg.includes('2') ||
            msg.includes('vaga')
        ) {
            return 'Para informações sobre matrículas e vagas, utilize o formulário de contato abaixo ou visite nossa secretaria!';
        }

        if (
            msg.includes('itinerario') ||
            msg.includes('itinerário') ||
            msg.includes('curso') ||
            msg.includes('3') ||
            msg.includes('integral')
        ) {
            return 'Oferecemos Ensino Integral com itinerários em Desenvolvimento de Sistemas, Humanas, Exatas e Enfermagem!';
        }

        if (
            msg.includes('localização') ||
            msg.includes('4') 
        ) {
            return 'A escola se localiza no seguinte endereço, R. Culto à Ciência, 422 - Botafogo, Campinas - SP, 13020-060';
        }
        
        if (
            msg.includes('historia') ||
            msg.includes('história')||
            msg.includes('5') 
        ) {
            return 'O Colégio Estadual Culto à Ciência, em Campinas (SP), fundado em 1874, é a escola mais antiga do Brasil a funcionar ininterruptamente no mesmo prédio. Criado por maçons da Loja Independência para promover o ensino laico e científico baseado no positivismo, o colégio é tombado como patrimônio histórico e é referência em educação, famoso por sua arquitetura clássica francesa e acervo centenário';
        }

        if (
            msg.includes('cultinho') ||
            msg.includes('7') ||
            msg.includes('mascote')
        ) {
            return 'Eu sou o Cultinho, a corujinha mascote da E.E. Culto à Ciência! Represento a sabedoria e a inovação!';
        }

        if (
            msg.includes('Acolhimento') ||
            msg.includes('6') 
        ) {
            return 'A escola possui um acolhimento feito pelos laranjinhas que são alunos da 3° e 2° séries, eles bucam sempre acolher os novos alunos do Culto à Ciência com jogos, perguntas e conversas entre os laranjinhas e os novos alunos. ';
        }

        return 'Obrigado por falar comigo! Esta é uma demonstração do assistente. Para contatos oficiais, use o formulário da página!';
    }

    /* ============================================================
       8. BOTÃO VOLTAR AO TOPO
       ============================================================ */

    const btnVoltarTopo = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        if (!btnVoltarTopo) return;

        if (window.scrollY > 300) {
            btnVoltarTopo.classList.add('is-visible');
        } else {
            btnVoltarTopo.classList.remove('is-visible');
        }
    });

    if (btnVoltarTopo) {
        btnVoltarTopo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
