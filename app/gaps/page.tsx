import { getGaps } from '@/services/productService';
import GapsClient from './GapsClient';

export default async function GapsPage() {
  let gaps = await getGaps().catch(() => []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Análise de Gaps</h1>
          <p className="text-slate-600">
            Comparação entre catálogo externo dos concorrentes e nosso catálogo interno por categoria.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Densidade de catálogo por categoria — equivalência real por aplicação/OEM em fase posterior.
          </p>
        </div>

        {gaps.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-slate-500 text-lg mb-2">Nenhum dado de catálogo externo encontrado.</p>
            <p className="text-slate-400 text-sm">
              Execute <code className="bg-slate-100 px-1 rounded">POST /sync/bosch</code> ou{' '}
              <code className="bg-slate-100 px-1 rounded">POST /sync/dita</code> para importar catálogos.
            </p>
          </div>
        ) : (
          <GapsClient gaps={gaps} />
        )}
      </div>
    </div>
  );
}

