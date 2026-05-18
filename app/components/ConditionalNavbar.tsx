'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

/** Renderiza o Navbar apenas fora da rota /login */
export default function ConditionalNavbar() {
  const pathname = usePathname();
  if (pathname.startsWith('/login')) return null;
  return <Navbar />;
}
