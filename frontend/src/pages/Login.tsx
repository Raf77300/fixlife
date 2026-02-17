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

    console.log("Login attempt:", { email, password })
    setTimeout(() => {
      setLoading(false)
      nav("/")
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(11,99,246,0.45),transparent_60%),radial-gradient(900px_500px_at_90%_30%,rgba(255,199,44,0.40),transparent_60%),linear-gradient(135deg,#0B63F6_0%,#0B63F6_55%,#FFC72C_55%,#FFC72C_100%)]">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-2 animate-zoom-in">
          {/* LEFT (FORM) */}
          <div className="p-6 md:p-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
                className="w-full bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-[1.02]"
                onClick={() => alert("Luego conectamos Google OAuth")}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-2" alt="Google" />
                Continue with Google
              </Button>
              <Button
                type="button"
                className="w-full bg-[#1877F2] hover:bg-[#1864D9] text-white transition-all duration-300 hover:scale-[1.02]"
                onClick={() => alert("Luego conectamos Facebook")}
              >
                <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Sign in with Facebook
              </Button>
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/20" />
              <span className="text-xs text-white/70">or use your email</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>

            <Card className="border-white/15 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-5">
                <form onSubmit={onSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-white/80">Email</label>
                    <Input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="border-white/20 bg-white/15 text-white placeholder:text-white/50 focus:border-[#0B63F6] focus:ring-2 focus:ring-[#0B63F6]/20 transition-all"
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
                      className="border-white/20 bg-white/15 text-white placeholder:text-white/50 focus:border-[#0B63F6] focus:ring-2 focus:ring-[#0B63F6]/20 transition-all"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      className="text-xs text-white/75 hover:text-white underline underline-offset-4 transition-colors"
                      onClick={() => alert("Luego hacemos Forgot password")}
                    >
                      Forgot your password?
                    </button>

                    <Link
                      to="/signup"
                      className="text-xs text-white/85 hover:text-white underline underline-offset-4 transition-colors"
                    >
                      Create account
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full bg-[#FFC72C] hover:bg-[#FFB800] text-black font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FFC72C]/20"
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
              <div className="relative flex h-full flex-col items-center justify-center p-10 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
                  Hello, Friend!
                </h2>
                <p className="mt-3 max-w-sm text-white/85">
                  Enter your personal details and start your journey with FixLife.
                </p>
                <Button asChild className="mt-6 bg-white/15 hover:bg-white/20 text-white border border-white/25 backdrop-blur-sm transition-all duration-300 hover:scale-105">
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
