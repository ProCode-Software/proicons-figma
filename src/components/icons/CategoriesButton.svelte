<script lang="ts">
import IconButton from '../ui/IconButton.svelte'
import FolderIcon from '../ui/icons/FolderIcon.svelte'
import Menu from '../ui/Menu.svelte'
import { icons, selectedCategories } from '../../lib/stores'
import { derived as derivedStore } from 'svelte/store' // Bug with Svelte where importing this breaks $derived rune

let parent = $state()
let isShown = $state(false)
let selectedItems = $state([])

const categories = derivedStore(icons, $icons =>
    Array.from(
        new Set(Object.values($icons).map(({ category }) => category))
    ).sort()
)
const categorySelection = derivedStore(categories, $categories => {
    $categories.unshift(
        // @ts-ignore
        { text: 'All', onclick: () => (selectedItems = [0]) },
        { separator: true }
    )
    return $categories
})

function categorySelectionChange() {
    if (!selectedItems.length) {
        selectedItems.push(0)
    }
    if (selectedItems.some(i => i !== 0)) {
        selectedItems = selectedItems.filter(i => i !== 0)

        const asCategories = selectedItems
            .map(index => $categories[index])
            .map(item => item.text ?? item)
            .filter(item => item !== 'All')

        $selectedCategories = asCategories
    } else {
        $selectedCategories = []
    }
}
</script>

{#if $categories?.length}
    <div bind:this={parent}>
        <IconButton
            icon={FolderIcon}
            label="Categories{$selectedCategories.length
                ? ` (${$selectedCategories.length} selected)`
                : ''}"
            iconSize={24}
            onclick={() => isShown = !isShown}
            className={$selectedCategories.length > 0 ? 'active' : ''}
            toggle
            value={isShown}
        />
        <Menu
            items={$categorySelection}
            {parent}
            bind:open={isShown}
            bind:selectedItems
            default={0}
            dropdown
            multi
            change={categorySelectionChange}
        />
    </div>
{/if}
