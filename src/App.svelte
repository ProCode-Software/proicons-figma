<script lang="ts">
import TabStrip from './components/ui/TabStrip.svelte'
import IconsPage from './layouts/IconsPage.svelte'
import OptionsPage from './layouts/OptionsPage.svelte'

console.log('Hello from the UI')

let count = $state(0)
let currentPage = $state(0)

const pages = [IconsPage, OptionsPage]

const increment = () => (count += 1)

const changePage = (index: number) => {
    currentPage = index
}

const tabStripItems = [
    { label: 'Icons', default: true },
    { label: 'Settings' },
].map((item, i) => {
    // @ts-ignore
    item.onclick = () => changePage(i)
    return item
})

const Page = $derived(pages[currentPage])
</script>

<div class="root">
    <div class="group border">
        <TabStrip items={tabStripItems} />
    </div>
    <Page />
</div>
<h1>Hello Figma</h1>
<button onclick={increment}>Count is {count}</button>

<style lang="scss" global>
.root {
    font-size: var(--text-body-medium-font-size);
}
</style>
