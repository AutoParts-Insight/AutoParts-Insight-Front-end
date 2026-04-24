'use client';

import { useState } from 'react';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
}

export default function Table<T extends { id: string | number }>({
  data,
  columns,
  pageSize = 10,
  onRowClick,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className='w-full'>
      <div className='overflow-x-auto rounded-lg border border-slate-200'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-slate-200 bg-slate-50'>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className='text-left py-3 px-4 font-semibold text-slate-700'
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  className='border-b border-slate-100 hover:bg-blue-50 transition cursor-pointer'
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className='py-4 px-4 text-slate-700'>
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className='py-8 px-4 text-center text-slate-500'
                >
                  Nenhum resultado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between mt-4'>
          <p className='text-sm text-slate-600'>
            Página {currentPage} de {totalPages}
          </p>
          <div className='flex gap-2'>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className='px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition'
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className='px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition'
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
