import { HistoryDashboard } from "@/components/history-dashboard"
import { Header } from "@/components/header"

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HistoryDashboard />
      </main>
    </div>
  )
}
