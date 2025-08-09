import MiniSearch from 'minisearch'
import { iconEntries } from './stores'
import type { IconObject } from './types'

const minisearch = new MiniSearch<IconObject>({
    fields: ['name', 'description', 'category'],
    storeFields: ['name', 'description', 'category', 'icon'],
    idField: 'name',
    searchOptions: {
        fuzzy: 0.2,
        prefix: true,
        boost: {
            name: 2,
            description: 1.5,
            category: 0.5,
        },
    },
})

iconEntries.subscribe((icons) => {
    minisearch.removeAll()
    minisearch.addAll(icons)
})

export function searchIcons(query: string): IconObject[] {
    const results = minisearch.search(query)
    return results as unknown as IconObject[]
}
