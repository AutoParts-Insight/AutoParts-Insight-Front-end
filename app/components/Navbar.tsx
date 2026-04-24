'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='bg-slate-900 text-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/Title */}
          <div className='flex items-center space-x-3'>
            <div className='text-2xl font-bold'>⚙️ AutoParts Insight</div>
          </div>

          {/* Menu Items */}
          <div className='flex space-x-8'>
            <Link href='/' className='hover:text-blue-400 transition'>
              Dashboard
            </Link>
            <Link href='/search' className='hover:text-blue-400 transition'>
              Buscar
            </Link>
            <Link href='/gaps' className='hover:text-blue-400 transition'>
              Gaps
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
