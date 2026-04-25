'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ComparisonData {
  name: string;
  seus_produtos: number;
  concorrente?: number;
}

interface ComparisonChartProps {
  data: ComparisonData[];
  title?: string;
  height?: number;
}

export default function ComparisonChart({
  data,
  title = 'Comparativo de Catálogo',
  height = 400,
}: ComparisonChartProps) {
  return (
    <div className='bg-white rounded-lg shadow p-6'>
      {title && (
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-slate-900'>{title}</h2>
          <p className='text-slate-600 text-sm mt-1'>Quantidade de produtos por empresa</p>
        </div>
      )}

      <ResponsiveContainer width='100%' height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
          <XAxis
            dataKey='name'
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#e2e8f0' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#1e293b' }}
            formatter={(value) => value.toLocaleString('pt-BR')}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType='square'
            formatter={(value) =>
              value === 'seus_produtos' ? 'Seus Produtos' : 'Concorrente'
            }
          />
          <Bar dataKey='seus_produtos' fill='#3b82f6' radius={[8, 8, 0, 0]} />
          <Bar dataKey='concorrente' fill='#ef4444' radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
