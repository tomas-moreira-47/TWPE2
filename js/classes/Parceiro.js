/**
 * CLASSE PARCEIRO
 * Representa uma entidade parceira do CACA
 */

class Parceiro {
    /**
     * Cria uma nova instância de Parceiro
     * @param {string} nome - Nome do parceiro
     * @param {string} logo - Caminho para o logo
     * @param {string} url - Website do parceiro
     * @param {string} descricao - Descrição do parceiro
     */
    constructor(nome, logo, url, descricao) {
        this.nome = nome;
        this.logo = logo;
        this.url = url;
        this.descricao = descricao;
        this.parceriaAtiva = true;
        this.dataParceria = new Date();
    }

    /**
     * Cria o HTML para o card do parceiro
     * @returns {string} - HTML do card
     */
    renderizarCard() {
        return `
            <div class="parceiro-card">
                <a href="${this.url}" target="_blank" rel="noopener noreferrer">
                    <img src="${this.logo}" alt="Logotipo ${this.nome}">
                </a>
                <div class="parceiro-info">
                    <h3>${this.nome}</h3>
                    <p>${this.descricao}</p>
                </div>
            </div>
        `;
    }

    /**
     * MÉTODO ESTÁTICO: Filtrar parceiros ativos (exemplo de filter)
     * @param {Parceiro[]} parceiros - Array de parceiros
     * @returns {Parceiro[]} - Apenas parceiros ativos
     */
    static filtrarAtivos(parceiros) {
        return parceiros.filter(parceiro => parceiro.parceriaAtiva);
    }

    /**
     * MÉTODO ESTÁTICO: Obter nomes dos parceiros (exemplo de map)
     * @param {Parceiro[]} parceiros - Array de parceiros
     * @returns {string[]} - Array com nomes
     */
    static obterNomes(parceiros) {
        return parceiros.map(parceiro => parceiro.nome);
    }

    /**
     * MÉTODO ESTÁTICO: Criar instâncias a partir de dados (exemplo de map)
     * @param {Object[]} dados - Array de dados dos parceiros
     * @returns {Parceiro[]} - Array de instâncias Parceiro
     */
    static criarDeDados(dados) {
        return dados.map(d => new Parceiro(d.nome, d.logo, d.url, d.descricao));
    }
}

// Tornar disponível globalmente
window.Parceiro = Parceiro;