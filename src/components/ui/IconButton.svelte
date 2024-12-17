<script lang="ts">
import type { Component } from 'svelte'
import Tooltip from './Tooltip.svelte'

const { icon, label }: { icon: string | Component; label?: string } = $props()

let parent: HTMLElement | undefined = $state()
</script>

<button class="FigmaIconBtn" aria-label={label} bind:this={parent}>
    <Tooltip {label} {parent} />
    {#if typeof icon == 'string'}
        {@html icon}
    {:else if icon}
        {@const Icon = icon}
        <Icon size={20} strokeWidth={1.2} />
    {/if}
</button>

<style lang="scss">
.FigmaIconBtn {
    border-radius: var(--radius-medium);
    width: 1.5rem;
    height: 1.5rem;
    background: none;
    border: none;
    padding: 0;
    flex-shrink: 0;

    &:hover {
        background: var(--color-bghovertransparent);
    }
}
</style>
