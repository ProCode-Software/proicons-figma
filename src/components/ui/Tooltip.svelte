<script lang="ts">
import { mergeCss } from '../../lib/mergeClasses'

const { label, parent }: { label?: string; parent: HTMLElement } = $props()
let isShown = $state(false)
let tooltip = $state<HTMLDivElement | null>(null),
    tooltipWidth = $state(0)

function initParent(p: HTMLElement) {
    p.onmouseenter = () => (isShown = true)
    p.onmouseleave = () => (isShown = false)

    return p.getBoundingClientRect()
}
</script>

{#if label && parent}
    {@const { x, y, width, height } = initParent(parent)}
    <div
        class="FigmaTooltip"
        bind:this={tooltip}
        bind:clientWidth={tooltipWidth}
        {...mergeCss({
            top: y + height + 7,
            left: Math.min(
                x + width,
                window.innerWidth - 10 - tooltipWidth / 2
            ),
            '--tooltip-pos': '100%'
        })}
        hidden={!isShown}
    >
        {label}
    </div>
{/if}

<style lang="scss">
.FigmaTooltip {
    padding: 0.25rem 0.5rem;
    background: var(--color-tooltip);
    position: absolute;
    color: #fff;
    box-shadow: var(--elevation-300-tooltip, 0 2px 7px rgba(0, 0, 0, 0.15));
    line-height: var(--text-body-medium-line-height);
    letter-spacing: var(--text-body-medium-letter-spacing);
    z-index: 14;
    border-radius: var(--radius-medium);
    transform: translateX(-50%);

    &::before {
        content: '';
        width: 0px;
        height: 0px;
        display: block;
        margin: 0 -1px;
        position: absolute;
        border: 7px solid transparent;
        bottom: 100%;
        left: var(--tooltip-pos);
        transform: translateX(-var(--tooltip-pos));
        border-top: none;
        border-bottom-color: var(--color-tooltip);
    }
}
</style>
