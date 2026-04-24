'use client';

interface ProductCardProps {
  id: string;
  title: string;
  competitor: string;
  image?: string;
  onClick?: () => void;
}

export default function ProductCard({
  id,
  title,
  competitor,
  image,
  onClick,
}: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className='bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden border border-slate-200'
    >
      {/* Image Container */}
      <div className='w-full h-48 bg-slate-100 flex items-center justify-center overflow-hidden'>
        {image ? (
          <img src={image} alt={title} className='w-full h-full object-cover' />
        ) : (
          <div className='text-slate-400 text-center p-4'>
            <p className='text-sm'>Sem imagem</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className='p-4'>
        <h3 className='font-semibold text-slate-900 text-sm mb-2 line-clamp-2'>
          {title}
        </h3>

        <div className='flex items-center justify-between'>
          <span className='inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium'>
            {competitor}
          </span>
          <span className='text-xs text-slate-500'>ID: {id}</span>
        </div>
      </div>
    </div>
  );
}
