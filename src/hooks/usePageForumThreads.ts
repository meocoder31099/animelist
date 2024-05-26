// Import Types
import type { Maybe } from "@/types";
import type { PageArgs } from "@/types/anilist";
import type { Page, QueryThreadArgs } from "@/types/anilistv2";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getPageForumThreads } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type usePageForumThreadsOptions = {
  args: PageArgs & QueryThreadArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Page>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const usePageForumThreads = ({
  args,
  fields,
  options,
  customFetch,
}: usePageForumThreadsOptions) => {
  return createInfiniteQuery<Maybe<Page>>({
    queryKey: ["page-forum-threads", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getPageForumThreads({
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

export default usePageForumThreads;
