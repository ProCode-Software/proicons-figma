<script lang="ts">
//@ts-nocheck
import type { Component } from 'svelte'

type MenuItem = string | { text: string; icon: string | Component }

const { items, iconSize = 18 }: { items: MenuItem[]; iconSize?: number } =
    $props()
</script>

<div class="FigmaDropdown">
    {#each items as item}
        <div class="DropdownItem">
            {#if item.icon}
                {#if typeof item.icon == 'string'}
                    {@html item.icon}
                {:else if item.icon}
                    {@const Icon = item.icon}
                    <Icon size={iconSize} strokeWidth={1.2} />
                {/if}
            {/if}
            <span>{item.text ?? item}</span>
        </div>
    {/each}
</div>
