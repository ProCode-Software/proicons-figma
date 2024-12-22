<script lang="ts">
import TabStrip from './components/ui/TabStrip.svelte'
import IconsPage from './layouts/IconsPage.svelte'
import OptionsPage from './layouts/OptionsPage.svelte'

let currentPage = $state(0)
const pages = [IconsPage, OptionsPage]

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

<style lang="scss" global>
.root {
    font-size: var(--text-body-medium-font-size);
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: 100vh;
    max-width: 100vw;
    overflow: hidden;
}
.root > :global([class$='Page']) {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
