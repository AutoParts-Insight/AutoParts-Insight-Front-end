'use client';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  highlight?: 'success' | 'warning' | 'danger' | 'info';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const highlightClasses = {
  success: 'border-l-green-500 bg-green-50',
  warning: 'border-l-yellow-500 bg-yellow-50',
  danger: 'border-l-red-500 bg-red-50',
  info: 'border-l-blue-500',
};

const iconClasses = {
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600',
  info: 'text-blue-600',
};

export default function StatsCard({
  title,
  value,
  icon,
  highlight = 'info',
  trend,
}: StatsCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow p-6 border-l-4 transition ${
        highlightClasses[highlight]
      }`}
    >
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-slate-600 text-sm font-medium'>{title}</p>
          <p className='text-3xl font-bold text-slate-900 mt-2'>{value}</p>

          {trend && (
            <p
              className={`text-xs font-medium mt-2 ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>

        {icon && (
          <div className={`text-4xl ${iconClasses[highlight]}`}>{icon}</div>
        )}
      </div>
    </div>
  );
}

// Ícones SVG reutilizáveis
export const Icons = {
  Package: (
    <svg
      className='w-8 h-8'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9-4v4m0 0v4m0-4h4m-4 0H9'
      />
    </svg>
  ),
  Tag: (
    <svg
      className='w-8 h-8'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
      />
    </svg>
  ),
  TrendingUp: (
    <svg
      className='w-8 h-8'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
      />
    </svg>
  ),
  BarChart: (
    <svg
      className='w-8 h-8'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      />
    </svg>
  ),
  Users: (
    <svg
      className='w-8 h-8'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 4.354a4 4 0 110 5.292M15 12H9m6 0a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  ),
  AlertCircle: (
    <svg
      className='w-8 h-8'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  ),
};
