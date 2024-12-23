<script lang="ts">
let { value = $bindable() } = $props()
</script>

<input type="checkbox" bind:checked={value} />

<style lang="scss">
input {
    appearance: none;
    -webkit-appearance: none;
    display: inline-flex;
    border-radius: var(--radius-full);
    transition: background 0.08s ease-out;
    background: var(--figma-color-bg-tertiary);
    position: relative;
    width: 2rem;
    height: 1rem;
    --knob-x: 0rem;
    margin: 0;
    flex-shrink: 0;

    &:checked {
        --knob-x: 1rem;
        background: var(--figma-color-bg-brand);
    }

    &::after {
        content: '';
        display: block;
        position: absolute;
        width: 0.875rem;
        height: 0.875rem;
        border-radius: var(--radius-full);
        inset: 1px;
        top: 50%;
        transform: translate(var(--knob-x), -50%);
        transition: all 0.08s ease-out;
        background: #fff;
    }
}
</style>
