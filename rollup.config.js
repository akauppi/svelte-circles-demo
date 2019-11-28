// Rollup config for production
//
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const input = 'src/index.svelte';

const production = !process.env.ROLLUP_WATCH;

// Note: Normally, Rollup suggest providing multiple targets with same input (as we have) as an 'output' array,
//      but that doesn't allow for different 'external' and (input) 'plugins' fields. This seems safer. AK/24-Nov-19

export default [
    // ES6 + ES modules (future ready) -> https://caniuse.com/#feat=es6-module
    {
        input,
        output: { file: pkg.module, format: 'es', sourcemap: true },
        external: ['svelte/internal'],
        plugins: [
            svelte({ dev: !production }),         // enable runtime checks
            production && terser()              // minify
        ]
    },
    // ES5 + UMD (modern day) - only IE 6..11 would need this
    {
        input,
        output: { file: pkg.main, format: 'umd', name: 'Demo' },
        plugins: [
            svelte(),
            resolve()
        ]
    },

    // Demo app / test bench
    {
        input: "app/index.js",
        output: {
            file: "app/public/bundle.js",
            format: "iife",    // Q: is 'iife' a good target? #advice
            sourcemap: true
        },
        plugins: [
            svelte({ dev: true, css: css => css.write('app/public/bundle.css') }),
            resolve({
                jsnext: true,       // tbd. why? (from svelte-spinner example) #advice
                main: true,         // tbd. why? (-''-) #advice
                browser: true       // tbd. why? (-''-) #advice
            }),
            commonjs()      // tbd. is this neeeded and why?
        ],
        watch: {
            clearScreen: false
        }
    }
];