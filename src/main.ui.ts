import { mount } from 'svelte'
import App from './App.svelte'
import './components/ui/style.css'

const app = mount(App, {
    target: document.querySelector('#app')!,
})

export default app