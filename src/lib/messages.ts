/** Posts a message to the Figma code */
export function sendMessage(data: any) {
    parent.postMessage({ pluginMessage: data }, '*')
}