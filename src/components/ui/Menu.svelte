<script lang="ts">
//@ts-nocheck
import { onMount, type Component } from 'svelte'
import { mergeCss } from '../../lib/mergeClasses'
import CheckmarkIcon from './icons/CheckmarkIcon.svelte'

type MenuItem =
    | string
    | { text: string; icon?: string | Component; onclick?: Function }
    | { separator: true }

let {
    items,
    iconSize = 18,
    open = $bindable(false),
    parent,
    dropdown = false,
    multi = false,
    selectedItems = $bindable<number[]>([]),
    default: defaultItem,
    change,
}: {
    items: MenuItem[]
    iconSize?: number
    open?: boolean
    parent?: HTMLElement
    dropdown?: boolean
    multi?: boolean
    selectedItems?: number[]
    default?: number | number[]
    change?: Function
} = $props()

let menu = $state()
let rect: DOMRect = $state()
let menuWidth = $state(0)

$effect(() => {
    if (parent) rect = parent.getBoundingClientRect()
})

function itemClick(index: number) {
    if (dropdown) {
        selectedItems.includes(index)
            ? (selectedItems = selectedItems.filter(i => i !== index))
            : selectedItems.push(index)
    }
    items[index].onclick?.()
    change?.()
}

onMount(() => {
    if (defaultItem == 0 || defaultItem) {
        selectedItems.push(...[defaultItem].flat())
    }
    window.addEventListener(
        'click',
        e => {
            if (e.target !== menu) {
                open = false
            }
        },
        { capture: true }
    )
})
</script>

{#if parent}
    {@const { x, y, width, height } = rect ?? parent.getBoundingClientRect()}
    {@const menuX = Math.min(x, window.innerWidth - 10 - menuWidth)}
    <div
        class="FigmaDropdown"
        hidden={!open}
        bind:this={menu}
        bind:clientWidth={menuWidth}
        {...mergeCss({
            left: menuX,
            top: y + height,
        })}
    >
        {#each items as item, i}
            {#if item.separator != true}
                <button class="DropdownItem" onclick={() => itemClick(i)}>
                    {#if item.icon || selectedItems.length > 0}
                        <div class="icon">
                            {#if selectedItems.includes(i)}
                                <CheckmarkIcon />
                            {/if}
                            {#if typeof item.icon == 'string'}
                                {@html item.icon}
                            {:else if item.icon}
                                {@const Icon = item.icon}
                                <Icon size={iconSize} strokeWidth={1.2} />
                            {/if}
                        </div>
                    {/if}
                    <span>{item.text ?? item}</span>
                </button>
            {:else}
                <div class="DropdownSeparator"></div>
            {/if}
        {/each}
    </div>
{/if}

<style lang="scss">
.FigmaDropdown {
    position: absolute;
    padding: var(--spacer);
    border-radius: var(--radius-large);
    overflow-y: auto;
    flex-direction: column;
    min-width: 120px;
    z-index: 14;
    user-select: none;
    cursor: default;
    background: var(--color-tooltip);
    box-shadow: var(--elevation-400-menu-panel);
    max-height: 60vh;

    &:not([hidden]) {
        display: flex;
    }

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        border: none;
    }
    &::-webkit-scrollbar-thumb {
        background: #ffffff40;
        border: none;
    }
}
.DropdownItem {
    color: #fff;
    background: none;
    border: none;
    outline: none;
    letter-spacing: 0;
    font-weight: 400;
    padding: 0 var(--spacer);
    border-radius: var(--radius-medium);
    display: flex;
    align-items: center;
    flex: 0 0 24px;
    line-height: 24px;
    cursor: default;
    text-decoration: none;
    text-align: left;
    white-space: nowrap;
    font-size: 12px;

    .icon {
        margin-left: calc(var(--spacer) * -1 / 2);
        margin-right: 4px;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        flex: 0 0 1rem;
        display: flex;
        place-items: center;
    }

    &:hover,
    &:focus-visible {
        background: var(--figma-color-bg-brand);
    }
}
.DropdownSeparator {
    width: 100%;
    margin: 8px 0;
    border-top: 1px solid #383838;
}
</style>
