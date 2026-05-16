import { getGaps } from '@/services/productService';
import { GapAnalysis } from '@/types/api';

export default async function GapsPage() {
  let gaps: GapAnalysis[] = [];

  try {
    gaps = await getGaps();
  } catch {
    // API fora do ar — exibe estado vazio
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Análise de Gaps</h1>
          <p className="text-slate-600">
            Comparação entre catálogo externo dos concorrentes e nosso catálogo interno.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Cobertura calculada por categoria — match por código/aplicação disponível em breve.
          </p>
        </div>

        {gaps.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-slate-500 text-lg mb-2">Nenhum dado de catálogo externo encontrado.</p>
            <p className="text-slate-400 text-sm">
              Execute <code className="bg-slate-100 px-1 rounded">POST /sync/bosch</code> para importar o catálogo da Bosch.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {gaps.map((gap) => (
              <GapCard key={`${gap.brand}-${gap.category}`} gap={gap} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GapCard({ gap }: { gap: GapAnalysis }) {
  const coverageColor =
    gap.coveragePct >= 80
      ? 'text-green-600'
      : gap.coveragePct >= 50
      ? 'text-yellow-600'
      : 'text-red-600';

  const barColor =
    gap.coveragePct >= 80
      ? 'bg-green-400'
      : gap.coveragePct >= 50
      ? 'bg-yellow-400'
      : 'bg-red-400';

  return (
    <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
      {/* Header do card */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              {gap.brand}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{gap.category}</h2>
          </div>
          <div className={`text-3xl font-bold ${coverageColor}`}>
            {gap.coveragePct}%
          </div>
        </div>

        {/* Barra de cobertura */}
        <div className="mt-4">
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${barColor}`}
              style={{ width: `${Math.min(gap.coveragePct, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1.5">
            <span>
              <strong className="text-slate-700">{gap.internalCount}</strong> produtos nossos
            </span>
            <span>
              <strong className="text-slate-700">{gap.externalCount}</strong> produtos {gap.brand}
            </span>
          </div>
        </div>
      </div>

      {/* Lista de produtos externos */}
      <div className="p-6">
        <h3 className="text-sm font-semibold text-slate-600 mb-3">
          Catálogo externo — {gap.externalCount} produtos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {gap.externalProducts.map((product) => (
            <div
              key={product.productNumber}
              className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100"
            >
              {product.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.imageUrl}
                  alt={product.productNumber}
                  className="w-10 h-10 object-contain shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="font-mono text-sm font-semibold text-slate-800 truncate">
                  {product.productNumber}
                </p>
                {product.code && (
                  <p className="text-xs text-blue-600 font-medium">
                    Cód: {product.code}
                  </p>
                )}
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                  {product.description ?? '—'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

