import { DashboardStats, Product } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

// Busca produtos por código (OEM, concorrente, SKU ou nome)
// Fluxo principal: usuário digita código → API retorna produto + todas as referências
export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return [];

  const res = await fetch(
    `${API_URL}/products?q=${encodeURIComponent(query.trim())}`,
    { cache: 'no-store' },
  );

  if (!res.ok) throw new Error(`Erro ao buscar produtos: ${res.status}`);

  return res.json();
}

// Busca produto por ID interno
export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    cache: 'no-store',
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Erro ao buscar produto: ${res.status}`);

  return res.json();
}

// Métricas reais para o dashboard
export async function getStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_URL}/stats`, {
    // Cache de 5 minutos — dados mudam pouco
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error(`Erro ao buscar stats: ${res.status}`);

  return res.json();
}
