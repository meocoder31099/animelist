<script lang="ts" context="module">
  export type SelectItem = { title: string };
  export type SelectItems = Record<string, SelectItem>;
</script>

<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";

  interface CustomEventMap {
    select: string;
  }

  // Import Libs
  import { onMount, createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";

  // Import Actions
  import onClickOutside from "@/use-actions/onClickOutside";

  export let data: SelectItems;
  export let value: string | undefined;
  export let name: Maybe<string>;

  let items: string[];
  const dispatch = createEventDispatcher<CustomEventMap>();
  let isShowOption: boolean = false;

  const open = (): void => {
    isShowOption = true;
  };
  const close = (): void => {
    isShowOption = false;
  };

  onMount(() => {
    items = Object.keys(data);
  });

  // Reactive
  $: if (value) {
    dispatch("select", value);
    close();
  }
</script>

<div class="relative inline-block text-left">
  <div>
    <button
      on:click={() => {
        open();
      }}
      type="button"
      class="inline-flex w-full justify-center items-center gap-x-1.5 bg-neutral-900 rounded-lg px-3 py-1 font-bold"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
    >
      {data[value ?? ""].title}
      <svg
        class="-mr-1 h-5 w-5 text-neutral-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>

  <!-- Dropdown menu, show/hide based on menu state. -->
  {#if isShowOption}
    <div
      transition:scale|global={{
        start: 0.9,
        duration: 100,
      }}
      class="absolute left-0 z-20 mt-2 origin-top-left bg-neutral-800 rounded-lg"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="text-base" use:onClickOutside={close}>
        <ul class="p-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-w-1 scrollbar-thumb-white scrollbar-thumb-rounded-lg">
          {#each items as item, i}
            <li class="w-full p-2">
              <input
                id={`${name}_${i}`}
                type="radio"
                {name}
                value={item}
                bind:group={value}
                class="hidden peer"
              />
              <label
                for={`${name}_${i}`}
                title={data[item].title}
                class="inline-block relative cursor-pointer peer-checked:font-bold before:font-bold before:content-[attr(title)] before:invisible before:block before:h-0 be before:overflow-hidden"
              >
                {data[item].title}
              </label>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</div>
