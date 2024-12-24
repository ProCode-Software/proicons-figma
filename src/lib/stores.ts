import { writable } from 'svelte/store'
import { type IconsFile } from './types'

// Icons page
export const query = writable('')
export const icons = writable<IconsFile>({})
export const selectedCategories = writable<string[]>([])

// Options
export const size = writable(24),
    strokeWidth = writable(1.5),
    color = writable(),
    cornerRadius = writable(-0.25),
    strokeFilledElements = writable(false),
    outlineStrokes = writable(false),
    flatten = writable(false)

export function setDefaults() {
    size.set(24)
    strokeWidth.set(1.5)
    color.set('currentColor')
    cornerRadius.set(-0.25)
    strokeFilledElements.set(false)
    outlineStrokes.set(false)
    flatten.set(false)
}