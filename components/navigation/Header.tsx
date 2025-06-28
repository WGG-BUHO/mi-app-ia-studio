import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { APP_NAME, APP_SUBTITLE, ROUTES } from '../../constants';
import { UserRole } from '../../types';
import { Button } from '../ui/Button';

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);


export const Header: React.FC = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.WELCOME);
  };

  return (
    <header className="bg-iusven-blue text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to={ROUTES.WELCOME} className="flex items-center space-x-2">
            {/* Placeholder for a logo if available */}
            {/* <img src="/logo.png" alt="IUSVEN Logo" className="h-10" /> */}
            <svg className="h-10 w-10 text-iusven-gold" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L1 9L12 16L23 9L12 2Z" /><path d="M1 9V17L12 22L23 17V9" /><path d="M12 16L23 9" /><path d="M12 2V16" /><path d="M1 9L12 16" /><path d="M1 17L12 22M23 17L12 22M12 2L6 5.5M12 2L18 5.5" stroke="black" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div>
              <h1 className="text-2xl font-bold text-iusven-gold">{APP_NAME}</h1>
              <p className="text-xs text-gray-300">{APP_SUBTITLE}</p>
            </div>
          </Link>
          <nav className="flex items-center space-x-4">
            {isLoading ? (
              <span className="text-sm">Cargando...</span>
            ) : isAuthenticated && user ? (
              <>
                {user.role === UserRole.CLIENT && (
                  <>
                    <Link to={ROUTES.CLIENT_DASHBOARD} className="hover:text-iusven-gold transition-colors">Dashboard</Link>
                    <Link to={ROUTES.CLIENT_CHAT} className="hover:text-iusven-gold transition-colors">Chat</Link>
                    <Link to={ROUTES.CLIENT_DOCUMENTS} className="hover:text-iusven-gold transition-colors">Documentos</Link>
                    <Link to={ROUTES.CLIENT_SUBSCRIPTION} className="hover:text-iusven-gold transition-colors">Mi Plan</Link>
                  </>
                )}
                {user.role === UserRole.LAWYER && (
                  <>
                    <Link to={ROUTES.LAWYER_DASHBOARD} className="hover:text-iusven-gold transition-colors">Dashboard</Link>
                    {/* Add more lawyer specific links here */}
                  </>
                )}
                {user.role === UserRole.ADMIN && (
                  <>
                    <Link to={ROUTES.ADMIN_DASHBOARD} className="hover:text-iusven-gold transition-colors">Admin Dashboard</Link>
                    <Link to={ROUTES.ADMIN_USERS} className="hover:text-iusven-gold transition-colors">Usuarios</Link>
                    <Link to={ROUTES.ADMIN_SUBSCRIPTIONS} className="hover:text-iusven-gold transition-colors">Suscripciones</Link>
                  </>
                )}
                <div className="flex items-center space-x-2">
                   {user.profilePictureUrl ? (
                      <img src={user.profilePictureUrl} alt="Perfil" className="w-8 h-8 rounded-full border-2 border-iusven-gold" />
                    ) : (
                      <UserIcon />
                    )}
                  <span className="text-sm hidden md:inline">{user.name}</span>
                  <Button onClick={handleLogout} variant="ghost" size="sm" className="text-white hover:bg-iusven-lightBlue hover:text-white">
                    Salir
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.SELECT_PLAN} className="hover:text-iusven-gold transition-colors">Planes</Link>
                <Link to={ROUTES.TERMS_CONDITIONS} className="hover:text-iusven-gold transition-colors">Condiciones</Link>
                <Button onClick={() => navigate(ROUTES.LOGIN)} variant="ghost" size="sm" className="text-white hover:bg-iusven-lightBlue hover:text-white">
                  Iniciar Sesión
                </Button>
                <Button onClick={() => navigate(ROUTES.REGISTER)} variant="secondary" size="sm" className="bg-iusven-gold text-iusven-blue hover:bg-yellow-400">
                  Registrarse
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};