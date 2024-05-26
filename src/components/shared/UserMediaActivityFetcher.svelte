<script lang="ts">
  // Import Types
  import {
    type ActivityUnion,
    type ListActivity,
    ActivityType,
    ActivitySort,
  } from "@/types/anilistv2";
  import type { Maybe } from "@/types";
  import type { ComponentProps } from "svelte";

  // Import Libs
  import { onMount } from "svelte";
  import usePageUserActivity from "@/hooks/usePageUserActivity";
  import { DEFAULT_MEDIA_COVER_IMAGE, DEFAULT_AVATAR } from "@/constants";

  // Import Components
  import UserMediaActivityList from "@/components/shared/UserMediaActivityList.svelte";

  export let isResultsMessageVisible: boolean = true;

  let pagesData: any = [];
  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;

  const pageUserActivity = usePageUserActivity({
    args: {
      type_in: [ActivityType.AnimeList, ActivityType.MangaList],
      sort: [ActivitySort.IdDesc],
    },
  });

  onMount(() => {
    const unPageUserActivity = pageUserActivity.subscribe((value) => {
      const pages = value.data?.pages;
      const firstPage = pages?.[0]?.activities;
      if (!!firstPage && !value.isFetchingNextPage) {
        if (pagesData.length) {
          const lastPageIndex = pages.length - 1;
          const edgesTemp = pages?.[lastPageIndex]?.activities;
          if (edgesTemp) {
            //   cardMediaActivityProps = cardMediaActivityProps.concat(
            //     activityUnionToCardMediaActivityProps(edgesTemp)
            //   );
            // createCardUserMediaActivityProps(edgesTemp);
          }
        } else {
          for (const page of pages) {
            if (page?.activities?.length) {
              const edgesTemp = page.activities;
              const options = createCardUserMediaActivityProps(edgesTemp);
              //   console.log(options);
              pagesData.push(options);
              console.log(pagesData);
            }
          }
          pagesData = pagesData;
        }
      }

      // Update status
      isLoading = value.isLoading || value.isFetchingNextPage || false;
      fetchNextPage = value.fetchNextPage;
      hasNextPage = !!value.hasNextPage;
      //   !hasNextPage && window.removeEventListener("scroll", handleScroll);
    });

    // window.addEventListener("scroll", handleScroll);
    return () => {
      unPageUserActivity();
      //   window.removeEventListener("scroll", handleScroll);
    };
  });

  const createCardUserMediaActivityProps = (
    page: Maybe<ActivityUnion>[]
  ): ComponentProps<UserMediaActivityList>["pages"][0] => {
    const cardProps: ComponentProps<UserMediaActivityList>["pages"][0] = [];
    for (let activity of page) {
      if (!activity) continue;
      const mediaData = (activity as ListActivity)?.media;
      const userData = (activity as ListActivity)?.user;

      const mediaCoverImage: string =
        mediaData?.coverImage?.large ?? DEFAULT_MEDIA_COVER_IMAGE;
      const userAvatar: string = userData?.avatar?.large ?? DEFAULT_AVATAR;

      cardProps.push({
        mediaCoverImage,
        userAvatar,
      });
    }
    return cardProps;
  };
</script>

<UserMediaActivityList
  {hasNextPage}
  {isLoading}
  pages={pagesData}
  {isResultsMessageVisible}
/>
