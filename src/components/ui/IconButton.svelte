<script lang="ts">
import type { Component, Snippet } from 'svelte'
import Tooltip from './Tooltip.svelte'
import { mergeClasses } from '../../lib/mergeClasses'

let {
    icon,
    label,
    iconSize = 20,
    onclick,
    children,
    className,
    toggle = false,
    value = $bindable(false)
}: {
    icon: string | Component
    label?: string
    iconSize?: number
    onclick?: Function
    children?: Snippet
    toggle?: boolean,
    value?: boolean,
    className?: string
} = $props()

let parent: HTMLElement | undefined = $state()

function buttonClick() {
    if (toggle) {
        value = !value
    }
    onclick?.()
}
</script>

<button
    {...mergeClasses('FigmaIconBtn', value && 'active', className)}
    aria-label={label}
    bind:this={parent}
    onclick={buttonClick}
>
    <Tooltip {label} {parent} />
    {@render children?.()}
    {#if typeof icon == 'string'}
        {@html icon}
    {:else if icon}
        {@const Icon = icon}
        <Icon size={iconSize} strokeWidth={1.2} />
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
    &.active {
        background: var(--figma-color-bg-selected);
        color: var(--figma-color-icon-brand);

        &:hover {
            background: var(--figma-color-bg-selected-secondary);
        }
    }
}
</style>
