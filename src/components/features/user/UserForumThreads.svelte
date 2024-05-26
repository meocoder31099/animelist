<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { Thread } from "@/types/anilistv2";

  // Import Libs
  import { onMount } from "svelte";
  import usePageForumThreads from "@/hooks/usePageForumThreads";
  import { isBottomPage } from "@/utils";
  import useDebounce from "@/hooks/useDebounce";
  import { DEFAULT_AVATAR } from "@/constants";

  // Import Components
  import ForumThreadsList from "@/components/shared/ForumThreadsList.svelte";

  export let userId: number;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let pagesData: Thread[][] = [];
  const pageUserActivity = usePageForumThreads({
    args: {
      userId: userId,
    },
  });

  onMount(() => {
    const unPageUserActivity = pageUserActivity.subscribe((value) => {
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

  const handleScroll = useDebounce(() => {
    if (isBottomPage() && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, 100);
</script>

<ForumThreadsList pages={pagesData} {hasNextPage} {isLoading} />
