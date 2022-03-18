import resolve from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import * as readlineSync from 'readline-sync';
import * as fs from 'fs';
import { chunk } from './es/array/chunk';

// get all the .ts files path in the directory and its subdirectories
function getAllTsFiles(dir) {
    const files = fs.readdirSync(dir);
    const tsFiles = files.filter((file) => file.endsWith('.ts'));
    const tsFilesPath = tsFiles.map((file) => `${dir}/${file}`);
    const subDirs = files.filter((file) => fs.statSync(`${dir}/${file}`).isDirectory());
    const subDirsPath = subDirs.map((subDir) => `${dir}/${subDir}`);
    const subDirsTsFiles = subDirsPath.map((subDir) => getAllTsFiles(subDir));
    return tsFilesPath.concat(...subDirsTsFiles);
}

const allTsFiles = getAllTsFiles('./main');
const maxLengthPath = allTsFiles.reduce((max, path) => Math.max(max, path.length), 0);
console.log('Available files:');
console.log(
    chunk(allTsFiles, 3)
        .map((chunk) => chunk.map((c) => c.padEnd(maxLengthPath)).join('\t'))
        .join('\r\n')
);

let inputLike, input;
while (!input || !inputLike) {
    inputLike = readlineSync.question('* TS Name: ', { required: true });
    const inputs = allTsFiles.filter((file) => file.toLowerCase().indexOf(inputLike.toLowerCase()) >= 0);
    if (inputs.length > 1 && inputs.length <= 35) {
        console.log('Keywords match more than one file.');
        const inputIndex = readlineSync.keyInSelect(inputs, 'Please choose one:', { cancel: false });
        input = inputs[inputIndex];
    } else if (inputs.length > 35) {
        console.log('Keywords are too simple, please try again.');
        continue;
    } else {
        input = inputs[0];
    }
    if (!input || !inputLike) {
        console.log('TS name input is not found. Please try again.');
    }
}
console.log('input: ', input);
const options = ['amd', 'cjs', 'esm', 'iife', 'umd', 'system'];
const modeIndex = readlineSync.keyInSelect(options, 'Mode: ', { defaultInput: 2, cancel: false });
const mode = options[modeIndex];
console.log('mode: ', mode);

const isMini = readlineSync.keyInYNStrict('Minify?: ', { defaultInput: 'n' });

console.log('isMini: ', isMini);

const extensions = ['.js', '.ts'];

let libName = '$_';

if (['iife', 'umd'].includes(mode)) {
    libName = readlineSync.question('Lib Name ($_): ', { defaultInput: '$_' });
}

const modeFilePath = input.replace('./main', './dist').replace(/\.ts$/, `.${mode}${isMini ? '.mini' : ''}.js`);

export default {
    input,
    output: {
        file: modeFilePath,
        format: mode,
        name: libName
    },
    plugins: [
        typescript(),
        nodePolyfills(),
        resolve({
            extensions
            // modulesOnly: true
        }),
        commonjs(),
        ...(isMini ? [terser()] : [])
    ]
};
