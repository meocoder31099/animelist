// Import Types
import type { Maybe } from "@/types";
import type { PageArgs } from "@/types/anilist";
import type { Page, QueryActivityReplyArgs } from "@/types/anilistv2";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getPageUserActivityReplies } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type usePageUserActivityRepliesOptions = {
  args: PageArgs & QueryActivityReplyArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Page>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const usePageUserActivityReplies = ({
  args,
  fields,
  options,
  customFetch,
}: usePageUserActivityRepliesOptions) => {
  return createInfiniteQuery<Maybe<Page>>({
    queryKey: ["page-user-activity-replies", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getPageUserActivityReplies({
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

export default usePageUserActivityReplies;
