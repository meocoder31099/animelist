<script context="module" lang="ts">
  export interface CardCommnetBaseProps {
    user: {
      id: number;
      name: string;
      avatar: string;
    };
    textContent?: Maybe<string>;
    createdAt: number;
    id: number;
    isLiked?: Maybe<boolean>;
    isLocked?: Maybe<boolean>;
    isPinned?: Maybe<boolean>;
    isSubscribed?: Maybe<boolean>;
    likeCount: number;
    replyCount?: number;
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

  export let source: CardCommnetBaseProps;

  const timeAgo = formatTimeAgo(source.createdAt);
  const { name: userName, avatar: userAvatar } = source.user;

  let likeCount: string | number = source.likeCount || "";
</script>

<div class="flex gap-x-2">
  <div class="flex-shrink-0 w-10 h-10 mt-1 rounded-full overflow-hidden">
    <Image src={userAvatar} />
    <!--<Image>-->
  </div>
  <div class="w-full">
    <div class="p-4 bg-neutral-900 rounded-lg">
      <div class="flex items-center">
        <div class="inline-flex items-center font-semibold mr-2">
          {userName}
        </div>
        <span class="text-sm text-neutral-400">{timeAgo}</span>
      </div>
      <div class="whitespace-pre-wrap break-words">
        {source.textContent}
      </div>
    </div>
    <div class="ml-1 mt-0.5 flex items-center gap-x-2 font-semibold text-sm">
      <slot name="action" {likeCount}>
        <span>{likeCount} Like</span>
        <!-- <Dot />
        <span>View comment</span> -->
      </slot>
    </div>
  </div>
</div>
