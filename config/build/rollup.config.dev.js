import { defaultOutput, getFilename, input } from './defaults';
import { typescript } from './plugins';

export default {
    input,
    output: {
        ...defaultOutput,
        file: getFilename('dev'),
        format: "umd"
    },
    plugins: [
        typescript()
    ]
}
