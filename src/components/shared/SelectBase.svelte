<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  // Import Libs
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";

  // Import Actions
  import onClickOutside from "@/use-actions/onClickOutside";

  export let items: any;
  export let value: any;
  export let name: string;

  const dispatch = createEventDispatcher();
  let isShowOption: boolean = false;

  const open = (): void => {
    isShowOption = true;
  };
  const close = (): void => {
    isShowOption = false;
  };
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
      class="inline-flex w-full justify-center items-center gap-x-1.5 bg-neutral-900 rounded-lg px-3 py-1 font-bold capitalize"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
    >
      {value}
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
      transition:scale={{
        start: 0.9,
        duration: 100,
      }}
      class="absolute left-0 z-20 mt-2 origin-top-left rounded-lg bg-neutral-800"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="text-base" use:onClickOutside={close}>
        <ul class="p-3">
          {#each items as { title, value: item }, i}
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
                {title}
                class="inline-block relative text-center cursor-pointer peer-checked:font-bold before:font-bold before:content-[attr(title)] before:invisible before:block before:h-0 be before:overflow-hidden"
              >
                {title}
              </label>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</div>
