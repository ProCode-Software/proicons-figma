<script>
import IconButton from '../ui/IconButton.svelte'
import FolderIcon from '../ui/icons/FolderIcon.svelte'

let isShown = $state(false)
</script>

<IconButton
    icon={FolderIcon}
    label="Categories"
    iconSize={24}
    toggle
    bind:value={isShown}
></IconButton>
