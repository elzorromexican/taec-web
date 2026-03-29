import { persistentAtom } from '@nanostores/persistent';

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
}

const isClient = typeof window !== 'undefined';

export const isOpenStore = persistentAtom<boolean>('tito_isOpen', false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const isExpandedStore = persistentAtom<boolean>('tito_isExpanded', false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const hasStartedStore = persistentAtom<boolean>('tito_hasStarted', false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const userDataStore = persistentAtom<UserData>('tito_userData', { 
  name: '', 
  email: '', 
  phone: '', 
  location: 'Ubicación Desconocida', 
  countryCode: '' 
}, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const messagesStore = persistentAtom<Message[]>('tito_messages', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const hasFetchedGeoStore = persistentAtom<boolean>('tito_hasFetchedGeo', false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});
