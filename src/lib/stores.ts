import { derived, writable } from 'svelte/store'
import type { Icon, IconObject, IconsFile } from './types'

// Icons page
export const query = writable('')
export const icons = writable<IconsFile>({})
export const iconEntries = derived(icons, ($icons) => {
    const list: IconObject[] = []
    for (const name in $icons) {
        const icon = $icons[name]
        list.push({ name, ...icon })
    }
    return list.sort((a, b) => a.name.localeCompare(b.name))
})
export const selectedCategories = writable<string[]>([])

// Options
export const size = writable(24),
    strokeWidth = writable(1.5),
    color = writable('currentColor'),
    cornerRadius = writable(-1),
    strokeFilledElements = writable(false),
    outlineStrokes = writable(false),
    flatten = writable(false)

export function setDefaults() {
    size.set(24)
    strokeWidth.set(1.5)
    color.set('currentColor')
    cornerRadius.set(-1)
    strokeFilledElements.set(false)
    outlineStrokes.set(false)
    flatten.set(false)
}