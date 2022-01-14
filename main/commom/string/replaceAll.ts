import { join } from '../../array/join';

export function replaceAll(
    str: string,
    search: string,
    replacement: string | ((substring: string, ...args: any[]) => string)
): string {
    if (typeof replacement === 'function') {
        const indexList = [];
        // search for all indexes from str by searching words
        let lastIndex = 0;
        while (true) {
            const index = str.indexOf(search, lastIndex);
            if (index === -1) {
                break;
            }
            indexList.push(index);
            lastIndex = index + search.length;
        }
        return indexList
            .reduce(
                ({ strList, extraSize }, strIndex, index) => {
                    const replacementStr = replacement(search, strIndex, str);
                    strList.splice(strIndex + extraSize, search.length, replacementStr);
                    return { strList, extraSize: extraSize + replacementStr.length - search.length };
                },
                {
                    strList: [...str],
                    extraSize: 0
                }
            )
            .strList
            .join('');
    }
    return str.split(search).join(replacement);
}
