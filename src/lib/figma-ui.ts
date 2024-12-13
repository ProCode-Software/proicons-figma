document.getElementById('create').onclick = () => {
    const textbox = document.getElementById('count');
    const count = parseInt(textbox.value, 10);
    parent.postMessage({ pluginMessage: { type: 'create-shapes', count } }, '*')
}

document.getElementById('cancel').onclick = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}