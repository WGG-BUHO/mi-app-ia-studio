import React from 'react';
import { Plan, PlanCategory } from '../../types';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAuth } from '../../hooks/useAuth';

interface PlanCardProps {
  plan: Plan;
}

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-accent mr-2">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
  </svg>
);


export const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleSubscribe = () => {
    if (isAuthenticated && user?.role === PlanCategory.EMPRESAS || user?.role === PlanCategory.FAMILIAR) { // check if user role allows subscription, basic check
      // Logic to handle subscription, e.g., navigate to payment page or update user plan
      // This is a simplified simulation. In a real app, you'd call an API.
      alert(`Suscripción al plan ${plan.name} iniciada (simulado). Redirigiendo al dashboard.`);
      // Update user plan (mock) - this should ideally happen in AuthContext or via API then update context
      // For now, it's just a local simulation for flow.
      // This won't persist or actually update the user's plan in AuthContext.
      navigate(ROUTES.CLIENT_DASHBOARD);
    } else if (isAuthenticated && user?.role !== PlanCategory.EMPRESAS && user?.role !== PlanCategory.FAMILIAR) {
        alert('Este tipo de cuenta no puede suscribirse a planes. Contacte soporte.');
    }
    else {
      // Redirect to login/register if not authenticated
      alert('Por favor, inicie sesión o regístrese para suscribirse.');
      navigate(ROUTES.LOGIN, { state: { from: ROUTES.SELECT_PLAN, planId: plan.id } }); // Pass state for post-login redirect
    }
  };

  const categoryColor = plan.category === PlanCategory.EMPRESAS ? 'border-iusven-blue' : 'border-accent';
  const categoryText = plan.category === PlanCategory.EMPRESAS ? 'Empresarial' : 'Familiar';


  return (
    <div className={`bg-white rounded-xl shadow-2xl p-6 flex flex-col border-t-8 ${categoryColor} hover:scale-105 transition-transform duration-300`}>
      <div className="mb-6 text-center">
        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 ${plan.category === PlanCategory.EMPRESAS ? 'bg-blue-100 text-iusven-blue' : 'bg-emerald-100 text-accent-dark'}`}>
            {categoryText}
        </span>
        <h3 className="text-3xl font-extrabold text-iusven-blue mb-2">{plan.name}</h3>
        <p className="text-4xl font-bold text-gray-800">
          ${plan.price}
          <span className="text-lg font-medium text-gray-500">/{plan.currency === 'USD' ? 'mes' : plan.currency}</span>
        </p>
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
        {plan.allowsDocUpload && (
            <li className="flex items-start">
                <CheckIcon />
                <span className="text-gray-600">Permite envío de documentos para revisión</span>
            </li>
        )}
        {plan.consultationsPerMonth && (
            <li className="flex items-start">
                <CheckIcon />
                <span className="text-gray-600">{plan.consultationsPerMonth} consultas al mes</span>
            </li>
        )}
      </ul>
      <Button 
        onClick={handleSubscribe} 
        className="w-full mt-auto" 
        variant={plan.category === PlanCategory.EMPRESAS ? "primary" : "accent"}
      >
        Suscribirme
      </Button>
    </div>
  );
};