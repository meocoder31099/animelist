<script context="module" lang="ts">
  export interface CardUserProps {
    id: number;
    avatar: string;
    name: string;
    isFollowing: Maybe<boolean>;
    moderatorRoles: Maybe<Maybe<ModRole>[]>;
  }
</script>

<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { ModRole } from "@/types/anilistv2";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let source: CardUserProps;

  const follow = source.isFollowing ? "Unfollow" : "Follow";
</script>

<div
  class="flex gap-x-4 md:bg-neutral-900 md:p-3 py-1 rounded-lg overflow-hidden"
>
  <!-- Avatar -->
  <div class="w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden shrink-0">
    <Image src={source.avatar} backgroundColor="transparent" />
  </div>
  <div class="w-full flex gap-x-2 items-center justify-between">
    <div class="w-full flex flex-col gap-y-1 justify-evenly">
      <!-- Username -->
      <h3 class="font-semibold text-lg break-all">{source.name}</h3>
      <!-- moderatorRoles -->
      {#if !!source.moderatorRoles}
        <div class="flex flex-wrap gap-1">
          {#each source.moderatorRoles as moderatorRole}
          <span class="bg-neutral-800 text-xs px-2 py-0.5 rounded-lg">{moderatorRole}</span>
          {/each}
        </div>
      {/if}
    </div>
    <!-- Action -->
    <button class="w-6 shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="w-5 h-5 fill-current"
        ><path
          d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        /></svg
      >
    </button>
  </div>
</div>