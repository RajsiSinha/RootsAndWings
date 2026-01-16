import { StrictMode, useEffect } from 'react' // Import useEffect
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from 'react-router-dom'
import Home from './pages/Home'
import { ClerkProvider, useUser, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import DonatorDashboard from './components/Donator/DonatorDashboard'
import OrphanageDashboard from './components/Orphanage/OrphanageDashboard'
import RoleSelection from './components/Home/RoleSelection'
import SmartAdoption from './pages/SmartAdoption'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

// --- GLOBAL AUTH WRAPPER ---
const AuthWrapper = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  // 1. SYNC USER TO MONGODB
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Call your backend to create/find the user
      // Note: Make sure the URL matches your backend route
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/get-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          imageUrl: user.imageUrl,
        }),
      }).catch(err => console.error("Sync failed:", err));
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  // 2. REDIRECT IF ROLE IS MISSING
  // If user is logged in BUT has no role, force them to Role Selection
  if (isSignedIn && !user?.publicMetadata?.role && window.location.pathname !== '/role-selection') {
    return <Navigate to="/role-selection" replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthWrapper />}>
      <Route path='/' element={<Home />} />
      <Route path='/role-selection' element={<RoleSelection />} />
      <Route path='/donor-dashboard' element={<DonatorDashboard />} />
      <Route path='/smart-adoption' element={<SmartAdoption />} />
      <Route path='/orphanage-dashboard' element={<OrphanageDashboard />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)