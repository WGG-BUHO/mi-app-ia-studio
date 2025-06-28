import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { UserRole } from '../types';


const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>;
const LawyersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c-.313.148-.635.293-.97.432m-11.56 0c.313.148.635.293.97.432m0 0V21m0-16.121A48.354 48.354 0 0 1 12 4.5c2.291 0 4.545.16 6.75.47M4.5 12H21" /></svg>;
const ConsultationsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.543-3.091A9.117 9.117 0 0 1 12.25 12h-1.028c-.987 0-1.797-.817-1.797-1.812V9.423c0-.994.81-1.812 1.797-1.812h1.028Zm-7.5 0-4.577 0c-.994 0-1.812.81-1.812 1.812v4.286c0 .994.81 1.812 1.812 1.812h1.028M12.25 12h7.5M12.25 12a1.5 1.5 0 0 0-1.5 1.5v2.25M12.25 12a1.5 1.5 0 0 1 1.5 1.5v2.25M12.25 12a1.5 1.5 0 0 0-1.5-1.5M12.25 12a1.5 1.5 0 0 1 1.5-1.5M12.25 12a1.5 1.5 0 0 0-1.5 1.5M12.25 12a1.5 1.5 0 0 1 1.5 1.5" /></svg>;
const RevenueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-.375m1.5-3H18a.75.75 0 0 0-.75.75v.75m0 0H18M2.25 6.75h15M2.25 12h15M2.25 15h15M4.5 20.25h15a1.5 1.5 0 0 0 1.5-1.5V6.75" /></svg>;


interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  linkTo?: string;
  linkLabel?: string;
  colorClass: string; // e.g., 'bg-blue-500'
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, linkTo, linkLabel, colorClass }) => (
  <div className={`${colorClass} text-white p-6 rounded-xl shadow-lg hover:opacity-90 transition-opacity duration-200`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm uppercase tracking-wider opacity-80">{title}</p>
        <p className="text-4xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-3 bg-black bg-opacity-20 rounded-lg">
        {icon}
      </div>
    </div>
    {linkTo && linkLabel && (
      <Link to={linkTo} className="mt-4 inline-block text-sm font-medium hover:underline">
        {linkLabel} &rarr;
      </Link>
    )}
  </div>
);

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Mock data for dashboard
  const metrics = {
    totalClients: 1250,
    activeLawyers: 75,
    ongoingConsultations: 32,
    monthlyRevenue: 15200.50,
  };

  if (!user || user.role !== UserRole.ADMIN) { // Use UserRole enum
    return <div className="p-8 text-center">Acceso denegado. Se requieren permisos de administrador.</div>;
  }

  return (
    <div className="min-h-screen bg-iusven-gray p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-iusven-blue">Panel de Administración</h1>
          <p className="text-lg text-iusven-textLight mt-1">Monitoreo general y gestión de la plataforma IUSVEN.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
          <MetricCard 
            title="Clientes Totales" 
            value={metrics.totalClients} 
            icon={<UsersIcon />} 
            linkTo={ROUTES.ADMIN_USERS}
            linkLabel="Gestionar Clientes"
            colorClass="bg-gradient-to-br from-blue-500 to-blue-700"
          />
          <MetricCard 
            title="Abogados Activos" 
            value={metrics.activeLawyers} 
            icon={<LawyersIcon />} 
            linkTo={ROUTES.ADMIN_USERS} // Can filter by lawyers in the user management page
            linkLabel="Gestionar Abogados"
            colorClass="bg-gradient-to-br from-emerald-500 to-emerald-700"
          />
          <MetricCard 
            title="Consultas en Curso" 
            value={metrics.ongoingConsultations} 
            icon={<ConsultationsIcon />} 
            // linkTo={ROUTES.ADMIN_CONSULTATIONS} // Assuming a route for consultations
            linkLabel="Ver Consultas"
            colorClass="bg-gradient-to-br from-amber-500 to-amber-700"
          />
          <MetricCard 
            title="Ingresos (Mes Actual)" 
            value={`$${metrics.monthlyRevenue.toLocaleString()}`} 
            icon={<RevenueIcon />}
            linkTo={ROUTES.ADMIN_SUBSCRIPTIONS}
            linkLabel="Ver Reportes"
            colorClass="bg-gradient-to-br from-purple-500 to-purple-700"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-iusven-blue mb-4">Actividad Reciente (Ejemplo)</h3>
            <ul className="divide-y divide-gray-200">
              <li className="py-3">Nuevo cliente registrado: <span className="font-medium">Laura Vargas</span></li>
              <li className="py-3">Abogado <span className="font-medium">Carlos López</span> completó una consulta.</li>
              <li className="py-3">Plan <span className="font-medium">Corporativo</span> suscrito por Empresa XYZ.</li>
              <li className="py-3">Nueva videoconferencia programada para mañana.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-iusven-blue mb-4">Accesos Rápidos</h3>
            <nav className="space-y-3">
              <Link to={ROUTES.ADMIN_USERS} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-iusven-blue font-medium transition-colors">Gestionar Usuarios</Link>
              <Link to={ROUTES.ADMIN_SUBSCRIPTIONS} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-iusven-blue font-medium transition-colors">Gestionar Suscripciones</Link>
              <Link to={ROUTES.ADMIN_CONTENT} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-iusven-blue font-medium transition-colors">Gestionar Contenido</Link>
              <Link to={ROUTES.ADMIN_SUPPORT} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-iusven-blue font-medium transition-colors">Soporte y Moderación</Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};