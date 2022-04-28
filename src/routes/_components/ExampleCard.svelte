<script lang="ts">
    export let name: string;
    export let description: string = '';
</script>

<div class="card">
    <div class="name">{name}</div>
    <div class="example">
    <slot />
    </div>
    <div class="description">{description}</div>
</div>

<style>
    .card {
        background-color: var(--Theme__base__background-color, #fbfdfd);
        color: var(--Theme__base__color, #222);
        border: 1px dashed lightgray;
        border-radius: 10px;
        padding: 15px;
        display: grid;
        grid-template-rows: auto 1fr auto;
        justify-items: center;
        row-gap: 5px;
    }

    .name {
        font-size: 0.8rem;
        font-weight: 600;
    }

    .example {
        padding: 5px 0;
        align-self: center;
        display: flex;
		flex-direction: row;
		column-gap: 5px;
        align-items: center;
    }
</style>