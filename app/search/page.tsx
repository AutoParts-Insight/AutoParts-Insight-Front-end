'use client';

import { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { Product, ProductReference } from '@/types/api';
import SearchBar from '@/components/SearchBar';

// Retorna o código ORIGINAL do produto, ou o primeiro código disponível
function getOriginalCode(references: ProductReference[]): string {
  const original = references.find((r) => r.brand.name === 'ORIGINAL');
  return original?.code ?? references[0]?.code ?? '—';
}

// Retorna marcas concorrentes (excluindo ORIGINAL)
function getCompetitorBrands(references: ProductReference[]): string[] {
  return [
    ...new Set(
      references
        .filter((r) => r.brand.name !== 'ORIGINAL')
        .map((r) => r.brand.name),
    ),
  ];
}

function ProductCard({ product }: { product: Product }) {
  const originalCode = getOriginalCode(product.references);
  const competitors = getCompetitorBrands(product.references);
  const specs = product.specifications;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              SKU {product.sku}
            </span>
            {product.category && (
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                {product.category.name}
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-slate-800 leading-snug">
            {product.name}
          </p>
        </div>
      </div>

      {/* Código OEM original */}
      <div className="mb-3">
        <p className="text-xs text-slate-500 mb-1">Código Original (OEM)</p>
        <p className="font-mono font-bold text-slate-900">{originalCode}</p>
      </div>

      {/* Especificações */}
      {Object.keys(specs).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {Object.entries(specs).map(([key, value]) => (
            <span
              key={key}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-2 py-1 rounded"
            >
              {key}: <strong>{value}</strong>
            </span>
          ))}
        </div>
      )}

      {/* Aplicações */}
      {product.applications.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-slate-500 mb-1">Aplicações</p>
          <p className="text-xs text-slate-700">
            {product.applications.join(' · ')}
          </p>
        </div>
      )}

      {/* Referências de concorrentes */}
      {competitors.length > 0 && (
        <div>
          <p className="text-xs text-slate-500 mb-2">
            Marcas com equivalência ({competitors.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {product.references
              .filter((r) => r.brand.name !== 'ORIGINAL')
              .map((ref) => (
                <span
                  key={ref.id}
                  className="text-xs bg-amber-50 border border-amber-200 text-amber-800 px-2 py-1 rounded font-mono"
                >
                  {ref.brand.name}: {ref.code}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { results, isLoading, error, hasSearched } = useSearch(query);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Buscar por Código
          </h1>
          <p className="text-slate-600">
            Digite um código OEM, código de concorrente (Gauss, Bosch...) ou
            SKU interno
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <SearchBar
            onSearch={(q) => setQuery(q)}
            placeholder="Ex: 31200-KSS-901 ou GM23005"
            loading={isLoading}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {hasSearched && !isLoading && (
          <div>
            <p className="text-sm text-slate-500 mb-4">
              {results.length === 0
                ? 'Nenhum produto encontrado'
                : `${results.length} produto${results.length > 1 ? 's' : ''} encontrado${results.length > 1 ? 's' : ''}`}
            </p>

            {results.length > 0 && (
              <div className="flex flex-col gap-4">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state inicial */}
        {!hasSearched && !isLoading && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg">Digite um código para começar a busca</p>
            <p className="text-sm mt-1">
              O sistema pesquisa em todos os códigos cadastrados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
