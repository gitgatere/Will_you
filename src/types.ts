export interface Invitation {
  id: string;
  what: string;
  when: string;
  who: string;
  where: string;
  theme: string;
  color: string;
  imageUrl: string | null;
  expiresAt: string;
  createdAt: string;
}

export type Theme = {
  id: string;
  name: string;
  description: string;
  backgroundClass: string;
  fontClass: string;
}

export const THEMES: Theme[] = [
  {
    id: 'birthday',
    name: 'Birthday',
    description: 'Colorful and fun theme for birthday celebrations',
    backgroundClass: 'bg-gradient-to-r from-pink-500 to-purple-500',
    fontClass: 'font-bold'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional and clean theme for business events',
    backgroundClass: 'bg-gradient-to-r from-blue-600 to-indigo-700',
    fontClass: 'font-semibold'
  },
  {
    id: 'harry-potter',
    name: 'Harry Potter',
    description: 'Magical theme inspired by the wizarding world',
    backgroundClass: 'bg-gradient-to-r from-amber-700 to-red-900',
    fontClass: 'font-medium'
  },
  {
    id: 'barbie',
    name: 'Barbie',
    description: 'Pink and playful theme inspired by Barbie',
    backgroundClass: 'bg-gradient-to-r from-pink-400 to-pink-600',
    fontClass: 'font-bold'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple theme with minimal design',
    backgroundClass: 'bg-gradient-to-r from-gray-200 to-gray-400',
    fontClass: 'font-light'
  }
];