<script context="module" lang="ts">
  export interface CardMediaActivityProps extends Omit<ListActivity, "media"> {
    media: {
      id: number;
      image: string;
      name: string;
      href: string;
      bannerImage?: string;
    };
  }
</script>

<script lang="ts">
  // Import Types
  import type { ListActivity } from "@/types/anilistv2";

  // Import Libs
  import { formatTimeAgo } from "@/utils";

  // Import Actions
  import onMediaDetailsModal from "@/use-actions/onMediaDetailsModal";

  // Import Components
  import Image from "@/components/shared/Image.svelte";
  import Dot from "@/components/shared/Dot.svelte";
  import UserAcvitityReplies from "@/components/features/user/UserAcvitityReplies.svelte";

  export let source: CardMediaActivityProps;

  let isFullWidth: boolean = false;
  let isShowReplies: boolean = false;
  const timeAgo = formatTimeAgo(source.createdAt);
  const status: string =
    source.status?.replace(/^\w/, (c) => c.toUpperCase()) ?? "";
  const progress = `${status}${
    source.progress ? ` ${source.progress} of` : ""
  }`;

  const toggleFullWidth = () => {
    isFullWidth = !isFullWidth;
    isShowReplies = !isShowReplies;
  };
</script>

<li class="flex flex-col bg-neutral-900 p-3 rounded-lg overflow-hidden" class:col-span-full={isFullWidth}>
  <div class="flex gap-4">
    <!-- Cover Image -->
    <div class="w-16 shrink-0">
      <div class="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden">
        <a
          href={source.media.href}
          class="w-full h-full"
          use:onMediaDetailsModal={source.media}
        >
          <Image src={source.media.image} />
        </a>
      </div>
    </div>
    <!-- details -->
    <div class="w-full flex flex-col gap-y-1 justify-evenly">
      <!-- created at -->
      <div class="text-neutral-400 time text-sm">{timeAgo}</div>
      <!-- content -->
      <div class="line-clamp-2">
        <a href={source.media.href} use:onMediaDetailsModal={source.media}>
          {progress} <span class="font-semibold">{source.media.name}</span>
        </a>
      </div>
      <!-- action -->
      <div class="flex items-center gap-x-2 text-sm">
        <div class="action like"><span>{source.likeCount}</span> Like</div>
        <Dot />
        <button class="action reply" on:click={toggleFullWidth}
          ><span>{source.replyCount}</span> Reply</button
        >
        <Dot />
        <div class="flex items-center gap-x-1 action extras-dropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="w-4 h-4 fill-neutral-400"
            ><path
              d="m5.705 3.71-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"
            /></svg
          >
        </div>
        <Dot />
        <div class="flex items-center gap-x-1 action extras-dropdown">
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
        </div>
      </div>
    </div>
  </div>
  <!-- replies -->
  {#if isShowReplies && !!source.replyCount}
    <div class="ml-20 mt-4">
      <UserAcvitityReplies
        activityId={source.id}
        replyCount={source.replyCount}
      />
    </div>
  {/if}
</li>
