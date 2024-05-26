<script context="module" lang="ts">
  export interface CardUserForumThreadCommentsProps {
    threadComment: CardCommnetBaseProps;
    thread: {
      id: number;
      title?: Maybe<string>;
    };
  }
</script>

<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { CardCommnetBaseProps } from "@/components/shared/CardCommentBase.svelte";

  // Import Components
  import CardCommentBase from "@/components/shared/CardCommentBase.svelte";
  import Dot from "@/components/shared/Dot.svelte";

  export let source: CardUserForumThreadCommentsProps;
</script>

<div class="border border-neutral-800 p-4 rounded-lg">
  <h3 class="mb-4 md:text-lg">
    in <span class="font-semibold">{source.thread.title}</span>
  </h3>
  <CardCommentBase source={source.threadComment}>
    <svelte:fragment slot="action" let:likeCount>
      <span>{likeCount} Like</span>
      <Dot />
      <span>View comment</span>
    </svelte:fragment>
  </CardCommentBase>
</div>
