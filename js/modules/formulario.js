/**
 * MÓDULO DO FORMULÁRIO DE CONTATO
 * Gerencia validação, submissão e interatividade do formulário
 * Utiliza classes, map, filter e outras HOFs
 */

let Formulario = (() => {
    // Elementos do DOM (privados)
    let elementos = {};

    /**
     * Inicializa o módulo
     */
    const iniciar = () => {
        cacheElementos();
        if (!elementos.form) return;
        configurarListeners();
    };

    /**
     * Cache de elementos do DOM
     */
    const cacheElementos = () => {
        const form = document.getElementById('contactForm');
        elementos = {
            form,
            nome: document.getElementById('nome'),
            email: document.getElementById('email'),
            telefone: document.getElementById('telefone'),
            codigoPais: document.getElementById('codigo-pais'),
            assunto: document.getElementById('assunto'),
            subassunto: document.getElementById('subassunto'),
            mensagem: document.getElementById('mensagem'),
            successDiv: document.getElementById('form-success'),
            // Spans de erro (mapeados por ID)
            erros: {
                nome: document.getElementById('error-nome'),
                email: document.getElementById('error-email'),
                telefone: document.getElementById('error-telefone'),
                assunto: document.getElementById('error-assunto'),
                subassunto: document.getElementById('error-subassunto'),
                mensagem: document.getElementById('error-mensagem')
            }
        };
    };

    /**
     * Configura todos os listeners do formulário
     */
    const configurarListeners = () => {
        // Listener do assunto principal
        elementos.assunto?.addEventListener('change', atualizarSubassunto);

        // Placeholder da mensagem
        elementos.mensagem?.addEventListener('focus', limparPlaceholder);
        elementos.mensagem?.addEventListener('blur', restaurarPlaceholder);

        // Submit do formulário
        elementos.form.addEventListener('submit', handleSubmit);

        // Validação em tempo real (usando filter e forEach)
        const camposParaValidar = [
            elementos.nome,
            elementos.email,
            elementos.telefone,
            elementos.assunto,
            elementos.subassunto,
            elementos.mensagem
        ].filter(campo => campo); // Exemplo de filter

        camposParaValidar.forEach(campo => {
            campo.addEventListener('blur', () => validarCampo(campo));
            campo.addEventListener('input', () => limparErro(campo));
        });
    };

    /**
     * Atualiza o dropdown de subassunto baseado no assunto selecionado
     */
    /**
     * Atualiza o dropdown de subassunto baseado no assunto selecionado
     */
    const atualizarSubassunto = () => {
        const assuntoSelecionado = elementos.assunto.value;
        const sub = elementos.subassunto;

        // Limpar opções atuais
        sub.innerHTML = '<option value="">Selecione um título</option>';

        // Dicionário de opções definido diretamente (sem depender de constantes externas)
        const OPCOES_SUBASSUNTO = {
            saude: ['Consulta médica', 'Exames', 'Tratamentos', 'Prevenção', 'Saúde pública'],
            formacao: ['Cursos', 'Workshops', 'Seminários', 'Estágios', 'Formação avançada'],
            ensino: ['Licenciaturas', 'Mestrados', 'Doutoramentos', 'Pós-graduações', 'Educação contínua'],
            investigacao: ['Projetos em curso', 'Publicações', 'Colaboração científica', 'Financiamento', 'Ética'],
            parcerias: ['Institucional', 'Empresarial', 'Internacional', 'Patrocínios', 'Cooperação']
        };

        // Verificar se o assunto selecionado existe no dicionário
        if (assuntoSelecionado && OPCOES_SUBASSUNTO[assuntoSelecionado]) {
            // Usar map para criar as opções
            const opcoes = OPCOES_SUBASSUNTO[assuntoSelecionado].map(opcao => {
                const option = document.createElement('option');
                option.value = opcao.toLowerCase().replace(/\s+/g, '_');
                option.textContent = opcao;
                return option;
            });

            // Adicionar todas as opções
            opcoes.forEach(option => sub.appendChild(option));
            sub.disabled = false;
        } else {
            sub.disabled = true;
        }
    };
    /**
     * Limpa o placeholder da mensagem ao focar
     */
    const limparPlaceholder = () => {
        if (elementos.mensagem.placeholder === 'Escreva a sua mensagem aqui...') {
            elementos.mensagem.placeholder = '';
        }
    };

    /**
     * Restaura o placeholder se a mensagem estiver vazia
     */
    const restaurarPlaceholder = () => {
        if (elementos.mensagem.value === '') {
            elementos.mensagem.placeholder = 'Escreva a sua mensagem aqui...';
        }
    };

    /**
     * Limpa erro de um campo
     * @param {HTMLElement} campo - Campo a limpar
     */
    const limparErro = (campo) => {
        const errorSpan = elementos.erros[campo.id];
        if (errorSpan) errorSpan.textContent = '';
        campo.classList.remove('input-error');
    };

    /**
     * Valida um campo específico
     * @param {HTMLElement} campo - Campo a validar
     * @returns {boolean} - true se válido
     */
    const validarCampo = (campo) => {
        const errorSpan = elementos.erros[campo.id];
        if (!errorSpan) return true;

        const valor = campo.value.trim();
        let valido = true;
        let mensagem = '';

        // Switch para validação específica por campo
        switch (campo.id) {
            case 'nome':
                valido = Validadores.naoVazio(valor);
                mensagem = 'O nome é obrigatório.';
                break;

            case 'email':
                if (!Validadores.naoVazio(valor)) {
                    valido = false;
                    mensagem = 'O email é obrigatório.';
                } else if (!Validadores.email(valor)) {
                    valido = false;
                    mensagem = 'Introduza um email válido.';
                }
                break;

            case 'telefone':
                if (!Validadores.naoVazio(valor)) {
                    valido = false;
                    mensagem = 'O telemóvel é obrigatório.';
                } else if (!Validadores.telefone(valor)) {
                    valido = false;
                    mensagem = 'Introduza um número válido (mínimo 9 dígitos).';
                }
                break;

            case 'assunto':
                valido = Validadores.selecionado(campo.value);
                mensagem = 'Selecione um assunto.';
                break;

            case 'subassunto':
                valido = Validadores.selecionado(campo.value);
                mensagem = 'Selecione um título.';
                break;

            case 'mensagem':
                valido = Validadores.naoVazio(valor);
                mensagem = 'A mensagem não pode estar vazia.';
                break;
        }

        if (!valido) {
            errorSpan.textContent = mensagem;
            campo.classList.add('input-error');
        } else {
            errorSpan.textContent = '';
            campo.classList.remove('input-error');
        }

        return valido;
    };

    /**
     * Handle do submit do formulário
     * @param {Event} e - Evento de submit
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar todos os campos (usando map para obter resultados)
        const campos = [
            elementos.nome,
            elementos.email,
            elementos.telefone,
            elementos.assunto,
            elementos.subassunto,
            elementos.mensagem
        ].filter(c => c);

        const resultados = campos.map(campo => validarCampo(campo));

        // Verificar se todos são válidos (exemplo de every)
        const valido = resultados.every(r => r === true);

        if (valido) {
            // Criar objeto Mensagem usando a classe
            const novaMensagem = new Mensagem(
                elementos.nome.value,
                elementos.email.value,
                `${elementos.codigoPais.value} ${elementos.telefone.value}`,
                elementos.assunto.value,
                elementos.subassunto.value,
                elementos.mensagem.value
            );

            console.log('Mensagem a enviar:', novaMensagem);

            // Mostrar sucesso
            elementos.successDiv.style.display = 'block';

            // Reset do formulário
            elementos.form.reset();
            elementos.subassunto.innerHTML = '<option value="">Primeiro selecione um assunto</option>';
            elementos.subassunto.disabled = true;

            // Esconder mensagem de sucesso após 5 segundos
            setTimeout(() => {
                elementos.successDiv.style.display = 'none';
            }, 5000);
        }
    };

    // API pública
    return { iniciar };
})();

// Tornar disponível globalmente
window.Formulario = Formulario;