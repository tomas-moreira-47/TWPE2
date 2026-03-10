document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // CRIAR MENU HAMBÚRGUER PARA MOBILE
    const header = document.querySelector('header .container');
    const nav = document.querySelector('.nav');
    
    // Criar botão do menu hambúrguer
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    menuToggle.setAttribute('aria-label', 'Menu');
    menuToggle.setAttribute('role', 'button');
    menuToggle.setAttribute('tabindex', '0');
    
    // Inserir botão antes da nav
    header.insertBefore(menuToggle, nav);
    
    // Evento para abrir/fechar menu
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        // Animação do ícone
        const spans = this.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fechar menu ao clicar em um link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            nav.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // ANIMAÇÃO SCROLL (FADE-IN)
    const elementosFade = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    elementosFade.forEach(el => observer.observe(el));

    // BOTÃO "SABER MAIS"
    const btnSaberMais = document.getElementById('saber-mais-btn');
    const extraMissao = document.getElementById('extra-missao');
    if (btnSaberMais && extraMissao) {
        btnSaberMais.addEventListener('click', function () {
            if (extraMissao.style.display === 'none' || !extraMissao.style.display) {
                extraMissao.style.display = 'block';
                btnSaberMais.textContent = 'Saber menos';
            } else {
                extraMissao.style.display = 'none';
                btnSaberMais.textContent = 'Saber mais';
            }
        });
    }

    // BOTÃO "VOLTAR AO TOPO"
    const btnTopo = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            btnTopo.style.display = 'block';
        } else {
            btnTopo.style.display = 'none';
        }
    });

    btnTopo.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // VALIDAÇÃO DO FORMULÁRIO
    const form = document.getElementById('contactForm');
    if (form) {
        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const assunto = document.getElementById('assunto');
        const mensagem = document.getElementById('mensagem');
        const erroNome = document.getElementById('error-nome');
        const erroEmail = document.getElementById('error-email');
        const erroAssunto = document.getElementById('error-assunto');
        const erroMensagem = document.getElementById('error-mensagem');
        const successDiv = document.getElementById('form-success');

        function validarEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let valido = true;

            // Limpar mensagens anteriores
            erroNome.textContent = '';
            erroEmail.textContent = '';
            erroAssunto.textContent = '';
            erroMensagem.textContent = '';
            successDiv.style.display = 'none';
            
            // REMOVER CLASSES DE ERRO
            [nome, email, assunto, mensagem].forEach(campo => {
                if (campo) campo.classList.remove('input-error');
            });

            // Nome
            if (nome && nome.value.trim() === '') {
                erroNome.textContent = 'O nome é obrigatório.';
                nome.classList.add('input-error');
                valido = false;
            }

            // Email
            if (email) {
                if (email.value.trim() === '') {
                    erroEmail.textContent = 'O email é obrigatório.';
                    email.classList.add('input-error');
                    valido = false;
                } else if (!validarEmail(email.value.trim())) {
                    erroEmail.textContent = 'Introduza um email válido (ex: nome@dominio.pt).';
                    email.classList.add('input-error');
                    valido = false;
                }
            }

            // Assunto
            if (assunto && assunto.value === '') {
                erroAssunto.textContent = 'Selecione uma opção.';
                assunto.classList.add('input-error');
                valido = false;
            }

            // Mensagem
            if (mensagem && mensagem.value.trim() === '') {
                erroMensagem.textContent = 'A mensagem não pode estar vazia.';
                mensagem.classList.add('input-error');
                valido = false;
            }

            if (valido) {
                successDiv.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    successDiv.style.display = 'none';
                }, 5000);
            }
        });

        // Validação do formulário em tempo real
        [nome, email, assunto, mensagem].forEach(campo => {
            if (campo) {
                campo.addEventListener('blur', function() {
                    validarCampo(this);
                });

                campo.addEventListener('input', function() {
                    const errorSpan = document.getElementById(`error-${this.id}`);
                    if (errorSpan) {
                        errorSpan.textContent = '';
                    }
                    this.classList.remove('input-error');
                });
            }
        });

        function validarCampo(campo) {
            const errorSpan = document.getElementById(`error-${campo.id}`);
            if (!errorSpan) return true;

            if (campo.id === 'nome' && campo.value.trim() === '') {
                errorSpan.textContent = 'O nome é obrigatório.';
                campo.classList.add('input-error');
                return false;
            }

            if (campo.id === 'email') {
                if (campo.value.trim() === '') {
                    errorSpan.textContent = 'O email é obrigatório.';
                    campo.classList.add('input-error');
                    return false;
                } else if (!validarEmail(campo.value.trim())) {
                    errorSpan.textContent = 'Introduza um email válido.';
                    campo.classList.add('input-error');
                    return false;
                }
            }

            if (campo.id === 'assunto' && campo.value === '') {
                errorSpan.textContent = 'Selecione uma opção.';
                campo.classList.add('input-error');
                return false;
            }

            if (campo.id === 'mensagem' && campo.value.trim() === '') {
                errorSpan.textContent = 'A mensagem não pode estar vazia.';
                campo.classList.add('input-error');
                return false;
            }

            errorSpan.textContent = '';
            campo.classList.remove('input-error');
            return true;
        }
    }

    // GRÁFICO D3
    desenharGrafico();
});

function desenharGrafico() {
    // Verificar se o elemento existe
    const graficoDiv = document.getElementById('grafico-barras');
    if (!graficoDiv) return;

    // Limpar gráfico anterior se existir
    graficoDiv.innerHTML = '';

    // Dados fictícios: número de projetos por área
    const dados = [
        { area: 'Telemedicina', valor: 8 },
        { area: 'E-saúde', valor: 12 },
        { area: 'IA em medicina', valor: 5 },
        { area: 'Epidemiologia', valor: 10 }
    ];

    // Dimensões do gráfico (responsivas)
    const largura = graficoDiv.clientWidth || 600;
    const altura = 300;
    const margin = { top: 20, bottom: 50, left: 50, right: 20 };

    // Seleciona o div e cria o SVG
    const svg = d3.select("#grafico-barras")
        .append("svg")
        .attr("viewBox", `0 0 ${largura} ${altura}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "auto");

    // Escalas
    const x = d3.scaleBand()
        .domain(dados.map(d => d.area))
        .range([margin.left, largura - margin.right])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(dados, d => d.valor)])
        .nice()
        .range([altura - margin.bottom, margin.top]);

    // Barras
    svg.selectAll("rect")
        .data(dados)
        .enter()
        .append("rect")
        .attr("x", d => x(d.area))
        .attr("y", d => y(d.valor))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.valor))
        .attr("fill", "#3964e7")
        .attr("rx", 4)
        .attr("ry", 4);

    // Eixo X
    svg.append("g")
        .attr("transform", `translate(0, ${altura - margin.bottom})`)
        .call(d3.axisBottom(x))
        .style("font-size", "12px");

    // Eixo Y
    svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y))
        .style("font-size", "12px");
}

// Recalcular gráfico quando a janela for redimensionada
window.addEventListener('resize', function() {
    const graficoDiv = document.getElementById('grafico-barras');
    if (graficoDiv) {
        graficoDiv.innerHTML = '';
        desenharGrafico();
    }
});