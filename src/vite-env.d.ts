/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_URL: string;
  readonly VITE_PHONE_NUMBER: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_INSTAGRAM_URL: string;
  readonly VITE_FACEBOOK_URL: string;
  readonly VITE_GOOGLE_MAPS_EMBED_URL: string;
  readonly VITE_SALON_ADDRESS: string;
  readonly VITE_SALON_CITY: string;
  readonly VITE_SALON_STATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
