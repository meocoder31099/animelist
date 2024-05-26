// Import Types
import type { Maybe } from "@/types";
import type {
  RecommendationConnection,
  MediaArgs,
  PageArgs,
  StaffSort,
} from "@/types/anilist";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getMediaRecommendationsPageDetails } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type useMediaRecommendationsPageDetailsOptions = {
  args: PageArgs & MediaArgs & { staffSort?: StaffSort };
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<RecommendationConnection>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useMediaRecommendationsPageDetails = ({
  args,
  fields,
  options,
  customFetch,
}: useMediaRecommendationsPageDetailsOptions) => {
  return createInfiniteQuery<Maybe<RecommendationConnection>>({
    queryKey: ["page-media-recommendations", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getMediaRecommendationsPageDetails({
        args: { ...args, page: pageParam },
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

export default useMediaRecommendationsPageDetails;
