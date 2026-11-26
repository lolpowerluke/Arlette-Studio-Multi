import { lazy, Suspense } from 'react';
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Catalog from './pages/Catalog';

const LoginPage = lazy(() => import("./pages/LoginPage"));

const ROLE_HOME = {
  arlette: "/admin",
  babbytheek: "/list",
};

function HomeRedirect() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return <Navigate to={ROLE_HOME[user.role] ?? "/list"} replace />;
}

function Layout() {
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/login" element={<ErrorBoundary label="Login"><LoginPage /></ErrorBoundary>} />
            <Route path="/catalog" element={<ErrorBoundary label="Catalog"><Catalog /></ErrorBoundary>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
