import React from 'react';
import { PlanCard } from '../components/plans/PlanCard';
import { PLANS_DATA, ROUTES } from '../constants';
import { PlanCategory } from '../types';

export const SelectPlanPage: React.FC = () => {
  const businessPlans = PLANS_DATA.filter(plan => plan.category === PlanCategory.EMPRESAS);
  const familyPlans = PLANS_DATA.filter(plan => plan.category === PlanCategory.FAMILIAR);

  return (
    <div className="min-h-screen bg-iusven-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-iusven-blue sm:text-5xl">
            Elija el Plan Perfecto para Usted
          </h2>
          <p className="mt-4 text-xl text-iusven-textLight max-w-2xl mx-auto">
            Ofrecemos una variedad de planes diseñados para cubrir sus necesidades legales, ya sea para su empresa o su familia.
          </p>
        </div>

        {businessPlans.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-semibold text-iusven-blue mb-2 text-center sm:text-left">Asesoría para Empresas</h3>
             <p className="text-lg text-iusven-textLight mb-10 text-center sm:text-left">
              Potencie su negocio con el respaldo legal que necesita para crecer con seguridad.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businessPlans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        )}

        {familyPlans.length > 0 && (
          <div>
            <h3 className="text-3xl font-semibold text-iusven-blue mb-2 text-center sm:text-left">Asesoría Familiar</h3>
            <p className="text-lg text-iusven-textLight mb-10 text-center sm:text-left">
              Proteja a su familia y resuelva sus asuntos legales personales con expertos a su lado.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjust grid for potentially fewer family plans */}
              {familyPlans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-16 p-6 bg-white rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-semibold text-iusven-blue mb-3">Condiciones Generales</h4>
            <p className="text-gray-600 mb-4">
                Todos nuestros planes están sujetos a nuestros <a href={`#${ROUTES.TERMS_CONDITIONS}`} className="text-iusven-blue hover:underline font-medium">Condicionados Generales del Servicio</a>. 
                Le recomendamos leerlos atentamente para entender los alcances y límites de la asesoría.
            </p>
            <p className="text-sm text-gray-500">
                Las consultas no utilizadas en planes con límite mensual no son acumulables ni fraccionables y se renuevan cada mes.
            </p>
        </div>
      </div>
    </div>
  );
};
