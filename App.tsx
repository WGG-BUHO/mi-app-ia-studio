import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/navigation/Header';
import { Footer } from './components/navigation/Footer';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ROUTES } from './constants';
import { UserRole } from './types';

// Lazy load pages for better initial load time
const WelcomePage = lazy(() => import('./pages/WelcomePage').then(module => ({ default: module.WelcomePage })));
const SelectPlanPage = lazy(() => import('./pages/SelectPlanPage').then(module => ({ default: module.SelectPlanPage })));
const ClientDashboardPage = lazy(() => import('./pages/ClientDashboardPage').then(module => ({ default: module.ClientDashboardPage })));
const ChatPage = lazy(() => import('./pages/ChatPage').then(module => ({ default: module.ChatPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(module => ({ default: module.AdminDashboardPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage').then(module => ({ default: module.TermsConditionsPage })));

// Placeholder pages (can be detailed later)
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-8">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-iusven-blue mb-4">{title}</h1>
      <p className="text-gray-600">Esta sección está en construcción.</p>
      <img src="https://picsum.photos/seed/construction/600/400" alt="En construcción" className="mt-8 rounded-lg shadow-md mx-auto" />
    </div>
  </div>
);

const ClientVideoPage = () => <PlaceholderPage title="Videoconferencia Cliente" />;
const ClientDocumentsPage = () => <PlaceholderPage title="Documentos Cliente" />;
const ClientSubscriptionPage = () => <PlaceholderPage title="Mi Suscripción Cliente" />;
const LawyerDashboardPage = () => <PlaceholderPage title="Dashboard Abogado" />;
const AdminUserManagementPage = () => <PlaceholderPage title="Gestión de Usuarios (Admin)" />;
const AdminSubscriptionManagementPage = () => <PlaceholderPage title="Gestión de Suscripciones (Admin)" />;
const AdminContentManagementPage = () => <PlaceholderPage title="Gestión de Contenido (Admin)" />;
const AdminSupportPage = () => <PlaceholderPage title="Soporte y Moderación (Admin)" />;


interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to a generic dashboard or an unauthorized page
    // For simplicity, redirecting to welcome which will then redirect based on role
    return <Navigate to={ROUTES.WELCOME} replace />; 
  }

  return <Outlet />;
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
              <Routes>
                {/* Public Routes */}
                <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
                <Route path={ROUTES.LOGIN} element={<WelcomePage />} /> {/* WelcomePage handles showing login/register */}
                <Route path={ROUTES.REGISTER} element={<WelcomePage />} />
                <Route path={ROUTES.SELECT_PLAN} element={<SelectPlanPage />} />
                <Route path={ROUTES.TERMS_CONDITIONS} element={<TermsConditionsPage />} />

                {/* Client Routes */}
                <Route element={<ProtectedRoute allowedRoles={[UserRole.CLIENT]} />}>
                  <Route path={ROUTES.CLIENT_DASHBOARD} element={<ClientDashboardPage />} />
                  <Route path={ROUTES.CLIENT_CHAT} element={<ChatPage />} />
                  <Route path={`${ROUTES.CLIENT_VIDEO}/:consultationId`} element={<ClientVideoPage />} />
                  <Route path={ROUTES.CLIENT_VIDEO} element={<ClientVideoPage />} /> {/* For generic video page access */}
                  <Route path={ROUTES.CLIENT_DOCUMENTS} element={<ClientDocumentsPage />} />
                  <Route path={ROUTES.CLIENT_SUBSCRIPTION} element={<ClientSubscriptionPage />} />
                </Route>

                {/* Lawyer Routes (Placeholder) */}
                 <Route element={<ProtectedRoute allowedRoles={[UserRole.LAWYER]} />}>
                    <Route path={ROUTES.LAWYER_DASHBOARD} element={<LawyerDashboardPage />} />
                    {/* Add more lawyer routes here */}
                 </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
                  <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
                  <Route path={ROUTES.ADMIN_USERS} element={<AdminUserManagementPage />} />
                  <Route path={ROUTES.ADMIN_SUBSCRIPTIONS} element={<AdminSubscriptionManagementPage />} />
                  <Route path={ROUTES.ADMIN_CONTENT} element={<AdminContentManagementPage />} />
                  <Route path={ROUTES.ADMIN_SUPPORT} element={<AdminSupportPage />} />
                </Route>
                
                {/* Fallback Not Found Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
