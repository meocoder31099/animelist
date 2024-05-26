<script context="module" lang="ts">
  export type TabItem = {
    name: string;
    isActive?: boolean;
    path: string;
  };
  export type TabItems = Record<string, TabItem>;
</script>

<script lang="ts">
  // Import Type
  type ItemRect = { width: number; left: number };
  type customDispatch = {
    changeTab: { key: string; path: string };
  };

  // Import Libs
  import { createEventDispatcher } from "svelte";

  export let items: TabItems;
  export let titles: string[] | undefined = undefined;
  export let align: "center" | "left" | "right" = "center";
  export let rounded: boolean = false;

  const dispatch = createEventDispatcher<customDispatch>();
  const tabKeys = titles ?? Object.keys(items);
  let tabKeyActive = tabKeys.find((tabKey) => items[tabKey].isActive);
  let tabItemRects: Record<string, ItemRect> = {};
  let isFirstRender: boolean = true;
  let tabEl: HTMLElement;
  let widthIndicator = 0;
  let leftIndicator = 0;

  const updateIndicator = (tabKey: string) => {
    leftIndicator = tabItemRects[tabKey].left;
    widthIndicator = tabItemRects[tabKey].width;
    tabEl.scrollTo({
      behavior: "smooth",
      top: 0,
      left: tabItemRects[tabKey].left,
    });
  };

  const changeTab = (tabKey: string) => {
    dispatch("changeTab", { key: tabKey, path: items[tabKey].path });
    tabKeyActive && (items[tabKeyActive].isActive = false);
    tabKeyActive = tabKey;
    items[tabKey].isActive = true;
    updateIndicator(tabKey);
  };

  const onBoundingClientRectWidth = (
    node: HTMLElement,
    value: ({ width, left }: ItemRect) => void
  ): void => {
    const { width } = node.getBoundingClientRect();
    const left = node.offsetLeft;
    value({ width, left });
  };

  const setupTab = (node: HTMLElement) => {
    isFirstRender = true;
    tabEl = node;
    // Set Indicator tới tab đang được active
    !!tabKeyActive && updateIndicator(tabKeyActive);
    setTimeout(() => {
      isFirstRender = false;
    }, 150);
  };
</script>

<div class="w-full bg-neutral-900 px-2" class:rounded-lg={rounded}>
  <div
    class="flex w-full shrink-0"
    class:justify-center={align === "center"}
    class:justify-start={align === "left"}
    class:justify-end={align === "right"}
  >
    <ul
      use:setupTab
      class="relative flex list-none py-1 font-semibold overflow-x-auto snap-x scrollbar-none"
    >
      {#each tabKeys as key}
        <li
          use:onBoundingClientRectWidth={(rect) => {
            tabItemRects[key] = rect;
          }}
          class="flex shrink-0 text-center z-20"
        >
          <a
            on:click|preventDefault={() => changeTab(key)}
            href={items[key].path}
            class="tab-item mb-0 flex w-full cursor-pointer items-center justify-center border-0 px-5 py-2"
          >
            <span
              class="text-neutral-300 transition-colors duration-500"
              class:!text-white={items[key].isActive}>{items[key].name}</span
            >
          </a>
        </li>
      {/each}
      <!-- Indicator -->
      <div
        class="absolute inset-0 top-1.5 bottom-1.5 bg-neutral-800 rounded-lg z-10"
        class:duration-500={!isFirstRender}
        class:transition-all={!isFirstRender}
        style:width={`${widthIndicator}px`}
        style:left={`${leftIndicator}px`}
      />
    </ul>
  </div>
</div>
