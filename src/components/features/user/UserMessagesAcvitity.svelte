<script lang="ts">
  // Import Types
  import {
    type ActivityUnion,
    type MessageActivity,
    ActivityType,
  } from "@/types/anilistv2";
  import type { Maybe } from "@/types";
  import type { CardCommnetProps } from "@/components/shared/CardComment.svelte";

  // Import Libs
  import { onMount } from "svelte";
  import usePageUserActivity from "@/hooks/usePageUserActivity";
  import { isBottomPage } from "@/utils";
  import useDebounce from "@/hooks/useDebounce";
  import { DEFAULT_AVATAR } from "@/constants";
  import anilistMarkdownHtml from "@/utils/anilistMarkdownHtml";

  // Import Components
  import CommentList from "@/components/shared/CommentList.svelte";

  export let userId: number;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let cardMediaActivityProps: CardCommnetProps[] = [];
  const pageUserActivity = usePageUserActivity({
    args: {
      userId: userId,
      type: ActivityType.Message,
    },
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
      const messageActivity = activity as MessageActivity;

      const userAvatar =
        messageActivity.messenger?.avatar?.large || DEFAULT_AVATAR;
      const { id: userId = 0, name: userName = "" } =
        messageActivity.messenger ?? {};
      const {
        createdAt,
        id,
        isLiked,
        isLocked,
        isSubscribed,
        likeCount,
        replyCount,
        message,
      } = messageActivity;

      cardOptions.push({
        createdAt,
        id,
        isLiked,
        isLocked,
        isSubscribed,
        likeCount,
        replyCount,
        content: anilistMarkdownHtml(message ?? ""),
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

<CommentList source={cardMediaActivityProps} {hasNextPage} {isLoading} />
