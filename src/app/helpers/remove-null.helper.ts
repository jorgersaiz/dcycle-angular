export function removeNull (value: number) {
    if(value === null || value === undefined) return 0;
    else return value;
}