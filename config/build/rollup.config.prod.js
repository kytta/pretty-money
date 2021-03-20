import { defaultOutput, getFilename, input } from './defaults';
import { strip, terser } from './plugins';

export default {
    input,
    output: [
        {
            ...defaultOutput,
            file: getFilename('umd'),
            format: "umd"
        },
        {
            ...defaultOutput,
            file: getFilename('esm'),
            format: "esm"
        },
    ],
    plugins: [
        strip(),
        terser(),
    ]
}
