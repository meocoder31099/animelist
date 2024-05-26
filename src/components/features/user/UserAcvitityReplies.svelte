<script lang="ts">
  // Import Types
  import type { ActivityReply } from "@/types/anilistv2";
  import type { Maybe } from "@/types";
  import type { CardCommnetSmallProps } from "@/components/shared/CardCommentSmall.svelte";

  // Import Libs
  import { onMount } from "svelte";
  import usePageUserActivityReplies from "@/hooks/usePageUserActivityReplies";
  import { DEFAULT_AVATAR } from "@/constants";

  // Import Components
  import CommentSmallList from "@/components/shared/CommentSmallList.svelte";

  export let activityId: number;
  export let replyCount: number = 0;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let cardMessagesActivityProps: CardCommnetSmallProps[] = [];
  const pageUserActivity = usePageUserActivityReplies({
    args: {
      activityId: activityId,
    },
  });

  onMount(() => {
    const unPageUserActivity = pageUserActivity.subscribe((value) => {
      const pages = value.data?.pages;
      const firstPage = pages?.[0]?.activityReplies;
      if (!!firstPage && !value.isFetchingNextPage) {
        if (cardMessagesActivityProps.length) {
          const lastPageIndex = pages.length - 1;
          const edgesTemp = pages?.[lastPageIndex]?.activityReplies;
          if (edgesTemp) {
            cardMessagesActivityProps = cardMessagesActivityProps.concat(
              activityUnionToCardMediaActivityProps(edgesTemp)
            );
          }
        } else {
          for (const page of pages) {
            if (page?.activityReplies?.length) {
              const edgesTemp = page.activityReplies;
              const options = activityUnionToCardMediaActivityProps(edgesTemp);
              cardMessagesActivityProps =
                cardMessagesActivityProps.concat(options);
            }
          }
        }
      }

      // Update status
      isLoading = value.isLoading || value.isFetchingNextPage || false;
      fetchNextPage = value.fetchNextPage;
      hasNextPage = !!value.hasNextPage;
    });

    return () => {
      unPageUserActivity();
    };
  });

  const activityUnionToCardMediaActivityProps = (
    activityReplies: Maybe<ActivityReply>[]
  ): CardCommnetSmallProps[] => {
    const cardOptions: CardCommnetSmallProps[] = [];
    for (const activity of activityReplies) {
      if (!activity) continue;

      const userAvatar = activity.user?.avatar?.large || DEFAULT_AVATAR;
      const { id: userId = 0, name: userName = "" } = activity.user ?? {};
      const { createdAt, id, isLiked, likeCount, text: textContent } = activity;

      cardOptions.push({
        createdAt,
        id,
        isLiked,
        likeCount,
        textContent,
        user: {
          id: userId,
          avatar: userAvatar,
          name: userName,
        },
      });
    }
    return cardOptions;
  };
</script>

<CommentSmallList source={cardMessagesActivityProps} {isLoading} {replyCount} />
{#if !isLoading && hasNextPage}
  <button class="inline-flex items-end mt-3" on:click={fetchNextPage}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class="w-5 h-5 fill-current"
      ><path d="M14 13H8V5H6v9a1 1 0 0 0 1 1h7v3l5-4-5-4v3z" /></svg
    >
    <span class="font-semibold ml-2">Show more replies</span>
  </button>
{/if}
