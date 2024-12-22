<script lang="ts">
import type { Component } from 'svelte'
import CancelIcon from '@proicons/svelte/CancelIcon'

type InputType = 'text' | 'color' | 'number'

interface Props {
    type?: InputType
    icon?: string | Component
    placeholder?: string
    value?: string
    iconSize?: number
}
let {
    type = 'text',
    icon,
    iconSize = 18,
    placeholder,
    value = $bindable(''),
}: Props = $props()
</script>

<div class="FigmaInput">
    {#if typeof icon == 'string'}
        {@html icon}
    {:else if icon}
        {@const Icon = icon}
        <Icon size={iconSize} />
    {/if}
    <input {type} {placeholder} bind:value />
    {#if value.length > 0}
        <button
            class="cancelButton"
            onclick={() => (value = '')}
            aria-label="Clear input"
        >
            <CancelIcon size={14} />
        </button>
    {/if}
</div>

<style lang="scss">
.FigmaInput {
    height: var(--btn-height);
    background: var(--figma-color-bg-secondary);
    border-radius: var(--radius-medium);
    display: inline-flex;
    align-items: center;
    width: 100%;

    input {
        background: none;
        padding: 0;
        border: none;
        text-overflow: ellipsis;
        font-size: var(--text-body-medium-font-size);
        font-weight: var(--text-body-medium-font-weight);
        letter-spacing: var(--text-body-medium-letter-spacing);
        line-height: var(--text-body-medium-line-height);
        flex-grow: 1;
        width: 100%;
    }
    &:focus-within {
        outline: 1px solid var(--figma-color-border-selected);
    }
    & > :global(svg) {
        margin: 3px;
        flex-shrink: 0;
    }
    .cancelButton {
        width: var(--icon-button-size);
        height: var(--icon-button-size);
        padding: 0;
        border-radius: var(--radius-medium);
        color: var(--figma-color-text-secondary);
        background: transparent;
        border: none;
        flex-shrink: 0;

        &:hover {
            background: var(--color-bghovertransparent);
        }
    }
}
</style>
