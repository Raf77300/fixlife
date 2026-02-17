import { Link, useNavigate } from "react-router-dom"
import * as React from "react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"

export default function Signup() {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    console.log("Signup attempt:", formData)
    setTimeout(() => {
      setLoading(false)
      nav("/login")
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(11,99,246,0.45),transparent_60%),radial-gradient(900px_500px_at_90%_30%,rgba(255,199,44,0.40),transparent_60%),linear-gradient(135deg,#0B63F6_0%,#0B63F6_55%,#FFC72C_55%,#FFC72C_100%)]">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-2 animate-zoom-in">
          {/* LEFT (ANIMATED PANEL) */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 auth-panel auth-panel-signup">
              <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
              <div className="relative flex h-full flex-col items-center justify-center p-10 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
                  Welcome Back!
                </h2>
                <p className="mt-3 max-w-sm text-white/85">
                  To keep connected with us please login with your personal info.
                </p>
                <Button asChild className="mt-6 bg-white/15 hover:bg-white/20 text-white border border-white/25 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                  <Link to="/login">
                    SIGN IN
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT (FORM) */}
          <div className="p-6 md:p-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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

            <Card className="mt-5 border-white/15 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-5">
                <form onSubmit={onSubmit} className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs text-white/80">First name</label>
                      <Input
                        required
                        name="firstName"
                        placeholder="Rafa"
                        className="border-white/20 bg-white/15 text-white placeholder:text-white/50 focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/20 transition-all"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-white/80">Last name</label>
                      <Input
                        required
                        name="lastName"
                        placeholder="Hernández"
                        className="border-white/20 bg-white/15 text-white placeholder:text-white/50 focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/20 transition-all"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-white/80">Phone</label>
                    <Input
                      name="phone"
                      placeholder="+503 #### ####"
                      className="border-white/20 bg-white/15 text-white placeholder:text-white/50 focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/20 transition-all"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-white/80">Email</label>
                    <Input
                      type="email"
                      required
                      name="email"
                      placeholder="you@example.com"
                      className="border-white/20 bg-white/15 text-white placeholder:text-white/50 focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/20 transition-all"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs text-white/80">Password</label>
                      <Input
                        type="password"
                        required
                        name="password"
                        placeholder="••••••••"
                        className="border-white/20 bg-white/15 text-white placeholder:text-white/50 focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/20 transition-all"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-white/80">Confirm</label>
                      <Input
                        type="password"
                        required
                        name="confirmPassword"
                        placeholder="••••••••"
                        className="border-white/20 bg-white/15 text-white placeholder:text-white/50 focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/20 transition-all"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full bg-[#FFC72C] hover:bg-[#FFB800] text-black font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FFC72C]/20"
                  >
                    {loading ? "Creating..." : "SIGN UP"}
                  </Button>

                  <div className="pt-2 text-center text-xs text-white/80">
                    Already have an account?{" "}
                    <Link to="/login" className="underline underline-offset-4 hover:text-white transition-colors">
                      Sign in
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* animaciones */}
      <style>{`
        .auth-panel{
          background: linear-gradient(135deg, rgba(11,99,246,0.92), rgba(11,99,246,0.70));
          animation: floaty 6s ease-in-out infinite;
        }
        .auth-panel-signup{
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
