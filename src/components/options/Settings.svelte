<script>
import CornerRadiusIcon from '../ui/icons/CornerRadiusIcon.svelte'
import FlattenIcon from '../ui/icons/FlattenIcon.svelte'
import OutlineStrokeIcon from '../ui/icons/OutlineStrokeIcon.svelte'
import ScaleIcon from '../ui/icons/ScaleIcon.svelte'
import StrokeFillsIcon from '../ui/icons/StrokeFillsIcon.svelte'
import StrokeIcon from '../ui/icons/StrokeIcon.svelte'
import Setting from './Setting.svelte'
import {
    size,
    color,
    cornerRadius,
    flatten,
    outlineStrokes,
    strokeFilledElements,
    strokeWidth,
    setDefaults,
} from '../../lib/stores'
import Button from '../ui/Button.svelte'
</script>

<div class="SettingsGroup">
    <div class="row">
        <Setting
            layout="horizontal"
            type="number"
            bind:value={$size}
            icon={ScaleIcon}
            min={12}
            max={128}
            label="Size" />
        <Setting
            layout="horizontal"
            type="color"
            bind:value={$color}
            label="Color" />
        <Setting
            layout="horizontal"
            type="number"
            icon={StrokeIcon}
            bind:value={$strokeWidth}
            min={1}
            max={3}
            label="Stroke width" />
        <Setting
            layout="horizontal"
            type="number"
            icon={CornerRadiusIcon}
            bind:value={$cornerRadius}
            min={-0.25}
            max={5}
            step={0.25}
            description="May not work for all icons. Set to a negative number to use default."
            label="Corner radius" />
    </div>

    <div class="col">
        <Setting
            layout="vertical"
            type="checkbox"
            bind:value={$strokeFilledElements}
            icon={StrokeFillsIcon}
            label="Stroke filled elements"
            description="Add additional strokes to filled elements such as circles for balance." />
        <Setting
            layout="vertical"
            type="checkbox"
            bind:value={$outlineStrokes}
            icon={OutlineStrokeIcon}
            label="Outline strokes"
            description="Some paths may not outline correctly (an issue with Figma)" />
        <Setting
            layout="vertical"
            type="checkbox"
            icon={FlattenIcon}
            bind:value={$flatten}
            label="Flatten paths"
            description="Flatten all strokes into a single path" />

        <Button onclick={setDefaults} text="Reset to defaults" />
    </div>
</div>

<style lang="scss">
.SettingsGroup {
    width: 100%;
}
.col,
.row {
    width: 100%;
    padding: 1rem;
}
.col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-left: 0.75rem;
}
.row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    border-bottom: 1px solid var(--figma-color-border);
    gap: 1rem;
}
</style>
