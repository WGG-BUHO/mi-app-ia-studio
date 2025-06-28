
export enum UserRole {
  CLIENT = 'CLIENT',
  LAWYER = 'LAWYER',
  ADMIN = 'ADMIN',
}

export enum PlanCategory {
  EMPRESAS = 'EMPRESAS',
  FAMILIAR = 'FAMILIAR',
}

export enum PlanName {
  EMPRENDEDOR = 'Emprendedor',
  PYME = 'Pyme',
  CORPORATIVO = 'Corporativo',
  FAMILIAR = 'Familiar',
}

export interface Plan {
  id: string;
  name: PlanName;
  category: PlanCategory;
  price: number;
  currency: string;
  features: string[];
  allowsDocUpload?: boolean;
  consultationsPerMonth?: number;
  monthlyRenewal?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  currentPlan?: PlanName;
  subscriptionActive?: boolean;
  profilePictureUrl?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  isRead?: boolean;
}

export interface Consultation {
  id: string;
  clientId: string;
  lawyerId: string;
  topic: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  startTime?: Date;
  endTime?: Date;
  chatHistory?: ChatMessage[];
  videoConferenceLink?: string;
  documents?: DocumentFile[];
}

export interface DocumentFile {
  id: string;
  name: string;
  url: string;
  uploadedBy: string; // userId
  uploadDate: Date;
  size: number; // in bytes
  type: string; // MIME type
}

export interface LawyerProfile extends User {
  specializations: string[];
  availability: 'ONLINE' | 'OFFLINE' | 'BUSY';
  bio: string;
  yearsOfExperience: number;
}