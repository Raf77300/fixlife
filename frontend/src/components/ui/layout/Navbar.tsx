// frontend/src/components/ui/layout/Navbar.tsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../button"
import { Badge } from "../badge"

const navItems = [
  {
    name: "Services",
    items: ["Plumbing", "Electricity", "Carpentry", "Mechanic", "Painting", "A/C & Refrigeration"]
  },
  {
    name: "How it Works",
    items: ["Post Request", "Get Bids", "Choose Pro", "Get Fixed"]
  },
  {
    name: "About",
    items: ["Our Story", "Team", "Contact"]
  }
]

export default function Navbar() {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const ITEM_WIDTH = 140
  const BOOKING_INDEX = navItems.length
  const ACCOUNT_INDEX = navItems.length + 1

  const handleBookingClick = () => {
    setIsMobileMenuOpen(false)
    navigate("/create-request")
  }

  return (
    <>
      <header className="fixed top-4 lg:top-6 left-4 right-4 lg:left-0 lg:right-0 h-16 lg:h-20 flex items-center justify-between px-4 lg:px-8 bg-white/80 backdrop-blur-xl border border-black/5 lg:mx-auto max-w-7xl rounded-2xl z-50 shadow-2xl shadow-black/5 animate-slide-down ring-1 ring-black/5">
        {/* Logo */}
        <Link to="/" className="w-auto lg:w-32 flex-shrink-0 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B63F6] text-white font-bold text-sm">
            FL
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-semibold text-black">FixLife</div>
            <div className="text-xs text-black/60">Connect • Bid • Fix</div>
          </div>
          <Badge className="hidden md:inline-flex ml-2 bg-[#FFC72C] text-black hover:bg-[#FFB800]">alpha</Badge>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex relative items-center h-full ml-auto"
          onMouseLeave={() => setActiveItem(null)}
        >
          <div className="flex relative z-10">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="group relative flex items-center justify-center h-16 cursor-pointer text-gray-600 hover:text-black transition-colors duration-300"
                style={{ width: `${ITEM_WIDTH}px` }}
                onMouseEnter={() => setActiveItem(index)}
              >
                <span className="font-bold text-sm tracking-wide z-20">{item.name}</span>
                {item.items && (
                  <div className="absolute top-14 left-0 w-full pt-4 opacity-0 translate-y-[-10px] pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-30">
                    <div className="bg-white border border-black/10 rounded-xl overflow-hidden shadow-2xl p-1 flex flex-col gap-1 ring-1 ring-black/5">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem}
                          to={`/create-request?category=${encodeURIComponent(subItem)}`}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-black/5 hover:text-[#0B63F6] rounded-lg transition-colors font-medium"
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Book Service */}
            <div
              className="group relative flex items-center justify-center h-16 cursor-pointer text-gray-600 hover:text-[#0B63F6] transition-colors duration-300"
              style={{ width: `${ITEM_WIDTH}px` }}
              onMouseEnter={() => setActiveItem(BOOKING_INDEX)}
              onClick={handleBookingClick}
            >
              <span className="font-bold text-sm tracking-wide z-20">Book Service</span>
            </div>

            {/* Account Dropdown */}
            <div
              className="group relative flex items-center justify-center h-16 cursor-pointer text-gray-600 hover:text-black transition-colors duration-300"
              style={{ width: `${ITEM_WIDTH}px` }}
              onMouseEnter={() => setActiveItem(ACCOUNT_INDEX)}
              onClick={() => setIsAccountOpen(!isAccountOpen)}
            >
              <div className="flex items-center gap-2 z-20">
                <span className="font-bold text-sm tracking-wide">Account</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isAccountOpen ? "rotate-180 text-[#0B63F6]" : "group-hover:text-[#0B63F6]"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div
                className={`absolute top-14 right-0 w-48 bg-white border border-black/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top-right z-50 cursor-default ring-1 ring-black/5 ${
                  isAccountOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-1">
                  <Link
                    to="/login"
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-black/5 hover:text-black rounded-lg transition-colors font-medium"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    <svg className="w-4 h-4 text-[#FFC72C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-black/5 hover:text-black rounded-lg transition-colors font-medium"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    <svg className="w-4 h-4 text-[#0B63F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    Register
                  </Link>
                </div>
                <div className="border-t border-black/5 p-2 bg-black/5 text-center">
                  <span className="text-xs text-gray-500">v1.0.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active indicator */}
          <div
            className="absolute bottom-0 h-[4px] rounded-t-full bg-[#0B63F6] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(11,99,246,0.6)]"
            style={{
              width: `${ITEM_WIDTH}px`,
              left: 0,
              transform: `translateX(${activeItem !== null ? activeItem * 100 : 0}%)`,
              opacity: activeItem !== null ? 1 : 0,
            }}
          />
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:text-[#0B63F6] focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B63F6] text-white font-bold">
                FL
              </div>
              <div className="leading-tight">
                <div className="font-semibold text-black">FixLife</div>
                <div className="text-xs text-black/60">Connect • Bid • Fix</div>
              </div>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-black">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <div key={item.name} className="flex flex-col gap-3">
                <span className="text-xl font-bold text-black">{item.name}</span>
                {item.items && (
                  <div className="flex flex-col gap-2 pl-4 border-l-2 border-[#0B63F6]/20">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem}
                        to={`/create-request?category=${encodeURIComponent(subItem)}`}
                        className="text-gray-600 hover:text-[#0B63F6] text-sm py-1 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <button onClick={handleBookingClick} className="text-xl font-bold text-black text-left">
                Book Service
              </button>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-black/5 flex flex-col gap-4">
            <Button
              asChild
              variant="outline"
              className="w-full py-6 rounded-xl border-black/10 text-black font-bold active:scale-95 transition-transform"
            >
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button
              asChild
              className="w-full py-6 rounded-xl bg-[#0B63F6] text-white font-bold shadow-lg shadow-[#0B63F6]/20 active:scale-95 transition-transform"
            >
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                Create Account
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
