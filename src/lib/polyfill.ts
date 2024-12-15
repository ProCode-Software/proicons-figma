export function objectEntries(object: Object): [string, any][] {
    return Object.keys(object).map(k => [k, object[k]]);
}