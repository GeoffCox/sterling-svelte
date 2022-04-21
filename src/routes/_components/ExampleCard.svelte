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
    }
</style>