// frontend/src/router.tsx
import { createBrowserRouter } from "react-router-dom"
import Layout from "./components/ui/layout/Layout"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import CreateRequest from "./pages/CreateRequest" // ✅ NUEVO

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/create-request", element: <CreateRequest /> }, // ✅ NUEVO
    ],
  },

  { path: "/login", element: <Auth /> },
  { path: "/signup", element: <Auth /> },
  { path: "/auth/login", element: <Auth /> },
  { path: "/auth/signup", element: <Auth /> },
])
