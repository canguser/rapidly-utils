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
console.log(chunk(allTsFiles, 3).map((chunk) => chunk.map(c=>c.padEnd(maxLengthPath)).join('\t')).join('\r\n'));

const inputLike = readlineSync.question('* TS Name: ', {required: true});
const input = allTsFiles.find((file) => file.indexOf(inputLike) >= 0);
console.log('input: ', input);
if (!input || !inputLike) {
    throw new Error('TS Name Not Found');
}
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
