export default function ClientDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome to your dashboard</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Metric {i}</h3>
            <p className="text-2xl font-bold text-foreground">--</p>
          </div>
        ))}
      </div>
    </div>
  )
}
