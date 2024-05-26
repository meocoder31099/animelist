<script lang="ts">
  // Import Types
  import {
    type ActivityUnion,
    type TextActivity,
    ActivityType,
    type QueryActivityArgs,
    ActivitySort,
  } from "@/types/anilistv2";
  import type { PageArgs } from "@/types/anilist";
  import type { Maybe } from "@/types";
  import type { CardCommnetProps } from "@/components/shared/CardComment.svelte";
  import { ThreadSort } from "@/types/anilistv2";
  import type { ComponentProps } from "svelte";
  type browseTypeItems = { title: string };
  type browseTypes = Record<string, browseTypeItems>;

  // Import Libs
  import { onMount } from "svelte";
  import usePageUserActivity from "@/hooks/usePageUserActivity";
  import { isBottomPage } from "@/utils";
  import useDebounce from "@/hooks/useDebounce";
  import { DEFAULT_AVATAR } from "@/constants";
  import anilistMarkdownHtml from "@/utils/anilistMarkdownHtml";
  import useDetectMobile from "@/hooks/useDetectMobile";

  // Import Actions
  import onStickySidebar from "@/use-actions/onStickySidebar";

  // Import Stores
  import { footerLinks } from "@/stores/DetailDataStore";

  // Import Components
  import UserMediaActivityFetcher from "@/components/shared/UserMediaActivityFetcher.svelte";
  import UserMediaActivityFetcherLogic from "@/components/renderless/UserMediaActivityFetcherLogic.svelte";
  import UserMediaActivityHorizontalScrollList from "@/components/shared/UserMediaActivityHorizontalScrollList.svelte";
  import Image from "@/components/shared/Image.svelte";
  import CommentList from "@/components/shared/CommentList.svelte";
  import ForumThreadFetcher from "@/components/shared/ForumThreadFetcher.svelte";
  import ReviewFetcher from "@/components/shared/ReviewFetcher.svelte";

  const listProgressArgs: PageArgs & QueryActivityArgs = {
    type_in: [ActivityType.AnimeList, ActivityType.MangaList],
    sort: [ActivitySort.IdDesc],
    hasReplies: true,
  };

  const forumArgs = {
    sort: [ThreadSort.RepliedAtDesc],
    perPage: 8,
  };
  const reviewArgs = {
    perPage: 4,
  };
  let isMoblie: boolean = true;
  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let cardMediaActivityProps: CardCommnetProps[] = [];
  const currentTimestamp = Math.floor(Date.now() / 1000 - 10);
  const pageUserActivity = usePageUserActivity({
    args: {
      type: ActivityType.Text,
      createdAt_lesser: currentTimestamp,
    },
  });

  useDetectMobile((value) => {
    isMoblie = value;
  });

  onMount(() => {
    const unPageUserActivity = pageUserActivity.subscribe((value) => {
      const pages = value.data?.pages;
      const firstPage = pages?.[0]?.activities;
      if (!!firstPage && !value.isFetchingNextPage) {
        if (cardMediaActivityProps.length) {
          const lastPageIndex = pages.length - 1;
          const edgesTemp = pages?.[lastPageIndex]?.activities;
          if (edgesTemp) {
            cardMediaActivityProps = cardMediaActivityProps.concat(
              activityUnionToCardMediaActivityProps(edgesTemp)
            );
          }
        } else {
          for (const page of pages) {
            if (page?.activities?.length) {
              const edgesTemp = page.activities;
              const options = activityUnionToCardMediaActivityProps(edgesTemp);
              cardMediaActivityProps = cardMediaActivityProps.concat(options);
            }
          }
        }
      }

      // Update status
      isLoading = value.isLoading || value.isFetchingNextPage || false;
      fetchNextPage = value.fetchNextPage;
      hasNextPage = !!value.hasNextPage;
      !hasNextPage && window.removeEventListener("scroll", handleScroll);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      unPageUserActivity();
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const activityUnionToCardMediaActivityProps = (
    activities: Maybe<ActivityUnion>[]
  ): CardCommnetProps[] => {
    const cardOptions: CardCommnetProps[] = [];
    for (const activity of activities) {
      if (!activity) continue;
      const textActivity = activity as TextActivity;

      const userAvatar = textActivity.user?.avatar?.large || DEFAULT_AVATAR;
      const { id: userId = 0, name: userName = "" } = textActivity.user ?? {};
      const {
        createdAt,
        id,
        isLiked,
        isLocked,
        isPinned,
        isSubscribed,
        likeCount,
        replyCount,
        text,
      } = textActivity;

      cardOptions.push({
        createdAt,
        id,
        isLiked,
        isLocked,
        isPinned,
        isSubscribed,
        likeCount,
        replyCount,
        content: anilistMarkdownHtml(text ?? ""),
        user: {
          id: userId,
          avatar: userAvatar,
          name: userName,
        },
      });
    }
    return cardOptions;
  };

  const handleScroll = useDebounce(() => {
    if (isBottomPage() && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, 100);
</script>

<div
  class="max-w-details w-full flex gap-y-4 gap-x-8 mx-auto mt-20 sm:px-6 md:px-9 lg:px-1 2xl:px-9"
>
  <!-- Left Col -->
  {#if !isMoblie && false}
    <div class="w-60 flex flex-shrink-0 basis-auto relative">
      <div class="fixed bottom-6 top-20 w-60 flex flex-col justify-between">
        <!-- Main menu -->
        <ul class="flex flex-col gap-y-8">
          <li class="flex items-center gap-x-4 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="w-7 h-7 fill-current"
              ><path
                d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm9-8.586 6 6V15l.001 5H6v-9.585l6-6.001z"
              /><path
                d="M12 17c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"
              /></svg
            >
            <span>Home</span>
          </li>
          <li class="flex items-center gap-x-4 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="w-7 h-7 fill-current"
              ><path
                d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"
              /><path
                d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm1.5 7H8c-3.309 0-6 2.691-6 6v1h2v-1c0-2.206 1.794-4 4-4h3c2.206 0 4 1.794 4 4v1h2v-1c0-3.309-2.691-6-6-6z"
              /></svg
            >
            <span>Forum</span>
          </li>
          <li class="flex items-center gap-x-4 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="w-7 h-7 fill-current"
              ><path
                d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z"
              /><path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" /></svg
            >
            <span>Reviews</span>
          </li>
          <li class="flex items-center gap-x-4 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="w-7 h-7 fill-current"
              ><path
                d="M20 3H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h7v3H8v2h8v-2h-3v-3h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 15V5h16l.001 10H4z"
              /><path d="m10 13 5-3-5-3z" /></svg
            >
            <span>Anime</span>
          </li>
          <li class="flex items-center gap-x-4 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="w-7 h-7 fill-current"
              ><path
                d="M20 6h-5.586l2.293-2.293-1.414-1.414L12 5.586 8.707 2.293 7.293 3.707 9.586 6H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zM4 19V8h16l.002 11H4z"
              /></svg
            >
            <span>Airing schedule</span>
          </li>
          <li class="flex items-center gap-x-4 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="w-7 h-7 fill-current"
              ><path
                d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h7v14H4zm9 0V5h7l.001 14H13z"
              /><path d="M15 7h3v2h-3zm0 4h3v2h-3z" /></svg
            >
            <span>Manga</span>
          </li>
        </ul>
        <!-- User Profile -->
        <div class="p-3 bg-neutral-900 border border-neutral-700 rounded-2xl">
          <div class="flex items-center gap-x-4">
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="https://s4.anilist.co/file/anilistcdn/user/avatar/large/b5992960-sZpjmQh37lKc.jpg"
              />
            </div>
            <div>
              <span class="font-bold text-0.95">dangvinhprovn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  <!-- Center Col -->
  <div class="max-w-3xl w-full min-h-screen flex flex-col xl:flex-shrink-0">
    <!-- Feed Select -->
    <!-- <div class="flex justify-between items-center px-3 py-2 border-b border-neutral-800">
      <div>
        <span class="mr-2 font-bold px-3 py-2 bg-white text-black rounded-lg"
          >Global</span
        >
        <span class="px-3 py-2">Following</span>
      </div>
      <button
        class="inline-flex items-center font-bold px-3 py-2 bg-white text-black rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="w-6 h-6 fill-current"
          ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg
        >
        <span class="ml-1">Create</span>
      </button>
    </div> -->

    <!-- List Progress -->
    <!-- <div class="mb-2 sm:mb-4 pt-3 overflow-hidden">
      <UserMediaActivityFetcherLogic
        args={listProgressArgs}
        let:hasNextPage
        let:data
        let:isLoading
        let:fetchNextPage
      >
        <UserMediaActivityHorizontalScrollList
          {hasNextPage}
          pages={data}
          {isLoading}
        >
          <li
            slot="container-end"
            class="flex-shrink-0 w-[28%] md:w-1/6 first:ml-4 last:mr-4"
            class:hidden={isLoading || !hasNextPage}
          >
            <div class="aspect-w-4 aspect-h-7 bg-neutral-800 rounded-lg">
              <button
                on:click={fetchNextPage}
                class="flex justify-center items-center text-center p-4"
              >
                <span class="font-bold">Bấm vào để xem nhiều hơn</span>
              </button>
            </div>
          </li>
        </UserMediaActivityHorizontalScrollList>
      </UserMediaActivityFetcherLogic>
    </div> -->

    <!-- List Status -->
    <!-- border-x border-neutral-800 -->
    <div class="overflow-hidden">
      <CommentList source={cardMediaActivityProps} {hasNextPage} {isLoading} />
    </div>
  </div>
  <!-- Right Col -->
  {#if !isMoblie}
    <div class="w-full max-w-xl flex flex-shrink-0 basis-auto relative">
      <div
        class="flex flex-col gap-y-4"
        use:onStickySidebar={{ topSpacing: "4rem" }}
      >
        <div>
          <h3 class="mb-2 pl-2">Forum Activity</h3>
          <ForumThreadFetcher args={forumArgs} isInfiniteScroll={false} />
        </div>
        <!-- <div class="mt-2">
          <h3 class="font-bold mb-2 pl-2">Recent Reviews</h3>
          <ReviewFetcher
            args={reviewArgs}
            isInfiniteScroll={false}
            gridColsAndGap="grid-cols-1 gap-x-2 gap-y-4"
          />
        </div> -->
        <div class="border border-neutral-800 p-4 rounded-lg mb-6">
          <div class="flex flex-wrap gap-x-4 gap-y-2 text-neutral-400 text-sm">
            {#each footerLinks as { title, path }}
              <a href={path}>{title}</a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
