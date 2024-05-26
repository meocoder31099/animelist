<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";

  //Import Libs
  import { onMount } from "svelte";
  import onInVỉew from "@/use-actions/onInView";
  import { fade } from "svelte/transition";

  //Import Stores
  import {
    isTopNavbarBgTransparent,
    isSideNavBar,
  } from "@/stores/UserSettingStore";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let imageUrl: Maybe<string> = "";
  export let isLoading = true;
  export let isSuccess = false;

  onMount(() => {
    setTimeout(() => {
      if (window.scrollY < 200) isTopNavbarBgTransparent.set(true);
    }, 0);
  });
</script>

<div
  use:onInVỉew={({ isView }) => {
    isTopNavbarBgTransparent.set(isView);
  }}
  class="flex w-full mt-14 lg:mt-0"
>
  {#if isLoading}
    <div
      class="w-full aspect-w-16 aspect-h-9 md:aspect-w-16 md:aspect-h-6 xl:aspect-w-12 xl:aspect-h-3 3xl:aspect-w-10 3xl:aspect-h-2 bg-transparent lg:rounded-bl animate-pulse"
    />
  {:else if isSuccess}
    <div
      in:fade
      class="w-full aspect-w-16 aspect-h-9 md:aspect-w-16 md:aspect-h-6 xl:aspect-w-12 xl:aspect-h-3 3xl:aspect-w-10 3xl:aspect-h-2 bg-neutral-800 transition-[border-radius] duration-300 overflow-hidden"
    >
      <div class="w-full h-full">
        <Image src={imageUrl || ""} position='top' />
      </div>
      <div>
        <div
          class="hidden lg:block w-full h-full absolute bottom-0 bg-gradient-to-t from-background via-background/30 to-transparent"
        />
        <div
          class="hidden w-full h-full absolute bottom-0 bg-gradient-to-r from-background via-transparent to-transparent"
          class:lg:block={$isSideNavBar}
        />
      </div>
    </div>
  {/if}
</div>
