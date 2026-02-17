// frontend/src/pages/Home.tsx
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

// assets (por ahora react.svg)
import slide1 from "../assets/react.svg"
import slide2 from "../assets/react.svg"
import slide3 from "../assets/react.svg"

type Slide = {
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  image: string
}

type Category = {
  title: string
  desc: string
  emoji: string
}

export default function Home() {
  const slides: Slide[] = useMemo(
    () => [
      {
        title: "Connect. Bid. Get it fixed.",
        subtitle: "Publica tu problema y recibe ofertas (bids) de profesionales verificados.",
        ctaPrimary: "Buscar servicio",
        ctaSecondary: "Publicar problema",
        image: slide1,
      },
      {
        title: "¿Qué es FixLife?",
        subtitle: "Encuentra expertos en plomería, electricidad, mecánica y más, desde un solo lugar.",
        ctaPrimary: "Ver categorías",
        ctaSecondary: "Cómo funciona",
        image: slide2,
      },
      {
        title: "Perfiles + reputación",
        subtitle: "Reviews, experiencia y disponibilidad para elegir con confianza.",
        ctaPrimary: "Ver profesionales",
        ctaSecondary: "Crear cuenta",
        image: slide3,
      },
    ],
    []
  )

  const categories: Category[] = useMemo(
    () => [
      { title: "Plomería", desc: "Fugas, tuberías, baños y grifos.", emoji: "🚰" },
      { title: "Electricidad", desc: "Instalaciones, corto circuito, breakers.", emoji: "⚡" },
      { title: "Carpintería", desc: "Puertas, muebles, arreglos y montaje.", emoji: "🪚" },
      { title: "Mecánica", desc: "Diagnóstico y reparaciones.", emoji: "🚗" },
      { title: "Pintura", desc: "Interiores, exteriores y retoques.", emoji: "🎨" },
      { title: "A/C & Refrigeración", desc: "Mantenimiento y reparación.", emoji: "❄️" },
      { title: "Limpieza", desc: "Hogar, oficina, deep cleaning.", emoji: "🧼" },
      { title: "Jardinería", desc: "Corte, diseño y mantenimiento.", emoji: "🌿" },
    ],
    []
  )

  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setActive((p) => (p + 1) % slides.length), 4500)
    return () => window.clearInterval(id)
  }, [slides.length])

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#0B63F6_0%,#0B63F6_55%,#FFC72C_55%,#FFC72C_100%)]">
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              FixLife te conecta con profesionales para resolver cualquier problema.
            </h1>
            <p className="text-white/90">
              Desde una fuga de agua hasta problemas del carro. Publica tu necesidad y recibe ofertas de expertos verificados.
            </p>

            <div className="flex flex-wrap gap-2">
              {/* Opcional: ruta futura para buscar */}
              <Button className="bg-[#FFC72C] hover:bg-[#FFB800] text-black font-semibold">
                Buscar servicio
              </Button>

              {/* ✅ Publicar problema -> wizard */}
              <Link to="/create-request">
                <Button variant="outline" className="border-white/50 text-white hover:bg-white/10">
                  Publicar problema
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/85">
              <span className="inline-block h-2 w-2 rounded-full bg-[#FFC72C]" />
              Reputación, bids y disponibilidad en tiempo real.
            </div>
          </div>

          <div className="rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
            <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white">
              <div className="grid md:grid-cols-2">
                <div className="p-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black">
                    <span className="h-2 w-2 rounded-full bg-[#0B63F6]" />
                    FIXLIFE
                  </div>

                  <h2 className="mt-3 text-2xl font-bold text-black">{slides[active].title}</h2>
                  <p className="mt-2 text-sm text-black/70">{slides[active].subtitle}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {/* ✅ CTA principal -> wizard (puedes cambiarlo después) */}
                    <Link to="/create-request">
                      <Button className="bg-[#0B63F6] hover:bg-[#094fca] text-white">
                        {slides[active].ctaPrimary}
                      </Button>
                    </Link>

                    {/* CTA secundario, por ahora lo dejamos como botón normal */}
                    <Button variant="outline">{slides[active].ctaSecondary}</Button>
                  </div>
                </div>

                <div className="relative h-[180px] bg-black/5 md:h-auto">
                  <img
                    src={slides[active].image}
                    alt={`slide-${active + 1}`}
                    className="absolute inset-0 h-full w-full object-contain p-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-black/10 px-4 py-3">
                <div className="flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActive(idx)}
                      className={[
                        "h-2.5 w-2.5 rounded-full transition",
                        idx === active ? "bg-[#0B63F6]" : "bg-black/20 hover:bg-black/30",
                      ].join(" ")}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setActive((a) => (a - 1 + slides.length) % slides.length)}
                  >
                    Prev
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setActive((a) => (a + 1) % slides.length)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">Profesiones populares</h3>
              <p className="text-white/85 text-sm">Elige una categoría y encuentra expertos cerca de ti.</p>
            </div>

            {/* Opcional: puedes dirigirlo a una page /categories más adelante */}
            <Button variant="outline" className="border-white/50 text-white hover:bg-white/10">
              Ver todas
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Card key={c.title} className="border-black/10 bg-white/95 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{c.title}</span>
                    <span className="text-xl">{c.emoji}</span>
                  </CardTitle>
                  <CardDescription>{c.desc}</CardDescription>
                </CardHeader>

                {/* ✅ Explorar -> abre wizard con category preseleccionada */}
                <CardContent className="flex gap-2">
                  <Link
                    to={`/create-request?category=${encodeURIComponent(c.title)}`}
                    className="w-full"
                  >
                    <Button className="w-full bg-[#FFC72C] hover:bg-[#FFB800] text-black font-semibold">
                      Explorar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="mt-12 pb-10 text-center text-sm text-white/80">
          © {new Date().getFullYear()} FixLife — Connect • Bid • Get it fixed
        </footer>
      </main>
    </div>
  )
}
