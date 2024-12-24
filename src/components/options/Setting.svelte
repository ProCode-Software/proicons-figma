<script lang="ts">
import type { Component } from 'svelte'
import type { HTMLInputAttributes } from 'svelte/elements'
import { mergeClasses } from '../../lib/mergeClasses'
import Toggle from '../ui/Toggle.svelte'
import InputField from '../ui/InputField.svelte'
import Tooltip from '../ui/Tooltip.svelte'
import IconButton from '../ui/IconButton.svelte'
import InfoIcon from '../ui/icons/InfoIcon.svelte'

let {
    layout = 'vertical',
    type = 'text',
    label,
    value = $bindable(),
    icon,
    description,
    ...props
}: {
    layout?: 'vertical' | 'horizontal'
    type?: 'text' | 'number' | 'color' | 'checkbox'
    label: string
    value: any
    icon?: string | Component
    description?: string
} & HTMLInputAttributes = $props()
</script>

<div {...mergeClasses('setting', layout)}>
    {#if layout == 'horizontal'}
        <div class="label">
            <span>{label}</span>
            {#if description}
                <IconButton label={description} icon={InfoIcon} />
            {/if}
        </div>
        <InputField {...props} {type} {icon} bind:value />
    {:else}
        {#if typeof icon == 'string'}
            {@html icon}
        {:else if icon}
            {@const Icon = icon}
            <Icon />
        {/if}
        <div class="label">{label}</div>
        {#if description}
            <div class="sub">{@html description}</div>
        {/if}
        {#if type == 'checkbox'}
            <div class="input">
                <Toggle bind:value />
            </div>
        {/if}
    {/if}
</div>

<style lang="scss">
.setting {
    display: flex;
    line-height: var(--text-body-medium-line-height);
    &.vertical {
        align-items: flex-start;
        display: grid;
        grid-template-columns: max-content;
        column-gap: 6px;

        .label {
            font-weight: var(--text-body-medium-font-weight);
            grid-column: 2;
            margin-top: 0.25rem;
        }

        .sub {
            color: var(--figma-color-text-secondary);
            grid-column: 2;
            grid-row: 2;
        }
        .input {
            grid-column: 3;
            margin-top: 0.25rem;
        }
    }
    &.horizontal {
        flex-direction: column;
        gap: 8px;
        width: 100%;

        .label {
            font-weight: var(--text-body-medium-font-weight);
            display: flex;
            align-items: center;
            gap: 2px;
            height: 1em;

            :global(svg) {
                color: var(--figma-color-icon-secondary);
            }
        }
    }
}
</style>
