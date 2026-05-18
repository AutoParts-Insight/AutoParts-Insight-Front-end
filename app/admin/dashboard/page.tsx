'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAccessToken,
  getRefreshToken,
  clearTokens,
  logout,
  authFetch,
  saveTokens,
  refreshTokens,
} from '@/services/authService';

type SyncStatus = 'idle' | 'running' | 'success' | 'error';

interface SyncState {
  status: SyncStatus;
  message: string;
}

const BOSCH_CATEGORIES = [
  'Motor de Partida',
  'Alternador',
  'Vela de Ignição',
  'Vela de Aquecimento',
  'Bomba de Combustível',
  'Sensor de Oxigênio',
  'Bobina de Ignição',
];

export default function AdminDashboard() {
  const router = useRouter();
  const [boschSync, setBoschSync] = useState<SyncState>({ status: 'idle', message: '' });
  const [ditaSync, setDitaSync] = useState<SyncState>({ status: 'idle', message: '' });
  const [resolveSync, setResolveSync] = useState<SyncState>({ status: 'idle', message: '' });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(BOSCH_CATEGORIES);

  // Garante que o usuário está autenticado
  useEffect(() => {
    if (!getAccessToken()) {
      router.replace('/admin');
    }
  }, [router]);

  const handleLogout = useCallback(async () => {
    const token = getAccessToken();
    if (token) await logout(token).catch(() => {});
    clearTokens();
    router.replace('/admin');
  }, [router]);

  /** Wrapper que tenta usar o token atual; se 401, tenta refresh automático. */
  async function authedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    let token = getAccessToken()!;
    let res = await authFetch(url, token, options);

    if (res.status === 401) {
      const rt = getRefreshToken();
      if (!rt) {
        clearTokens();
        router.replace('/admin');
        throw new Error('Sessão expirada');
      }
      try {
        const newTokens = await refreshTokens(rt);
        saveTokens(newTokens);
        token = newTokens.accessToken;
        res = await authFetch(url, token, options);
      } catch {
        clearTokens();
        router.replace('/admin');
        throw new Error('Sessão expirada');
      }
    }

    return res;
  }

  async function syncBosch() {
    setBoschSync({ status: 'running', message: 'Sincronizando Bosch…' });
    try {
      const res = await authedFetch('/sync/bosch', {
        method: 'POST',
        body: JSON.stringify({ categories: selectedCategories }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? `Erro ${res.status}`);
      setBoschSync({
        status: 'success',
        message: `✓ ${data.synced ?? '?'} produtos sincronizados em ${data.durationMs ?? '?'}ms`,
      });
    } catch (err) {
      setBoschSync({
        status: 'error',
        message: err instanceof Error ? err.message : 'Erro desconhecido',
      });
    }
  }

  async function syncDita() {
    setDitaSync({ status: 'running', message: 'Sincronizando DITA…' });
    try {
      const res = await authedFetch('/sync/dita', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? `Erro ${res.status}`);
      setDitaSync({
        status: 'success',
        message: `✓ ${data.synced ?? '?'} produtos sincronizados`,
      });
    } catch (err) {
      setDitaSync({
        status: 'error',
        message: err instanceof Error ? err.message : 'Erro desconhecido',
      });
    }
  }

  async function resolveCodes() {
    setResolveSync({ status: 'running', message: 'Resolvendo códigos Bosch…' });
    try {
      const res = await authedFetch('/sync/bosch/resolve-codes', {
        method: 'POST',
        body: JSON.stringify({ limit: 50 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? `Erro ${res.status}`);
      setResolveSync({
        status: 'success',
        message: `✓ ${data.resolved ?? '?'} códigos resolvidos`,
      });
    } catch (err) {
      setResolveSync({
        status: 'error',
        message: err instanceof Error ? err.message : 'Erro desconhecido',
      });
    }
  }

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Painel Admin</h1>
          <p className="text-slate-500 text-sm">Sincronização de catálogos externos</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-500 hover:text-red-600 border border-slate-300 hover:border-red-300 px-4 py-1.5 rounded-lg transition-colors"
        >
          Sair
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-3xl">
        {/* Sync Bosch */}
        <SyncCard
          title="Catálogo Bosch"
          description="Sincroniza produtos do catálogo externo Bosch por categoria."
          state={boschSync}
          onRun={syncBosch}
          disabled={selectedCategories.length === 0}
        >
          <div className="mt-3">
            <p className="text-xs font-medium text-slate-500 mb-2">Categorias</p>
            <div className="flex flex-wrap gap-2">
              {BOSCH_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    selectedCategories.includes(cat)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </SyncCard>

        {/* Sync DITA */}
        <SyncCard
          title="Catálogo DITA Auto"
          description="Sincroniza produtos do catálogo externo DITA."
          state={ditaSync}
          onRun={syncDita}
        />

        {/* Resolve Bosch Codes */}
        <SyncCard
          title="Resolver Códigos Bosch"
          description="Resolve códigos OEM internos para productNumbers do catálogo Bosch (lotes de 50)."
          state={resolveSync}
          onRun={resolveCodes}
        />
      </div>
    </div>
  );
}

// ── SyncCard component ────────────────────────────────────────────────────────

function SyncCard({
  title,
  description,
  state,
  onRun,
  disabled,
  children,
}: {
  title: string;
  description: string;
  state: SyncState;
  onRun: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  const isRunning = state.status === 'running';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="font-semibold text-slate-800">{title}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
          {children}
        </div>
        <button
          onClick={onRun}
          disabled={isRunning || disabled}
          className="shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {isRunning ? 'Executando…' : 'Sincronizar'}
        </button>
      </div>

      {state.message && (
        <p
          className={`mt-4 text-sm px-3 py-2 rounded-lg ${
            state.status === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : state.status === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
