import type { Product } from '@/types';

// Serviço de exemplo
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
}
