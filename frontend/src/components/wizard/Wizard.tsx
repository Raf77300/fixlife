// frontend/src/components/wizard/Wizard.tsx
import React, { useCallback, useMemo, useState } from "react"
import WizardProgress from "./WizardProgress"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { WizardContext } from "./useWizard"

export type WizardStepConfig<T> = {
  id: string
  title: string
  subtitle?: string
  validate?: (data: T) => Partial<Record<string, string>> | null
  content: (args: { data: T; setData: React.Dispatch<React.SetStateAction<T>> }) => React.ReactNode
}

type WizardContextValue = {
  activeIndex: number
  total: number
  goNext: () => void
  goBack: () => void
  goTo: (idx: number) => void
  canGoBack: boolean
}

type WizardProps<T> = {
  title?: string
  steps: WizardStepConfig<T>[]
  initialData: T
  onSubmit: (data: T) => Promise<void> | void
  primaryColor?: string
}

export default function Wizard<T>({
  title = "Create request",
  steps,
  initialData,
  onSubmit,
  primaryColor = "#0B63F6",
}: WizardProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [data, setData] = useState<T>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const total = steps.length
  const activeStep = steps[activeIndex]
  const isLast = activeIndex === total - 1

  const validateStep = useCallback(() => {
    const fn = activeStep.validate
    if (!fn) {
      setErrors({})
      return true
    }

    const res = fn(data) || {}
    const flat: Record<string, string> = {}

    Object.entries(res).forEach(([k, v]) => {
      if (typeof v === "string" && v.trim()) flat[k] = v
    })

    setErrors(flat)
    return Object.keys(flat).length === 0
  }, [activeStep, data])

  const goNext = useCallback(async () => {
    if (!validateStep()) return

    if (isLast) {
      try {
        setSubmitting(true)
        await onSubmit(data)
      } finally {
        setSubmitting(false)
      }
      return
    }

    setActiveIndex((p) => Math.min(p + 1, total - 1))
  }, [validateStep, isLast, onSubmit, data, total])

  const goBack = useCallback(() => setActiveIndex((p) => Math.max(p - 1, 0)), [])
  const goTo = useCallback((idx: number) => setActiveIndex(() => Math.max(0, Math.min(idx, total - 1))), [total])

  const ctxValue = useMemo<WizardContextValue>(
    () => ({
      activeIndex,
      total,
      goNext,
      goBack,
      goTo,
      canGoBack: activeIndex > 0,
    }),
    [activeIndex, total, goNext, goBack, goTo]
  )

  return (
    <WizardContext.Provider value={ctxValue}>
      <div className="w-full">
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
              <p className="text-sm text-white/80">
                Step {activeIndex + 1} of {total} • {activeStep.title}
              </p>
            </div>
          </div>

          <WizardProgress
            steps={steps.map((s) => ({ id: s.id, title: s.title }))}
            activeIndex={activeIndex}
            primaryColor={primaryColor}
          />
        </div>

        <Card className="border-white/10 bg-white/90 shadow-lg backdrop-blur">
          <CardContent className="p-0">
            <div className="border-b border-black/10 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-black">{activeStep.title}</h2>
                  {activeStep.subtitle ? <p className="mt-1 text-sm text-black/60">{activeStep.subtitle}</p> : null}
                </div>

                <div className="hidden items-center gap-2 md:flex">
                  {activeIndex > 0 ? (
                    <Button variant="outline" onClick={goBack}>
                      Back
                    </Button>
                  ) : null}

                  <Button
                    onClick={goNext}
                    disabled={submitting}
                    className="bg-[#0B63F6] hover:bg-[#094fca] text-white"
                  >
                    {isLast ? (submitting ? "Publishing..." : "Publish") : "Next"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex w-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {steps.map((step) => (
                  <div key={step.id} className="w-full shrink-0 p-6">
                    {step.content({ data, setData })}

                    {Object.keys(errors).length > 0 ? (
                      <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        <div className="font-semibold">Please fix:</div>
                        <ul className="mt-1 list-disc pl-5">
                          {Object.entries(errors).map(([k, v]) => (
                            <li key={k}>
                              <span className="font-medium">{k}:</span> {v}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="mt-6 flex items-center justify-between gap-2 md:hidden">
                      <Button variant="outline" onClick={goBack} disabled={activeIndex === 0}>
                        Back
                      </Button>
                      <Button
                        onClick={goNext}
                        disabled={submitting}
                        className="bg-[#0B63F6] hover:bg-[#094fca] text-white"
                      >
                        {isLast ? (submitting ? "Publishing..." : "Publish") : "Next"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </WizardContext.Provider>
  )
}
