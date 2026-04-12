import { atom } from 'nanostores';
import { persistentAtom, setPersistentEngine } from '@nanostores/persistent';

if (typeof window !== 'undefined') {
  setPersistentEngine(window.sessionStorage, {
    addEventListener(key, handler) {
      window.addEventListener('storage', handler);
    },
    removeEventListener(key, handler) {
      window.removeEventListener('storage', handler);
    }
  });
}

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

// Persisten en sessionStorage — sobreviven navegación, mueren al cerrar tab/ventana
export const isOpenStore = persistentAtom<boolean>('tito:isOpen', false, {
  encode: JSON.stringify,
  decode: JSON.parse
});

export const hasStartedStore = persistentAtom<boolean>('tito:hasStarted', false, {
  encode: JSON.stringify,
  decode: JSON.parse
});

export const userDataStore = persistentAtom<UserData>('tito:userData', {
  name: '', email: '', phone: '', location: 'Ubicación Desconocida', countryCode: ''
}, {
  encode: JSON.stringify,
  decode: JSON.parse
});

// Efímeros — privacidad GDPR
export const messagesStore = atom<Message[]>([]);
export const isExpandedStore = atom<boolean>(false);
export const lastGreetedCategoryStore = atom<string>('');
export const hasUnreadMessagesStore = atom<boolean>(false);
export const transcriptSentStore = atom<boolean>(false);
