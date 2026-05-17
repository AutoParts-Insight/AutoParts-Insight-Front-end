'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart2, Search, TrendingDown, Map, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/',        label: 'Dashboard', icon: BarChart2 },
  { href: '/search',  label: 'Buscar',    icon: Search },
  { href: '/gaps',    label: 'Gaps',      icon: TrendingDown },
  { href: '/roadmap', label: 'Roadmap',   icon: Map },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <aside className='flex flex-col w-56 min-h-screen bg-slate-900 text-white shrink-0'>
      {/* Logo */}
      <div className='px-5 py-6 border-b border-slate-700'>
        <div className='flex items-center gap-2.5'>
          <Settings size={20} className='text-blue-400 shrink-0' />
          <div className='text-xl font-bold leading-tight'>AutoParts<br />Insight</div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className='flex flex-col gap-1 px-3 py-4 flex-1'>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <Icon size={16} className='shrink-0' />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
