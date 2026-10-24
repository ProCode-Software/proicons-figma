<script lang="ts">
import { onMount } from 'svelte'
import { sendMessage } from '../../lib/messages'
import { searchIcons } from '../../lib/search'
import { iconEntries, icons, query, selectedCategories } from '../../lib/stores'
import { formatList } from '../../lib/utils'
import Button from '../ui/Button.svelte'
import IconItem from './IconItem.svelte'

const iconsUrl =
    'https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/icons.json'

let error = $state(false)

let filteredIcons = $derived($query != '' ? searchIcons($query) : $iconEntries)

async function fetchIcons() {
    fetch(iconsUrl)
        .then(async res => {
            $icons = await res.json()
            error = false
        })
        .catch(e => {
            console.error('[ProIcons] Failed to fetch icons:', e)
            sendMessage({ type: 'FetchIconsError' })
            error = true
        })
}
function formatNoResults(q: string, c: string[]) {
    return [
        `No results found for "${q}"`,
        ...(c.length > 0
            ? [
                  `with ${c.length > 1 ? 'categories' : 'category'} "${formatList(c)}"`,
              ]
            : []),
    ].join(' ')
}
onmessage = ({ data: { pluginMessage } }) => {
    if (pluginMessage.type == 'FetchIconsTryAgain') fetchIcons()
}
onMount(fetchIcons)
</script>

{#if error}
    <div class="centered">
        <div class="heading">Unable to get icons</div>
        <p>Please try again</p>
        <Button text="Try again" onclick={fetchIcons} />
    </div>
{:else if $icons}
    <div class="IconList">
        {#each filteredIcons as {name, category, icon} (name)}
            <IconItem
                name={name}
                category={category}
                svg={icon}
            />
        {:else}
            <div class="centered NoResults">
                <div class="heading">
                    {formatNoResults($query, $selectedCategories)}
                </div>
                <p>Please check your search query and try again</p>
                <Button text="Clear search" onclick={() => ($query = '')} />
                <a
                    href="https://github.com/ProCode-Software/proicons/discussions/new?category=icon-requests&title={encodeURIComponent(
                        `[Icon Request]: ${$query}`
                    )}"
                    target="_blank"
                    aria-label="Request icon on GitHub"
                    style="margin-top: 6px;"
                >
                    <Button text="Request on GitHub" />
                </a>
            </div>
        {/each}
    </div>
{/if}

<style >
.IconList:not(:has(.NoResults)) {
    width: 100%;
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(40px, 1fr));
    overflow-y: auto;
    max-height: calc(100% - 40px);
    padding: 10px;
    padding-right: 0;
    height: calc(100% - 40px);
}
</style>
