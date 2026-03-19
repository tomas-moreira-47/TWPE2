/**
 * MÓDULO DO CARROSSEL
 * Gerencia o carrossel de imagens da página
 * Usa padrão Module Pattern para encapsulamento
 */

let Carrossel = (() => {
    // Variáveis privadas (encapsuladas)
    let slides = [];
    let prevBtn = null;
    let nextBtn = null;
    let indicadores = [];
    let currentIndex = 0;
    let interval = null;
    let isTransitioning = false;
    let config = { intervalo: 5000, transicao: 500 };

    /**
     * Inicializa o carrossel
     * @param {Object} opcoes - Opções de configuração (opcional)
     */
    const iniciar = (opcoes = {}) => {
        // Merge de configurações
        config = { ...config, ...opcoes };

        // Buscar elementos do DOM
        slides = document.querySelectorAll('.carrossel-slide');
        prevBtn = document.querySelector('.carrossel-prev');
        nextBtn = document.querySelector('.carrossel-next');
        const indicadoresContainer = document.querySelector('.carrossel-indicadores');

        if (!slides.length || !prevBtn || !nextBtn || !indicadoresContainer) return;

        // Criar indicadores
        criarIndicadores(indicadoresContainer);

        // Configurar eventos
        configurarEventos();

        // Iniciar com primeira imagem
        mostrarSlide(0);

        // Iniciar rotação automática
        iniciarAutoPlay();

        // Pausar ao passar o rato
        const carrossel = document.querySelector('.carrossel-container');
        carrossel.addEventListener('mouseenter', pausarAutoPlay);
        carrossel.addEventListener('mouseleave', iniciarAutoPlay);
    };

    /**
     * Cria os indicadores do carrossel
     * @param {HTMLElement} container - Container dos indicadores
     */
    const criarIndicadores = (container) => {
        slides.forEach((_, i) => {
            const indicador = document.createElement('span');
            indicador.classList.add('indicador');
            indicador.addEventListener('click', () => irParaSlide(i));
            container.appendChild(indicador);
        });
        indicadores = document.querySelectorAll('.indicador');
    };

    /**
     * Configura os eventos dos botões
     */
    const configurarEventos = () => {
        prevBtn.addEventListener('click', () => {
            slideAnterior();
            reiniciarAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            proximoSlide();
            reiniciarAutoPlay();
        });

        // Verificar carregamento das imagens
        slides.forEach((slide) => {
            const img = slide.querySelector('img');
            if (img && !img.complete) {
                img.addEventListener('error', () => {
                    console.error('Erro ao carregar imagem:', img.alt);
                    img.src = 'https://via.placeholder.com/1200x400?text=Imagem+Indisponivel';
                });
            }
        });
    };

    /**
     * Mostra um slide específico
     * @param {number} index - Índice do slide a mostrar
     */
    const mostrarSlide = (index) => {
        if (isTransitioning) return;
        isTransitioning = true;

        // Usando forEach (exemplo de uso)
        slides.forEach(slide => slide.classList.remove('active'));
        indicadores.forEach(ind => ind.classList.remove('active'));

        slides[index].classList.add('active');
        indicadores[index].classList.add('active');
        currentIndex = index;

        setTimeout(() => {
            isTransitioning = false;
        }, config.transicao);
    };

    /**
     * Avança para o próximo slide
     */
    const proximoSlide = () => {
        if (isTransitioning) return;
        const nextIndex = (currentIndex + 1) % slides.length;
        mostrarSlide(nextIndex);
    };

    /**
     * Volta para o slide anterior
     */
    const slideAnterior = () => {
        if (isTransitioning) return;
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        mostrarSlide(prevIndex);
    };

    /**
     * Vai para um slide específico
     * @param {number} index - Índice do slide
     */
    const irParaSlide = (index) => {
        if (isTransitioning || index === currentIndex) return;
        mostrarSlide(index);
        reiniciarAutoPlay();
    };

    /**
     * Inicia a rotação automática
     */
    const iniciarAutoPlay = () => {
        interval = setInterval(proximoSlide, config.intervalo);
    };

    /**
     * Pausa a rotação automática
     */
    const pausarAutoPlay = () => {
        clearInterval(interval);
    };

    /**
     * Reinicia a rotação automática
     */
    const reiniciarAutoPlay = () => {
        pausarAutoPlay();
        iniciarAutoPlay();
    };

    // API pública
    return {
        iniciar,
        proximoSlide,
        slideAnterior,
        irParaSlide
    };
})();

// Tornar disponível globalmente
window.Carrossel = Carrossel;