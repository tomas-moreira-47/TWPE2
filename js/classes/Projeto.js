/**
 * CLASSE PROJETO
 * Representa um projeto de investigação do CACA
 * Exemplo de uso de classes e objetos
 */

class Projeto {
    /**
     * Cria uma nova instância de Projeto
     * @param {string} nome - Nome do projeto
     * @param {string} area - Área de investigação
     * @param {number} duracaoMeses - Duração em meses
     * @param {string[]} investigadores - Lista de investigadores
     */
    constructor(nome, area, duracaoMeses, investigadores = []) {
        this.nome = nome;
        this.area = area;
        this.duracaoMeses = duracaoMeses;
        this.investigadores = investigadores;
        this.ativo = true;
        this.dataInicio = new Date();
    }

    /**
     * Getter para duração em anos (exemplo de propriedade calculada)
     * @returns {number}
     */
    get duracaoAnos() {
        return this.duracaoMeses / 12;
    }

    /**
     * Adiciona um investigador ao projeto
     * @param {string} investigador - Nome do investigador
     */
    adicionarInvestigador(investigador) {
        if (!this.investigadores.includes(investigador)) {
            this.investigadores.push(investigador);
        }
    }

    /**
     * Remove um investigador do projeto
     * @param {string} investigador - Nome do investigador
     */
    removerInvestigador(investigador) {
        this.investigadores = this.investigadores.filter(i => i !== investigador);
    }

    /**
     * Muda o estado do projeto para inativo
     */
    encerrar() {
        this.ativo = false;
    }

    /**
     * MÉTODO ESTÁTICO: Filtrar projetos por área (exemplo de uso de filter)
     * @param {Projeto[]} projetos - Array de projetos
     * @param {string} area - Área para filtrar
     * @returns {Projeto[]} - Projetos filtrados
     */
    static filtrarPorArea(projetos, area) {
        return projetos.filter(projeto => projeto.area === area);
    }

    /**
     * MÉTODO ESTÁTICO: Obter nomes dos projetos (exemplo de uso de map)
     * @param {Projeto[]} projetos - Array de projetos
     * @returns {string[]} - Array com nomes dos projetos
     */
    static obterNomes(projetos) {
        return projetos.map(projeto => projeto.nome);
    }

    /**
     * MÉTODO ESTÁTICO: Calcular duração total (exemplo de uso de reduce)
     * @param {Projeto[]} projetos - Array de projetos
     * @returns {number} - Soma das durações em meses
     */
    static duracaoTotal(projetos) {
        return projetos.reduce((acc, projeto) => acc + projeto.duracaoMeses, 0);
    }

    /**
     * MÉTODO ESTÁTICO: Contar projetos por área (exemplo complexo com reduce)
     * @param {Projeto[]} projetos - Array de projetos
     * @returns {Object} - Objeto com contagem por área
     */
    static contarPorArea(projetos) {
        return projetos.reduce((acc, projeto) => {
            acc[projeto.area] = (acc[projeto.area] || 0) + 1;
            return acc;
        }, {});
    }
}

// Tornar disponível globalmente
window.Projeto = Projeto;