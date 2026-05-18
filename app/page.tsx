import Link from 'next/link';
import StatsCard, { Icons } from '@/components/StatsCard';
import { getGaps, getStats } from '@/services/productService';
import type { GapAnalysis } from '@/types/api';

export default async function Home() {
  let stats = { products: 0, brands: 0, categories: 0 };
  let gaps: GapAnalysis[] = [];

  try {
    [stats, gaps] = await Promise.all([getStats(), getGaps()]);
  } catch {
    // API fora do ar — exibe zeros
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Visão geral do seu catálogo</p>
        </div>

        {/* Stats Grid — dados reais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total de Produtos"
            value={stats.products.toLocaleString('pt-BR')}
            icon={Icons.Package}
            highlight="info"
          />
          <StatsCard
            title="Categorias"
            value={stats.categories}
            icon={Icons.Tag}
            highlight="success"
          />
          <StatsCard
            title="Marcas Mapeadas"
            value={stats.brands}
            icon={Icons.Users}
            highlight="warning"
          />
          <StatsCard
            title="Catálogos Externos"
            value={gaps.length > 0 ? gaps.reduce((sum, g) => sum + g.externalCount, 0) : '—'}
            icon={Icons.BarChart}
            highlight="info"
          />
        </div>

        {/* Resumo de Gaps por Concorrente */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Catálogos Externos</h2>
            <Link
              href="/gaps"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Ver análise completa →
            </Link>
          </div>

          {gaps.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm">
                Nenhum catálogo externo sincronizado ainda.
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Execute <code className="bg-slate-100 px-1 rounded">POST /sync/bosch</code> para importar.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Concorrente</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Categoria</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-600">Produtos externos</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-600">Nossos produtos</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-600">Densidade</th>
                  </tr>
                </thead>
                <tbody>
                  {gaps.map((gap) => (
                    <tr key={`${gap.brand}-${gap.category}`} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-4 font-semibold text-slate-900">{gap.brand}</td>
                      <td className="py-4 px-4 text-slate-600">{gap.category}</td>
                      <td className="py-4 px-4 text-right text-slate-700">{gap.externalCount}</td>
                      <td className="py-4 px-4 text-right text-slate-700">{gap.internalCount}</td>
                      <td className="py-4 px-4 text-right">
                        <span className={`font-semibold ${
                          gap.catalogDensity >= 100 ? 'text-green-600' :
                          gap.catalogDensity >= 50  ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {gap.catalogDensity}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

