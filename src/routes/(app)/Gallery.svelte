<script lang="ts">
  import { Button, Checkbox, Input, Label, Progress, Radio, Switch } from '$lib';
</script>

<div class="gallery">
  <Button>Button</Button>
  <Checkbox>Checkbox</Checkbox>
  <Radio name="radio" value="radio">Radio</Radio>
  <Input placeholder="Input" />
  <Label text="and many more">
    <Progress value={80} />
  </Label>
</div>

<style>
  .gallery {
    display: grid;
    grid-template-columns: 100px 100px 100px 150px 150px;
    column-gap: 1em;
    align-items: center;
    padding: 1em;
  }
</style>
