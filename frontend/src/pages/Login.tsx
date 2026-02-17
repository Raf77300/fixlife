import { Link, useNavigate } from "react-router-dom"
import * as React from "react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"

export default function Login() {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    // 🔥 Aquí luego conectamos backend (por ahora demo)
    console.log("Login attempt:", { email, password })
    setTimeout(() => {
      setLoading(false)
      nav("/")
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(11,99,246,0.45),transparent_60%),radial-gradient(900px_500px_at_90%_30%,rgba(255,199,44,0.40),transparent_60%),linear-gradient(135deg,#0B63F6_0%,#0B63F6_55%,#FFC72C_55%,#FFC72C_100%)]">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-2">
          {/* LEFT (FORM) */}
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
                <form onSubmit={onSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-white/80">Email</label>
                      <Input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="border-white/20 bg-white/15 text-white placeholder:text-white/50"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-white/80">Password</label>
                      <Input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="border-white/20 bg-white/15 text-white placeholder:text-white/50"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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

                    <Link
                      to="/signup"
                      className="text-xs text-white/85 hover:text-white underline underline-offset-4"
                    >
                      Create account
                    </Link>
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

          {/* RIGHT (ANIMATED PANEL) */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 auth-panel auth-panel-login">
              <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
              <div className="relative flex h-full flex-col items-center justify-center p-10 text-center">
                <h2 className="text-4xl font-extrabold text-white drop-shadow">
                  Hello, Friend!
                </h2>
                <p className="mt-3 max-w-sm text-white/85">
                  Enter your personal details and start your journey with FixLife.
                </p>
                <Button asChild className="mt-6 bg-white/15 hover:bg-white/20 text-white border border-white/25">
                  <Link to="/signup">
                    SIGN UP
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* animaciones */}
      <style>{`
        .auth-panel{
          background: linear-gradient(135deg, rgba(11,99,246,0.92), rgba(11,99,246,0.70));
          animation: floaty 6s ease-in-out infinite;
        }
        .auth-panel-login{
          transform: translateX(0);
        }
        @keyframes floaty {
          0%,100% { filter: saturate(1); transform: translateY(0); }
          50% { filter: saturate(1.1); transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
