import { defaultOutput, getFilename, input } from './defaults';
import { banner, strip, terser, typescript } from './plugins';

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
        typescript(),
        terser(),
        strip(),
        banner()
    ]
}
