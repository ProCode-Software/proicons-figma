<script>
import SearchIcon from '@proicons/svelte/SearchIcon'
import IconButton from '../ui/IconButton.svelte'
import FolderIcon from '@proicons/svelte/FolderIcon'

let { value = $bindable('') } = $props()
</script>

<div class="group spaced border">
    <div class="styledInputField">
        <SearchIcon size={18} />
        <input
            type="search"
            class="inp"
            bind:value
            placeholder="Search icons"
        />
    </div>
    <IconButton icon={FolderIcon} label="Categories" />
</div>

<style lang="scss">
.styledInputField {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 8px;
    padding-left: 0.25rem;
}
.inp {
    border: none;
    padding: 0;
    outline: none;
    background: none;
    width: 100%;
    font: inherit;
    font-size: var(--text-body-medium-font-size);
    letter-spacing: var(--text-body-medium-letter-spacing);
    line-height: var(--text-body-medium-line-height);

    &::placeholder {
        font-weight: var(--text-body-medium-font-weight);
    }
}
</style>
