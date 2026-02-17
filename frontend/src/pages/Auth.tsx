// frontend/src/pages/Auth.tsx
import { useMemo, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent } from "../components/ui/card"

type Mode = "login" | "signup"

export default function Auth() {
  const nav = useNavigate()
  const location = useLocation()

  // ✅ Detecta si entrás por /signup o /auth/signup o ?mode=signup
  const initialMode: Mode = useMemo(() => {
    const path = location.pathname.toLowerCase()
    const params = new URLSearchParams(location.search)
    const q = (params.get("mode") || "").toLowerCase()

    if (path.includes("signup") || q === "signup") return "signup"
    return "login"
  }, [location.pathname, location.search])

  const [mode, setMode] = useState<Mode>(initialMode)
  const isSignUp = mode === "signup"
  const [loading, setLoading] = useState(false)

  function submitLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      nav("/") // demo
    }, 700)
  }

  function submitSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setMode("login") // vuelve con animación
      nav("/login")    // si querés mantener URL
    }, 700)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(11,99,246,0.45),transparent_60%),radial-gradient(900px_500px_at_90%_30%,rgba(255,199,44,0.40),transparent_60%),linear-gradient(135deg,#0B63F6_0%,#0B63F6_55%,#FFC72C_55%,#FFC72C_100%)]">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="auth-card w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
          <div className={`auth-inner ${isSignUp ? "isSignUp" : ""}`}>
            {/* ===== LEFT SIDE (FORMS WRAPPER) ===== */}
            <div className="auth-forms">
              {/* LOGIN FORM */}
              <div className="auth-form auth-login">
                <div className="p-6 md:p-10">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0B63F6] text-white font-extrabold">
                      FL
                    </div>
                    <div className="leading-tight">
                      <div className="text-white text-lg font-semibold">Sign in to FixLife</div>
                      <div className="text-white/80 text-xs">Connect • Bid • Get it fixed</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button
                      type="button"
                      className="w-full bg-white text-black hover:bg-white/90"
                      onClick={() => alert("Luego conectamos Google OAuth")}
                    >
                      Continue with Google
                    </Button>
                    <Button
                      type="button"
                      className="w-full bg-[#0B63F6] hover:bg-[#094fca] text-white"
                      onClick={() => alert("Luego conectamos Facebook")}
                    >
                      Sign in with Facebook
                    </Button>
                  </div>

                  <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/20" />
                    <span className="text-xs text-white/70">or use your email</span>
                    <div className="h-px flex-1 bg-white/20" />
                  </div>

                  <Card className="border-white/15 bg-white/10">
                    <CardContent className="p-5">
                      <form onSubmit={submitLogin} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs text-white/80">Email</label>
                          <Input
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="border-white/20 bg-white/15 text-white placeholder:text-white/50"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-white/80">Password</label>
                          <Input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="border-white/20 bg-white/15 text-white placeholder:text-white/50"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <button
                            type="button"
                            className="text-xs text-white/75 hover:text-white underline underline-offset-4"
                            onClick={() => alert("Luego hacemos Forgot password")}
                          >
                            Forgot your password?
                          </button>

                          {/* ✅ NO navega a otra página: activa el slide */}
                          <button
                            type="button"
                            className="text-xs text-white/85 hover:text-white underline underline-offset-4"
                            onClick={() => setMode("signup")}
                          >
                            Create account
                          </button>
                        </div>

                        <Button
                          type="submit"
                          disabled={loading}
                          className="mt-2 w-full bg-[#FFC72C] hover:bg-[#FFB800] text-black font-semibold"
                        >
                          {loading ? "Signing in..." : "SIGN IN"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* SIGNUP FORM */}
              <div className="auth-form auth-signup">
                <div className="p-6 md:p-10">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0B63F6] text-white font-extrabold">
                      FL
                    </div>
                    <div className="leading-tight">
                      <div className="text-white text-lg font-semibold">Create Account</div>
                      <div className="text-white/80 text-xs">FixLife — alpha</div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-white/85">
                    Fill in your details to create your FixLife account.
                  </p>

                  <Card className="mt-5 border-white/15 bg-white/10">
                    <CardContent className="p-5">
                      <form onSubmit={submitSignup} className="space-y-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-xs text-white/80">First name</label>
                            <Input
                              required
                              placeholder="Rafa"
                              className="border-white/20 bg-white/15 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-white/80">Last name</label>
                            <Input
                              required
                              placeholder="Hernández"
                              className="border-white/20 bg-white/15 text-white placeholder:text-white/50"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-white/80">Phone</label>
                          <Input
                            placeholder="+503 #### ####"
                            className="border-white/20 bg-white/15 text-white placeholder:text-white/50"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-white/80">Email</label>
                          <Input
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="border-white/20 bg-white/15 text-white placeholder:text-white/50"
                          />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-xs text-white/80">Password</label>
                            <Input
                              type="password"
                              required
                              placeholder="••••••••"
                              className="border-white/20 bg-white/15 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-white/80">Confirm</label>
                            <Input
                              type="password"
                              required
                              placeholder="••••••••"
                              className="border-white/20 bg-white/15 text-white placeholder:text-white/50"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={loading}
                          className="mt-2 w-full bg-[#FFC72C] hover:bg-[#FFB800] text-black font-semibold"
                        >
                          {loading ? "Creating..." : "SIGN UP"}
                        </Button>

                        <div className="pt-2 text-center text-xs text-white/80">
                          Already have an account?{" "}
                          {/* ✅ NO navega a otra página: activa el slide */}
                          <button
                            type="button"
                            className="underline underline-offset-4 hover:text-white"
                            onClick={() => setMode("login")}
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* ===== RIGHT SIDE (SLIDING PANEL) ===== */}
            <div className="auth-panel-wrap">
              <div className="auth-panel">
                <div className="absolute inset-0 bg-[radial-gradient(700px_340px_at_50%_25%,rgba(255,255,255,0.20),transparent_60%)]" />
                <div className="relative flex h-full flex-col items-center justify-center p-10 text-center">
                  {!isSignUp ? (
                    <>
                      <h2 className="text-4xl font-extrabold text-white drop-shadow">
                        Hello, Friend!
                      </h2>
                      <p className="mt-3 max-w-sm text-white/85">
                        Enter your personal details and start your journey with FixLife.
                      </p>
                      <Button
                        type="button"
                        onClick={() => setMode("signup")}
                        className="mt-6 bg-white/15 hover:bg-white/20 text-white border border-white/25"
                      >
                        SIGN UP
                      </Button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-4xl font-extrabold text-white drop-shadow">
                        Welcome Back!
                      </h2>
                      <p className="mt-3 max-w-sm text-white/85">
                        To keep connected with us please login with your personal info.
                      </p>
                      <Button
                        type="button"
                        onClick={() => setMode("login")}
                        className="mt-6 bg-white/15 hover:bg-white/20 text-white border border-white/25"
                      >
                        SIGN IN
                      </Button>
                    </>
                  )}

                  {/* opcional: link a home */}
                  <Link to="/" className="mt-6 text-xs text-white/70 underline underline-offset-4">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CSS del efecto SLIDE (como el video) */}
<style>{`
  .auth-card{ position: relative; }

  /* Contenedor general */
  .auth-inner{
    position: relative;
    width: 100%;
    height: 560px;
    display: grid;
    grid-template-columns: 1fr 1fr; /* forms | panel */
  }
  @media (max-width: 767px){
    .auth-inner{ height: auto; grid-template-columns: 1fr; }
    .auth-panel-wrap{ display: none; }
  }

  /* === FORMS === */
  .auth-forms{
    position: relative;
    overflow: hidden;
  }
  .auth-form{
    position: absolute;
    inset: 0;
    transition: transform .65s ease, opacity .35s ease;
    will-change: transform;
  }

  /* Estado LOGIN (default): Login visible dentro de forms */
  .auth-login{ transform: translateX(0%); opacity: 1; pointer-events: auto; }
  .auth-signup{ transform: translateX(100%); opacity: 0; pointer-events: none; }

  /* Estado SIGNUP: Signup visible dentro de forms */
  .isSignUp .auth-login{ transform: translateX(-100%); opacity: 0; pointer-events: none; }
  .isSignUp .auth-signup{ transform: translateX(0%); opacity: 1; pointer-events: auto; }

  /* === PANEL === */
  .auth-panel-wrap{
    position: relative;
    overflow: hidden;
  }

  /* El panel se mueve como "overlay" dentro de su columna */
  .auth-panel{
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(11,99,246,0.95), rgba(11,99,246,0.68));
    transition: transform .65s ease;
    will-change: transform;
    animation: floaty 7s ease-in-out infinite;
  }

  /* ====== LA MAGIA: CAMBIO DE LADO REAL ======
     Cuando isSignUp, invertimos el orden de columnas:
     panel | forms
  */
  .isSignUp{
    grid-template-columns: 1fr 1fr;
  }
  .isSignUp{
    /* invierte el orden visual de las dos columnas */
  }
  .isSignUp .auth-forms{ order: 2; }      /* forms a la derecha */
  .isSignUp .auth-panel-wrap{ order: 1; } /* panel a la izquierda */

  /* Panel: en login queda normal; en signup entra con slide suave */
  .auth-panel{ transform: translateX(0); }
  .isSignUp .auth-panel{ transform: translateX(0); }

  /* animación flotante */
  @keyframes floaty{
    0%,100%{ transform: translateY(0); filter: saturate(1); }
    50%{ transform: translateY(-8px); filter: saturate(1.06); }
  }
`}</style>

        </div>
      </div>
    </div>
  )
}
