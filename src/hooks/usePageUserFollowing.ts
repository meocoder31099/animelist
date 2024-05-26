// Import Types
import type { Maybe } from "@/types";
import type { PageArgs } from "@/types/anilist";
import type { Page, QueryFollowingArgs } from "@/types/anilistv2";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getPageUserFollowing } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type usePageUserFollowingOptions = {
  args: PageArgs & QueryFollowingArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Page>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const usePageUserFollowing = ({
  args,
  fields,
  options,
  customFetch,
}: usePageUserFollowingOptions) => {
  return createInfiniteQuery<Maybe<Page>>({
    queryKey: ["page-user-following", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getPageUserFollowing({
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

export default usePageUserFollowing;
