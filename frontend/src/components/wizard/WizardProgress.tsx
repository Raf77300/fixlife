// frontend/src/components/wizard/WizardProgress.tsx
type Step = { id: string; title: string }

export default function WizardProgress({
  steps,
  activeIndex,
  primaryColor = "#0B63F6",
}: {
  steps: Step[]
  activeIndex: number
  primaryColor?: string
}) {
  const pct = steps.length <= 1 ? 100 : Math.round((activeIndex / (steps.length - 1)) * 100)

  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
      <div className="mb-2 flex items-center justify-between text-xs text-white/80">
        <span className="font-medium">Progress</span>
        <span>{pct}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
        <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%`, backgroundColor: primaryColor }} />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
        {steps.map((s, idx) => {
          const state = idx < activeIndex ? "done" : idx === activeIndex ? "active" : "idle"
          return (
            <div key={s.id} className="flex items-center gap-2">
              <span
                className={[
                  "inline-flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-semibold transition",
                  state === "done" ? "border-white/20 bg-white/20 text-white" : "",
                  state === "active" ? "border-white/30 bg-white/25 text-white" : "",
                  state === "idle" ? "border-white/15 bg-transparent text-white/70" : "",
                ].join(" ")}
                style={state === "active" ? { boxShadow: `0 0 0 4px rgba(11,99,246,.18)` } : undefined}
              >
                {idx + 1}
              </span>
              <span className={state === "idle" ? "text-white/70" : "text-white"}>{s.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
