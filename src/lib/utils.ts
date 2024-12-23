export function formatList(items: string[]): string {
    switch (items.length) {
        case 2:
            return `${items[0]} and ${items[1]}`
        case 3:
            return `${items[0]}, ${items[1]}, and ${items[2]}`
        default:
            return items
                .filter((_, i) => i < 3)
                .map((item, i, a) => {
                    return i == a.length - 1 && items.length > 3
                        ? `and ${items.length - 2} others`
                        : item
                })
                .join(', ')
    }
}