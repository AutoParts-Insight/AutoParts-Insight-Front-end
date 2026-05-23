// Skeleton da página de Gaps — exibido durante fetch server-side
export default function GapsLoading() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="h-10 w-52 bg-slate-200 rounded-lg animate-pulse mb-3" />
          <div className="h-4 w-96 bg-slate-100 rounded animate-pulse mb-2" />
          <div className="h-3 w-72 bg-slate-100 rounded animate-pulse" />
        </div>

        {/* Summary bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-4 animate-pulse text-center">
              <div className="h-8 w-10 bg-slate-200 rounded mx-auto mb-2" />
              <div className="h-3 w-16 bg-slate-100 rounded mx-auto" />
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6 animate-pulse">
          <div className="h-5 w-40 bg-slate-200 rounded mb-6" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-3 w-28 bg-slate-100 rounded shrink-0" />
                <div
                  className="h-5 bg-slate-200 rounded"
                  style={{ width: `${40 + i * 12}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex gap-3 mb-6 animate-pulse">
          <div className="h-9 w-40 bg-slate-200 rounded-lg" />
          <div className="h-9 w-40 bg-slate-200 rounded-lg" />
          <div className="h-9 w-20 bg-slate-100 rounded-lg" />
          <div className="h-9 w-20 bg-slate-100 rounded-lg" />
        </div>

        {/* Gap cards */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 p-5 mb-4 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <div className="h-5 w-20 bg-slate-200 rounded" />
                <div className="h-5 w-32 bg-slate-100 rounded" />
              </div>
              <div className="h-6 w-16 bg-slate-100 rounded-full" />
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-12 bg-slate-50 rounded-lg border border-slate-100" />
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
