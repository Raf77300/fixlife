// frontend/src/components/wizard/WizardStep.tsx
import React from "react"

export default function WizardStep({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>
}
