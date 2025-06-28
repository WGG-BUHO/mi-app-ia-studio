import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-iusven-blue to-iusven-lightBlue text-white p-6 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-iusven-gold mb-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Página No Encontrada</h2>
      <p className="text-lg text-gray-200 mb-8 max-w-md">
        Lo sentimos, la página que está buscando no existe o ha sido movida.
      </p>
      <Link to={ROUTES.WELCOME}>
        <Button size="lg" variant="primary" className="bg-iusven-gold text-iusven-blue hover:bg-yellow-400">
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
};