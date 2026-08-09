/* ==========================================================================
   Escola Estadual Culto à Ciência — Campinas/SP
   Script Principal do MVP (script.js)
   Trabalho de Conclusão de Curso (TCC)
   
   Sumário de Funcionalidades:
   1. CONTROLE DO MENU MOBILE (HAMBÚRGUER)
   2. ACESSIBILIDADE (FONTE E ALTO CONTRASTE)
   3. GERENCIAMENTO INDEPENDENTE DO ACERVO CULTURAL (FOTOS, OBJETOS E DOCUMENTOS)
   4. GERENCIAMENTO INDEPENDENTE DOS PROFESSORES (SEM LIGHTBOX)
   5. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   6. CHATBOT FLUTUANTE (COM MASCOTE CULTINHO)
   7. BOTÃO VOLTAR AO TOPO & ROLAGEM SUAVE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CONTROLE DO MENU MOBILE (HAMBÚRGUER)
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    const menuLinks = document.querySelectorAll('.header__link');

    function toggleMenu() {
        const estaAberto = mainNav.classList.contains('is-open');

        mainNav.classList.toggle('is-open');
        hamburgerBtn.classList.toggle('is-active');
        hamburgerBtn.setAttribute('aria-expanded', !estaAberto);
        
        if (!estaAberto && menuLinks.length > 0) {
            menuLinks[0].focus();
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMenu);
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });


    /* ==========================================================================
       2. ACESSIBILIDADE
       ========================================================================== */
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
            const contrasteAtivo = document.body.classList.contains('alto-contraste');
            localStorage.setItem('altoContrasteAtivo', contrasteAtivo);
        });

        if (localStorage.getItem('altoContrasteAtivo') === 'true') {
            document.body.classList.add('alto-contraste');
        }
    }


    /* ==========================================================================
       3. GERENCIAMENTO DO ACERVO CULTURAL (FOTOS, OBJETOS E DOCUMENTOS COM LEIA MAIS)
       ========================================================================== */
    const repositorioAcervo = {
        fotos: {
            tipo: "imagem",
            titulo: "Pasta: Fotografias Históricas",
            descricao: "Registros fotográficos do edifício centenário, eventos cívicos e turmas.",
            itens: [
                "Fachada Principal em 1920",
                "Primeira Turma de Formandos (1925)",
                "Desfile Cívico em Campinas (1940)",
                "Pátio Interno e Edifício Histórico"
            ]
        },
        objetos: {
            tipo: "imagem",
            titulo: "Pasta: Objetos Históricos",
            descricao: "Instrumentos científicos e equipamentos de precisão do século passado.",
            itens: [
                "Microscópio de Latão Europeu (1900)",
                "Telescópio Didático Antigo",
                "Balança de Precisão de Laboratório",
                "Mobiliário Escolar de Madeira Maciça"
            ]
        },
        documentos: {
            tipo: "texto",
            titulo: "Pasta: Documentos Históricos",
            descricao: "Registros oficiais, atas de reunião e arquivos históricos da instituição.",
            itens: [
                {
                    titulo: "Ata de Fundação Oficial (1873)",
                    resumo: "Registro manuscrito de fundação da Sociedade Culto à Ciência pelos membros fundadores em Campinas.",
                    completo: "No dia 13 de abril de 1873, cidadãos campineiros reuniram-se para formalizar a fundação da Sociedade Culto à Ciência. O documento destaca os princípios iluministas, a busca pelo ensino laico e o incentivo ao pensamento científico para a juventude da região."
                },
                {
                    titulo: "Primeiro Regimento Interno (1890)",
                    resumo: "Normas disciplinares, organização das matérias e diretrizes do corpo docente da época.",
                    completo: "O regimento estabelecia o horário das aulas, os deveres dos estudantes e a estrutura dos laboratórios de física e química. O código de convivência prezava pelo respeito mútuo, assiduidade e rigor acadêmico na formação dos alunos."
                },
                {
                    titulo: "Edição nº 01 do Jornal Estudantil (1915)",
                    resumo: "Primeiro informativo produzido exclusivamente pelos estudantes da escola.",
                    completo: "Publicado no início do século XX, o jornal trazia crônicas, poesias, debates sobre a política municipal de Campinas e notícias sobre os clubes de debates científicos organizados pelos alunos no contraturno escolar."
                }
            ]
        }
    };

    const modalAcervo = document.getElementById('modal-acervo');
    const modalAcervoTitulo = document.getElementById('modal-acervo-titulo');
    const modalAcervoDesc = document.getElementById('modal-acervo-desc');
    const modalAcervoGrid = document.getElementById('modal-acervo-grid');
    const modalAcervoClose = document.getElementById('modal-acervo-close');
    const modalAcervoBackdrop = document.getElementById('modal-acervo-backdrop');

    // Lightbox Exclusivo para o Acervo
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCaption = document.getElementById('lightbox-caption');

    let listaAtualAcervo = [];
    let indiceAcervoAtual = 0;

    function abrirLightboxAcervo(index, lista) {
        listaAtualAcervo = lista;
        indiceAcervoAtual = index;
        atualizarLightboxAcervo();
        if (lightbox) {
            lightbox.removeAttribute('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function fecharLightboxAcervo() {
        if (lightbox) {
            lightbox.setAttribute('hidden', '');
            document.body.style.overflow = '';
        }
    }

    function atualizarLightboxAcervo() {
        if (lightboxCaption && listaAtualAcervo[indiceAcervoAtual]) {
            lightboxCaption.textContent = `[ Acervo Ampliado: ${listaAtualAcervo[indiceAcervoAtual]} ]`;
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', fecharLightboxAcervo);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', fecharLightboxAcervo);

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            if (listaAtualAcervo.length === 0) return;
            indiceAcervoAtual = (indiceAcervoAtual - 1 + listaAtualAcervo.length) % listaAtualAcervo.length;
            atualizarLightboxAcervo();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            if (listaAtualAcervo.length === 0) return;
            indiceAcervoAtual = (indiceAcervoAtual + 1) % listaAtualAcervo.length;
            atualizarLightboxAcervo();
        });
    }

    function abrirPastaAcervo(categoria) {
        const dados = repositorioAcervo[categoria];
        if (!modalAcervo || !dados) return;

        modalAcervoTitulo.textContent = dados.titulo;
        modalAcervoDesc.textContent = dados.descricao;
        modalAcervoGrid.innerHTML = '';

        if (dados.tipo === "imagem") {
            dados.itens.forEach((nomeItem, index) => {
                const div = document.createElement('div');
                div.className = 'modal-acervo__item';
                div.innerHTML = `
                    <i class="fa-solid fa-camera-retro" aria-hidden="true"></i>
                    <span>${nomeItem}</span>
                `;
                div.addEventListener('click', () => {
                    abrirLightboxAcervo(index, dados.itens);
                });
                modalAcervoGrid.appendChild(div);
            });
        } else if (dados.tipo === "texto") {
            dados.itens.forEach((doc, index) => {
                const cardDoc = document.createElement('div');
                cardDoc.className = 'acervo__doc-card';
                cardDoc.innerHTML = `
                    <div class="acervo__placeholder-img">
                        <i class="fa-solid fa-file-lines" aria-hidden="true"></i>
                        <span>[ Documento ${index + 1} ]</span>
                    </div>
                    <div class="acervo__content">
                        <h4 class="acervo__title">${doc.titulo}</h4>
                        <p class="acervo__desc-short">${doc.resumo}</p>
                        <div class="acervo__doc-full" id="doc-texto-${index}" hidden>
                            <p>${doc.completo}</p>
                        </div>
                        <button type="button" class="btn-read-more" id="btn-doc-${index}">
                            Leia Mais <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                        </button>
                    </div>
                `;

                modalAcervoGrid.appendChild(cardDoc);

                const btnLeiaMais = cardDoc.querySelector(`#btn-doc-${index}`);
                const textoCompleto = cardDoc.querySelector(`#doc-texto-${index}`);

                btnLeiaMais.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const estaOculto = textoCompleto.hasAttribute('hidden');

                    if (estaOculto) {
                        textoCompleto.removeAttribute('hidden');
                        btnLeiaMais.innerHTML = 'Leia Menos <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>';
                    } else {
                        textoCompleto.setAttribute('hidden', '');
                        btnLeiaMais.innerHTML = 'Leia Mais <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>';
                    }
                });
            });
        }

        modalAcervo.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    }

    function fecharPastaAcervo() {
        if (modalAcervo) {
            modalAcervo.setAttribute('hidden', '');
            document.body.style.overflow = '';
        }
    }

    document.querySelectorAll('.acervo__item').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const categoria = card.getAttribute('data-category');
            if (categoria) abrirPastaAcervo(categoria);
        });
    });

    if (modalAcervoClose) modalAcervoClose.addEventListener('click', fecharPastaAcervo);
    if (modalAcervoBackdrop) modalAcervoBackdrop.addEventListener('click', fecharPastaAcervo);


    /* ==========================================================================
       4. GERENCIAMENTO DOS PROFESSORES (LISTA DE PROFESSORES SEM LIGHTBOX)
       ========================================================================== */
    const repositorioProfessores = {
        linguagens: {
            titulo: "Pasta: Professores de Linguagens",
            descricao: "Docentes das disciplinas de Língua Portuguesa, Literatura, Inglês e Artes.",
            professores: [
                { nome: "Prof. [ Nome do Professor ]", disciplina: "Língua Portuguesa" },
                { nome: "Profª. [ Nome da Professora ]", disciplina: "Literatura e Redação" },
                { nome: "Prof. [ Nome do Professor ]", disciplina: "Língua Inglesa" },
                { nome: "Profª. [ Nome da Professora ]", disciplina: "Artes Visuais" }
            ]
        },
        exatas: {
            titulo: "Pasta: Professores de Exatas",
            descricao: "Docentes das disciplinas de Matemática e Raciocínio Lógico.",
            professores: [
                { nome: "Prof. [ Nome do Professor ]", disciplina: "Matemática I" },
                { nome: "Profª. [ Nome da Professora ]", disciplina: "Matemática II e Álgebra" },
                { nome: "Prof. [ Nome do Professor ]", disciplina: "Raciocínio Lógico" }
            ]
        },
        humanas: {
            titulo: "Pasta: Professores de Ciências Humanas",
            descricao: "Docentes das disciplinas de História, Geografia, Filosofia e Sociologia.",
            professores: [
                { nome: "Prof. [ Nome do Professor ]", disciplina: "História Geral e do Brasil" },
                { nome: "Profª. [ Nome da Professora ]", disciplina: "Geografia e Geopolítica" },
                { nome: "Prof. [ Nome do Professor ]", disciplina: "Filosofia e Ética" },
                { nome: "Profª. [ Nome da Professora ]", disciplina: "Sociologia" }
            ]
        },
        natureza: {
            titulo: "Pasta: Professores de Ciências da Natureza",
            descricao: "Docentes das disciplinas de Física, Química e Biologia.",
            professores: [
                { nome: "Prof. [ Nome do Professor ]", disciplina: "Física Aplicada" },
                { nome: "Profª. [ Nome da Professora ]", disciplina: "Química Geral" },
                { nome: "Prof. [ Nome do Professor ]", disciplina: "Biologia e Meio Ambiente" }
            ]
        },
        tecnico: {
            titulo: "Pasta: Professores do Ensino Técnico",
            descricao: "Docentes dos itinerários técnicos de Desenvolvimento de Sistemas e Enfermagem.",
            professores: [
                { nome: "Prof. [ Nome do Professor ]", disciplina: "Lógica de Programação e Web" },
                { nome: "Profª. [ Nome da Professora ]", disciplina: "Anatomia e Práticas de Enfermagem" }
            ]
        }
    };

    const modalProfessores = document.getElementById('modal-professores');
    const modalProfessoresTitulo = document.getElementById('modal-professores-titulo');
    const modalProfessoresDesc = document.getElementById('modal-professores-desc');
    const modalProfessoresGrid = document.getElementById('modal-professores-grid');
    const modalProfessoresClose = document.getElementById('modal-professores-close');
    const modalProfessoresBackdrop = document.getElementById('modal-professores-backdrop');

    function abrirPastaProfessores(area) {
        const dados = repositorioProfessores[area];
        if (!modalProfessores || !dados) return;

        modalProfessoresTitulo.textContent = dados.titulo;
        modalProfessoresDesc.textContent = dados.descricao;
        modalProfessoresGrid.innerHTML = '';

        dados.professores.forEach((prof) => {
            const div = document.createElement('div');
            div.className = 'modal-professores__item';
            div.innerHTML = `
                <i class="fa-solid fa-chalkboard-user" aria-hidden="true"></i>
                <strong>${prof.nome}</strong>
                <small>${prof.disciplina}</small>
            `;
            modalProfessoresGrid.appendChild(div);
        });

        modalProfessores.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    }

    function fecharPastaProfessores() {
        if (modalProfessores) {
            modalProfessores.setAttribute('hidden', '');
            document.body.style.overflow = '';
        }
    }

    document.querySelectorAll('.professores__pasta-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const area = card.getAttribute('data-area');
            if (area) abrirPastaProfessores(area);
        });
    });

    if (modalProfessoresClose) modalProfessoresClose.addEventListener('click', fecharPastaProfessores);
    if (modalProfessoresBackdrop) modalProfessoresBackdrop.addEventListener('click', fecharPastaProfessores);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharPastaAcervo();
            fecharPastaProfessores();
            fecharLightboxAcervo();
        }
    });


    /* ==========================================================================
       5. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
       ========================================================================== */
    const formContato = document.getElementById('form-contato');

    if (formContato) {
        formContato.addEventListener('submit', (e) => {
            e.preventDefault();

            let formularioValido = true;

            const campoNome = document.getElementById('contato-nome');
            const campoTelefone = document.getElementById('contato-telefone');
            const campoEmail = document.getElementById('contato-email');
            const campoMensagem = document.getElementById('contato-mensagem');

            const erroNome = document.getElementById('erro-nome');
            const erroTelefone = document.getElementById('erro-telefone');
            const erroEmail = document.getElementById('erro-email');
            const erroMensagem = document.getElementById('erro-mensagem');
            const feedbackGeral = document.getElementById('form-feedback');

            erroNome.textContent = '';
            erroTelefone.textContent = '';
            erroEmail.textContent = '';
            erroMensagem.textContent = '';
            feedbackGeral.className = 'form-feedback';
            feedbackGeral.textContent = '';

            if (campoNome.value.trim().length < 3) {
                erroNome.textContent = 'Por favor, digite seu nome completo (mínimo de 3 caracteres).';
                formularioValido = false;
            }

            if (campoTelefone.value.trim().length < 8) {
                erroTelefone.textContent = 'Por favor, digite um número de telefone válido.';
                formularioValido = false;
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(campoEmail.value.trim())) {
                erroEmail.textContent = 'Por favor, insira um e-mail válido.';
                formularioValido = false;
            }

            if (campoMensagem.value.trim().length < 10) {
                erroMensagem.textContent = 'A mensagem precisa ter pelo menos 10 caracteres.';
                formularioValido = false;
            }

            if (formularioValido) {
                feedbackGeral.classList.add('form-feedback--success');
                feedbackGeral.textContent = 'Mensagem enviada com sucesso! A equipe da escola entrará em contato em breve.';
                formContato.reset();
            } else {
                feedbackGeral.classList.add('form-feedback--error');
                feedbackGeral.textContent = 'Por favor, corrija os campos indicados acima antes de enviar.';
            }
        });
    }


    /* ==========================================================================
       6. CHATBOT FLUTUANTE (COM MASCOTE CULTINHO)
       ========================================================================== */
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
                chatbotInput.focus();
            } else {
                chatbotWindow.setAttribute('hidden', '');
                chatbotToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (chatbotCloseBtn) {
        chatbotCloseBtn.addEventListener('click', () => {
            chatbotWindow.setAttribute('hidden', '');
            chatbotToggleBtn.setAttribute('aria-expanded', 'false');
        });
    }

    if (chatbotForm) {
        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const textoMensagem = chatbotInput.value.trim();

            if (textoMensagem !== '') {
                adicionarMensagemChatbot(textoMensagem, 'user');
                chatbotInput.value = '';

                setTimeout(() => {
                    const resposta = gerarRespostaMascote(textoMensagem);
                    adicionarMensagemChatbot(resposta, 'bot');
                }, 800);
            }
        });
    }

    function adicionarMensagemChatbot(texto, remetente) {
        const divMensagem = document.createElement('div');
        divMensagem.classList.add('chatbot__message', `chatbot__message--${remetente}`);
        
        const p = document.createElement('p');
        p.textContent = texto;
        divMensagem.appendChild(p);

        chatbotMessages.appendChild(divMensagem);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function gerarRespostaMascote(mensagem) {
        const msg = mensagem.toLowerCase();

        if (msg.includes('horario') || msg.includes('horário') || msg.includes('atendimento')) {
            return 'A secretaria atende de segunda a sexta-feira, das 07h00 às 19h00!';
        } else if (msg.includes('matricula') || msg.includes('matrícula') || msg.includes('vaga')) {
            return 'Para informações sobre matrículas e vagas, utilize o formulário de contato abaixo ou visite nossa secretaria!';
        } else if (msg.includes('itinerario') || msg.includes('itinerário') || msg.includes('curso') || msg.includes('integral')) {
            return 'Oferecemos Ensino Integral com itinerários em Desenvolvimento de Sistemas, Humanas, Exatas e Enfermagem!';
        } else if (msg.includes('cultinho') || msg.includes('mascote')) {
            return 'Eu sou o Cultinho, a corujinha mascote da E.E. Culto à Ciência! Represento a sabedoria e a inovação!';
        } else {
            return 'Obrigado por falar comigo! Esta é uma demonstração do assistente. Para contatos oficiais, use o formulário da página!';
        }
    }


    /* ==========================================================================
       7. BOTÃO VOLTAR AO TOPO & ROLAGEM SUAVE
       ========================================================================== */
    const btnVoltarTopo = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
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