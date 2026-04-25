'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ComparisonChart from '@/components/ComparisonChart';
import Table from '@/components/Table';

interface Product {
  id: string;
  codigo_oe: string;
  tipo: string;
  marca: string;
  concorrentes: number;
}

export default function SearchPage() {
  const [searchResult, setSearchResult] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - será substituído por dados reais do backend
  const mockProducts: Product[] = [
    {
      id: '1',
      codigo_oe: '31200-KSS-901',
      tipo: 'MOTOR DE PARTIDA',
      marca: 'HONDA',
      concorrentes: 5,
    },
    {
      id: '2',
      codigo_oe: '31200-KSS-902',
      tipo: 'MOTOR DE PARTIDA',
      marca: 'YAMAHA',
      concorrentes: 3,
    },
  ];

  const mockComparisonData = [
    { name: 'Sua Empresa', seus_produtos: 5243, concorrente: 0 },
    { name: 'BOSCH', seus_produtos: 5243, concorrente: 5800 },
    { name: 'GAUSS', seus_produtos: 5243, concorrente: 4200 },
    { name: 'YAMAHA', seus_produtos: 5243, concorrente: 3500 },
    { name: 'ORIGINAL', seus_produtos: 5243, concorrente: 6200 },
  ];

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    // Simula latência de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock: retorna produtos que contêm o código na busca
    const filtered = mockProducts.filter((p) =>
      p.codigo_oe.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResult(filtered.length > 0 ? filtered : []);
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen bg-slate-50 p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <h1 className='text-4xl font-bold text-slate-900 mb-2'>Buscar Produtos</h1>
          <p className='text-slate-600'>Pesquise por código OE para encontrar concorrentes</p>
        </div>

        {/* Search Section */}
        <div className='bg-white rounded-lg shadow p-6 mb-8'>
          <SearchBar
            onSearch={handleSearch}
            placeholder='Digite o código OE (ex: 31200-KSS-901)'
            loading={isLoading}
          />
        </div>

        {/* Comparison Chart */}
        <div className='mb-8'>
          <ComparisonChart data={mockComparisonData} />
        </div>

        {/* Results Section */}
        {searchResult !== null && (
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-2xl font-bold text-slate-900 mb-4'>
              Resultados ({searchResult.length})
            </h2>

            {searchResult.length > 0 ? (
              <Table<Product>
                data={searchResult}
                columns={[
                  { key: 'codigo_oe', label: 'Código OE' },
                  { key: 'tipo', label: 'Tipo' },
                  { key: 'marca', label: 'Marca' },
                  {
                    key: 'concorrentes',
                    label: 'Concorrentes com este código',
                    render: (value) => (
                      <span className='inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium'>
                        {value} fabricantes
                      </span>
                    ),
                  },
                ]}
                pageSize={10}
              />
            ) : (
              <div className='text-center py-12'>
                <p className='text-slate-500 text-lg'>
                  Nenhum produto encontrado com este código OE
                </p>
                <p className='text-slate-400 text-sm mt-2'>Tente outra busca</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
