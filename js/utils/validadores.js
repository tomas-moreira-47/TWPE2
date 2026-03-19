/**
 * MÓDULO DE VALIDAÇÃO
 * Funções puras e reutilizáveis para validação de dados
 */

let Validadores = {
    /**
     * Valida se um email tem formato correto
     * @param {string} email - Email a validar
     * @returns {boolean} - true se válido, false caso contrário
     */
    email: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Valida um número de telefone (mínimo 9 dígitos)
     * @param {string} telefone - Telefone a validar
     * @returns {boolean} - true se válido, false caso contrário
     */
    telefone: (telefone) => {
        const numeroLimpo = telefone.replace(/\s/g, '');
        return /^\d{9,}$/.test(numeroLimpo);
    },

    /**
     * Valida se um texto não está vazio
     * @param {string} texto - Texto a validar
     * @returns {boolean} - true se não vazio, false caso contrário
     */
    naoVazio: (texto) => texto && texto.trim() !== '',

    /**
     * Valida se um valor foi selecionado num dropdown
     * @param {string} valor - Valor selecionado
     * @returns {boolean} - true se selecionado, false caso contrário
     */
    selecionado: (valor) => valor && valor !== ''
};

// Tornar disponível globalmente
window.Validadores = Validadores;