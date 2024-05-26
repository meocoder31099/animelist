<script lang="ts">
  // Import Type
  import type { Maybe } from "@/types";
  import type { Page } from "@/types/anilist";

  // Import Enum
  import { AiringSort } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import { debounce, isBottomPage } from "@/utils";
  import useAiringSchedules from "@/hooks/useAiringSchedules";

  // Import Components
  import TimelineCardSkeleton from "@/components/skeletons/TimelineCardSkeleton.svelte";
  import ListMedia from "@/components/features/timeline/ListMedia.svelte";

  export let airingAtGreater: number;
  export let airingAtLesser: number;

  let isLoading: boolean = true;
  let isSuccess: boolean = false;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let pages: Maybe<Maybe<Page>[]> = null;
  let backgroudImageUrl: Maybe<string> = null;
  const pageData = useAiringSchedules({
    args: {
      airingAt_greater: airingAtGreater,
      airingAt_lesser: airingAtLesser,
      sort: [AiringSort.Time],
    },
  });

  onMount(() => {
    const pageData_unsubscribe = pageData.subscribe((value) => {
      if (!!value.data) pages = value.data.pages;
      if (!!!backgroudImageUrl)
        backgroudImageUrl =
          value?.data?.pages[0]?.airingSchedules?.[0]?.media?.coverImage
            ?.large ?? "";

      isLoading = value.isLoading || value.isFetchingNextPage;
      isSuccess = value.isSuccess;
      fetchNextPage = value.fetchNextPage;
      hasNextPage = !!value.hasNextPage;
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      pageData_unsubscribe();
    };
  });

  const handleScroll = debounce(() => {
    if (isBottomPage() && !isLoading) {
      fetchNextPage();
    }
  }, 100);
</script>

<!-- Backgroud -->
{#if !!backgroudImageUrl}
  <div
    class="fixed inset-0 blur-3xl bg-cover bg-center bg-no-repeat opacity-10 -z-10"
    style:background-image={`url("${backgroudImageUrl}")`}
  />
{/if}
<div class="w-full xl:max-w-4xl 3xl:max-w-5xl mx-auto">
  {#if isSuccess && !!pages}
    <ListMedia source={pages || []} />
  {/if}
  {#if isLoading}
    <div class="w-full flex flex-col gap-2 mt-2">
      {#each { length: 3 } as _}
        <TimelineCardSkeleton />
      {/each}
    </div>
  {:else if hasNextPage}
    <div class="w-full my-20" />
  {:else}
    <div class="w-full text-center my-20">Không còn kết quả nào!</div>
  {/if}
</div>
