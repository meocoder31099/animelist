<script lang="ts">
  //Import Libs
  import { onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { fade } from "svelte/transition";

  // Import Stores
  import { isBottomTabBar } from "@/stores/UserSettingStore";

  export let isShow: boolean = false;
  export let transitionDuration: number = 200;

  $: if (isShow) {
    if (browser) {
      window?.document.querySelector("html")?.classList.add("!overflow-hidden");

      isBottomTabBar.set(false);
    }
  } else {
    if (browser) {
      window?.document
        .querySelector("html")
        ?.classList.remove("!overflow-hidden");
      isBottomTabBar.set(true);
    }
  }

  onDestroy(() => {
    if (browser) {
      window?.document
        .querySelector("html")
        ?.classList.remove("!overflow-hidden");
      isBottomTabBar.set(true);
    }
  });
</script>

{#if isShow}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- on:click={() => (isShow = false)} -->
  <div
    in:fade|global={{
      duration: transitionDuration,
    }}
    class="fixed bg-background/95 w-full h-full inset-0 z-50"
  >
    <div class="h-screen w-full overflow-hidden">
      <slot name="content" />
    </div>
  </div>
{/if}
