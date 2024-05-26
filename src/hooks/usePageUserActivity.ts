// Import Types
import type { Maybe } from "@/types";
import type { PageArgs } from "@/types/anilist";
import type { Page, QueryActivityArgs } from "@/types/anilistv2";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getPageUserActivity } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type usePageUserActivityOptions = {
  args: PageArgs & QueryActivityArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Page>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const usePageUserActivity = ({
  args,
  fields,
  options,
  customFetch,
}: usePageUserActivityOptions) => {
  return createInfiniteQuery<Maybe<Page>>({
    defaultPageParam: 0,
    queryKey: ["page-user-activity", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getPageUserActivity({
        args: {
          ...args,
          page: pageParam as number,
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

export default usePageUserActivity;