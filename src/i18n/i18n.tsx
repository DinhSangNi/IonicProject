import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import vi from '../locales/vi.json';

const resources = {
    en: {
        translation: en,
    },
    vi: { translation: vi },
};

export const locales = {
    en: 'English',
    vi: 'VietNamese',
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});
