'use client';

import { useAuth } from '@/context/AuthContext';

/**
 * Envolve o <main> da aplicação e bloqueia a renderização do conteúdo
 * enquanto o AuthContext ainda não leu o localStorage (isLoading = true).
 *
 * Sem isso, o conteúdo da página aparece por um frame sem a sidebar,
 * causando layout shift e possível exposição de rotas protegidas.
 */
export default function ClientShell({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-7 h-7 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return <main className="flex-1 overflow-y-auto">{children}</main>;
}
