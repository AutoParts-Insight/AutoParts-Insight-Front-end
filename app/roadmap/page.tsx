export default function RoadmapPage() {
  const phases: { number: number; title: string; status: 'done' | 'progress' | 'todo'; date: string; description: string; tasks: { label: string; done: boolean }[] }[] = [
    {
      number: 0,
      title: 'Setup da Infraestrutura',
      status: 'done' as const,
      date: 'Mai 2026',
      description: 'Configuração do ambiente completo de desenvolvimento.',
      tasks: [
        { label: 'NestJS + Next.js scaffolding', done: true },
        { label: 'PostgreSQL via Docker', done: true },
        { label: 'Prisma ORM configurado', done: true },
        { label: 'Resolução de conflitos de porta (postgresql-x64-18)', done: true },
      ],
    },
    {
      number: 1,
      title: 'Endpoints Base + Schema',
      status: 'done' as const,
      date: 'Mai 2026',
      description: 'Redesign do schema com Domain-Driven Design e criação dos endpoints principais.',
      tasks: [
        { label: 'Models: Brand, Category, Product, ProductReference', done: true },
        { label: 'GET /products (com filtro ?q=)', done: true },
        { label: 'GET /categories', done: true },
        { label: 'GET /manufacturers', done: true },
        { label: 'GET /stats', done: true },
      ],
    },
    {
      number: 2,
      title: 'Importação dos Dados Reais',
      status: 'done' as const,
      date: 'Mai 2026',
      description: 'Leitura de planilha .xlsx e importação completa para o banco de dados.',
      tasks: [
        { label: 'Script import.ts (Prisma)', done: true },
        { label: '526 produtos importados', done: true },
        { label: '4.982 referências criadas', done: true },
        { label: '105 marcas cadastradas', done: true },
        { label: 'Busca por código OEM/concorrente funcional', done: true },
      ],
    },
    {
      number: 3,
      title: 'Integração Front-end ↔ API',
      status: 'done' as const,
      date: 'Mai 2026',
      description: 'Conexão do Next.js ao NestJS com tipagem rigorosa e UX responsiva.',
      tasks: [
        { label: 'CORS habilitado no NestJS', done: true },
        { label: 'Tipagens TypeScript (api.ts)', done: true },
        { label: 'Camada de serviço productService.ts', done: true },
        { label: 'Hook useSearch com debounce 400ms', done: true },
        { label: 'Dashboard Server Component com stats reais', done: true },
        { label: 'Página de busca com cards de produtos', done: true },
      ],
    },
    {
      number: 4,
      title: 'Catálogo Externo — Sync Bosch',
      status: 'done' as const,
      date: 'Mai 2026',
      description: 'Importação do catálogo da Bosch para análise de cobertura de mercado.',
      tasks: [
        { label: 'Model ExternalReference + migration', done: true },
        { label: 'BoschApiService (paginação automática)', done: true },
        { label: 'SyncService com upsert', done: true },
        { label: 'POST /sync/bosch endpoint', done: true },
        { label: 'Resolução de códigos OEM → productNumbers externos (230 códigos, 60 resolvidos)', done: true },
        { label: 'Cache bosch_code_resolutions populado', done: true },
      ],
    },
    {
      number: 5,
      title: 'Engine de Gaps + Dashboard Analítico',
      status: 'done' as const,
      date: 'Mai 2026',
      description: 'Cruzamento entre catálogo interno e externo para identificar oportunidades.',
      tasks: [
        { label: 'Engine de cobertura real por código (OEM matching)', done: true },
        { label: 'Endpoint GET /gaps com coveragePct e matchedCount', done: true },
        { label: 'Página /gaps com filtros e cards por severidade', done: true },
        { label: 'Gráfico de barras horizontal por marca+categoria', done: true },
        { label: 'Densidade de catálogo para marcas sem matching exato', done: true },
      ],
    },
    {
      number: 6,
      title: 'Autenticação & Segurança',
      status: 'done' as const,
      date: 'Mai 2026',
      description: 'Sistema completo de autenticação JWT com controle de acesso por papel (RBAC).',
      tasks: [
        { label: 'Login com username + password (bcrypt)', done: true },
        { label: 'JWT Access Token (15min) + Refresh Token (7d)', done: true },
        { label: 'Guard global + decorator @Public()', done: true },
        { label: 'RBAC: roles USER e ADMIN', done: true },
        { label: 'Endpoint POST /auth/refresh com rotação de tokens', done: true },
        { label: 'AuthContext reativo no front-end (sem flicker de menu)', done: true },
        { label: 'Middleware de proteção de rotas Next.js', done: true },
        { label: 'Painel admin: criação de usuários e sync manual', done: true },
      ],
    },
    {
      number: 7,
      title: 'Deploy',
      status: 'done' as const,
      date: 'Mai 2026',
      description: 'Publicação do back-end e front-end em ambiente de produção.',
      tasks: [
        { label: 'Deploy da API (Railway)', done: true },
        { label: 'Deploy do Front-end (Vercel)', done: true },
        { label: 'Variáveis de ambiente de produção', done: true },
        { label: 'Banco de dados em nuvem (PostgreSQL Railway)', done: true },
        { label: 'Catálogo interno importado via POST /sync/import-catalog', done: true },
      ],
    },
    {
      number: 8,
      title: 'Pós MVP',
      status: 'todo' as const,
      date: 'Futuro',
      description: 'Funcionalidades avançadas de inteligência competitiva e integração com sistemas externos.',
      tasks: [
        { label: 'Listagem de produtos concorrentes sem equivalente interno', done: false },
        { label: 'Ranking de categorias onde o concorrente domina', done: false },
        { label: 'Ranking de categorias com maior overlap (oportunidades quentes)', done: false },
        { label: 'Integração com ERP para atualização automática do catálogo interno', done: false },
        { label: 'Export CSV dos gaps por categoria/marca', done: false },
        { label: 'Link direto para produto no site do concorrente', done: false },
        { label: 'Alertas de novos produtos lançados pelos concorrentes', done: false },
      ],
    },
  ];

  const statusConfig = {
    done: {
      label: 'Concluída',
      dot: 'bg-green-500',
      badge: 'bg-green-100 text-green-800',
      border: 'border-green-200',
      connector: 'bg-green-400',
    },
    progress: {
      label: 'Em andamento',
      dot: 'bg-blue-500 ring-4 ring-blue-200',
      badge: 'bg-blue-100 text-blue-800',
      border: 'border-blue-300',
      connector: 'bg-slate-200',
    },
    todo: {
      label: 'A fazer',
      dot: 'bg-slate-300',
      badge: 'bg-slate-100 text-slate-500',
      border: 'border-slate-200',
      connector: 'bg-slate-200',
    },
  };

  const totalTasks = phases.flatMap((p) => p.tasks);
  const doneTasks = totalTasks.filter((t) => t.done);
  const progressPct = Math.round((doneTasks.length / totalTasks.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Roadmap</h1>
          <p className="text-slate-600">Acompanhamento visual do desenvolvimento do projeto</p>
        </div>

        {/* Progress bar geral */}
        <div className="bg-white rounded-lg shadow p-6 mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Progresso geral</span>
            <span className="text-sm font-bold text-slate-900">{progressPct}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs text-slate-500">
            <span>{doneTasks.length} tarefas concluídas</span>
            <span>{totalTasks.length - doneTasks.length} pendentes</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {phases.map((phase, index) => {
            const cfg = statusConfig[phase.status];
            const isLast = index === phases.length - 1;

            return (
              <div key={phase.number} className="flex gap-6">
                {/* Coluna do conector vertical */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full shrink-0 mt-5 ${cfg.dot}`} />
                  {!isLast && (
                    <div className={`w-0.5 flex-1 mt-1 ${cfg.connector}`} />
                  )}
                </div>

                {/* Card da fase */}
                <div className={`flex-1 mb-8 bg-white rounded-lg shadow border ${cfg.border} p-5`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Fase {phase.number}
                      </span>
                      <h2 className="text-lg font-bold text-slate-900 mt-0.5">{phase.title}</h2>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${cfg.badge}`}>
                        {cfg.label}
                      </span>
                      <span className="text-xs text-slate-400">{phase.date}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">{phase.description}</p>

                  <ul className="space-y-1.5">
                    {phase.tasks.map((task, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        {task.done ? (
                          <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-slate-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className={task.done ? 'text-slate-700' : 'text-slate-400'}>
                          {task.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Mini progresso interno por fase */}
                  {phase.tasks.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Progresso da fase</span>
                        <span>
                          {phase.tasks.filter((t) => t.done).length}/{phase.tasks.length}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            phase.status === 'done'
                              ? 'bg-green-400'
                              : phase.status === 'progress'
                              ? 'bg-blue-400'
                              : 'bg-slate-300'
                          }`}
                          style={{
                            width: `${
                              phase.tasks.length > 0
                                ? (phase.tasks.filter((t) => t.done).length / phase.tasks.length) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
