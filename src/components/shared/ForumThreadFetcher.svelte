<script lang="ts">
  // Import Types
  import type { BrowseOptions as ForumThreadRecentOptions } from "@/components/features/forum/RecentThreadBrowseList.svelte";
  import type { BrowseOptions as ForumThreadNewOptions } from "@/components/features/forum/NewThreadBrowseList.svelte";
  import type { BrowseOptions as ForumThreadSubscribedOptions } from "@/components/features/forum/SubscribedThreadBrowseList.svelte";
  import type { Thread } from "@/types/anilistv2";

  // Import Libs
  import { onMount } from "svelte";
  import usePageForumThreads from "@/hooks/usePageForumThreads";
  import useDebounce from "@/hooks/useDebounce";
  import { isBottomPage } from "@/utils";

  // Import Components
  import ForumThreadsList from "@/components/shared/ForumThreadsList.svelte";

  export let args:
    | ForumThreadRecentOptions
    | ForumThreadNewOptions
    | ForumThreadSubscribedOptions;
  export let isInfiniteScroll: boolean = true;

  let pagesData: Thread[][] = [];
  let isLoading: boolean = true;
  // If
  let hasNextPage: boolean = isInfiniteScroll;
  let fetchNextPage: () => void;

  const pageData = usePageForumThreads({
    args,
  });

  onMount(() => {
    const unsubscribePageData = pageData.subscribe((value) => {
      const pages = value.data?.pages;
      const firstPage = pages?.[0]?.threads;
      if (!!firstPage && !value.isFetchingNextPage) {
        if (pagesData.length) {
          const lastPageIndex = pages.length - 1;
          const edgesTemp = pages?.[lastPageIndex]?.threads?.filter(
            (thread) => !!thread
          ) as Thread[];
          if (edgesTemp) {
            pagesData.push(edgesTemp);
            // Assign the value of pagesData to itself to notify Svelte that it has been updated, otherwise Svelte will not be able to detect the change.
            pagesData = pagesData;
          }
        } else {
          for (const page of pages) {
            if (page?.threads?.length) {
              const edgesTemp = page.threads?.filter(
                (thread) => !!thread
              ) as Thread[];
              pagesData.push(edgesTemp);
            }
          }
          // Assign the value of pagesData to itself to notify Svelte that it has been updated, otherwise Svelte will not be able to detect the change.
          pagesData = pagesData;
        }
      }

      // Update status
      isLoading = value.isLoading || value.isFetchingNextPage || false;

      // If 'isInfiniteScroll' is false then exit early, no need to check and next page not because it is not needed.
      if (!isInfiniteScroll) return;
      fetchNextPage = value.fetchNextPage;
      hasNextPage = !!value.hasNextPage;
      !hasNextPage && window.removeEventListener("scroll", handleScroll);
    });

    if (isInfiniteScroll) window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribePageData();
    };
  });

  const handleScroll = useDebounce(() => {
    if (isBottomPage() && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, 100);
</script>

<ForumThreadsList
  pages={pagesData}
  {hasNextPage}
  {isLoading}
  isResultsMessageVisible={isInfiniteScroll}
/>
