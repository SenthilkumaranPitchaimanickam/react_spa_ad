import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//import LanguageDetector from "i18next-browser-languagedetector";
import translationEng from "../public/locales/en/translation.json";
import translationFrench from "../public/locales/fr/translation.json";
import CreateAppointmentfr from "../public/locales/fr/createappointment.json";
import CreateAppointmenten from "../public/locales/en/createappointment.json";
import Calenderen from "../public/locales/en/calendar.json";
import Calenderfr from "../public/locales/fr/calendar.json";
import Backend from 'i18next-xhr-backend';
 
i18n
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // connect with React
  .use(initReactI18next)

 
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
 
    lng: sessionStorage.getItem('language')||'en',
    fallbackLng: 'en',
    whitelist: ['en', 'fr'],
 
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translations: translationEng,
        createappointment:CreateAppointmenten,
        calendar:Calenderen
      },
      fr: {
        translations: translationFrench,
        createappointment:CreateAppointmentfr,
        calendar:Calenderfr
      },
  
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations"
    
  });
 
export default i18n;