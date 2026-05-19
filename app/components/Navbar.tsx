'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BarChart2, Search, TrendingDown, Map, ShieldCheck, Zap, LogOut } from 'lucide-react';
import { getAccessToken, clearTokens, logout } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const COMMON_ITEMS = [
  { href: '/',       label: 'Dashboard', icon: BarChart2 },
  { href: '/search', label: 'Buscar',    icon: Search },
  { href: '/gaps',   label: 'Gaps',      icon: TrendingDown },
];

const ADMIN_ITEMS = [
  { href: '/roadmap', label: 'Roadmap', icon: Map },
  { href: '/admin',   label: 'Admin',   icon: ShieldCheck },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, isLoading } = useAuth();

  const navItems = isAdmin ? [...COMMON_ITEMS, ...ADMIN_ITEMS] : COMMON_ITEMS;

  async function handleLogout() {
    const token = getAccessToken();
    if (token) await logout(token).catch(() => {});
    clearTokens();
    router.push('/login');
  }

  return (
    <aside className='flex flex-col w-56 h-screen bg-slate-900 text-white shrink-0 sticky top-0'>
      {/* Logo */}
      <div className='px-5 py-6 border-b border-slate-700'>
        <div className='flex items-center gap-2.5'>
          <Zap size={20} className='text-blue-400 shrink-0' />
          <div className='text-xl font-bold leading-tight'>AutoParts<br />Insight</div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className='flex flex-col gap-1 px-3 py-4 flex-1'>
        {isLoading ? (
          // Skeleton enquanto auth não foi lido do localStorage
          <div className='flex flex-col gap-1'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='h-9 rounded-lg bg-slate-800 animate-pulse' />
            ))}
          </div>
        ) : (
          navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
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
          })
        )}
      </nav>

      {/* Logout */}
      <div className='px-3 pb-4 border-t border-slate-700 pt-3'>
        <button
          onClick={handleLogout}
          className='flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors'
        >
          <LogOut size={16} className='shrink-0' />
          Sair
        </button>
      </div>
    </aside>
  );
}
