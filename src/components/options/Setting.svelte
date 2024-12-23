<script lang="ts">
import type { Component } from 'svelte'
import { mergeClasses } from '../../lib/mergeClasses'
import Toggle from '../ui/Toggle.svelte'
import InputField from '../ui/InputField.svelte'

let {
    layout = 'vertical',
    type = 'text',
    label,
    value = $bindable(),
    icon,
    description,
}: {
    layout?: 'vertical' | 'horizontal'
    type?: 'text' | 'number' | 'color' | 'checkbox'
    label: string
    value: any
    icon?: string | Component
    description?: string
} = $props()
</script>

<div {...mergeClasses('setting', layout)}>
    {#if layout == 'horizontal'}
        <div class="label">{label}</div>
        <InputField {type} {icon} bind:value />
    {:else}
        <div class="left">
            {#if typeof icon == 'string'}
                {@html icon}
            {:else if icon}
                {@const Icon = icon}
                <Icon />
            {/if}
            <div class="textGroup">
                <div class="label">{label}</div>
                {#if description}
                    <div class="sub">{@html description}</div>
                {/if}
            </div>
        </div>
        {#if type == 'checkbox'}
            <Toggle bind:value />
        {/if}
    {/if}
</div>

<style lang="scss">
.setting {
    display: flex;
    line-height: var(--text-body-medium-line-height);
    &.vertical {
        align-items: center;
        gap: 6px;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .textGroup {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .label {
            font-weight: var(--text-body-medium-font-weight);
        }

        .sub {
            color: var(--figma-color-text-secondary);
        }
    }
    &.horizontal {
        flex-direction: column;
        gap: 8px;
        width: 100%;

        .label {
            font-weight: var(--text-body-medium-font-weight);
        }
    }
}
</style>
