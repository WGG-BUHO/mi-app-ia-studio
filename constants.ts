import { Plan, PlanCategory, PlanName } from './types';

export const APP_NAME = "IUSVEN";
export const APP_SUBTITLE = "Dr. Wilson Gómez Guevara";

export const ROUTES = {
  WELCOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SELECT_PLAN: '/select-plan',
  CLIENT_DASHBOARD: '/client/dashboard',
  CLIENT_CHAT: '/client/chat',
  CLIENT_VIDEO: '/client/video', // Expects /:consultationId
  CLIENT_DOCUMENTS: '/client/documents',
  CLIENT_SUBSCRIPTION: '/client/subscription',
  LAWYER_DASHBOARD: '/lawyer/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_SUBSCRIPTIONS: '/admin/subscriptions',
  ADMIN_CONTENT: '/admin/content',
  ADMIN_SUPPORT: '/admin/support',
  TERMS_CONDITIONS: '/terms',
  NOT_FOUND: '/404',
};

export const PLANS_DATA: Plan[] = [
  {
    id: 'emprendedor',
    name: PlanName.EMPRENDEDOR,
    category: PlanCategory.EMPRESAS,
    price: 50,
    currency: 'USD',
    features: ['Asesoría básica para startups', 'Consultas por chat', 'Acceso a base de conocimiento'],
  },
  {
    id: 'pyme',
    name: PlanName.PYME,
    category: PlanCategory.EMPRESAS,
    price: 100,
    currency: 'USD',
    features: ['Asesoría para Pequeñas y Medianas Empresas', 'Consultas por chat y video', 'Revisión de documentos (hasta 5 por mes)', 'Soporte prioritario'],
    allowsDocUpload: true,
  },
  {
    id: 'corporativo',
    name: PlanName.CORPORATIVO,
    category: PlanCategory.EMPRESAS,
    price: 200,
    currency: 'USD',
    features: ['Asesoría integral para corporaciones', 'Consultas ilimitadas por chat y video', 'Revisión de documentos ilimitada', 'Asesor asignado', 'Informes mensuales'],
    allowsDocUpload: true,
  },
  {
    id: 'familiar',
    name: PlanName.FAMILIAR,
    category: PlanCategory.FAMILIAR,
    price: 100,
    currency: 'USD',
    features: ['Asesoría legal para asuntos familiares', '15 consultas al mes (chat/video)', 'Documentos adjuntos si el abogado lo requiere'],
    consultationsPerMonth: 15,
    monthlyRenewal: true,
    allowsDocUpload: false, // Client can upload only if lawyer requests, not by default
  },
];