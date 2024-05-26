<script lang="ts">
  // Import Types
  import type { Thread, ThreadCategory, Media } from "@/types/anilistv2";

  // Import Libs
  import { formatTimeAgo, createForumThreadDetailsUrl } from "@/utils";
  import { DEFAULT_AVATAR } from "@/constants";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let source: Thread;

  const href: string = createForumThreadDetailsUrl(source);
  const userAvatar = source.user?.avatar?.large ?? DEFAULT_AVATAR;
  const { name: userName = "?" } = source.user ?? {};
  const { title, replyCount, viewCount } = source;
  const timePostAgo = formatTimeAgo(source.createdAt);

  const isShowLastRepliedUser: boolean = !!source.replyCount;
  let repliedUserAvatar: string;
  let repliedUserName: string;
  let timeLastReply: string;
  if (isShowLastRepliedUser) {
    repliedUserAvatar = source.replyUser?.avatar?.large ?? DEFAULT_AVATAR;
    repliedUserName = source.replyUser?.name ?? "";
    timeLastReply = source.repliedAt ? formatTimeAgo(source.repliedAt) : "?";
  }

  const categories =
    (source.categories?.filter((category) => !!category) as ThreadCategory[]) ??
    null;
  let mediaCategories: { title: string }[] = [];
  for (const mediaCategory of source?.mediaCategories ?? []) {
    const userPreferred = mediaCategory?.title?.userPreferred;
    if (!userPreferred) continue;
    mediaCategories.push({ title: userPreferred });
  }
  (source?.mediaCategories?.filter(
    (mediaCategory) => !!mediaCategory
  ) as Media[]) ?? null;
</script>

<a {href} class="w-full h-full flex border border-neutral-800 px-6 py-5 rounded-lg">
  <!-- Descriptions -->
  <div class="w-full flex flex-col gap-y-3">
    <!-- Title -->
    <h2 class="font-medium">{title}</h2>
    <div class="grid md:grid-cols-2 gap-3">
      <div class="flex gap-2 items-center text-sm text-neutral-400">
        <!-- Avatar user -->
        <div class="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
          <Image src={userAvatar} />
        </div>
        <div class="text-sm">
          <!-- Username -->
          <div>{userName}</div>
          <div class="flex flex-wrap items-center gap-x-2">
            <!-- Time ago -->
            <span>{timePostAgo}</span>
            <!-- Comment count -->
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="w-3.5 h-3.5 fill-current"
                ><path
                  d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm-5 10.5A1.5 1.5 0 0 1 9.5 14c-.086 0-.168-.011-.25-.025-.083.01-.164.025-.25.025a2 2 0 1 1 2-2c0 .085-.015.167-.025.25.013.082.025.164.025.25zm4 1.5c-.086 0-.167-.015-.25-.025a1.471 1.471 0 0 1-.25.025 1.5 1.5 0 0 1-1.5-1.5c0-.085.012-.168.025-.25-.01-.083-.025-.164-.025-.25a2 2 0 1 1 2 2z"
                /></svg
              >
              <span class="ml-1">{replyCount}</span>
            </div>
            <!-- View Count -->
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="w-3.5 h-3.5 fill-current"
                ><path
                  d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"
                /><path
                  d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"
                /></svg
              >
              <span class="ml-1">{viewCount}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Replied Info -->
      {#if isShowLastRepliedUser}
        <div
          class="flex gap-2 items-center md:justify-end text-sm text-neutral-400"
        >
          <div
            class="text-right text-sm flex flex-wrap justify-end md:flex-col gap-x-1"
          >
            <!-- Replied Username -->
            <div>last replied by {repliedUserName}</div>
            <!-- Replied Time Ago -->
            <div>{timeLastReply}</div>
          </div>
          <!-- Avatar user -->
          <div
            class="flex-shrink-0 order-last w-8 h-8 rounded-full overflow-hidden"
          >
            <Image src={repliedUserAvatar} />
          </div>
        </div>
      {/if}
    </div>
    <!-- Categories -->
    <div class="mt-1 flex flex-wrap gap-2">
      {#if !!categories?.length}
        {#each categories as { name }}
          <span
            class="line-clamp-1 bg-neutral-800 text-xs px-2 py-0.5 rounded-lg"
            >{name}</span
          >
        {/each}
      {/if}

      {#each mediaCategories as { title }}
        <span class="line-clamp-1 bg-neutral-800 text-xs px-2 py-0.5 rounded-lg"
          >{title}</span
        >
      {/each}
    </div>
  </div>
</a>
