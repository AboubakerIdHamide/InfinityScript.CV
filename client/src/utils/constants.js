import dashboard_en from "../lang/en/dashboard.json";
import dashboard_ar from "../lang/ar/dashboard.json";

// .ENV
export const API_URL = import.meta.env.VITE_API_URL;

// Language Constants
export const languages = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "ar",
    name: "العربية",
  },
];

export const resources = {
  en: {
    translation: {
      dashboard: dashboard_en,
    },
  },
  ar: {
    translation: {
      dashboard: dashboard_ar,
    },
  },
};
