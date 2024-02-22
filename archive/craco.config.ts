/** craco */
import type { CracoConfig } from '@craco/types';
import { removeLoaders, loaderByName, whenProd } from '@craco/craco';

/** esbuild */
import { EsbuildPlugin } from 'esbuild-loader';

/** Remove smp (speed-measure-webpack-plugin) */
// import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

import webpack, { Configuration as WebpackConfig } from 'webpack';

let buildStartTime: Date | undefined = undefined;
let progressMap: Record<string, string[]> = {};
let progressKey: string = '';
const getMsg = (msg: string, length?: number) => msg.padEnd(length || 25, ' ');

export default {
  babel: {
    loaderOptions(options) {
      options.babelrc = true;
      return options;
    },
  },
  eslint: {
    enable: process.env.NODE_ENV !== 'production',
  },
  typescript: {
    enableTypeChecking: false,
  },
  webpack: {
    alias: {},
    plugins: {
      remove: ['DefinePlugin', ...whenProd(() => ['ProgressPlugin'], [])!],
      add: [
        new EsbuildPlugin({
          define: {
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          },
        }),
        ...whenProd(
          () => [
            new webpack.ProgressPlugin((percentage, message, ...args) => {
              if (percentage === 0) {
                buildStartTime = new Date();
                console.log('-'.repeat(55));
                console.log(
                  getMsg('🙄 Start webpack build'),
                  buildStartTime.toUTCString(),
                );
              } else if (percentage === 1) {
                const buildEndTime = new Date();
                const diff =
                  (buildEndTime.getTime() -
                    (buildStartTime || buildEndTime).getTime()) /
                  1000;

                console.log(
                  getMsg('🎸 End webpack build'),
                  buildEndTime.toUTCString(),
                );
                console.log(
                  getMsg('⌛ Total build time', 24),
                  `${(diff / 60).toFixed(0)} min, ${(diff - diff / 60).toFixed(
                    2,
                  )} secs`,
                );
                console.log('-'.repeat(55));
              } else {
                const essence = `00${Math.floor(percentage * 100)}`.slice(-2);

                if (args.length === 1 && progressKey !== args[0]) {
                  // start
                  progressKey = args[0];
                } else if (args.length === 2) {
                  if (progressMap[progressKey]) {
                    progressMap[progressKey].push(args[1]);
                  } else {
                    progressMap[progressKey] = [args[1]];
                  }
                } else if (args.length === 1 && progressKey === args[0]) {
                  // end
                  console.groupCollapsed(`-- ${essence}% [${progressKey}]`);
                  if (progressMap[progressKey]) {
                    console.log(
                      `\t%cplugin count = ${
                        progressMap[progressKey]?.length || 0
                      }`,
                      'color: #1f8068',
                    );
                  }
                  console.groupEnd();
                }
              }
            }),
          ],
          [],
        )!,
      ],
    },
    configure(config, { env, paths }) {
      const isProd = env === 'production';
      const customized: WebpackConfig = config;

      console.log(isProd);

      // 소스맵 @see https://webpack.kr/configuration/devtool/#development
      customized.devtool = !isProd ? 'eval-source-map' : 'hidden-source-map';

      // 캐시 체계 @see https://webpack.kr/configuration/cache/
      if (!isProd) {
        customized.cache = {
          type: 'filesystem',
          allowCollectingMemory: true,
        };
      }

      // optimization @see https://webpack.kr/configuration/optimization/
      customized.optimization = {
        ...config.optimization,
        minimizer: [
          new EsbuildPlugin({
            target: 'esnext',
            css: true,
          }),
        ],
        ...(isProd && {
          splitChunks: {
            chunks: 'all',
          },
        }),
      };

      // 빌드 최적화 @see https://webpack.kr/guides/build-performance/
      if (isProd) {
        customized.output = {
          ...customized.output,
          pathinfo: false,
        };
      }

      // Remove babel-loader
      removeLoaders(customized, loaderByName('babel-loader'));

      // Use esbuild-loader (ts, tsx) @see https://stackoverflow.com/a/75878478
      customized.module?.rules?.unshift({
        test: /\.(ts|tsx)$/,
        loader: 'esbuild-loader',
        options: {
          target: 'esnext',
          sourcemap: !isProd,
          minify: isProd,
        },
      });

      // Use esbuild-loader (js, jsx)
      customized.module?.rules?.unshift({
        test: /\.(js|mjs|jsx)$/,
        loader: 'esbuild-loader',
        options: {
          target: 'esnext',
          sourcemap: !isProd,
          minify: isProd,
        },
      });

      // Use esbuild-loader (css)
      customized.module?.rules?.push({
        test: /\.css$/i,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              minify: isProd,
            },
          },
        ],
      });

      return customized;

      // smp 설정
      // webpack plugin 순서 주의하기. smp -> MiniCssExtractPlugin
      // const { isFound, match } = getPlugin(
      //   customized,
      //   pluginByName('MiniCssExtractPlugin'),
      // );
      // if (isFound) {
      //   removePlugins(customized, pluginByName('MiniCssExtractPlugin'));
      //   const customizedWithSmp = new SpeedMeasurePlugin().wrap(customized);
      //   addPlugins(customizedWithSmp, [match]);

      //   return customizedWithSmp;
      // }

      // return customized;
    },
  },
} as CracoConfig;
