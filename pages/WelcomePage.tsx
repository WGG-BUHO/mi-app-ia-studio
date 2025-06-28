import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Button } from '../components/ui/Button';
import { APP_NAME, APP_SUBTITLE, ROUTES } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';

const LawScaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-iusven-gold">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c-.313.148-.635.293-.97.432m-11.56 0c.313.148.635.293.97.432m0 0V21m0-16.121A48.354 48.354 0 0 1 12 4.5c2.291 0 4.545.16 6.75.47M4.5 12H21" />
  </svg>
);


export const WelcomePage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // This effect handles redirection for authenticated users
    if (isAuthenticated && user) {
      if (user.role === UserRole.ADMIN) navigate(ROUTES.ADMIN_DASHBOARD);
      else if (user.role === UserRole.LAWYER) navigate(ROUTES.LAWYER_DASHBOARD);
      else navigate(ROUTES.CLIENT_DASHBOARD);
    }
  }, [isAuthenticated, user, navigate]);


  if (isAuthenticated) {
    // This content is shown briefly while the useEffect above processes the redirect
    return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p>Redirigiendo...</p></div>;
  }
  
  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  if (showLogin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-iusven-blue to-iusven-lightBlue p-4">
        <LoginForm />
        <Button onClick={() => setShowLogin(false)} variant="ghost" className="mt-4 text-white hover:bg-white/20">Volver</Button>
      </div>
    );
  }

  if (showRegister) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-iusven-blue to-iusven-lightBlue p-4">
        <RegisterForm />
         <Button onClick={() => setShowRegister(false)} variant="ghost" className="mt-4 text-white hover:bg-white/20">Volver</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-iusven-blue to-iusven-lightBlue text-white p-6">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-6">
          <LawScaleIcon />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-iusven-gold">
          {APP_NAME}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">{APP_SUBTITLE}</p>
        <p className="text-lg md:text-xl mb-12 text-gray-300">
          Su plataforma confiable para asesoría legal en línea. Conectamos clientes con abogados expertos de forma rápida y segura.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-6">
          <Button onClick={handleShowLogin} size="lg" variant="primary" className="w-full md:w-auto bg-iusven-gold text-iusven-blue hover:bg-yellow-400">
            Iniciar Sesión
          </Button>
          <Button onClick={handleShowRegister} size="lg" variant="secondary" className="w-full md:w-auto bg-transparent border-2 border-iusven-gold text-iusven-gold hover:bg-iusven-gold hover:text-iusven-blue">
            Registrarse
          </Button>
        </div>
        <div className="mt-12">
            <Button onClick={() => navigate(ROUTES.SELECT_PLAN)} variant="ghost" className="text-gray-200 hover:text-white underline">
                Ver Planes de Suscripción
            </Button>
        </div>
      </div>
    </div>
  );
};
