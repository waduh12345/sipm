"use client";

import { useLanguage } from "@/contexts/LanguageContext";

type Translations<T> = {
  en: T;
  id: T;
};

export function useTranslation<T>(translations: Translations<T>) {
  const { language } = useLanguage();

  return translations[language];
}