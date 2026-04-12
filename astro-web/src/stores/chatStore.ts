import { atom } from 'nanostores';

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  countryCode: string;
}

interface Message {
  role: 'user' | 'agent' | 'error';
  text: string;
  promo?: any;
}

// Variables UI e Historial en memoria de sesión (Desecho por refresco para proteger privacidad/GDPR)
export const isOpenStore = atom<boolean>(true);

export const isExpandedStore = atom<boolean>(true);

export const hasStartedStore = atom<boolean>(false);

export const userDataStore = atom<UserData>({ 
  name: '', 
  email: '', 
  phone: '', 
  location: 'Ubicación Desconocida', 
  countryCode: '' 
});

export const messagesStore = atom<Message[]>([]);

export const lastGreetedCategoryStore = atom<string>('');

export const hasUnreadMessagesStore = atom<boolean>(false);

// Bandera única por sesión para evitar correos dobles tras múltiples aperturas
export const transcriptSentStore = atom<boolean>(false);
