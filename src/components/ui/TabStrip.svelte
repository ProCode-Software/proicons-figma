<script lang="ts">
import { mergeClasses } from "../../lib/mergeClasses"
interface TabItem {
    label: string
    default?: boolean
    onclick?: Function
}
const { items }: { items: TabItem[] } = $props()
let selectedTabItem = $state(
    items.findIndex(item => item.default === true) ?? 0
)

function selectTabItem(index: number) {
    selectedTabItem = index
    items[index].onclick?.()
}
</script>

<div class="FigmaTabStrip">
    {#each items as item, i}
        <button
            {...mergeClasses(
                "FigmaTabStripItem",
                selectedTabItem == i && "active"
            )}
            onclick={() => selectTabItem(i)}
        >
            {item.label}
        </button>
    {/each}
</div>

<style lang="scss">
.FigmaTabStrip {
    display: flex;
    align-items: center;
    gap: .5rem;

    .FigmaTabStripItem {
        line-height: var(--text-body-medium-line-height);
        color: var(--figma-color-text-secondary);
        border-radius: var(--radius-medium);
        font-size: var(--text-body-medium-font-size);
        letter-spacing: var(--text-body-medium-letter-spacing);
        background: none;
        border: none;
        height: 1.5rem;
        padding: 0 .5rem;

        &:not(.active):hover {
            background: var(--figma-color-bg-hover);
        }

        &.active {
            color: var(--figma-color-text);
            background: var(--figma-color-bg-secondary);
            font-weight: 550;
        }
    }
}
</style>
