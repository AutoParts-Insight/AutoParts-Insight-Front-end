'use client';

import { formatPrice } from '@/lib/formatters';
import { useDarkMode } from '@/hooks/useDarkMode';
import type { Product } from '@/types';

export interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`p-4 rounded-lg border ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-500">SKU: {product.sku}</p>
      <p className="mt-2">Categoria: {product.category}</p>
    </div>
  );
}
