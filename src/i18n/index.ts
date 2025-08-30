import i18next from 'i18next';
import translationsPl from './languages/pl.json';
import translationsEn from './languages/en.json';
import { writable } from 'svelte/store';
import { createI18nStore } from 'svelte-i18next';
export const i18nAsyncStatus = writable('Loading');

export const resources = {
	en: {
		translation: translationsEn
	},
	pl: {
		translation: translationsPl
	}
};

i18next
	.init({
		fallbackLng: 'en',
		lng: navigator.language.split('-')[0],
		resources,
		backend: {
			loadPath: './languages/{{lng}}.json'
		},
		interpolation: {
			escapeValue: false
		}
	})
	.then(() => {
		i18nAsyncStatus.set('Success');
	})
	.catch(() => {
		i18nAsyncStatus.set('Error');
	});

export default () => createI18nStore(i18next);
