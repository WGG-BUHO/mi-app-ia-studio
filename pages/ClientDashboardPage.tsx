import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { ROUTES, PLANS_DATA } from '../constants';
import { Button } from '../components/ui/Button';
// import { PlanName, Plan } from '../types'; // PlanName and Plan are not directly used here beyond currentPlanDetails logic.

const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-3.86 8.25-8.625 8.25S3.75 16.556 3.75 12 7.61 3.75 12.375 3.75 21 7.444 21 12Z" /></svg>;
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9a2.25 2.25 0 0 0-2.25 2.25v9A2.25 2.25 0 0 0 4.5 18.75Z" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>;
const SubscriptionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-5.25H21m-9 5.25h9m-9 2.25h9M2.25 12l1.586 1.586c.781.781 2.047.781 2.828 0L9.793 12m0 0L9 11.207M2.25 12H9m9 3.75l1.5-1.5M21 12h-9c0 .79.293 1.52.781 2.062l1.219 1.219c.781.781 2.047.781 2.828 0l1.5-1.5M21 12H9" /></svg>;

interface DashboardCardProps {
  title: string;
  description: string;
  linkTo: string;
  icon: React.ReactNode;
  actionText: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, linkTo, icon, actionText }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
    <div className="flex items-center text-iusven-blue mb-3">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4 text-sm flex-grow">{description}</p>
    <Link to={linkTo}>
      <Button variant="secondary" className="w-full mt-auto">{actionText}</Button>
    </Link>
  </div>
);

export const ClientDashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-8 text-center">Cargando datos del cliente...</div>;
  }

  const currentPlanDetails = PLANS_DATA.find(p => p.name === user.currentPlan);

  return (
    <div className="min-h-screen bg-iusven-gray p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 p-6 sm:p-8 bg-gradient-to-r from-iusven-blue to-iusven-lightBlue text-white rounded-xl shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Bienvenido, {user.name}</h1>
              <p className="text-lg text-blue-100 mt-1">Este es su panel de control personalizado.</p>
            </div>
            {user.profilePictureUrl && (
              <img src={user.profilePictureUrl} alt="Perfil" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white mt-4 sm:mt-0 shadow-md" />
            )}
          </div>
          {currentPlanDetails && (
            <div className="mt-6 pt-4 border-t border-blue-400">
              <h2 className="text-xl font-semibold">Su Plan Actual: <span className="text-iusven-gold">{currentPlanDetails.name}</span></h2>
              <p className="text-sm text-blue-200">
                {user.subscriptionActive ? 'Suscripción Activa' : 'Suscripción Inactiva'}
                {currentPlanDetails.consultationsPerMonth && ` - ${currentPlanDetails.consultationsPerMonth} consultas disponibles este mes.`}
              </p>
            </div>
          )}
           {!currentPlanDetails && user.currentPlan === undefined && ( // Show only if no plan is set at all
            <div className="mt-6 pt-4 border-t border-blue-400">
                <p className="text-lg">Aún no tiene un plan activo.</p>
                <Link to={ROUTES.SELECT_PLAN}>
                    <Button variant="accent" className="mt-2 bg-iusven-gold text-iusven-blue hover:bg-yellow-400">Seleccionar un Plan</Button>
                </Link>
            </div>
           )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          <DashboardCard 
            title="Chat con Abogado"
            description="Inicie una conversación en tiempo real con uno de nuestros abogados disponibles."
            linkTo={ROUTES.CLIENT_CHAT}
            icon={<ChatIcon />}
            actionText="Iniciar Chat"
          />
          <DashboardCard 
            title="Videoconferencia"
            description="Programe o únase a una videoconferencia con su asesor legal."
            linkTo={`${ROUTES.CLIENT_VIDEO}/new`} // Example link, might need specific consultation ID
            icon={<VideoIcon />}
            actionText="Ver Videoconferencias"
          />
          <DashboardCard 
            title="Gestión de Documentos"
            description="Suba, revise y gestione los documentos relacionados con sus consultas."
            linkTo={ROUTES.CLIENT_DOCUMENTS}
            icon={<DocumentIcon />}
            actionText="Ir a Documentos"
          />
          <DashboardCard 
            title="Mi Suscripción"
            description="Vea los detalles de su plan, historial de pagos y gestione su suscripción."
            linkTo={ROUTES.CLIENT_SUBSCRIPTION}
            icon={<SubscriptionIcon />}
            actionText="Administrar Plan"
          />
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold text-iusven-blue mb-3">Consultas Recientes (Ejemplo)</h3>
            {/* Placeholder for recent consultations list */}
            <div className="divide-y divide-gray-200">
                <div className="py-3">
                    <p className="font-medium">Consulta sobre contrato laboral</p>
                    <p className="text-sm text-gray-500">Con Abg. Ana Pérez - Completada el 15/07/2024</p>
                </div>
                 <div className="py-3">
                    <p className="font-medium">Revisión de acuerdo de alquiler</p>
                    <p className="text-sm text-gray-500">Con Abg. Carlos López - En progreso</p>
                </div>
            </div>
            <Link to="#" className="text-iusven-blue hover:underline mt-4 inline-block">Ver todas las consultas</Link>
        </div>
      </div>
    </div>
  );
};
