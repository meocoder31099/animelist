<script lang="ts">
  // Import Types
  import type { Review, QueryReviewArgs } from "@/types/anilistv2";
  import type { PageArgs } from "@/types/anilist";
  import type { Maybe } from "@/types";
  import type CardReview from "@/components/shared/CardReview.svelte";
  import type { ComponentProps } from "svelte";
  type CardReviewProps = ComponentProps<CardReview>;

  // Import Libs
  import { onMount } from "svelte";
  import usePageUserReviews from "@/hooks/usePageUserReviews";
  import { isBottomPage, createReviewDetailsUrl } from "@/utils";
  import useDebounce from "@/hooks/useDebounce";
  import { DEFAULT_AVATAR } from "@/constants";

  // Import Components
  import ReviewsList from "@/components/shared/ReviewsList.svelte";

  export let args: QueryReviewArgs & PageArgs;
  export let isInfiniteScroll: boolean = true;
  export let gridColsAndGap: string | undefined = undefined;

  let isLoading: boolean = true;
  let hasNextPage: boolean = isInfiniteScroll;
  let fetchNextPage: () => void;
  let cardProps: CardReviewProps[] = [];
  const pageUserActivity = usePageUserReviews({
    args,
  });

  onMount(() => {
    const unPageUserActivity = pageUserActivity.subscribe((value) => {
      const pages = value.data?.pages;
      const firstPage = pages?.[0]?.reviews;
      if (!!firstPage && !value.isFetchingNextPage) {
        if (cardProps.length) {
          const lastPageIndex = pages.length - 1;
          const edgesTemp = pages?.[lastPageIndex]?.reviews;
          if (edgesTemp) {
            cardProps = cardProps.concat(createCardProps(edgesTemp));
          }
        } else {
          for (const page of pages) {
            if (page?.reviews?.length) {
              const edgesTemp = page.reviews;
              const options = createCardProps(edgesTemp);
              cardProps = cardProps.concat(options);
            }
          }
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
      unPageUserActivity();
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const createCardProps = (reviews: Maybe<Review>[]): CardReviewProps[] => {
    const cardOptions: CardReviewProps[] = [];
    for (const review of reviews) {
      if (!review) continue;
      const mediaData = review?.media;
      if (!mediaData) continue;

      const userAvatar = review.user?.avatar?.large || DEFAULT_AVATAR;
      const { id: userId = 0, name: userName = "" } = review.user ?? {};
      const user = {
        id: userId,
        avatar: userAvatar,
        name: userName,
      };

      const { id: mediaId, title, coverImage, bannerImage } = mediaData || {};
      const media = {
        id: mediaId,
        name: title?.userPreferred ?? "",
        coverImage: coverImage?.large ?? "",
        bannerImage: bannerImage ?? "",
      };

      const { id, summary, rating } = review;

      cardOptions.push({
        media,
        user,
        rating: rating ?? 0,
        summary: summary ?? "",
        href: createReviewDetailsUrl(review),
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

<ReviewsList
  source={cardProps}
  {hasNextPage}
  {isLoading}
  {gridColsAndGap}
  isResultsMessageVisible={isInfiniteScroll}
/>
