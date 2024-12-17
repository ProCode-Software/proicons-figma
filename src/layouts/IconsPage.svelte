<script>
import SearchBar from '../components/icons/SearchBar.svelte'

let query = $state('')
</script>

<div class="IconsPage">
    <SearchBar bind:value={query} />
</div>
