document.addEventListener('DOMContentLoaded', function () {
    'use strict';

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
            if (extraMissao.style.display === 'none') {
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
            // Submissão bem-sucedida
            successDiv.style.display = 'block';
            form.reset();
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 5000);
        }
    });
});