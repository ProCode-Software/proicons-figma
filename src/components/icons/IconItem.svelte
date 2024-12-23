<script lang="ts">
import { dragIcon, insertIcon } from '../../lib/addIcons'
import Tooltip from '../ui/Tooltip.svelte'

const { svg, name, category }: { svg: string; name: string; category: string } =
    $props()

let parent: HTMLElement | undefined = $state()

const tooltipFormat = $derived(`<span style="font-weight: 500">${name}</span>
<span style="color: #ffffffb2; margin-left: 5px;">${category}</span>`)
</script>

<button
    class="IconItem"
    bind:this={parent}
    draggable="true"
    onclick={() => insertIcon(name, svg)}
    ondragend={e => dragIcon(e, name, svg)}
>
    <Tooltip {parent} label={tooltipFormat} />
    {@html svg}
</button>

<style lang="scss">
.IconItem {
    background: none;
    aspect-ratio: 1 / 1;
    border-radius: var(--radius-medium);
    border: none;
    outline: none;
    font: inherit;

    &:hover {
        background: var(--figma-color-bg-hover);
    }
    &:active {
        background: var(--figma-color-bg-selected-secondary);
    }
    &:focus-visible {
        outline: 1px solid var(--figma-color-border-selected);
    }
}
</style>
