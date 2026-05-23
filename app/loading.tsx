// Skeleton do Dashboard — exibido durante fetch server-side de stats + gaps
export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="h-10 w-52 bg-slate-200 rounded-lg animate-pulse mb-3" />
          <div className="h-4 w-40 bg-slate-100 rounded animate-pulse" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 w-28 bg-slate-100 rounded" />
                <div className="h-8 w-8 bg-slate-100 rounded-lg" />
              </div>
              <div className="h-9 w-20 bg-slate-200 rounded" />
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="h-7 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-6 py-3 border-b border-slate-100 animate-pulse">
                <div className="h-4 w-20 bg-slate-100 rounded" />
                <div className="h-4 w-36 bg-slate-100 rounded" />
                <div className="h-4 w-12 bg-slate-100 rounded" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
