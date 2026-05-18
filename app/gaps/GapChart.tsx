'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GapAnalysis } from '@/types/api';

interface ChartPoint {
  label: string;     // "DITA · Motor de Partida"
  externo: number;
  coberto: number;   // matchedCount (se hasExactMatching) ou internalCount
  tipo: 'real' | 'volume'; // indica qual métrica é usada
}

interface Props {
  gaps: GapAnalysis[];
}

// Trunca labels longos para caber no eixo X
function truncate(s: string, max = 22) {
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

export default function GapChart({ gaps }: Props) {
  const data: ChartPoint[] = gaps.map((g) => ({
    label: truncate(`${g.brand} · ${g.category}`),
    externo: g.externalCount,
    coberto: g.hasExactMatching ? g.matchedCount : g.internalCount,
    tipo: g.hasExactMatching ? 'real' : 'volume',
  }));

  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Catálogo externo vs. cobertura interna
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {'● cobertura real por código  |  ● volume por categoria (matching não disponível)'}
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={Math.max(220, data.length * 42)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 24, left: 8, bottom: 0 }}
          barCategoryGap="30%"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="label"
            width={190}
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number | undefined, name: string) => [
              value ?? 0,
              name === 'externo' ? 'Produtos concorrente' : 'Nossos (com equivalente)',
            ]}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
          />
          <Legend
            formatter={(value) =>
              value === 'externo' ? 'Concorrente' : 'Nosso catálogo'
            }
            wrapperStyle={{ fontSize: 12 }}
          />
          <Bar dataKey="externo" fill="#cbd5e1" radius={[0, 3, 3, 0]} name="externo" />
          <Bar dataKey="coberto" fill="#60a5fa" radius={[0, 3, 3, 0]} name="coberto" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
