<script lang="ts">
  // Import Type
  import type { Maybe } from "@/types";
  import type { Media } from "@/types/anilist";

  // Import Enum
  import { AiringSort } from "@/types/anilist";

  // Import Libs
  import { onMount, createEventDispatcher } from "svelte";
  import useAiringSchedules from "@/hooks/useAiringSchedules";

  // Import components
  import ScrollbarHozirontal from "../Utils/Scrollbar/ScrollbarHozirontal.svelte";
  import ListMediaVerticalSkeleton from "@/components/skeletons/ListMediaVerticalSkeleton.svelte";
  import ListMediaVertical from "@/components/shared/ListMediaVertical.svelte";

  export let airingAtGreater: number;
  export let airingAtLesser: number;

  const dispatch = createEventDispatcher();
  let isLoading: boolean = true;
  let isSuccess: boolean = false;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let medias: Maybe<Media>[];
  let backgroudImageUrl: Maybe<string> = null;
  const pageData = useAiringSchedules({
    args: {
      airingAt_greater: airingAtGreater,
      airingAt_lesser: airingAtLesser,
      sort: [AiringSort.Time_desc],
    },
  });

  onMount(() => {
    const pageData_unsubscribe = pageData.subscribe((value) => {
      if (!!value.data?.pages[0]?.airingSchedules?.length)
        medias = value.data.pages[0].airingSchedules.map(
          (airingSchedule) => airingSchedule.media
        );
      if (!!!backgroudImageUrl)
        backgroudImageUrl =
          value?.data?.pages[0]?.airingSchedules?.[0]?.media?.coverImage
            ?.large ?? "";

      isLoading = value.isLoading || value.isFetchingNextPage;
      isSuccess = value.isSuccess;
      fetchNextPage = value.fetchNextPage;
      hasNextPage = !!value.hasNextPage;
      dispatch("isSuccess", isSuccess);
    });

    return () => {
      pageData_unsubscribe();
    };
  });
</script>

{#if isSuccess && medias}
  <ScrollbarHozirontal isNavigation={true} isSuccess={true}>
    <ListMediaVertical source={medias} />
  </ScrollbarHozirontal>
{:else}
  <ScrollbarHozirontal>
    <ListMediaVerticalSkeleton numberChild={4} />
  </ScrollbarHozirontal>
{/if}
