import { defaultOutput, getFilename, input } from './defaults';

export default {
    input,
    output: {
        ...defaultOutput,
        file: getFilename('dev'),
        format: "umd"
    },
}
