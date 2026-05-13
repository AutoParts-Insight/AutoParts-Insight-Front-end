'use client';

import { useState, useEffect, useRef } from 'react';
import { Product } from '@/types/api';
import { searchProducts } from '@/services/productService';

interface UseSearchResult {
  results: Product[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

// Hook para busca de produtos com debounce
// Evita chamadas excessivas à API enquanto o usuário ainda está digitando
export function useSearch(query: string, debounceMs = 400): UseSearchResult {
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Ref para cancelar buscas anteriores se o usuário digitar rápido
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Limpa o timeout anterior
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Se query vazia, limpa os resultados
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      setError(null);
      return;
    }

    // Aguarda debounce antes de chamar a API
    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await searchProducts(query);
        setResults(data);
        setHasSearched(true);
      } catch {
        setError('Erro ao conectar com o servidor. Verifique se a API está rodando.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query, debounceMs]);

  return { results, isLoading, error, hasSearched };
}
