'use client';

import StatsCard, { Icons } from '@/components/StatsCard';

export default function Home() {
  // Mock data - será substituído por dados reais do backend
  const stats = {
    totalProducts: 5243,
    categories: 18,
    competitors: 12,
    coveragePercentage: 67,
  };

  const recentGaps = [
    {
      id: 1,
      competitor: 'BOSCH',
      missingProducts: 342,
      category: 'MOTOR DE PARTIDA',
      opportunity: 'HIGH',
    },
    {
      id: 2,
      competitor: 'GAUSS',
      missingProducts: 218,
      category: 'MOTOR DE PARTIDA',
      opportunity: 'MEDIUM',
    },
    {
      id: 3,
      competitor: 'YAMAHA',
      missingProducts: 156,
      category: 'RADIADOR',
      opportunity: 'LOW',
    },
  ];

  return (
    <div className='min-h-screen bg-slate-50 p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <h1 className='text-4xl font-bold text-slate-900 mb-2'>Dashboard</h1>
          <p className='text-slate-600'>Visão geral do seu catálogo</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatsCard
            title='Total de Produtos'
            value={stats.totalProducts.toLocaleString('pt-BR')}
            icon={Icons.Package}
            highlight='info'
          />

          <StatsCard
            title='Categorias'
            value={stats.categories}
            icon={Icons.Tag}
            highlight='success'
          />

          <StatsCard
            title='Concorrentes'
            value={stats.competitors}
            icon={Icons.Users}
            highlight='warning'
          />

          <StatsCard
            title='Cobertura'
            value={`${stats.coveragePercentage}%`}
            icon={Icons.BarChart}
            highlight='info'
          />
        </div>

        {/* Recent Gaps Section */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-2xl font-bold text-slate-900 mb-4'>
            Principais Gaps
          </h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-slate-200'>
                  <th className='text-left py-3 px-4 font-semibold text-slate-600'>
                    Concorrente
                  </th>
                  <th className='text-left py-3 px-4 font-semibold text-slate-600'>
                    Produtos Faltantes
                  </th>
                  <th className='text-left py-3 px-4 font-semibold text-slate-600'>
                    Categoria
                  </th>
                  <th className='text-left py-3 px-4 font-semibold text-slate-600'>
                    Oportunidade
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentGaps.map((gap) => (
                  <tr key={gap.id} className='border-b border-slate-100 hover:bg-slate-50'>
                    <td className='py-4 px-4 font-medium text-slate-900'>
                      {gap.competitor}
                    </td>
                    <td className='py-4 px-4 text-slate-600'>
                      {gap.missingProducts}
                    </td>
                    <td className='py-4 px-4 text-slate-600'>{gap.category}</td>
                    <td className='py-4 px-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          gap.opportunity === 'HIGH'
                            ? 'bg-red-100 text-red-700'
                            : gap.opportunity === 'MEDIUM'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {gap.opportunity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
