<script lang="ts">
import { mergeCss } from '../../lib/mergeClasses'

const { label, parent }: { label?: string; parent: HTMLElement } = $props()
let isShown = $state(false)

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
        hidden={!isShown}
        {...mergeCss({
            top: y + height + 7,
            left: Math.min(x + width, window.innerWidth),
        })}
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
        width: 0;
        height: 0;
        display: block;
        margin: 0 -1px;
        position: absolute;
        border: 7px solid transparent;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        border-top: none;
        border-bottom: var(--color-tooltip);
    }
}
</style>
