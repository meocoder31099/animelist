<script lang="ts">
  // Import Types
  import type { Menu } from "@/types";

  // Import Libs
  import { onMount, onDestroy } from "svelte";
  import { siteName } from "@/configs";

  // Import Stores
  import { isSideNavBar, isBottomTabBar } from "@/stores/UserSettingStore";
  import { memus as menuStore, footerLinks } from "@/stores/DetailDataStore";

  let menus: Menu[];

  const unsubscribeMenuStore = menuStore.subscribe((value) => {
    menus = Object.values(value);
  });

  onMount(() => {
    return () => {};
  });

  onDestroy(() => {
    unsubscribeMenuStore();
  });
</script>

<!-- <aside
  class="w-0 lg:w-56 px-2 fixed inset-0 !top-12 transition-all duration-300 group z-50"
  aria-label="Sidebar"
  class:lg:-ml-60={!$isSideNavBar}
>
  <div
    class="flex flex-col justify-between lg:pr-1 py-2 h-full overflow-y-auto scrollbar-w-1 scrollbar-thin scrollbar-thumb-transparent group-hover:scrollbar-thumb-neutral-500 scrollbar-track-transparent"
  >
    <div class="flex-col mt-2"> -->
      <!-- Danh sách trên Desktop, Bottom Tabbar trên mobile -->
      <!-- <ul
        class="fixed bottom-0 left-0 right-0 lg:relative flex justify-between md:justify-evenly lg:justify-start lg:flex-col bg-neutral-900 lg:bg-transparent lg:!block border-t border-neutral-800 lg:border-none"
        class:hidden={!$isBottomTabBar}
      >
        {#each menus as { icon, iconActivated, path, title, isActive }}
          <li class="flex basis-full flex-col justify-center">
            <a
              href={path}
              class="flex flex-col lg:flex-row md:gap-y-1 items-center text-center lg:text-left px-1 pt-2 py-1 lg:py-2 lg:pl-5 text-sm text-neutral-500 lg:text-neutral-300 relative"
              class:!text-white={isActive}
            >
              <span>{@html isActive ? iconActivated : icon}</span>
              <span
                class="lg:ml-5 lg:whitespace-nowrap text-xs lg:text-base scale-75 md:scale-100"
                >{title}</span
              > -->


              <!-- {#if isActive}
                <span
                  class="absolute top-0 w-5 lg:w-4 h-0.5 rounded-lg bg-white lg:rotate-90 lg:left-0.5 lg:top-auto"
                />
              {/if} -->

              
            <!-- </a>
          </li>
        {/each}
      </ul> -->

      <!-- <ul class="mt-4 border-t border-neutral-800">
        <li class="flex items-center pl-5 py-3 text font-medium text-[#8a8a8a]">
          Lối tắt của bạn
        </li>
        <li>
          <a
            href="/"
            class="flex items-center py-2 pl-5 text-sm font-normal rounded-xl transition duration-75 hover:bg-neutral-800 text-white group"
          >
            <button type="button" class="flex rounded-full">
              <img
                class="w-8 h-8 rounded-full"
                src="https://raw.githubusercontent.com/leon-to/youtube.nuxt3.tailwindcss/develop/assets/img/day-trading-radio.jpg"
                alt="user photo4"
              />
            </button>

            <span class="ml-5 flex-1 line-clamp-2"
              >JoJo no Kimyou na Bouken: Steel Ball Run</span
            >
          </a>
        </li>
        <li>
          <a
            href="/"
            class="flex items-center py-2 pl-5 text-sm font-normal rounded-xl transition duration-75 hover:bg-neutral-800 text-white group"
          >
            <button type="button" class="flex rounded-full">
              <img
                class="w-8 h-8 rounded-full"
                src="https://raw.githubusercontent.com/leon-to/youtube.nuxt3.tailwindcss/develop/assets/img/marshmello.jpg"
                alt="user photo2"
              />
            </button>
            <span class="ml-5 flex-1 line-clamp-2">Berserk</span>
            <span class="mr-1.5 rounded-full h-1 w-1 bg-sky-500" />
          </a>
        </li>
        <li>
          <a
            href="/"
            class="flex items-center py-2 pl-5 text-sm font-normal rounded-xl transition duration-75 hover:bg-neutral-800 text-white group"
          >
            <button type="button" class="flex rounded-full">
              <img
                class="w-8 h-8 rounded-full"
                src="https://raw.githubusercontent.com/leon-to/youtube.nuxt3.tailwindcss/develop/assets/img/vice.jpg"
                alt="user photo1"
              />
            </button>
            <span class="ml-5">Ijiranaide, Nagatoro-san 2nd Attack</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="flex flex-col justify-between border-t border-neutral-800">
      <div class="flex flex-wrap gap-2 text-sm p-4 text-neutral-400">
        {#each footerLinks as { title, path }}
          <a href={path}>{title}</a>
        {/each}
      </div>
      <div class="flex p-4 text-sm text-neutral-400">
        © {new Date().getFullYear()}
        {siteName}
      </div>
    </div>
  </div>
</aside> -->

<!-- Menu bar -->
<ul
  class="fixed bottom-0 left-0 right-0 lg:top-0 lg:right-auto flex justify-between lg:flex-col gap-y-4 lg:justify-start bg-neutral-900 border-t border-neutral-800 lg:border-none lg:px-2 lg:pt-14 lg:w-20"
  class:hidden={!$isBottomTabBar}
>
  {#each menus as { icon, iconActivated, path, title, isActive }}
    <li class="flex flex-col justify-center">
      <a
        href={path}
        class="flex flex-col md:gap-y-1 items-center text-center px-1 pt-2 py-1 text-sm text-neutral-500 relative"
        class:!text-white={isActive}
      >
        <span>{@html isActive ? iconActivated : icon}</span>
        <span class="text-xs scale-75 md:scale-100">{title}</span>
      </a>
    </li>
  {/each}
</ul>
