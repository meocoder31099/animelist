<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { AnilistMarkdownHTML } from "@/utils/anilistMarkdownHtml";
  import type { ComponentProps } from "svelte";
  type CardCommentChildProps = ComponentProps<CardCommentChild>;

  // Import Libs
  import { formatTimeAgo } from "@/utils";

  // Import Components
  import Image from "@/components/shared/Image.svelte";
  import MarkdownParse from "@/components/shared/MarkdownParse.svelte";
  import CardCommentChild from "@/components/shared/CardCommentChild.svelte";

  export let userAvatar: string;
  export let userName: string;
  export let body: AnilistMarkdownHTML;
  export let createdAt: number;
  export let likeCount: number;
  export let isLocked: boolean;
  export let childComments: Maybe<CardCommentChildProps[]>;

  const timeAgo = formatTimeAgo(createdAt);
  const hasChildComments: boolean = !!childComments?.length;
  let isShowChildComment: boolean = true;

  const toggleShowComment = (event: MouseEvent): void => {
    isShowChildComment = !isShowChildComment;
  };
</script>

<div class="relative flex flex-col gap-y-1 px-2 sm:px-0 py-2.5 overflow-x-auto">
  <!-- Comment Header -->
  <div class="flex flex-wrap items-center gap-x-2">
    <!-- User Avatar -->
    <div
      class="flex flex-shrink-0 flex-grow-0 basis-auto w-8 h-8 rounded-full overflow-hidden"
    >
      <Image src={userAvatar} />
    </div>
    <!-- User Name -->
    <span class="inline font-medium text-sm">{userName}</span>
    <span class="text-neutral-400 text-sm">{timeAgo}</span>
  </div>
  <!-- Comment Body -->
  <div class="relative pl-9" class:comments-line={hasChildComments}>
    <!-- Comment Content -->
    <div class="-mt-1 text-0.95">
      <MarkdownParse markdown={body} />
    </div>

    <!-- Actions -->
    <div class="relative pt-1 flex gap-x-3 text-neutral-400 text-xs">
      {#if hasChildComments}
        <button
          on:click|stopPropagation={toggleShowComment}
          class="absolute top-1.5 -left-[1.675rem] ml-0.5 w-3 h-3 inline-flex items-center justify-center border border-white text-white bg-background rounded-full action toggle-replies"
        >
          {#if isShowChildComment}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="w-full h-full fill-current"><path d="M5 11h14v2H5z" /></svg
            >{:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="w-full h-full fill-current"
              ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg
            >
          {/if}
        </button>
      {/if}
      <button class="inline-flex items-center gap-x-1 action like">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5 fill-current"
          ><g
            ><path
              d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
            /></g
          ></svg
        >
        <span>{likeCount}</span>
      </button>
      {#if !isLocked}
        <button class="inline-flex items-center gap-x-1 action reply font-bold">
          <span>Reply</span>
        </button>
      {/if}
      <button class="inline-flex items-center gap-x-1 action report font-bold">
        <span>Report</span>
      </button>
    </div>
  </div>

  <!-- Children Comments -->
  {#if isShowChildComment && !!childComments && childComments.length}
    {#each childComments as childComment}
      <div class="relative w-full pl-6 pt-4 child-comments-line">
        <CardCommentChild {...childComment} />
      </div>
    {/each}
  {/if}
</div>

<style lang="postcss">
  .comments-line::before {
    @apply content-['']
      absolute
      border-l-2
      border-y-0
      border-solid
      border-neutral-800
      top-0 
      left-4
      h-[calc(100%-1.25rem)];
  }
  .child-comments-line::before {
    @apply content-[''] last:hidden absolute border-l-2 border-y-0 border-solid border-neutral-800 top-0 left-4 h-full;
  }
  .child-comments-line::after {
    @apply content-[''] absolute border-l-2 border-r-[0px] border-y-0 border-neutral-800 border-solid rounded-bl-xl border-b-2 -top-[0.475rem] left-4 w-3.5 h-10;
  }
</style>
