<script lang="ts">
  // Import Types
  import {
    type ActivityUnion,
    type ListActivity,
    ActivityType,
  } from "@/types/anilistv2";
  import type { Maybe } from "@/types";
  import type { CardMediaActivityProps } from "@/components/shared/CardMediaActivity.svelte";

  // Import Libs
  import { onMount } from "svelte";
  import usePageUserActivity from "@/hooks/usePageUserActivity";
  import { createMediaDetailsUrl, isBottomPage } from "@/utils";
  import useDebounce from "@/hooks/useDebounce";

  // Import Components
  import MediaActivityList from "@/components/shared/MediaActivityList.svelte";

  export let userId: number;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let cardMediaActivityProps: CardMediaActivityProps[] = [];
  const pageUserActivity = usePageUserActivity({
    args: {
      userId: userId,
      type: ActivityType.MediaList,
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
  ): CardMediaActivityProps[] => {
    const cardOptions: CardMediaActivityProps[] = [];
    for (const activity of activities) {
      if (!activity) continue;
      const mediaData = (activity as ListActivity)?.media;
      if (!mediaData) continue;

      const { id, title, coverImage, bannerImage } = mediaData || {};
      const media = {
        id,
        name: title?.userPreferred ?? "",
        image: coverImage?.large ?? "",
        bannerImage: bannerImage ?? "",
        href: createMediaDetailsUrl(mediaData),
      };
      cardOptions.push({
        ...activity,
        media,
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

<MediaActivityList source={cardMediaActivityProps} {hasNextPage} {isLoading} />
