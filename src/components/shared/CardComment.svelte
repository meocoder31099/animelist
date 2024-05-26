<script context="module" lang="ts">
  export interface CardCommnetProps {
    user: {
      id: number;
      name: string;
      avatar: string;
    };
    textContent?: Maybe<string>;
    content: AnilistMarkdownHTML;
    createdAt: number;
    id: number;
    isLiked?: Maybe<boolean>;
    isLocked?: Maybe<boolean>;
    isPinned?: Maybe<boolean>;
    isSubscribed?: Maybe<boolean>;
    likeCount: number;
    replyCount: number;
  }
</script>

<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  // import type { MarkdownChildrenComponents } from "@/utils/anilistMarkdownHtml";
  import type { AnilistMarkdownHTML } from "@/utils/anilistMarkdownHtml";

  // Import Libs
  // import { getContext } from "svelte";
  import { formatTimeAgo } from "@/utils";
  // import useCreateComponent from "@/hooks/useCreateComponent";
  // import { ANILIST_MARKDOWN_COMPONENTS, QUERY_CONTEXT_KEY } from "@/constants";

  // Import Components
  import Image from "@/components/shared/Image.svelte";
  import Dot from "@/components/shared/Dot.svelte";
  import UserAcvitityReplies from "@/components/features/user/UserAcvitityReplies.svelte";
  import MarkdownParse from "@/components/shared/MarkdownParse.svelte";

  export let source: CardCommnetProps;

  let isShowReplies: boolean = false;
  const timeAgo = formatTimeAgo(source.createdAt);
  const hasChildComments: boolean = !!source.replyCount;

  const likeCount = !!source.likeCount
    ? source.likeCount > 1
      ? `${source.likeCount} likes`
      : `${source.likeCount} like`
    : "";

  const replyCount = !!source.replyCount
    ? source.replyCount > 1
      ? `${source.replyCount} replies`
      : `${source.replyCount} reply`
    : "reply";

  const toggleShowReplies = () => {
    isShowReplies = !isShowReplies;
  };
</script>

<!-- bg-neutral-900 sm:border sm:border-neutral-800 sm:rounded-lg -->
<div
  class="flex flex-col gap-x-2.5 p-4 sm:border sm:border-neutral-800 sm:rounded-lg bg-neutral-900"
>
  <div class="flex gap-x-2.5">
    <!-- Col Left -->
    <!-- Avatar -->
    <div
      class="flex flex-shrink-0 flex-grow-0 basis-auto w-10 h-10 rounded-full overflow-hidden"
    >
      <Image src={source.user.avatar} />
    </div>

    <!-- Col Right -->
    <div class="w-full flex flex-col gap-y-1">
      <div class="flex justify-between">
        <!-- Name -->
        <div class="flex flex-col flex-wrap gap-x-1">
          <div class="inline font-bold">
            {source.user.name}
          </div>
          <span class="text-sm text-neutral-400">
            {timeAgo}
          </span>
        </div>
        <!-- More actions -->
        <button class="inline-flex flex-shrink-0 basis-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="w-6 h-6 sm:w-5 sm:h-5 fill-neutral-400"
            ><path
              d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            /></svg
          >
          <!-- <span class="text-xs font-bold">Report</span> -->
        </button>
      </div>
    </div>
  </div>

  <!-- class:comments-line={hasChildComments} -->
  <div class="relative mt-3">
    <!-- Content -->
    <div
      class="relative max-h-markdown text-0.95 leading-normal overflow-hidden"
    >
      <MarkdownParse markdown={source.content} />
      <div class="absolute inset-0 h-markdown pointer-events-none">
        <div
          class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background via-background/20"
        />
      </div>
    </div>

    <div
      class="mt-2.5 flex flex-wrap gap-x-4 gap-y-2 justify-between items-center"
    >
      <!-- Action -->
      <div class="flex flex-wrap gap-x-3 gap-y-2 items-center">
        <button
          class="inline-flex items-center action like bg-neutral-800/60 px-3 py-1 rounded-2xl"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="w-6 h-6 fill-current"
            ><g
              ><path
                d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
              /></g
            ></svg
          >
          <!-- <span class="text-xs">{source.likeCount}</span> -->
          <span class="ml-1 text-xs font-bold">{likeCount}</span>
        </button>
        <!-- <button class="inline-flex items-center action like">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="w-5 h-5 fill-current"
            ><g
              ><path
                d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
              /></g
            ></svg
          >
          <span class="text-xs">{source.likeCount}</span>
          <span class="text-xs font-bold">Like</span>
        </button> -->
        <button
          on:click={toggleShowReplies}
          class="inline-flex items-center action like bg-neutral-800/60 px-3 py-1 rounded-2xl"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="w-6 h-6 fill-current"
            ><g
              ><path
                d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
              /></g
            ></svg
          >
          <!-- <span class="text-xs">{source.likeCount}</span> -->
          <span class="ml-1 text-xs font-bold">{replyCount}</span>
        </button>
        <!-- <button on:click={toggleShowReplies} class="inline-flex items-center action reply">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="w-5 h-5 fill-current"
            ><g
              ><path
                d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
              /></g
            ></svg
          >
          <span class="text-xs font-bold">Reply</span>
        </button> -->
        <button
          class="inline-flex items-center action like bg-neutral-800/60 px-3 py-1 rounded-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="w-6 h-6 scale-95 -scale-x-100 fill-current"
            ><path
              d="M11 7.05V4a1 1 0 0 0-1-1 1 1 0 0 0-.7.29l-7 7a1 1 0 0 0 0 1.42l7 7A1 1 0 0 0 11 18v-3.1h.85a10.89 10.89 0 0 1 8.36 3.72 1 1 0 0 0 1.11.35A1 1 0 0 0 22 18c0-9.12-8.08-10.68-11-10.95zm.85 5.83a14.74 14.74 0 0 0-2 .13A1 1 0 0 0 9 14v1.59L4.42 11 9 6.41V8a1 1 0 0 0 1 1c.91 0 8.11.2 9.67 6.43a13.07 13.07 0 0 0-7.82-2.55z"
            /></svg
          >
          <!-- <span class="text-xs">{source.likeCount}</span> -->
          <span class="ml-1 text-xs font-bold">Share</span>
        </button>
        <!-- <button class="inline-flex items-center action share">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="w-5 h-5 scale-95 -scale-x-100 fill-current"
            ><path
              d="M11 7.05V4a1 1 0 0 0-1-1 1 1 0 0 0-.7.29l-7 7a1 1 0 0 0 0 1.42l7 7A1 1 0 0 0 11 18v-3.1h.85a10.89 10.89 0 0 1 8.36 3.72 1 1 0 0 0 1.11.35A1 1 0 0 0 22 18c0-9.12-8.08-10.68-11-10.95zm.85 5.83a14.74 14.74 0 0 0-2 .13A1 1 0 0 0 9 14v1.59L4.42 11 9 6.41V8a1 1 0 0 0 1 1c.91 0 8.11.2 9.67 6.43a13.07 13.07 0 0 0-7.82-2.55z"
            /></svg
          >
          <span class="text-xs font-bold">Share</span>
        </button> -->
      </div>
      <!-- <div class="flex items-center gap-x-1.5">
        {#if !!replyCount}
          <span class="text-neutral-400">{replyCount}</span>
          <Dot size="small" />
        {/if}
        {#if !!likeCount}
          <span class="text-neutral-400">{likeCount}</span>
        {/if}
      </div> -->
    </div>

    <!-- {#if !!replyCount || !!likeCount}
      <div class="mt-2 flex gap-x-2 items-center">
        {#if !!replyCount} -->
    <!-- btn_show-replies -->
    <!-- <button class="relative">
            <span class="text-sm text-neutral-400">{replyCount}</span>
          </button>
          <Dot size="small" />
        {/if}
        {#if !!likeCount}
          <button class="text-sm text-neutral-400">{likeCount}</button>
        {/if}
      </div>
    {/if} -->

    <!-- Replies -->
    {#if isShowReplies}
      <div class="mt-3">
        <UserAcvitityReplies
          activityId={source.id}
          replyCount={source.replyCount}
        />
      </div>
    {/if}
  </div>
</div>
<!-- 
<style lang="postcss">
  /* .comments-line::before {
    @apply content-['']
      absolute
      border-l-2
      border-y-0
      border-solid
      border-neutral-800
      top-5
      -left-[1.85rem]
      h-[calc(100%-3.5rem)];
  } */
  /* .btn_show-replies::after {
    @apply content-[''] absolute border-l-2 border-r-[0px] border-y-0 border-neutral-800 border-solid rounded-bl-xl border-b-2 -top-3.5 -left-[1.85rem] w-5 h-7;
  } */
</style> -->
