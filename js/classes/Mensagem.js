/**
 * CLASSE MENSAGEM
 * Representa uma mensagem de contato do formulário
 */

class Mensagem {
    /**
     * Cria uma nova instância de Mensagem
     * @param {string} nome - Nome do remetente
     * @param {string} email - Email do remetente
     * @param {string} telefone - Telefone do remetente
     * @param {string} assunto - Assunto principal
     * @param {string} subassunto - Título do assunto
     * @param {string} mensagem - Conteúdo da mensagem
     */
    constructor(nome, email, telefone, assunto, subassunto, mensagem) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.assunto = assunto;
        this.subassunto = subassunto;
        this.mensagem = mensagem;
        this.dataEnvio = new Date();
        this.id = this.gerarId();
    }

    /**
     * Gera um ID único para a mensagem
     * @returns {string} - ID único
     */
    gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Valida se a mensagem é válida (usa o módulo Validadores)
     * @returns {Object} - Resultado da validação { valido: boolean, erros: Object }
     */
    validar() {
        const erros = {};

        if (!Validadores.naoVazio(this.nome)) {
            erros.nome = 'O nome é obrigatório.';
        }

        if (!Validadores.naoVazio(this.email)) {
            erros.email = 'O email é obrigatório.';
        } else if (!Validadores.email(this.email)) {
            erros.email = 'Email inválido.';
        }

        if (!Validadores.naoVazio(this.telefone)) {
            erros.telefone = 'O telefone é obrigatório.';
        } else if (!Validadores.telefone(this.telefone)) {
            erros.telefone = 'Telefone inválido (mínimo 9 dígitos).';
        }

        if (!Validadores.selecionado(this.assunto)) {
            erros.assunto = 'Selecione um assunto.';
        }

        if (!Validadores.selecionado(this.subassunto)) {
            erros.subassunto = 'Selecione um título.';
        }

        if (!Validadores.naoVazio(this.mensagem)) {
            erros.mensagem = 'A mensagem não pode estar vazia.';
        }

        return {
            valido: Object.keys(erros).length === 0,
            erros
        };
    }

    /**
     * MÉTODO ESTÁTICO: Filtrar mensagens por assunto (exemplo de filter)
     * @param {Mensagem[]} mensagens - Array de mensagens
     * @param {string} assunto - Assunto para filtrar
     * @returns {Mensagem[]} - Mensagens filtradas
     */
    static filtrarPorAssunto(mensagens, assunto) {
        return mensagens.filter(msg => msg.assunto === assunto);
    }

    /**
     * MÉTODO ESTÁTICO: Extrair emails (exemplo de map)
     * @param {Mensagem[]} mensagens - Array de mensagens
     * @returns {string[]} - Array de emails
     */
    static extrairEmails(mensagens) {
        return mensagens.map(msg => msg.email);
    }

    /**
     * MÉTODO ESTÁTICO: Contar mensagens por assunto (exemplo de reduce)
     * @param {Mensagem[]} mensagens - Array de mensagens
     * @returns {Object} - Contagem por assunto
     */
    static contarPorAssunto(mensagens) {
        return mensagens.reduce((acc, msg) => {
            acc[msg.assunto] = (acc[msg.assunto] || 0) + 1;
            return acc;
        }, {});
    }
}

// Tornar disponível globalmente
window.Mensagem = Mensagem;