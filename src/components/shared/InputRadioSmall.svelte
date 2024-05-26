<script lang="ts" context="module">
  type ItemObject = {
    title: string;
    value?: string;
  };
  export type InputRadioSmallItems = ItemObject[] | string[];
</script>

<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";

  // Import Libs
  import { createEventDispatcher } from "svelte";
  import useDebounce from "@/hooks/useDebounce";

  export let name: string;
  export let title: string | undefined = undefined;
  export let clear: boolean = true;
  export let items: InputRadioSmallItems;
  export let value: string | undefined;

  const dispacth = createEventDispatcher();

  if (typeof items[0] === "string")
    items = items.map((item) => {
      return {
        title: item,
        value: item,
      };
    }) as ItemObject[];

  const processedItems: ItemObject[] = items as ItemObject[];

  const handleClick = useDebounce(
    (node: Maybe<EventTarget>, callback: () => void): void => {
      if (!node) return;
      if ((node as HTMLInputElement).type === "radio") callback();
    },
    500
  );
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="flex flex-wrap gap-2"
  on:click|capture={(event) => {
    handleClick(event.target, () => {
      dispacth("change", value);
    });
  }}
>
  <div class="basis-full text-lg mb-2 flex justify-between items-center">
    {#if !!title}
      <div class="font-semibold">{title}</div>
    {/if}
    {#if clear && !!value?.length}
      {#if !!value}
        <span
          on:click|stopPropagation={() => {
            value = undefined;
            dispacth("change", value);
          }}
          class="items-center cursor-pointer hover:text-neutral-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current w-5 h-5"
            ><path
              d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
            /></svg
          >
        </span>
      {/if}
    {/if}
  </div>
  {#each processedItems as { title, value: itemValue }, i}
    <div class="py-1.5">
      <input
        id={`${name}_` + i}
        type="radio"
        {name}
        value={itemValue}
        bind:group={value}
        class="hidden peer"
      />
      <label
        for={`${name}_` + i}
        class="px-4 py-1.5 rounded-lg border border-neutral-700 cursor-pointer transition-colors duration-500 peer-checked:bg-white peer-checked:text-black"
      >
        {title}
      </label>
    </div>
  {/each}
</div>
