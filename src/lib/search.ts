import type { Icon, IconsFile } from "./types";
import MiniSearch from 'minisearch'

const minisearch = new MiniSearch({
    fields: ['name', 'description', 'category'],
    storeFields: ['name', 'description', 'category', 'icon'],
    searchOptions: {
        fuzzy: 0.2,
        prefix: true,
        boost: {
            name: 2,
            description: 1.5,
            category: 0.5
        }
    }
})

export function searchIcons(icons: [string, Icon][], query: string): typeof icons {
    const mappedIcons = icons.map(
        ([name, { description, ...icon }], id) => (
            {
                name,
                id,
                description: description.split(','),
                ...icon
            }
        )
    )
    minisearch.removeAll()
    minisearch.addAll(mappedIcons)

    const results = minisearch.search(query)
    const sortedResults = results.sort((a, b) => b.score - a.score)
    const resultsAsIcons = sortedResults.map(
        ({ name, id, description, ...result }) =>
            [name, {
                description: description.join(','),
                ...result
            }]
    )
    return resultsAsIcons
}