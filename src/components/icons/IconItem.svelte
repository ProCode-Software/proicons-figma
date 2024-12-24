<script lang="ts">
import { dragIcon, insertIcon } from '../../lib/addIcons'
import Tooltip from '../ui/Tooltip.svelte'
import {
    size,
    strokeWidth,
    strokeFilledElements,
    color,
    cornerRadius,
} from '../../lib/stores'
import { parseSvg, transform } from '../../lib/svgCustomizations'

const { svg, name, category }: { svg: string; name: string; category: string } =
    $props()

let parent: HTMLElement | undefined = $state()

const tooltipFormat = $derived(`<span style="font-weight: 500">${name}</span>
<span style="color: #ffffffb2; margin-left: 5px;">${category}</span>`)

const parsedSvg = parseSvg(svg)
const transformed = transform(parsedSvg, {
    $size,
    $color,
    $cornerRadius,
    $strokeFilledElements,
    $strokeWidth,
}).outerHTML
</script>

<button
    class="IconItem"
    bind:this={parent}
    draggable="true"
    onclick={() => insertIcon(name, transformed)}
    ondragend={e => dragIcon(e, name, transformed)}>
    <Tooltip {parent} label={tooltipFormat} />
    {@html transformed}
</button>

<style lang="scss">
.IconItem {
    background: none;
    aspect-ratio: 1 / 1;
    border-radius: var(--radius-medium);
    border: none;
    outline: none;
    font: inherit;

    :global(svg) {
        width: 24 !important;
        height: 24 !important;
    }

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
