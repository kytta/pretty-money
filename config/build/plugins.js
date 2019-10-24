import rpStrip from 'rollup-plugin-strip';
import { terser as rpTerser } from 'rollup-plugin-terser';
import rpTypescript2 from 'rollup-plugin-typescript2';

export const strip = () => rpStrip({
    debugger: true,
    functions: ['console.log', 'console.debug'],
    sourceMap: false
});

export const terser = () => rpTerser();

export const typescript = () => rpTypescript2();
