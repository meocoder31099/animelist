<script lang="ts">
  // Import Type
  import type { Tab } from "@/types";

  // Import Libs
  import { createEventDispatcher } from "svelte";

  export let isSuccess: Boolean = false;
  export let items: Tab;
  export let align: string = "center";
  export let rounded: boolean = false;

  const dispatch = createEventDispatcher();
  let isFirstRender: boolean = true;
  let tabEl: HTMLElement;
  let listTabItemWidth: number[];
  let widthIndicator = 0;
  let leftIndicator = 0;

  const updateIndicator = (index: number) => {
    const oldleftIndicator = leftIndicator;
    let leftIndicatorTemp = 0;
    for (let i = 0; i < index; i++) {
      const w = listTabItemWidth[i];
      leftIndicatorTemp += w;
    }
    leftIndicator = leftIndicatorTemp;
    widthIndicator = listTabItemWidth[index];
    tabEl.scrollBy({
      behavior: "smooth",
      left: leftIndicator - oldleftIndicator,
    });
  };

  const changeTab = (index: number) => {
    dispatch("changeTab", { key: items[index].key, path: items[index].path });
    updateIndicator(index);
    const currentItemActive = items.find((i) => i.isActive);
    if (currentItemActive) currentItemActive.isActive = false;
    items[index].isActive = true;
  };

  const setupTab = (node: HTMLElement) => {
    setTimeout(() => {
      isFirstRender = true;
      tabEl = node;
      // Lấy width của các Tab và thêm vào danh sách width
      listTabItemWidth = Array.from(tabEl.querySelectorAll(".tab-item")).map(
        (el) => el.getBoundingClientRect().width
      );
      // Set Indicator tới tab đang được active
      const currentItemActive = items.findIndex((i) => i.isActive);
      updateIndicator(currentItemActive);
      setTimeout(() => {
        isFirstRender = false;
      }, 150);
    }, 500);
  };
</script>

<div
  class="w-full bg-neutral-900 lg:rounded-lg px-2"
  class:rounded-lg={rounded}
>
  <div
    class="flex w-full shrink-0"
    class:justify-center={align === "center"}
    class:justify-start={align === "left"}
    class:justify-end={align === "right"}
  >
    {#if isSuccess}
      <ul
        use:setupTab
        class="relative flex list-none py-1.5 font-semibold overflow-x-auto snap-x scrollbar-none"
      >
        {#each items as item, i}
          <li class="flex shrink-0 text-center z-20">
            <a
              on:click|preventDefault={() => changeTab(i)}
              href={item.path}
              class="tab-item mb-0 flex w-full cursor-pointer items-center justify-center border-0 px-6 py-2 lg:py-2.5"
            >
              <span
                class="text-neutral-300 transition-colors duration-500"
                class:!text-white={item.isActive}>{item.name}</span
              >
            </a>
          </li>
        {/each}
        <!-- Indicator -->
        <div
          class="absolute inset-0 top-2 bottom-2 bg-neutral-800 rounded-lg z-10"
          class:duration-500={!isFirstRender}
          class:transition-all={!isFirstRender}
          style:width={`${widthIndicator}px`}
          style:left={`${leftIndicator}px`}
        />
      </ul>
    {:else}
      <div class="w-16 h-14 flex items-center justify-center mx-5">
        <div class="w-full h-4 rounded bg-neutral-800" />
      </div>
      <div class="w-16 h-14 flex items-center justify-center mx-5">
        <div class="w-full h-4 rounded bg-neutral-800" />
      </div>
      <div class="w-16 h-14 flex items-center justify-center mx-5">
        <div class="w-full h-4 rounded bg-neutral-800" />
      </div>
    {/if}
  </div>
</div>
