<script lang="ts">
  // Import Libs
  import { createEventDispatcher } from "svelte";
  import useDebounce from "@/hooks/useDebounce";

  export let name: string;
  export let title: string;
  export let items: any;
  export let value: string | undefined;

  const dispacth = createEventDispatcher();

  const handleClick = useDebounce((): void => {
    dispacth("change", value || undefined);
  }, 500);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="max-w-fit inline-flex items-center border border-neutral-700 py-2 rounded-lg"
>
  <div class="pl-4 font-semibold">{title}</div>
  <select
    on:change={handleClick}
    {name}
    bind:value
    class="px-4 appearance-none bg-neutral-900 text-sm text-rose-500 cursor-pointer focus-visible:outline-none scrollbar-thin scrollbar-w-1 scrollbar-thumb-white scrollbar-thumb-rounded-lg"
  >
    <option value="">All</option>
    {#each items as item, i}
      <option value={item}>{item}</option>
    {/each}
  </select>
</div>
