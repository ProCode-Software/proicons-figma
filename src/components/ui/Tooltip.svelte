<script lang="ts">
import { mergeCss } from '../../lib/mergeClasses'

const { label, parent }: { label?: string; parent: HTMLElement } = $props()
let isShown = $state(false)

let rect: DOMRect | undefined = $state()
let isHovered = false
let tooltip = $state<HTMLDivElement | null>(null),
    tooltipWidth = $state(0)

function initParent(p: HTMLElement) {
    p.onmouseenter = () => {
        isHovered = true
        setTimeout(() => {
            rect = p.getBoundingClientRect()
            if (isHovered) isShown = true
        }, 800)
    }
    p.onmouseleave = () => {
        isHovered = false
        isShown = false
    }
}
$effect(() => {
    if (parent) initParent(parent)
})
</script>

{#if label && parent}
    {@const { x, y, width, height } = rect ?? parent.getBoundingClientRect()}
    {@const tooltipX = Math.min(
        Math.max(tooltipWidth / 2 + 10, x + width / 2),
        window.innerWidth - 10 - tooltipWidth / 2
    )}
    <div
        class="tooltipTriangle"
        hidden={!isShown}
        {...mergeCss({
            left: x + (width / 2),
            top: y + height,
        })}
    ></div>
    <div
        class="FigmaTooltip"
        bind:this={tooltip}
        bind:clientWidth={tooltipWidth}
        {...mergeCss({
            top: y + height + 6,
            left: tooltipX,
        })}
        hidden={!isShown}
    >
        {@html label}
    </div>
{/if}

<style lang="scss">
.FigmaTooltip {
    padding: 0.25rem 0.5rem;
    background: var(--color-tooltip);
    position: fixed;
    color: #fff;
    box-shadow: var(--elevation-300-tooltip, 0 2px 7px rgba(0, 0, 0, 0.15));
    line-height: var(--text-body-medium-line-height);
    letter-spacing: var(--text-body-medium-letter-spacing);
    z-index: 16;
    border-radius: var(--radius-medium);
    max-width: 80vw;
    transform: translateX(-50%);
}
.tooltipTriangle {
    width: 0px;
    height: 0px;
    margin: 0;
    position: fixed;
    border: 7px solid transparent;
    bottom: 100%;
    transform: translateX(-50%);
    border-top: none;
    border-bottom-color: var(--color-tooltip);
}
</style>
