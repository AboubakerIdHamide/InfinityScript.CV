import dashboard_en from "../lang/en/dashboard.json";
import dashboard_ar from "../lang/ar/dashboard.json";
import auth_en from "../lang/en/auth.json";
import auth_ar from "../lang/ar/auth.json";

// .ENV
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

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
      auth: auth_en,
    },
  },
  ar: {
    translation: {
      dashboard: dashboard_ar,
      auth: auth_ar,
    },
  },
};


// Create CV constants
export const CREATE_CV_ROUTES = [
  "personal-info",
  "biography",
  "educations",
  "skills",
  "experiences",
];