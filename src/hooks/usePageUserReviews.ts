// Import Types
import type { Maybe } from "@/types";
import type { PageArgs } from "@/types/anilist";
import type { Page, QueryReviewArgs } from "@/types/anilistv2";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getPageUserReviews } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type usePageUserReviewsOptions = {
  args: PageArgs & QueryReviewArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Page>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const usePageUserReviews = ({
  args,
  fields,
  options,
  customFetch,
}: usePageUserReviewsOptions) => {
  return createInfiniteQuery<Maybe<Page>>({
    queryKey: ["page-user-reviews", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getPageUserReviews({
        args: {
          ...args,
          page: pageParam,
        },
        fields,
        customFetch,
      }),
    getNextPageParam: (lastPage) => {
      if (!!lastPage)
        if (lastPage.pageInfo?.hasNextPage)
          return (lastPage.pageInfo?.currentPage as number) + 1;
      return undefined;
    },
    ...options,
  });
};

export default usePageUserReviews;
