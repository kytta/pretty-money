import rpBanner from 'rollup-plugin-banner';
import rpCleanup from 'rollup-plugin-cleanup';
import rpStrip from 'rollup-plugin-strip';
import { terser as rpTerser } from 'rollup-plugin-terser';
import rpTypescript2 from 'rollup-plugin-typescript2';

export const banner = () => rpBanner(
    'pretty-money\n' +
    '<%= pkg.description %>\n' +
    '\n' +
    '@version <%= pkg.version %>\n' +
    '@license MIT'
);

export const cleanup = () => rpCleanup({
    comments: 'license',
    extensions: ['.ts']
});

export const strip = () => rpStrip({
    debugger: true,
    functions: ['console.log', 'console.debug'],
    sourceMap: false
});

export const terser = () => rpTerser();

export const typescript = () => rpTypescript2();