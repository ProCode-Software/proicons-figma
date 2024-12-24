export function parseSvg(svg: string): SVGSVGElement {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svg, 'image/svg+xml')
    return doc.querySelector('svg')!
}

interface Customizations {
    $size: number
    $strokeWidth?: number
    $color?: string
    $cornerRadius?: number
    $strokeFilledElements?: boolean
}

export function transform(
    svg: SVGSVGElement,
    customizations: Customizations
): SVGSVGElement {
    let addRadius = true
    if (customizations.$cornerRadius && customizations.$cornerRadius < 0) {
        addRadius = false
    }
    
    const maps = {
        color: ['stroke', 'fill'],
        strokeWidth: ['stroke-width'],
        ...(addRadius ? { cornerRadius: ['rx'] } : {}),
    }

    // Size
    if (customizations.$size) {
        svg.setAttribute('width', customizations.$size.toString())
        svg.setAttribute('height', customizations.$size.toString())
    }

    // Most customizations
    svg.querySelectorAll('*').forEach(path => {
        Object.entries(customizations).forEach(([k, v]) => {
            const c = k.replace('$', '')
            const attrs: string[] = maps[c]
            if (!(c in maps) || !attrs || !v) return

            attrs.forEach(attr => {
                if (path.hasAttribute(attr)) {
                    path.setAttribute(attr, v.toString())
                }
            })
        })
    })

    // Outlining
    if (
        customizations.$strokeFilledElements === true &&
        customizations.$strokeWidth &&
        customizations.$strokeWidth > 1.5
    ) {
        svg.querySelectorAll(':not([stroke-width])').forEach(path => {
            path.setAttribute('stroke', customizations.$color ?? 'currentColor')
            path.setAttribute('stroke-linecap', 'round')
            path.setAttribute('stroke-linejoin', 'round')
            path.setAttribute(
                'stroke-width',
                (customizations.$strokeWidth! - 1.5).toString()
            )
        })
    }

    return svg
}
