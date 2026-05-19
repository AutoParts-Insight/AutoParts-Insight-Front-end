'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

/** Renderiza o Navbar apenas fora da rota /login e após auth hidratado. */
export default function ConditionalNavbar() {
  const pathname = usePathname();
  const { isLoading } = useAuth();

  if (pathname.startsWith('/login')) return null;
  // Não renderiza a sidebar enquanto o estado de auth ainda não foi lido
  // do localStorage — evita flicker de itens admin aparecendo/desaparecendo
  if (isLoading) return null;
  return <Navbar />;
}
