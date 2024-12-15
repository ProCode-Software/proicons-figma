import { objectEntries } from './polyfill'

export function mergeClasses(...classes: any[]): { class: string } {
    return { class: classes.filter(Boolean).join(' ') }
}

export function mergeCss(styles: Record<string, any>, addUnits = true) {
    return {
        style: objectEntries(styles)
            .filter(([, v]) => v !== undefined && !isNaN(v))
            .map(([k, v]) => [
                k,
                typeof v == 'number' && addUnits ? `${v}px` : v,
            ])
            .map(([k, v]) => `${k}: ${v};`)
            .join(' '),
    }
}
