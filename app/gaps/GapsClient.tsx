'use client';

import { useState } from 'react';
import { GapAnalysis } from '@/types/api';
import GapChart from './GapChart';

// ─── Labels e cores por densidade ────────────────────────────────────────────

// pct = o número principal exibido (coveragePct se disponível, senão catalogDensity)
function getSeverity(pct: number) {
  if (pct >= 100) return { label: 'SUPERAMOS',     bg: 'bg-green-100',  text: 'text-green-700',  bar: 'bg-green-400',  value: 'text-green-600' };
  if (pct >= 70)  return { label: 'BOA COBERTURA', bg: 'bg-green-50',   text: 'text-green-600',  bar: 'bg-green-300',  value: 'text-green-600' };
  if (pct >= 30)  return { label: 'ATENÇÃO',       bg: 'bg-yellow-50',  text: 'text-yellow-700', bar: 'bg-yellow-400', value: 'text-yellow-600' };
  return          { label: 'CRÍTICO',              bg: 'bg-red-50',     text: 'text-red-700',    bar: 'bg-red-400',    value: 'text-red-600' };
}

// ─── Resumo no topo ───────────────────────────────────────────────────────────

function SummaryBar({ gaps }: { gaps: GapAnalysis[] }) {
  const brands = new Set(gaps.map((g) => g.brand)).size;
  const categories = new Set(gaps.map((g) => g.category)).size;
  // Usa coveragePct quando disponível (matching real), senão catalogDensity (volume)
  const pct = (g: GapAnalysis) => g.hasExactMatching ? g.coveragePct : g.catalogDensity;
  const critical = gaps.filter((g) => pct(g) < 30).length;
  const warning  = gaps.filter((g) => pct(g) >= 30 && pct(g) < 70).length;
  const ok       = gaps.filter((g) => pct(g) >= 70).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
      <Stat label="Concorrentes" value={brands} color="text-slate-700" />
      <Stat label="Categorias" value={categories} color="text-slate-700" />
      <Stat label="Críticos" value={critical} color="text-red-600" />
      <Stat label="Atenção" value={warning} color="text-yellow-600" />
      <Stat label="Cobertos" value={ok} color="text-green-600" />
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 text-center shadow-sm">
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  );
}

// ─── Filtros ──────────────────────────────────────────────────────────────────

type Severity = 'all' | 'critical' | 'warning' | 'ok';

const SEVERITY_OPTIONS: { value: Severity; label: string }[] = [
  { value: 'all',      label: 'Todos' },
  { value: 'critical', label: 'Crítico' },
  { value: 'warning',  label: 'Atenção' },
  { value: 'ok',       label: 'Cobertos' },
];

function FilterBar({
  brands, categories, selectedBrand, selectedCategory, severity,
  onBrand, onCategory, onSeverity,
}: {
  brands: string[];
  categories: string[];
  selectedBrand: string;
  selectedCategory: string;
  severity: Severity;
  onBrand: (v: string) => void;
  onCategory: (v: string) => void;
  onSeverity: (v: Severity) => void;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-end shadow-sm">
      {/* Concorrente */}
      <div className="flex flex-col gap-1.5 min-w-40">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Concorrente</label>
        <select
          className="border border-slate-300 rounded-md px-3 py-1.5 text-sm text-slate-800 bg-white"
          value={selectedBrand}
          onChange={(e) => onBrand(e.target.value)}
        >
          <option value="">Todos</option>
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Categoria */}
      <div className="flex flex-col gap-1.5 min-w-45">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Categoria</label>
        <select
          className="border border-slate-300 rounded-md px-3 py-1.5 text-sm text-slate-800 bg-white"
          value={selectedCategory}
          onChange={(e) => onCategory(e.target.value)}
        >
          <option value="">Todas</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Severidade */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Classificação</label>
        <div className="flex gap-2">
          {SEVERITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSeverity(opt.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors
                ${severity === opt.value
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Card de gap ──────────────────────────────────────────────────────────────

const MAX_PRODUCTS_SHOWN = 6;

function GapCard({ gap }: { gap: GapAnalysis }) {
  const [expanded, setExpanded] = useState(false);
  // Usa cobertura real se matching disponível, senão volume
  const mainPct   = gap.hasExactMatching ? gap.coveragePct : gap.catalogDensity;
  const barWidth  = Math.min(mainPct, 100);
  const sev       = getSeverity(mainPct);
  const visibleProducts = expanded ? gap.externalProducts : gap.externalProducts.slice(0, MAX_PRODUCTS_SHOWN);
  const hiddenCount = gap.externalProducts.length - MAX_PRODUCTS_SHOWN;

  return (
    <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{gap.brand}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sev.bg} ${sev.text}`}>
                {sev.label}
              </span>
              {gap.hasExactMatching && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold">
                  cobertura real
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{gap.category}</h2>
          </div>
          <div className={`text-3xl font-bold ${sev.value}`}>
            {mainPct}%
          </div>
        </div>

        {/* Barra principal */}
        <div className="mt-4">
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${sev.bar}`}
              style={{ width: `${barWidth}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1.5">
            {gap.hasExactMatching ? (
              <>
                <span><strong className="text-slate-700">{gap.matchedCount}</strong> com equivalente</span>
                <span className="text-slate-400">cobertura por código</span>
                <span><strong className="text-slate-700">{gap.externalCount - gap.matchedCount}</strong> sem equivalente</span>
              </>
            ) : (
              <>
                <span><strong className="text-slate-700">{gap.internalCount}</strong> nossos</span>
                <span className="text-slate-400">densidade de catálogo</span>
                <span><strong className="text-slate-700">{gap.externalCount}</strong> {gap.brand}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Produtos externos */}
      {gap.externalProducts.length > 0 && (
        <div className="p-6">
          <h3 className="text-sm font-semibold text-slate-600 mb-3">
            Catálogo externo — {gap.externalCount} produtos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleProducts.map((product) => (
              <div
                key={product.productNumber}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100"
              >
                {product.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.imageUrl}
                    alt={product.productNumber}
                    className="w-10 h-10 object-contain shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-mono text-sm font-semibold text-slate-800 truncate">
                      {product.productNumber}
                    </p>
                    {gap.hasExactMatching && (
                      <span className={`text-xs shrink-0 font-bold ${
                        product.matched ? 'text-green-500' : 'text-red-400'
                      }`}>
                        {product.matched ? '✓' : '✗'}
                      </span>
                    )}
                  </div>
                  {product.code && (
                    <p className="text-xs text-blue-600 font-medium">Cód: {product.code}</p>
                  )}
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {product.description ?? '—'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {hiddenCount > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {expanded ? '▲ Mostrar menos' : `▼ Ver mais ${hiddenCount} produtos`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Export CSV ───────────────────────────────────────────────────────────────

function toCsvRow(cells: string[]): string {
  return cells.map((c) => `"${c.replace(/"/g, '""')}"`).join(',');
}

function triggerDownload(csv: string, filename: string) {
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportGapsCSV(gaps: GapAnalysis[]) {
  const header = toCsvRow(['Concorrente', 'Categoria', 'Externos', 'Com equivalente', 'Sem equivalente', 'Cobertura (%)']);
  const rows = gaps.map((g) => {
    const coverage = g.hasExactMatching ? String(g.coveragePct) : `${g.catalogDensity} (densidade)`;
    const matched  = g.hasExactMatching ? String(g.matchedCount) : '-';
    const unmatched = g.hasExactMatching ? String(g.externalCount - g.matchedCount) : '-';
    return toCsvRow([g.brand, g.category, String(g.externalCount), matched, unmatched, coverage]);
  });
  triggerDownload([header, ...rows].join('\n'), `gaps-${new Date().toISOString().slice(0, 10)}.csv`);
}

function exportUnmatchedCSV(gaps: GapAnalysis[]) {
  const header = toCsvRow(['Concorrente', 'Categoria', 'Código (productNumber)', 'Cód. Referência', 'Descrição']);
  const rows: string[] = [];
  for (const gap of gaps) {
    if (!gap.hasExactMatching) continue;
    for (const p of gap.externalProducts.filter((p) => !p.matched)) {
      rows.push(toCsvRow([gap.brand, gap.category, p.productNumber, p.code ?? '', p.description ?? '']));
    }
  }
  triggerDownload([header, ...rows].join('\n'), `sem-equivalente-${new Date().toISOString().slice(0, 10)}.csv`);
}

// ─── Listagem de produtos sem equivalente ────────────────────────────────────

function UnmatchedList({ gaps }: { gaps: GapAnalysis[] }) {
  const items = gaps
    .filter((g) => g.hasExactMatching)
    .flatMap((g) =>
      g.externalProducts
        .filter((p) => !p.matched)
        .map((p) => ({ brand: g.brand, category: g.category, ...p })),
    );

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
        <p className="text-slate-500 font-medium">Nenhum produto sem equivalente</p>
        <p className="text-slate-400 text-sm mt-1">
          Todos os produtos externos têm equivalente interno, ou o matching ainda não foi executado.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <span className="font-semibold text-slate-700">
          {items.length} produto{items.length !== 1 ? 's' : ''} sem equivalente interno
        </span>
        <span className="text-xs text-slate-500">oportunidade de expansão do catálogo</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left py-3 px-4 font-semibold text-slate-600">Concorrente</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-600">Categoria</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-600">Código</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-600">Ref.</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-600">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-800">{p.brand}</td>
                <td className="py-3 px-4 text-slate-600">{p.category}</td>
                <td className="py-3 px-4 font-mono text-slate-900 font-medium">{p.productNumber}</td>
                <td className="py-3 px-4 font-mono text-blue-600 text-xs">{p.code ?? '—'}</td>
                <td className="py-3 px-4 text-slate-500 max-w-xs truncate" title={p.description ?? undefined}>
                  {p.description ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Componente principal (cliente) ──────────────────────────────────────────

export default function GapsClient({ gaps }: { gaps: GapAnalysis[] }) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [severity, setSeverity] = useState<Severity>('all');
  const [view, setView] = useState<'gaps' | 'unmatched'>('gaps');

  const brands     = [...new Set(gaps.map((g) => g.brand))].sort();
  const categories = [...new Set(gaps.map((g) => g.category))].sort();

  const pct = (g: GapAnalysis) => g.hasExactMatching ? g.coveragePct : g.catalogDensity;

  const filtered = gaps.filter((g) => {
    if (selectedBrand && g.brand !== selectedBrand) return false;
    if (selectedCategory && g.category !== selectedCategory) return false;
    if (view === 'gaps') {
      if (severity === 'critical' && pct(g) >= 30) return false;
      if (severity === 'warning'  && (pct(g) < 30 || pct(g) >= 70)) return false;
      if (severity === 'ok'       && pct(g) < 70) return false;
    }
    return true;
  });

  const totalUnmatched = filtered
    .filter((g) => g.hasExactMatching)
    .flatMap((g) => g.externalProducts.filter((p) => !p.matched))
    .length;

  return (
    <>
      <SummaryBar gaps={gaps} />
      <GapChart gaps={gaps} />

      {/* Tab bar + botão CSV */}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => setView('gaps')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
              view === 'gaps'
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
            }`}
          >
            Análise de Gaps
          </button>
          <button
            onClick={() => setView('unmatched')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors flex items-center gap-2 ${
              view === 'unmatched'
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
            }`}
          >
            Sem Equivalente
            {totalUnmatched > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                view === 'unmatched' ? 'bg-white text-slate-800' : 'bg-red-100 text-red-600'
              }`}>
                {totalUnmatched}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={() => view === 'gaps' ? exportGapsCSV(filtered) : exportUnmatchedCSV(filtered)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
        >
          ↓ Exportar CSV
        </button>
      </div>

      <FilterBar
        brands={brands}
        categories={categories}
        selectedBrand={selectedBrand}
        selectedCategory={selectedCategory}
        severity={severity}
        onBrand={setSelectedBrand}
        onCategory={setSelectedCategory}
        onSeverity={setSeverity}
      />

      {view === 'gaps' ? (
        filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-10 text-center text-slate-400">
            Nenhum resultado para os filtros selecionados.
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((gap) => (
              <GapCard key={`${gap.brand}-${gap.category}`} gap={gap} />
            ))}
          </div>
        )
      ) : (
        <UnmatchedList gaps={filtered} />
      )}
    </>
  );
}
