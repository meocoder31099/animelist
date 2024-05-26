<script lang="ts">
  // Import Types
  import type { PageData } from "./$types";
  import type { CharacterEdge } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import { debounce, isBottomPage } from "@/utils";
  import useMediaCharactersPageDetails from "@/hooks/useMediaCharactersPageDetails";

  // Import Components
  import Characters from "@/components/DetailsPage/Characters.svelte";

  export let data: PageData;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let edges: CharacterEdge[] = [];
  const PageData = useMediaCharactersPageDetails({
    args: {
      id: data.Id,
    },
  });

  const pageData_unsubscribe = PageData.subscribe((value) => {
    const pages = value.data?.pages;
    const firstPage = pages?.[0];
    if (!!firstPage && !value.isFetchingNextPage) {
      // Add media to edges
      if (edges.length) {
        const lastPageIndex = pages.length - 1;
        const edge = pages?.[lastPageIndex]?.edges;
        if (edge) edges = edges.concat(edge);
      } else {
        for (const page of pages) {
          if (page?.edges) {
            edges = edges.concat(page.edges);
          }
        }
      }
    }

    isLoading = value.isLoading || value.isFetchingNextPage || false;
    fetchNextPage = value.fetchNextPage;
    hasNextPage = !!value.hasNextPage;
  });

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      pageData_unsubscribe();
    };
  });

  const handleScroll = debounce(() => {
    if (isBottomPage() && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, 100);
</script>

<!-- Characters -->
<Characters
  {isLoading}
  isSuccess={!!edges.length}
  {hasNextPage}
  source={edges}
/>
