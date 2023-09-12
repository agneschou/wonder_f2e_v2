const {languages} = require('./config')
module.exports = {
    locales: Object.keys(languages),
    defaultLocale: 'en',
    defaultNS: "common",
    localeDetection: false,
    pages: {
        "*": ["common"],
    },
    loadLocaleFrom: (locale) => import (`./public/locales/${locale}.json`).then((m) => m.default),
    languages
};
