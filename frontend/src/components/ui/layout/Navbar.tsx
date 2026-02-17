// frontend/src/components/ui/layout/Navbar.tsx
import { Link } from "react-router-dom"
import { Button } from "../button"
import { Badge } from "../badge"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#0B63F6] text-white font-bold">
            FL
          </div>

          <div className="leading-tight">
            <div className="font-semibold text-black">FixLife</div>
            <div className="text-xs text-black/60">Connect • Bid • Fix</div>
          </div>

          <Badge className="ml-2 bg-[#FFC72C] text-black hover:bg-[#FFB800]">alpha</Badge>
        </Link>

        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" className="text-black hover:bg-black/5">
            <Link to="/login">Login</Link>
          </Button>

          <Button asChild className="bg-[#0B63F6] hover:bg-[#094fca] text-white">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
