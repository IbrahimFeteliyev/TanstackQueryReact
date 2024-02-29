import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';

const activeLang = localStorage.getItem('lang');
i18n
  .use(initReactI18next) 
  .use(Backend)
  .init({
    lng: activeLang,
    fallbackLng: "az-AZ",
  });

  export default i18n;