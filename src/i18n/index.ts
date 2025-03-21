import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationsPl from "./languages/pl.json";
import translationsEn from "./languages/en.json";
export const resources = {
	en: {
		translation: translationsEn,
	},
	pl: {
		translation: translationsPl,
	},
};

export function i18n() {
	i18next
		.use(initReactI18next)
		.use(LanguageDetector)
		.init(
			{
				resources,
				debug: true,
				fallbackLng: "en",
				interpolation: {
					escapeValue: false,
				},
				ns: "translation",
				defaultNS: "translation",
				detection: {
					order: ["navigator", "htmlTag", "path", "subdomain"],
					caches: ["cookie"],
				},
			},
			(err) => {
				if (err) {
					console.error("i18n error", err);
				}
			},
		);
}
