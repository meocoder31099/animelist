<script lang="ts">
  // Import Types
  import type { PageData } from "./$types";
  import type { UsePageForumThreadCommentsArgs } from "@/hooks/usePageForumThreadComments";

  // Import Libs
  import { onMount } from "svelte";
  import useForumThreadDetails from "@/hooks/useForumThreadDetails";
  import { formatTimeAgo } from "@/utils";
  import { DEFAULT_AVATAR } from "@/constants";

  // Import Components
  import MarkdownParse from "@/components/shared/MarkdownParse.svelte";
  import Image from "@/components/shared/Image.svelte";
  import MarkdownEditor from "@/components/shared/MarkdownEditor.svelte";
  import ForumThreadCommentsFetcher from "@/components/features/forum/thread/ForumThreadCommentsFetcher.svelte";

  export let data: PageData;

  const threadId: number = parseInt(data.threadId);

  let isReady: boolean = false;
  let userAvatar: string;
  let userName: string;
  let createdAgo: string;
  let threadTitle: string;
  let threadContent: string;
  let threadCategories: { name: string }[] = [];
  let mediaCategories: { title: string }[] = [];
  let replyCount: string;
  let likeCount: number;
  let isSubscribed: boolean;
  const threadDetails = useForumThreadDetails({
    args: {
      id: threadId,
    },
  });

  const forumThreadCommentsArgs: UsePageForumThreadCommentsArgs = {
    threadId: threadId,
  };

  onMount(() => {
    const unThreadDetailsStore = threadDetails.subscribe(({ data }) => {
      if (!!data) {
        userAvatar = data.user?.avatar?.large ?? DEFAULT_AVATAR;
        userName = data.user?.name ?? "";
        createdAgo = formatTimeAgo(data.createdAt);
        threadTitle = data.title ?? "";
        threadContent = data.body ?? "";

        for (const category of data?.categories ?? []) {
          if (!category?.name) continue;
          threadCategories.push({
            name: category.name,
          });
        }
        for (const media of data?.mediaCategories ?? []) {
          if (!media?.title?.userPreferred) continue;
          mediaCategories.push({
            title: media.title.userPreferred,
          });
        }

        replyCount = data.replyCount?.toLocaleString("en-US") ?? '0';
        likeCount = data.likeCount ?? 0;
        isSubscribed = !!data.isSubscribed;

        isReady = true;
      }
    });

    return () => {
      unThreadDetailsStore();
    };
  });
</script>

{#if !!isReady}
  <div
    class="max-w-details w-full flex flex-col justify-center items-center gap-x-6 gap-y-4 mx-auto mt-16 sm:mt-20 sm:px-6 md:px-9 lg:px-1 2xl:px-9"
  >
    <!-- Thread Details -->
    <div class="max-w-6xl w-full px-3 py-2 sm:px-2">
      <!-- Review Header -->
      <div class="flex items-center gap-x-2 mb-2">
        <!-- User Avatar -->
        <div class="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
          <Image src={userAvatar} />
        </div>
        <div class="w-full flex flex-wrap gap-x-2 justify-between">
          <!-- User Name -->
          <div class="font-bold">
            {userName}
          </div>
          <!-- Review Create At -->
          <div>{createdAgo}</div>
        </div>
      </div>
      <h1 class="text-white font-bold text-xl md:text-3xl mb-4">
        {threadTitle}
      </h1>
      <MarkdownParse markdown={threadContent} />
      <!-- Tag -->
      <div class="flex flex-wrap gap-x-3 gap-y-2 mt-6">
        {#each threadCategories as { name }}
          <span class="line-clamp-1 bg-neutral-800 text-sm px-2 py-1 rounded-lg"
            >{name}</span
          >
        {/each}
        {#each mediaCategories as { title }}
          <span class="line-clamp-1 bg-neutral-800 text-sm px-2 py-1 rounded-lg"
            >{title}</span
          >
        {/each}
      </div>
      <!-- Action -->
      <div
        class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-neutral-400"
      >
        <button class="inline-flex items-center gap-x-2 action like">
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
          <span class="font-medium">{likeCount}</span>
        </button>
        <button class="inline-flex items-center gap-x-2 action subscribe">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="w-5 h-5 scale-95 fill-current"
            ><path
              d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"
            /></svg
          >
          <span class="font-medium">Subscribe</span>
        </button>
        <button class="inline-flex items-center gap-x-2 action dropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="w-5 h-5 fill-current"
            ><path
              d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            /></svg
          >
        </button>
      </div>
      <div class="w-full flex items-center mt-2">
        <hr class="w-full h-px border-neutral-800" />
        <span
          class="ml-1.5 flex flex-shrink-0 flex-grow-0 basis-auto text-sm font-bold"
          >{replyCount} comments</span
        >
      </div>
    </div>

    <!-- Create Comment -->
    <div class="max-w-6xl w-full fixed sm:relative bottom-0 z-50">
      <div
        class="p-2 sm:p-0 bg-background border-t border-neutral-800 sm:border-none sm:rounded-lg"
      >
        <MarkdownEditor />
      </div>
    </div>

    <!-- Thread Comments -->
    <div class="max-w-6xl w-full">
      <ForumThreadCommentsFetcher args={forumThreadCommentsArgs} />
    </div>
  </div>
{/if}
