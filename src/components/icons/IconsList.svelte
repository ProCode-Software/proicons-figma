<script lang="ts">
import { onMount } from 'svelte'
import { sendMessage } from '../../lib/messages'
import Button from '../ui/Button.svelte'
import IconItem from './IconItem.svelte'
import { searchIcons } from '../../lib/search'
import { icons, query, selectedCategories } from '../../lib/stores'
import { formatList } from '../../lib/utils'

const iconsUrl =
    'https://raw.githubusercontent.com/ProCode-Software/proicons/main/icons/icons.json'

let error = $state(false)

let sortedIcons = $derived(
    Object.entries($icons).sort((a, b) => a[0].localeCompare(b[0]))
)

let filteredIcons = $derived(
    ($query ? searchIcons(sortedIcons, $query) : sortedIcons).filter(
        ([, { category }]) =>
            $selectedCategories.length > 0
                ? $selectedCategories.includes(category)
                : true
    )
)

async function fetchIcons() {
    fetch(iconsUrl)
        .then(async res => {
            $icons = await res.json()
            error = false
        })
        .catch(() => {
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
        {#each filteredIcons as [iconName, data]}
            <IconItem
                name={iconName}
                category={data.category}
                svg={data.icon}
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

<style lang="scss">
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
