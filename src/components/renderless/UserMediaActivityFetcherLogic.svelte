<script lang="ts">
  // Import Types
  import type {
    ActivityUnion,
    ListActivity,
    QueryActivityArgs,
  } from "@/types/anilistv2";
  import type { PageArgs } from "@/types/anilist";
  import type { Maybe } from "@/types";
  import type { ComponentProps } from "svelte";
  import type UserMediaActivityList from "@/components/shared/UserMediaActivityList.svelte";
  type DataProps = ComponentProps<UserMediaActivityList>["pages"][0][0];

  // Import Libs
  import { onMount } from "svelte";
  import usePageUserActivity from "@/hooks/usePageUserActivity";
  import { DEFAULT_MEDIA_COVER_IMAGE, DEFAULT_AVATAR } from "@/constants";

  export let args: PageArgs & QueryActivityArgs;

  let pagesData: DataProps[][] = [];
  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;

  const pageUserActivity = usePageUserActivity({
    args,
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
            const options = createCardUserMediaActivityProps(edgesTemp);
            pagesData.push(options);
            pagesData = pagesData;
          }
        } else {
          for (const page of pages) {
            if (page?.activities?.length) {
              const edgesTemp = page.activities;
              const options = createCardUserMediaActivityProps(edgesTemp);
              pagesData.push(options);
            }
          }
          pagesData = pagesData;
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

  const createCardUserMediaActivityProps = (
    page: Maybe<ActivityUnion>[]
  ): DataProps[] => {
    const cardProps: DataProps[] = [];
    for (let activity of page) {
      if (!activity) continue;
      const mediaData = (activity as ListActivity)?.media;
      const userData = (activity as ListActivity)?.user;
      // Media data
      const mediaCoverImage: string =
        mediaData?.coverImage?.large ?? DEFAULT_MEDIA_COVER_IMAGE;
      // User data
      const userAvatar: string = userData?.avatar?.large ?? DEFAULT_AVATAR;
      const { name: userName } = userData ?? { name: "" };
      const { status, progress } = (activity as ListActivity) ?? {
        status: "",
        progress: "",
      };

      cardProps.push({
        mediaCoverImage,
        userAvatar,
        userName,
        status: status ?? "",
        progress: progress ?? "",
      });
    }
    return cardProps;
  };
</script>

<slot {hasNextPage} {isLoading} data={pagesData} {fetchNextPage} />

<!-- <UserMediaActivityList
    {hasNextPage}
    {isLoading}
    pages={pagesData}
    {isResultsMessageVisible}
  /> -->
