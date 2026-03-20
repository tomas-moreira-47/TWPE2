/**
 * FICHEIRO PRINCIPAL
 * Inicializa todos os módulos da aplicação após o carregamento do DOM
 * Exemplo de decomposição funcional e ponto de entrada único
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    

    // Inicializar componentes de UI
    iniciarMenuHamburguer();
    iniciarAnimacaoScroll();
    iniciarBotoesSaberMais();
    iniciarBotaoTopo();

    // Inicializar módulos principais
    Carrossel.iniciar();
    Formulario.iniciar();
    Grafico.iniciar();
    ThreeAnimacao.iniciar();

    // Exemplo de uso das classes e HOFs (apenas para demonstração)
    demonstrarUsoClasses();
});

/**
 * Configura o menu hambúrguer para mobile
 */
function iniciarMenuHamburguer() {
    const header = document.querySelector('header .container');
    const nav = document.querySelector('.nav');
    if (!header || !nav) return;

    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    menuToggle.setAttribute('aria-label', 'Menu');
    header.insertBefore(menuToggle, nav);

    const toggleMenu = (forcarFecho = false) => {
        const isActive = nav.classList.contains('active');
        if (forcarFecho && isActive) {
            nav.classList.remove('active');
        } else {
            nav.classList.toggle('active');
        }
        atualizarIconeMenu(menuToggle, nav.classList.contains('active'));
    };

    menuToggle.addEventListener('click', () => toggleMenu());

    // Fechar ao clicar num link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(true));
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            toggleMenu(true);
        }
    });
}

/**
 * Atualiza o ícone do menu hambúrguer
 * @param {HTMLElement} menuToggle - Botão do menu
 * @param {boolean} isActive - Estado do menu
 */
function atualizarIconeMenu(menuToggle, isActive) {
    const spans = menuToggle.querySelectorAll('span');
    if (isActive) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

/**
 * Configura animação fade-in ao fazer scroll
 */
function iniciarAnimacaoScroll() {
    const elementos = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    elementos.forEach(el => observer.observe(el));
}

/**
 * Configura botões "Saber mais"
 */
function iniciarBotoesSaberMais() {
    document.querySelectorAll('.btn-saber-mais').forEach(btn => {
        btn.addEventListener('click', function () {
            const extra = this.previousElementSibling;
            if (extra) {
                const isHidden = extra.style.display === 'none' || !extra.style.display;
                extra.style.display = isHidden ? 'block' : 'none';
                this.textContent = isHidden ? 'Saber menos' : 'Saber mais';
            }
        });
    });
}

/**
 * Configura botão de voltar ao topo
 */
function iniciarBotaoTopo() {
    const btnTopo = document.getElementById('scroll-to-top');
    if (!btnTopo) return;

    window.addEventListener('scroll', () => {
        btnTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    btnTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Função de demonstração do uso de classes e HOFs
 * Apenas para mostrar que os conceitos foram aplicados
 */
function demonstrarUsoClasses() {
    // Criar projetos de exemplo
    const projetos = [
        new Projeto('Telemedicina Açores', 'Telemedicina', 24, ['Ana Silva', 'Carlos Santos']),
        new Projeto('E-saúde Integrada', 'E-saúde', 36, ['Maria Ferreira']),
        new Projeto('IA em Diagnóstico', 'IA em medicina', 18, ['João Costa', 'Sofia Pereira']),
        new Projeto('Estudo Epidemiológico', 'Epidemiologia', 30, ['Rui Gomes'])
    ];

    // Exemplo de filter
    const projetosIA = Projeto.filtrarPorArea(projetos, 'IA em medicina');
    console.log('Projetos de IA:', projetosIA);

    // Exemplo de map
    const nomesProjetos = Projeto.obterNomes(projetos);
    console.log('Nomes dos projetos:', nomesProjetos);

    // Exemplo de reduce
    const totalMeses = Projeto.duracaoTotal(projetos);
    console.log('Duração total (meses):', totalMeses);

    // Exemplo de reduce mais complexo
    const contagemAreas = Projeto.contarPorArea(projetos);
    console.log('Contagem por área:', contagemAreas);

    // Criar parceiros de exemplo
    const dadosParceiros = [
        { nome: 'Universidade de Coimbra', logo: 'imagens/uni_coimbra_logo.png', url: 'https://www.uc.pt', descricao: '...' },
        { nome: 'CUF', logo: 'imagens/cuf_logo.png', url: 'https://www.cuf.pt', descricao: '...' }
    ];

    const parceiros = Parceiro.criarDeDados(dadosParceiros);
    console.log('Parceiros criados:', parceiros);
}