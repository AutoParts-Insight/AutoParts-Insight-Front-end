'use client';

import { FlaskConical } from 'lucide-react';

export default function StudyBanner() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-center gap-2 bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-amber-800 text-xs">
      <FlaskConical size={13} className="shrink-0 text-amber-500" />
      <span>
        <strong className="font-semibold">Ambiente de estudos</strong> — os
        dados exibidos são coletados para fins educacionais e podem variar ou
        estar desatualizados.
      </span>
    </div>
  );
}
