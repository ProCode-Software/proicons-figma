<script lang="ts">
import CancelIcon from '@proicons/svelte/CancelIcon'
import type { Component } from 'svelte'
import type { HTMLInputAttributes } from 'svelte/elements'
import { mergeClasses, mergeCss } from '../../lib/mergeClasses'

type InputType = 'text' | 'color' | 'number' | 'checkbox' | 'search'

interface Props {
    type?: InputType
    icon?: string | Component
    placeholder?: string
    value?: string | number
    iconSize?: number
}
let {
    type = 'text',
    icon,
    iconSize = 18,
    placeholder,
    value = $bindable(),
    ...props
}: Props & HTMLInputAttributes = $props()

let picker = $state()
</script>

{#if type !== 'color'}
    <div class="FigmaInput">
        {#if typeof icon == 'string'}
            {@html icon}
        {:else if icon}
            {@const Icon = icon}
            <Icon size={iconSize} />
        {/if}
        <input {...props} {type} {placeholder} bind:value />
        {#if type == 'search' && value?.toString().length > 0}
            <button
                class="cancelButton"
                onclick={() => (value = '')}
                aria-label="Clear input">
                <CancelIcon size={14} />
            </button>
        {/if}
    </div>
{:else}
    <div {...mergeClasses('FigmaInput', 'ColorInput')}>
        <button
            class="colorPreview"
            aria-label="Change color"
            style="--color: {value};"
            onclick={() => picker?.click()}>
        </button>
        <input {...props} type="color" bind:value bind:this={picker} />
        <input {...props} type="text" bind:value />
    </div>
{/if}

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
        font-weight: 400;
        letter-spacing: var(--text-body-medium-letter-spacing);
        line-height: var(--text-body-medium-line-height);
        flex-grow: 1;
        width: 100%;
    }
    &:focus-within {
        outline: 1px solid var(--figma-color-border-selected);
    }
    &:hover {
        box-shadow: 0 0 0 1px var(--figma-color-border);
    }
    & > :global(svg) {
        color: var(--figma-color-icon-secondary);
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
.FigmaInput.ColorInput {
    input[type='color'] {
        display: none;
    }
    .colorPreview {
        width: 24px;
        height: 24px;
        background: none;
        border: none;
        outline: none;
        padding: 0;
        flex-shrink: 0;
        &::after {
            content: '';
            display: flex;
            width: 14px;
            height: 14px;
            background: var(--color);
            align-self: center;
            justify-self: center;
            border-radius: 20%;
            box-shadow: inset 0px 0px 0px 1px var(--btn-border);
        }
    }
}
</style>
