import { createContext, useContext } from "react"

type WizardContextValue = {
  activeIndex: number
  total: number
  goNext: () => void
  goBack: () => void
  goTo: (idx: number) => void
  canGoBack: boolean
}

export const WizardContext = createContext<WizardContextValue | null>(null)

export function useWizard() {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error("useWizard must be used inside <Wizard />")
  return ctx
}
