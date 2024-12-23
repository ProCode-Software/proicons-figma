import { sendMessage } from "./messages"

export function insertIcon(name: string, svg: string) {
    sendMessage({ type: 'AddIcon', svg, name })
}
export function dragIcon({ clientX, clientY }: DragEvent, name: string, svg: string) {
    const file = new File(
        [svg],
        `${name}.svg`,
        { type: 'image/svg+xml' }
    )
    parent.postMessage({
        pluginDrop: {
            clientX,
            clientY,
            files: [file],
            dropMetadata: { name },
        },
    }, '*')
}