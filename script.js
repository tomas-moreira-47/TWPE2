// script.js
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ------------------------------
    // 1. GRÁFICO D3.js
    // ------------------------------
    function desenharGrafico() {
        if (typeof d3 === 'undefined') {
            console.warn('D3 não carregado');
            return;
        }

        // Dados fictícios: número de projetos por área
        const dados = [
            { area: 'Telemedicina', valor: 12 },
            { area: 'E-saúde', valor: 8 },
            { area: 'IA em medicina', valor: 15 },
            { area: 'Epidemiologia', valor: 10 }
        ];

        // Dimensões
        const largura = 600;
        const altura = 300;
        const margem = { top: 30, right: 30, bottom: 60, left: 50 };

        const svg = d3.select('#chart-container')
            .append('svg')
            .attr('width', largura)
            .attr('height', altura)
            .style('display', 'block')
            .style('margin', 'auto');

        // Escalas
        const x = d3.scaleBand()
            .domain(dados.map(d => d.area))
            .range([margem.left, largura - margem.right])
            .padding(0.2);

        const y = d3.scaleLinear()
            .domain([0, d3.max(dados, d => d.valor)])
            .nice()
            .range([altura - margem.bottom, margem.top]);

        // Barras
        svg.selectAll('.bar')
            .data(dados)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.area))
            .attr('y', d => y(d.valor))
            .attr('width', x.bandwidth())
            .attr('height', d => altura - margem.bottom - y(d.valor))
            .attr('fill', '#061D60')
            .on('mouseenter', function () {
                d3.select(this).attr('fill', '#3964e7');
            })
            .on('mouseleave', function () {
                d3.select(this).attr('fill', '#061D60');
            });

        // Eixo X
        svg.append('g')
            .attr('transform', `translate(0, ${altura - margem.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'rotate(-20)')
            .style('text-anchor', 'end')
            .attr('class', 'axis-label');

        // Eixo Y
        svg.append('g')
            .attr('transform', `translate(${margem.left}, 0)`)
            .call(d3.axisLeft(y));
    }
    desenharGrafico();

    // ------------------------------
    // 2. ANIMAÇÃO SCROLL (FADE-IN)
    // ------------------------------
    const elementosFade = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    elementosFade.forEach(el => observer.observe(el));

    // ------------------------------
    // 3. BOTÃO "SABER MAIS"
    // ------------------------------
    const btnSaberMais = document.getElementById('saber-mais-btn');
    const extraMissao = document.getElementById('extra-missao');
    if (btnSaberMais && extraMissao) {
        btnSaberMais.addEventListener('click', function () {
            if (extraMissao.style.display === 'none') {
                extraMissao.style.display = 'block';
                btnSaberMais.textContent = 'Saber menos';
            } else {
                extraMissao.style.display = 'none';
                btnSaberMais.textContent = 'Saber mais';
            }
        });
    }

    // ------------------------------
    // 4. BOTÃO "VOLTAR AO TOPO"
    // ------------------------------
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

    // ------------------------------
    // 5. VALIDAÇÃO DO FORMULÁRIO
    // ------------------------------
    const form = document.getElementById('contactForm');
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
        e.preventDefault(); // impede envio real

        let valido = true;

        // Limpar mensagens anteriores
        erroNome.textContent = '';
        erroEmail.textContent = '';
        erroAssunto.textContent = '';
        erroMensagem.textContent = '';
        successDiv.style.display = 'none';

        // Nome
        if (nome.value.trim() === '') {
            erroNome.textContent = 'O nome é obrigatório.';
            valido = false;
        }

        // Email
        if (email.value.trim() === '') {
            erroEmail.textContent = 'O email é obrigatório.';
            valido = false;
        } else if (!validarEmail(email.value.trim())) {
            erroEmail.textContent = 'Introduza um email válido (ex: nome@dominio.pt).';
            valido = false;
        }

        // Assunto
        if (assunto.value === '') {
            erroAssunto.textContent = 'Selecione uma opção.';
            valido = false;
        }

        // Mensagem
        if (mensagem.value.trim() === '') {
            erroMensagem.textContent = 'A mensagem não pode estar vazia.';
            valido = false;
        }

        if (valido) {
            // Simulação de submissão bem-sucedida
            successDiv.style.display = 'block';
            form.reset(); // opcional: limpa os campos
            // Esconder a mensagem de sucesso após 5 segundos (opcional)
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 5000);
        }
    });
});