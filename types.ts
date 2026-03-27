export enum ServiceCategory {
  SCHEDULED = 'Com agendamento',
  DELIVERY = 'Entrega posterior'
}

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  duration?: string;
  price: string;
  promoPrice?: string;
  isFeatured?: boolean;
  badge?: string;
  image: string;
  details: string[];
  isOffline?: boolean;
  active?: boolean;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientWhatsapp: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string; // Representa o Período (Manhã, Tarde, Noite) ou Horário Exato após confirmado
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: string;
  totalPrice: number;
  address?: {
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    cpf: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface DayConfig {
  date: string;
  status: 'available' | 'full' | 'blocked';
  limit: number;
}

export interface PriceLog {
  id: string;
  productId: string;
  productName: string;
  oldPrice: string;
  newPrice: string;
  date: string;
}