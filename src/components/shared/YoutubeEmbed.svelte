<script lang="ts">
  // Import Libs
  import { onDestroy } from "svelte";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let youtubeId: string;

  let isPlay: boolean = false;

  //   onDestroy(() => {
  //     console.log('bi xóa');
  //   })

  const play = () => {
    isPlay = true;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={play} class="my-1 aspect-w-16 aspect-h-9 border border-neutral-800 rounded-lg overflow-hidden">
  <Image src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`} />
  <div class="flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class="w-12 h-12 md:w-20 md:h-20 fill-current"
      ><path
        d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"
      /></svg
    >
  </div>
  {#if isPlay}
    <iframe
      title="Youtube video"
      src={`https://www.youtube.com/embed/${youtubeId}`}
    />
  {/if}
</div>
