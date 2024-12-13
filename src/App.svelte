<script lang="ts">
console.log('Hello from the UI')

let count = $state(0)

const increment = () => count += 1
</script>

<h1>Hello Figma</h1>
<button onclick={increment}>Count is {count}</button>

<style lang="scss">
* {
    font-family: system-ui;
}
</style>