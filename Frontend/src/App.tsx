import { lazy, Suspense } from 'react';
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Catalog from './pages/Catalog';
import Header from './components/Header';

const LoginPage = lazy(() => import("./pages/LoginPage"));

const ROLE_HOME: Record<string, string> = {
  arlette: "/admin",
  babbytheek: "/list",
};

function HomeRedirect() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return <Navigate to={ROLE_HOME[user.role] ?? "/list"} replace />;
}

function AppShell() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function AppRoutes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />

          {/* no header */}
          <Route path="/login" element={<ErrorBoundary label="Login"><LoginPage /></ErrorBoundary>} />

          {/* header */}
          <Route element={<AppShell />}>
            <Route path="/catalog" element={<ErrorBoundary label="Catalog"><Catalog /></ErrorBoundary>} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
