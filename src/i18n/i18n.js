import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
	locale: localStorage.getItem('Language') ? localStorage.getItem('Language') : window.navigator.language.substring(0,2), // set default locale
	fallbackLocale: 'en',
	silentTranslationWarn: true,
	messages: {
		en: require('../locales/en.json'),
		fr: require('../locales/fr.json'),
		es: require('../locales/es.json'),
		pt: require('../locales/pt.json'),
		de: require('../locales/de.json'),
		ru: require('../locales/ru.json'),
		ar: require('../locales/ar.json'),
		he: require('../locales/he.json'),
	},

})