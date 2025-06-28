import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, ROUTES } from '../../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-iusven-lightBlue text-white py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.</p>
        <div className="mt-2">
          <Link to={ROUTES.TERMS_CONDITIONS} className="text-sm text-gray-300 hover:text-iusven-gold transition-colors">
            Términos y Condiciones
          </Link>
           <span className="mx-2 text-gray-400">|</span>
          <Link to="#" className="text-sm text-gray-300 hover:text-iusven-gold transition-colors"> {/* Placeholder for Privacy Policy */}
            Política de Privacidad
          </Link>
        </div>
         <p className="text-xs text-gray-400 mt-2">Desarrollado con fines demostrativos.</p>
      </div>
    </footer>
  );
};