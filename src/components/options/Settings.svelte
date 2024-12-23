<script>
import InputField from '../ui/InputField.svelte'
import Setting from './Setting.svelte'

let size = $state(24),
    strokeWidth = $state(1.5),
    color = $state(),
    cornerRadius = $state(),
    strokeFilledElements = $state(false),
    outlineStrokes = $state(false),
    flatten = $state(false)
</script>

<div class="SettingsGroup">
    <div class="row">
        <Setting
            layout="horizontal"
            type="number"
            bind:value={size}
            label="Size" />
        <Setting
            layout="horizontal"
            type="color"
            bind:value={color}
            label="Color" />
    </div>
    <div class="row">
        <Setting
            layout="horizontal"
            type="number"
            bind:value={strokeWidth}
            label="Stroke width" />
        <Setting
            layout="horizontal"
            type="number"
            bind:value={cornerRadius}
            label="Corner radius" />
    </div>
    <div class="col">
        <Setting
            layout="vertical"
            type="checkbox"
            bind:value={strokeFilledElements}
            label="Stroke filled elements"
            description="Add additional strokes to filled elements such as circles for balance." />
        <Setting
            layout="vertical"
            type="checkbox"
            bind:value={outlineStrokes}
            label="Outline strokes"
            description="Some paths may not outline correctly (an issue with Figma)" />
        <Setting
            layout="vertical"
            type="checkbox"
            bind:value={flatten}
            label="Flatten paths"
            description="Flatten all strokes into a single path" />
    </div>
</div>

<style lang="scss">
.SettingsGroup {
    width: 100%;
}
.col, .row {
    display: flex;
    width: 100%;
    padding: 1rem;
}
.col {
    flex-direction: column;
    gap: 1rem;
}
.row {
    flex-direction: row;
    border-bottom: 1px solid var(--figma-color-border);
    gap: 1rem;
}
</style>
