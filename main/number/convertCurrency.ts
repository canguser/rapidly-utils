/**
 * format the num as currency.
 * @param num {number}
 * @param symbol {string=$} - default: $
 * @param places {number=2} - the decimal digits default: 2
 * @param suffix {string=}
 * @returns {string}
 */
export function convertCurrency(num, symbol = '$', places = 2, suffix = '') {
    let number: string | number = parseFloat(num);
    if (Number.isNaN(number)) {
        return '';
    }
    if (places < 0) {
        let p = Math.abs(places);
        number /= 10 ** p;
        places = 0;
        if (number <= 1000) {
            places = 1;
        }
    }
    let thousand = ',';
    let decimal = '.';
    let negative = number < 0 ? '-' : '';
    let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '';
    let j = i.length;
    j = i.length > 3 ? j % 3 : 0;
    return negative + symbol + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs((number as any as number) - (i as any as number)).toFixed(places).slice(2) : '') + suffix;
}