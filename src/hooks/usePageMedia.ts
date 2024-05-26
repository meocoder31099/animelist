// Import Types
import type { Maybe } from "@/types";
import type { Page, MediaArgs, PageArgs } from "@/types/anilist";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getPageMedia } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type usePageMediaOptions = {
  args: PageArgs & MediaArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Page>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const usePageMedia = ({
  args,
  fields,
  options,
  customFetch,
}: usePageMediaOptions) => {
  return createInfiniteQuery<Maybe<Page>>({
    queryKey: ["page-media", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getPageMedia({
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

export default usePageMedia;
