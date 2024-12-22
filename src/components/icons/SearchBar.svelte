<script>
import CategoriesButton from './CategoriesButton.svelte'
import SearchIcon from '../ui/icons/SearchIcon.svelte'
import { writable } from 'svelte/store'
import { query } from '../../lib/stores'
</script>

<div class="group spaced border">
    <div class="styledInputField">
        <SearchIcon />
        <input
            type="search"
            class="inp"
            bind:value={$query}
            placeholder="Search icons"
        />
    </div>
    <CategoriesButton />
</div>

<style lang="scss">
.styledInputField {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 6px;
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
