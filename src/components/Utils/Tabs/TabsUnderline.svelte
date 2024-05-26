<script lang="ts">
  // Import libs
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  export let items: Tab;
  export let isLoading: Boolean = true;

  $: activeIndex = items.findIndex((item) => item.isActive);
  $: activeIndex,
    browser &&
      document
        ?.querySelector(`button[id="${items[activeIndex].key}"]`)
        ?.scrollIntoView({
          block: "nearest",
        });

  const changeTab = (path: string) => {
    goto(path, {
      noScroll: true,
    });
  };
</script>

<div
  class="w-full font-medium text-center text-neutral-200 border-t-2 border-neutral-800"
>
  <ul class="flex flex-row w-full overflow-x-auto snap-x scrollbar-none">
    {#if isLoading}
      {#each Array(4) as noUse}
        <li class="p-4">
          <div class="bg-neutral-800 w-28 h-6 lg:h-8 rounded animate-pulse" />
        </li>
      {/each}
    {:else}
      {#each items as item, i}
        <li>
          <button
            on:click={() => changeTab(item.path)}
            id={item.key}
            class="uppercase text-sm lg:text-base inline-block px-3 py-2.5 lg:p-4 border-t-4 hover:border-rose-700 hover:text-neutral-100"
            class:border-rose-700={item.isActive}
            class:border-transparent={!item.isActive}>{item.name}</button
          >
        </li>
      {/each}
    {/if}
  </ul>
</div>

<!-- Disable -->
<!-- <li>
    <a
    href="/"
    class="inline-block px-2.5 py-2 lg:p-4 cursor-not-allowed text-neutral-100"
    >Disabled</a
    >
</li> -->
