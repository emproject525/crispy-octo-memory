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
        '@': path.resolve(__dirname, 'src'),
        '@components': 'components',
        '@assets': 'assets',
        '@views': 'views',
        '@hooks': 'hooks',
    };

    // optimization
    config.optimization = {
        ...config.optimization,
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minChunks: 1,
            // cacheGroups 지정했을 때 build 에러있음 (아마 node_modules 내부에서 webpack.optimize.LimitChunkCountPlugin 쓰는 lib가 있는듯? 추측)
            // cacheGroups: {
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         chunks: 'all',
            //         name: 'vendors',
            //     },
            // },
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
    };

    return config;
};
