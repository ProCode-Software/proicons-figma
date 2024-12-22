<script lang="ts">
import type { Component } from 'svelte'
import Tooltip from './Tooltip.svelte'

const {
    icon,
    text,
    iconSize = 18,
    tooltip,
    onclick,
    style = 'default',
}: {
    icon?: Component | string
    text: string
    iconSize?: number
    tooltip?: string
    onclick?: Function
    style?: 'default' | 'primary'
} = $props()

let parent: HTMLElement | undefined = $state()
</script>

<button class="FigmaButton" bind:this={parent} {onclick}>
    <Tooltip label={tooltip} {parent} />
    {#if typeof icon == 'string'}
        {@html icon}
    {:else if icon}
        {@const Icon = icon}
        <Icon size={iconSize} strokeWidth={1.2} />
    {/if}
    {text}
</button>

<style lang="scss">
.FigmaButton {
    font-family: var(--text-body-medium-font-family);
    font-size: var(--text-body-medium-font-size);
    font-weight: var(--text-body-medium-font-weight);
    letter-spacing: var(--text-body-medium-letter-spacing);
    line-height: var(--text-body-medium-line-height);
    padding: 0 .5rem;
    height: 1.5rem;
    border-radius: var(--radius-medium);
    color: inherit;
    display: inline-flex;
    max-height: 100%;
    place-items: center;
    border: 1px solid var(--btn-border);
    background: none;

    &:focus {
        background: var(--figma-color-bg-hover);
    }

    &:focus-visible {
        outline: 1px solid var(--figma-color-border-selected);
    }
}
</style>
