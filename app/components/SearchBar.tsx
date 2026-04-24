'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Digite o código OE...',
  loading = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='flex gap-2'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className='flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100'
        />
        <button
          type='submit'
          disabled={loading || !query.trim()}
          className='px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed'
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </form>
  );
}
