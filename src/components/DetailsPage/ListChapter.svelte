<script lang="ts">
  import { fade } from "svelte/transition";

  export let isLoading: boolean = true;
  export let isSuccess: boolean = false;
</script>

<div class="flex">
  {#if isLoading}
    <ul class="w-full flex flex-col space-y-2 animate-pulse">
      {#each Array(5) as noUse}
        <li class="py-2 w-full h-10 bg-neutral-900 rounded-lg" />
      {/each}
    </ul>
  {:else if isSuccess}
    <ul in:fade class="w-full flex flex-col space-y-2">
      <li class="py-2 px-3 bg-neutral-900 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-neutral-800">
        Chapter 77: Reng Reng Reng
      </li>
      <li class="py-2 px-3 bg-neutral-900 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-neutral-800">
        Chapter 76: Đừng Mở!
      </li>
      <li class="py-2 px-3 bg-neutral-900 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-neutral-800">
        Chapter 75: 9, 12
      </li>
      <li class="py-2 px-3 bg-neutral-900 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-neutral-800">
        Chapter 74
      </li>
      <li class="py-2 px-3 bg-neutral-900 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-neutral-800">
        Chapter 73
      </li>
      <li class="py-2 px-3 bg-neutral-900 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-neutral-800">
        Chapter 72
      </li>
      <li class="py-2 px-3 bg-neutral-900 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-neutral-800">
        Chapter 71
      </li>
      <li class="py-2 px-3 bg-neutral-900 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-neutral-800">
        Chapter 70
      </li>
      <li class="py-2 px-3 bg-neutral-900 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-neutral-800">
        Chapter 69
      </li>
      <li class="py-2 px-3 bg-neutral-900 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-neutral-800">
        Chapter 68
      </li>
    </ul>
  {/if}
</div>
