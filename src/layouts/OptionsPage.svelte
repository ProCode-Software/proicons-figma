<script>
import Settings from "../components/options/Settings.svelte"

</script>
<div class="OptionsPage">
    <Settings />
    <div class="footer">
        <div class="links">
            <a
                href="https://procode-software.github.io/proicons"
                target="_blank">Website</a>
            <span>•</span>
            <a
                href="https://github.com/ProCode-Software/proicons"
                target="_blank">GitHub</a>
        </div>
        <span>
            Created by <a
                href="https://github.com/ProCode-Software"
                target="_blank">ProCode-Software</a>
        </span>
    </div>
</div>

<style lang="scss">
.OptionsPage {
    overflow: auto;
}
.footer {
    display: flex;
    gap: 6px;
    flex-direction: column;
    place-items: center;
    color: var(--figma-color-text-secondary);
    padding: 20px;
    font-size: 12px;
    border-top: 1px solid var(--figma-color-border);

    .links {
        display: flex;
        gap: 6px;
        font: inherit;
    }
    a:hover {
        color: var(--figma-color-text);
    }
}
</style>
