import rpStrip from '@rollup/plugin-strip';
import { terser as rpTerser } from 'rollup-plugin-terser';

export const strip = () => rpStrip({
    debugger: true,
    functions: ['console.log', 'console.debug']
});

export const terser = () => rpTerser({
    sourcemap: false,
    ie8: true,
    output: {
        comments: false,
        ecma: 3
    }
});
