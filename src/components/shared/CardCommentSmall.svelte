<script context="module" lang="ts">
  export interface CardCommnetSmallProps {
    user: {
      id: number;
      name: string;
      avatar: string;
    };
    textContent?: Maybe<string>;
    createdAt: number;
    id: number;
    isLiked?: Maybe<boolean>;
    likeCount: number;
  }
</script>

<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";

  // Import Libs
  import { formatTimeAgo } from "@/utils";

  // Import Components
  import Image from "@/components/shared/Image.svelte";
  import Dot from "@/components/shared/Dot.svelte";

  export let source: CardCommnetSmallProps;

  const timeAgo = formatTimeAgo(source.createdAt);
</script>

<div
  class="flex flex-col gap-y-2 p-3 bg-neutral-900 border border-neutral-800 rounded-lg"
>
  <div class="flex gap-x-2 items-center">
    <!-- Avatar -->
    <div class="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden">
      <Image src={source.user.avatar} />
    </div>
    <div class="w-full">
      <!-- Name -->
      <div class="flex items-center">
        <div class="inline-flex items-center font-semibold mr-2">
          {source.user.name}
        </div>
        <span class="text-sm text-neutral-400">
          {timeAgo}
        </span>
      </div>
    </div>
  </div>
  <div>
    <!-- Content -->
    <div class="whitespace-pre-wrap break-words">
      {source.textContent ?? ""}
    </div>
    <!-- Action -->
    <div class="flex items-center gap-x-2 mt-3 text-sm">
      <div class="action like"><span>{source.likeCount}</span> Like</div>
      <Dot />
      <div class="action reply">Report</div>
    </div>
  </div>
</div>
