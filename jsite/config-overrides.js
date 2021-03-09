// config-overrides.js
const path = require('path');

module.exports = (config, env) => {
    config.resolve.modules = [
        ...(config.resolve.modules || []),
        path.resolve(__dirname, 'src'), // 추가
    ];

    // alias
    config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@/': '/',
        '@components': 'components',
        '@assets': 'assets',
        '@views': 'views',
        '@hooks': 'hooks',
    };

    return config;
};
