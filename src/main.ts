/// <reference types="@figma/plugin-typings" />
import { mount } from 'svelte'
import App from './App.svelte'

const app = mount(App, {
    target: document.getElementById('app')!,
})

figma.showUI(__html__, {
    height: 300,
    width: 500,
    title: 'ProIcons',
    themeColors: true
})

export default app
