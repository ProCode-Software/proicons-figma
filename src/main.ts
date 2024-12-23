/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, {
    width: 300,
    height: 500,
    title: 'ProIcons',
    themeColors: true
})

function createIcon(svgData: string, name: string, x?: number, y?: number) {
    const iconNode = figma.createNodeFromSvg(svgData)
    if (!x || !y) {
        x = figma.viewport.center.x - (iconNode.width / 2)
        y = figma.viewport.center.y - (iconNode.height / 2)
    }
    iconNode.x = x
    iconNode.y = y
    iconNode.name = name
    return iconNode
}

figma.ui.onmessage = (msg: any) => {
    if (msg.type == 'FetchIconsError') {
        figma.notify('Unable to fetch icons. Please try again', {
            error: true,
            timeout: 5000,
            button: {
                text: 'Try again',
                action: () => figma.ui.postMessage({ type: 'FetchIconsTryAgain' })
            }
        })
    } else if (msg.type == 'AddIcon') {
        const iconNode = createIcon(msg.svg as string, msg.name)
        figma.currentPage.selection = [iconNode]
    }
}
// @ts-ignore
figma.on('drop', (e: DropEvent) => {
    const { files, node, dropMetadata: { name }, x, y } = e
    if (files.length > 0 && files[0].type === 'image/svg+xml') {
        files[0].getTextAsync().then(svg => {
            const iconNode = createIcon(svg, name, x, y)

            if ('appendChild' in node && node.type !== 'DOCUMENT') {
                node.appendChild(iconNode)
            }
            figma.currentPage.selection = [iconNode]

        })
        return false
    }
})