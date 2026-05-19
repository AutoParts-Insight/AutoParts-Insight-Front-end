'use client';

/**
 * AuthContext — fonte única de verdade para o estado de autenticação.
 *
 * Lê o estado inicial do localStorage (client-side).
 * Reage a mudanças via evento customizado 'ap:auth-change' (disparado por
 * saveTokens/clearTokens na mesma aba) e via evento nativo 'storage'
 * (cross-tab sync).
 *
 * isLoading = true enquanto o primeiro read do localStorage ainda não ocorreu
 * (evita renderização prematura com role errado).
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  getAccessToken,
  getRole,
  getUsername,
} from '@/services/authService';

export interface AuthState {
  role: string | null;
  username: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthState>({
  role: null,
  username: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    role: null,
    username: null,
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
  });

  const sync = useCallback(() => {
    const role = getRole();
    const username = getUsername();
    const isAuthenticated = !!getAccessToken();
    setState({
      role,
      username,
      isAuthenticated,
      isAdmin: role === 'ADMIN',
      isLoading: false,
    });
  }, []);

  useEffect(() => {
    // Leitura inicial (após hidratação, somente client-side)
    sync();

    // Mesma aba: saveTokens/clearTokens disparam este evento
    window.addEventListener('ap:auth-change', sync);
    // Cross-tab: outra aba alterou o localStorage
    window.addEventListener('storage', sync);

    return () => {
      window.removeEventListener('ap:auth-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, [sync]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  return useContext(AuthContext);
}
