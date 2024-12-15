<script>
import InputField from '../ui/InputField.svelte'
import SearchIcon from '@proicons/svelte/SearchIcon'
import IconButton from "../ui/IconButton.svelte"
import FolderIcon from '@proicons/svelte/FolderIcon'
</script>

<div class="group spaced">
    <InputField placeholder="Search icons" icon={SearchIcon} />
    <IconButton icon={FolderIcon} label="Categories" />
</div>
