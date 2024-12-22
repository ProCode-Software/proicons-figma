/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, {
    width: 300,
    height: 500,
    title: 'ProIcons',
    themeColors: true
})

figma.ui.onmessage = (msg: any) => {
    console.log("Message recieved:", msg, typeof msg);
    if (msg == "FetchIconsError") {
        figma.notify("Unable to fetch icons. Please try again", {
            error: true,
            timeout: 5000,
            button: {
                text: 'Try again',
                action: () => figma.ui.postMessage("FetchIconsTryAgain")
            }
        })
    }
}