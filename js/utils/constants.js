/**
 * CONSTANTES GLOBAIS DA APLICAÇÃO
 * Centraliza todas as configurações e dados estáticos
 */

// Opções de subassunto baseadas no assunto principal (usado no formulário)
export const SUBOPCOES = {
    saude: ['Consulta médica', 'Exames', 'Tratamentos', 'Prevenção', 'Saúde pública'],
    formacao: ['Cursos', 'Workshops', 'Seminários', 'Estágios', 'Formação avançada'],
    ensino: ['Licenciaturas', 'Mestrados', 'Doutoramentos', 'Pós-graduações', 'Educação contínua'],
    investigacao: ['Projetos em curso', 'Publicações', 'Colaboração científica', 'Financiamento', 'Ética'],
    parcerias: ['Institucional', 'Empresarial', 'Internacional', 'Patrocínios', 'Cooperação']
};

// Dados dos projetos para o gráfico (exemplo de estrutura de dados)
export const DADOS_GRAFICO = [
    { area: 'Telemedicina', valor: 8 },
    { area: 'E-saúde', valor: 12 },
    { area: 'IA em medicina', valor: 5 },
    { area: 'Epidemiologia', valor: 10 }
];

// Códigos de país para o campo de telefone
export const CODIGOS_PAIS = [
    { valor: '+351', pais: '🇵🇹 Portugal' },
    { valor: '+34', pais: '🇪🇸 Espanha' },
    { valor: '+33', pais: '🇫🇷 França' },
    { valor: '+44', pais: '🇬🇧 Reino Unido' },
    { valor: '+49', pais: '🇩🇪 Alemanha' },
    { valor: '+39', pais: '🇮🇹 Itália' },
    { valor: '+1', pais: '🇺🇸 EUA' },
    { valor: '+55', pais: '🇧🇷 Brasil' },
    { valor: '+244', pais: '🇦🇴 Angola' },
    { valor: '+238', pais: '🇨🇻 Cabo Verde' },
    { valor: '+245', pais: '🇬🇼 Guiné-Bissau' },
    { valor: '+239', pais: '🇸🇹 São Tomé' },
    { valor: '+258', pais: '🇲🇿 Moçambique' }
];

// Configurações do carrossel
export const CARROSSEL_CONFIG = {
    intervalo: 5000, // 5 segundos
    transicao: 500   // 0.5 segundos
};