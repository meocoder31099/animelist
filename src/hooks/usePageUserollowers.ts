// Import Types
import type { Maybe } from "@/types";
import type { PageArgs } from "@/types/anilist";
import type { Page, QueryFollowerArgs } from "@/types/anilistv2";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getPageUserFollowers } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type usePageUserollowersOptions = {
  args: PageArgs & QueryFollowerArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Page>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const usePageUserollowers = ({
  args,
  fields,
  options,
  customFetch,
}: usePageUserollowersOptions) => {
  return createInfiniteQuery<Maybe<Page>>({
    queryKey: ["page-user-followers", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getPageUserFollowers({
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

export default usePageUserollowers;
