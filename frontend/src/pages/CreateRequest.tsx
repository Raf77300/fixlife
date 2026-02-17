// frontend/src/pages/CreateRequest.tsx
import RequestForm from "../features/request/RequestForm"

export default function CreateRequest() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#0B63F6_0%,#0B63F6_55%,#FFC72C_55%,#FFC72C_100%)]">
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr,360px] lg:items-start">
          <RequestForm />

          <aside className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white shadow-lg backdrop-blur">
            <div className="text-sm font-semibold">FixLife tips</div>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li>• Add photos for faster estimates.</li>
              <li>• Be specific about symptoms and timing.</li>
              <li>• Set urgency correctly to reduce delays.</li>
              <li>• Enable bids to get better price options.</li>
            </ul>

            <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm">
              <div className="font-semibold">Next (backend)</div>
              <div className="mt-1 text-white/85">
                Connect to JWT auth + API endpoint: <span className="font-semibold">POST /requests</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
