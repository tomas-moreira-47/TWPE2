/**
 * MÓDULO DO GRÁFICO D3
 * Gerencia a criação e atualização do gráfico de barras
 */

let Grafico = (() => {
    // Variáveis privadas
    let graficoDiv = null;

    /**
     * Inicializa o gráfico
     */
    const iniciar = () => {
        graficoDiv = document.getElementById('grafico-barras');
        if (!graficoDiv) return;

        desenhar();

        // Adicionar listener para redimensionamento
        window.addEventListener('resize', () => {
            graficoDiv.innerHTML = '';
            desenhar();
        });
    };

    /**
     * Desenha o gráfico com os dados
     */
    const desenhar = () => {
        graficoDiv.innerHTML = '';

        // Dados diretamente definidos (sem depender de constantes externas)
        const dados = [
            { area: 'Telemedicina', valor: 8 },
            { area: 'E-saúde', valor: 12 },
            { area: 'IA em medicina', valor: 5 },
            { area: 'Epidemiologia', valor: 10 }
        ];

        // Calcular total de projetos (exemplo de reduce)
        const totalProjetos = dados.reduce((acc, item) => acc + item.valor, 0);

        // Adicionar título com total
        const titulo = document.createElement('p');
        titulo.textContent = `Total de Projetos: ${totalProjetos}`;
        titulo.style.marginBottom = '10px';
        titulo.style.fontWeight = 'bold';
        graficoDiv.appendChild(titulo);

        const largura = graficoDiv.clientWidth || 600;
        const altura = 300;
        const margin = { top: 20, bottom: 50, left: 50, right: 20 };

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

        // Adicionar valores nas barras
        svg.selectAll("text.barra-valor")
            .data(dados)
            .enter()
            .append("text")
            .attr("x", d => x(d.area) + x.bandwidth() / 2)
            .attr("y", d => y(d.valor) - 5)
            .attr("text-anchor", "middle")
            .style("fill", "#061D60")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text(d => d.valor);
    };

    /**
     * Exemplo de uso de filter para obter dados específicos
     * @param {string} area - Área para filtrar
     * @returns {Object} - Dados da área
     */
    const filtrarPorArea = (area) => {
        const dados = [
            { area: 'Telemedicina', valor: 8 },
            { area: 'E-saúde', valor: 12 },
            { area: 'IA em medicina', valor: 5 },
            { area: 'Epidemiologia', valor: 10 }
        ];
        return dados.filter(d => d.area === area);
    };

    /**
     * Exemplo de uso de map para transformar dados
     * @returns {string[]} - Array de áreas
     */
    const obterAreas = () => {
        const dados = [
            { area: 'Telemedicina', valor: 8 },
            { area: 'E-saúde', valor: 12 },
            { area: 'IA em medicina', valor: 5 },
            { area: 'Epidemiologia', valor: 10 }
        ];
        return dados.map(d => d.area);
    };

    // API pública
    return {
        iniciar,
        filtrarPorArea,
        obterAreas
    };
})();

// Tornar disponível globalmente
window.Grafico = Grafico;