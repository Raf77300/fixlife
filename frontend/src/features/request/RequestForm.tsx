// frontend/src/features/request/RequestForm.tsx
import React, { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import Wizard from "../../components/wizard/Wizard"
import type { WizardStepConfig } from "../../components/wizard/Wizard"
import WizardStep from "../../components/wizard/WizardStep"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"

export type Urgency = "low" | "medium" | "high"
export type ServiceType = "home" | "vehicle" | "tech" | "other"

export type RequestDraft = {
  images: File[]
  description: string

  category: string
  urgency: Urgency
  serviceType: ServiceType

  address: string
  city: string
  mapLink?: string

  estimatedBudget: number | ""
  allowBids: boolean
}

const CATEGORIES = [
  "Plumbing",
  "Electricity",
  "Carpentry",
  "Mechanic",
  "Painting",
  "A/C & Refrigeration",
  "Cleaning",
  "Gardening",
  "Other",
] as const

// ✅ Mapa ES -> EN (para que el Home pase "Plomería" y aquí quede "Plumbing")
const CATEGORY_ALIASES: Record<string, (typeof CATEGORIES)[number]> = {
  Plomería: "Plumbing",
  Plumbing: "Plumbing",

  Electricidad: "Electricity",
  Electricity: "Electricity",

  Carpintería: "Carpentry",
  Carpentry: "Carpentry",

  Mecánica: "Mechanic",
  Mechanic: "Mechanic",

  Pintura: "Painting",
  Painting: "Painting",

  "A/C & Refrigeración": "A/C & Refrigeration",
  "A/C & Refrigeration": "A/C & Refrigeration",

  Limpieza: "Cleaning",
  Cleaning: "Cleaning",

  Jardinería: "Gardening",
  Gardening: "Gardening",

  Other: "Other",
  Otro: "Other",
}

function normalizeCategory(raw: string | null): string {
  if (!raw) return ""
  const decoded = raw.trim()
  if (!decoded) return ""

  // Si viene con + o %20 ya lo maneja URLSearchParams, pero por seguridad:
  const key = decoded.replace(/\+/g, " ")

  return CATEGORY_ALIASES[key] ?? ""
}

function formatMoney(n: number) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
  } catch {
    return `$${n.toFixed(2)}`
  }
}

function useImageDnD(value: File[], onChange: (files: File[]) => void) {
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files || []).filter((f) => f.type.startsWith("image/"))
    if (files.length) onChange([...value, ...files].slice(0, 6))
  }
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) => f.type.startsWith("image/"))
    if (files.length) onChange([...value, ...files].slice(0, 6))
  }
  return { onDrop, onPick }
}

function ImageThumb({
  file,
  onRemove,
}: {
  file: File
  onRemove: () => void
}) {
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    const u = URL.createObjectURL(file)
    setUrl(u)
    return () => URL.revokeObjectURL(u)
  }, [file])

  return (
    <div className="relative overflow-hidden rounded-xl border border-black/10 bg-black/5">
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
      {url ? <img src={url} alt={file.name} className="h-24 w-full object-cover" /> : null}
      <button
        type="button"
        className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white hover:bg-black"
        onClick={onRemove}
      >
        ✕
      </button>
    </div>
  )
}

export default function RequestForm() {
  const location = useLocation()

  // ✅ Lee ?category=... desde la URL
  const categoryFromUrl = useMemo(() => {
    const sp = new URLSearchParams(location.search)
    return normalizeCategory(sp.get("category"))
  }, [location.search])

  // ✅ Initial data (pre-carga category)
  const initialData: RequestDraft = useMemo(
    () => ({
      images: [],
      description: "",

      category: categoryFromUrl || "",
      urgency: "medium",
      serviceType: "home",

      address: "",
      city: "",
      mapLink: "",

      estimatedBudget: "",
      allowBids: true,
    }),
    [categoryFromUrl]
  )

  const steps = useMemo<WizardStepConfig<RequestDraft>[]>(
    () => [
      {
        id: "problem",
        title: "Problem",
        subtitle: "Add photos and describe what needs to be fixed.",
        validate: (d) => {
          const e: Partial<Record<string, string>> = {}
          if (!d.description || d.description.trim().length < 15) e.description = "Write at least 15 characters."
          if (d.images.length === 0) e.images = "Add at least 1 image (required for now)."
          return e
        },
        content: ({ data, setData }) => {
          const { onDrop, onPick } = useImageDnD(data.images, (files) => setData((p) => ({ ...p, images: files })))

          return (
            <WizardStep>
              <div className="grid gap-5 lg:grid-cols-2">
                <div>
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}
                    className="group relative rounded-2xl border border-dashed border-black/20 bg-white p-5 transition hover:border-black/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-black">Upload images</div>
                        <div className="mt-1 text-xs text-black/60">Drag & drop up to 6 images • JPG/PNG/WebP</div>
                      </div>
                      <label className="cursor-pointer">
                        <input type="file" accept="image/*" multiple className="hidden" onChange={onPick} />
                        <Button type="button" className="bg-[#0B63F6] hover:bg-[#094fca] text-white">
                          Choose
                        </Button>
                      </label>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {data.images.map((f, idx) => (
                        <ImageThumb
                          key={`${f.name}-${f.size}-${idx}`}
                          file={f}
                          onRemove={() => setData((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))}
                        />
                      ))}

                      {data.images.length === 0 ? (
                        <div className="col-span-3 rounded-xl bg-black/5 p-4 text-sm text-black/60">
                          Tip: photos help pros estimate faster.
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-5">
                  <div className="text-sm font-semibold text-black">Description</div>
                  <div className="mt-1 text-xs text-black/60">
                    Include what happened, when it started, and any relevant details.
                  </div>

                  <textarea
                    value={data.description}
                    onChange={(e) => setData((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Example: My kitchen sink is leaking under the cabinet since yesterday..."
                    className="mt-3 min-h-40 w-full resize-none rounded-xl border border-black/15 bg-white px-3 py-2"
                  />
                  <div className="mt-3 flex items-center justify-between text-xs text-black/60">
                    <span>{data.description.trim().length} chars</span>
                    <span className="rounded-full bg-black/5 px-2 py-1">FixLife • Verified pros</span>
                  </div>
                </div>
              </div>
            </WizardStep>
          )
        },
      },

      {
        id: "details",
        title: "Details",
        subtitle: "Choose category, urgency and service type.",
        validate: (d) => {
          const e: Partial<Record<string, string>> = {}
          if (!d.category) e.category = "Select a category."
          if (!d.urgency) e.urgency = "Select urgency."
          if (!d.serviceType) e.serviceType = "Select service type."
          return e
        },
        content: ({ data, setData }) => (
          <WizardStep>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-sm font-semibold">Category</div>
                <select
                  value={data.category}
                  onChange={(e) => setData((p) => ({ ...p, category: e.target.value }))}
                  className="mt-3 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#0B63F6] focus:ring-4 focus:ring-blue-200/40"
                >
                  <option value="">Select...</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {categoryFromUrl && !data.category ? (
                  <div className="mt-2 text-xs text-black/60">
                    Prefilled from URL: <span className="font-semibold">{categoryFromUrl}</span>
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-sm font-semibold">Urgency</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(["low", "medium", "high"] as Urgency[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setData((p) => ({ ...p, urgency: u }))}
                      className={[
                        "rounded-xl border px-3 py-2 text-sm font-medium transition",
                        data.urgency === u
                          ? "border-blue-200 bg-blue-50 text-[#0B63F6]"
                          : "border-black/10 bg-white hover:bg-black/5",
                      ].join(" ")}
                    >
                      {u.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-black/60">High urgency helps pros prioritize.</div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-sm font-semibold">Service type</div>
                <div className="mt-3 grid gap-2">
                  {[
                    { id: "home", label: "Home repair" },
                    { id: "vehicle", label: "Vehicle / mechanic" },
                    { id: "tech", label: "Tech / devices" },
                    { id: "other", label: "Other" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setData((p) => ({ ...p, serviceType: s.id as ServiceType }))}
                      className={[
                        "flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition",
                        data.serviceType === s.id
                          ? "border-blue-200 bg-blue-50"
                          : "border-black/10 bg-white hover:bg-black/5",
                      ].join(" ")}
                    >
                      <span className={data.serviceType === s.id ? "font-semibold text-[#0B63F6]" : "font-medium"}>
                        {s.label}
                      </span>
                      <span className="text-xs text-black/50">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-black/10 bg-[linear-gradient(135deg,rgba(11,99,246,.08),rgba(255,199,44,.10))] p-5">
              <div className="text-sm font-semibold text-black">Preview</div>
              <div className="mt-2 text-sm text-black/70">
                <span className="font-semibold">{data.category || "—"}</span> •{" "}
                <span className="font-semibold">{data.urgency.toUpperCase()}</span> •{" "}
                <span className="font-semibold">{data.serviceType}</span>
              </div>
            </div>
          </WizardStep>
        ),
      },

      {
        id: "location",
        title: "Location",
        subtitle: "Where should the pro go?",
        validate: (d) => {
          const e: Partial<Record<string, string>> = {}
          if (!d.address || d.address.trim().length < 6) e.address = "Enter a valid address."
          if (!d.city || d.city.trim().length < 2) e.city = "Enter your city."
          return e
        },
        content: ({ data, setData }) => (
          <WizardStep>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-sm font-semibold">Address</div>
                <Input
                  value={data.address}
                  onChange={(e) => setData((p) => ({ ...p, address: e.target.value }))}
                  placeholder="Street, house number, references..."
                  className="mt-3"
                />

                <div className="mt-4 text-sm font-semibold">City</div>
                <Input
                  value={data.city}
                  onChange={(e) => setData((p) => ({ ...p, city: e.target.value }))}
                  placeholder="Santa Tecla, San Salvador, ..."
                  className="mt-3"
                />

                <div className="mt-4 text-sm font-semibold">Map link (optional)</div>
                <Input
                  value={data.mapLink || ""}
                  onChange={(e) => setData((p) => ({ ...p, mapLink: e.target.value }))}
                  placeholder="Google Maps link"
                  className="mt-3"
                />

                <div className="mt-3 text-xs text-black/60">Later we can replace this with a real map picker.</div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-sm font-semibold">Map preview (optional)</div>
                <div className="mt-3 rounded-2xl border border-black/10 bg-black/5 p-4 text-sm text-black/60">
                  <div className="font-medium text-black">Coming soon</div>
                  <div className="mt-1">Map integration placeholder (Leaflet/Google Maps) for FixLife.</div>
                  {data.mapLink ? (
                    <a
                      href={data.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex text-[#0B63F6] underline"
                    >
                      Open map link →
                    </a>
                  ) : null}
                </div>

                <Card className="mt-4 border-black/10 bg-[linear-gradient(135deg,rgba(11,99,246,.08),rgba(255,199,44,.10))] p-4">
                  <div className="text-sm font-semibold">Your location</div>
                  <div className="mt-2 text-sm text-black/70">
                    <div>
                      <span className="font-semibold">City:</span> {data.city || "—"}
                    </div>
                    <div className="mt-1">
                      <span className="font-semibold">Address:</span> {data.address || "—"}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </WizardStep>
        ),
      },

      {
        id: "offer",
        title: "Offer",
        subtitle: "Set estimated budget and choose if pros can bid.",
        validate: (d) => {
          const e: Partial<Record<string, string>> = {}
          if (d.estimatedBudget === "" || Number(d.estimatedBudget) <= 0) e.estimatedBudget = "Enter a budget > 0."
          return e
        },
        content: ({ data, setData }) => (
          <WizardStep>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-sm font-semibold">Estimated budget</div>
                <div className="mt-1 text-xs text-black/60">You can adjust later.</div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-sm">$</span>
                  <Input
                    value={data.estimatedBudget}
                    onChange={(e) => {
                      const raw = e.target.value
                      if (raw === "") return setData((p) => ({ ...p, estimatedBudget: "" }))

                      // solo números
                      const cleaned = raw.replace(/[^\d]/g, "")
                      if (cleaned === "") return setData((p) => ({ ...p, estimatedBudget: "" }))

                      setData((p) => ({ ...p, estimatedBudget: Number(cleaned) }))
                    }}
                    placeholder="150"
                    inputMode="numeric"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/10 bg-white p-4">
                  <div>
                    <div className="text-sm font-semibold">Allow bids</div>
                    <div className="text-xs text-black/60">Pros can propose price/time options.</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setData((p) => ({ ...p, allowBids: !p.allowBids }))}
                    className={[
                      "relative h-8 w-14 rounded-full border transition",
                      data.allowBids ? "border-blue-200 bg-blue-50" : "border-black/10 bg-black/5",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "absolute top-1 h-6 w-6 rounded-full transition",
                        data.allowBids ? "left-7 bg-[#0B63F6]" : "left-1 bg-black/40",
                      ].join(" ")}
                    />
                  </button>
                </div>

                <div className="mt-4 text-xs text-black/60">If bids are enabled, you’ll receive offers from verified pros.</div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[linear-gradient(135deg,rgba(11,99,246,.08),rgba(255,199,44,.12))] p-5">
                <div className="text-sm font-semibold text-black">Review</div>

                <div className="mt-3 grid gap-2 text-sm text-black/75">
                  <div>
                    <span className="font-semibold">Category:</span> {data.category || "—"}
                  </div>
                  <div>
                    <span className="font-semibold">Urgency:</span> {data.urgency.toUpperCase()}
                  </div>
                  <div>
                    <span className="font-semibold">Type:</span> {data.serviceType}
                  </div>
                  <div>
                    <span className="font-semibold">City:</span> {data.city || "—"}
                  </div>
                  <div>
                    <span className="font-semibold">Address:</span> {data.address || "—"}
                  </div>
                  <div>
                    <span className="font-semibold">Budget:</span>{" "}
                    {data.estimatedBudget === "" ? "—" : formatMoney(Number(data.estimatedBudget))}
                  </div>
                  <div>
                    <span className="font-semibold">Bids:</span> {data.allowBids ? "Enabled" : "Disabled"}
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4 text-sm text-black/70">
                  <div className="font-semibold text-black">Description</div>
                  <div className="mt-1 line-clamp-5">{data.description || "—"}</div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button type="button" variant="outline" onClick={() => setData((p) => ({ ...p, allowBids: true }))}>
                    Enable bids
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#0B63F6] hover:bg-[#094fca] text-white"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Ready to publish
                  </Button>
                </div>
              </div>
            </div>
          </WizardStep>
        ),
      },
    ],
    [categoryFromUrl]
  )

  const handleSubmit = async (draft: RequestDraft) => {
    console.log("REQUEST DRAFT:", draft)
    alert("✅ Request published (demo). Next: connect to API.")
  }

  return (
    <Wizard<RequestDraft>
      // ✅ Esto fuerza a re-inicializar si cambias la categoría desde otro "Explorar"
      key={categoryFromUrl || "no-category"}
      title="Publish a problem"
      steps={steps}
      initialData={initialData}
      onSubmit={handleSubmit}
      primaryColor="#0B63F6"
    />
  )
}
