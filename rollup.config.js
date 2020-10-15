import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import _includes from 'lodash/includes'
import _keys from 'lodash/keys'
import glob from 'rollup-plugin-glob'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import sveltePreprocess from 'svelte-preprocess'
import tailwind from 'tailwindcss'

import pkg from './package.json'
import markdown from './src/utils/markdown.js'

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const onwarn = (warning, onwarn) =>
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    _includes(warning.message, '/@sapper/')) ||
  onwarn(warning)

const preprocess = sveltePreprocess({
  postcss: {
    plugins: [
      require('postcss-normalize')(),
      require('postcss-import')(),
      require('postcss-simple-vars')(),
      require('postcss-extend')(),
      require('postcss-nested')(),
      require('postcss-mixins')(),
      require('tailwindcss')(tailwind),
      require('autoprefixer')(),
    ],
  },
})

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        preprocess,
        dev,
        hydratable: true,
        emitCss: true,
      }),
      resolve(),
      commonjs(),
      markdown(),
      glob(),
      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          babelHelpers: 'runtime',
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],
    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        preprocess,
        generate: 'ssr',
        dev,
      }),
      resolve(),
      commonjs(),
      markdown(),
      glob(),
    ],
    external: _keys(pkg.dependencies).concat(require('module').builtinModules),

    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      !dev && terser(),
    ],

    onwarn,
  },
}
