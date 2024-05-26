// Import Types
import type { Maybe } from "@/types";
import type { PageArgs, StudioArgs, MediaSort, Studio } from "@/types/anilist";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getStudioDetails } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type useStudioDetailsOptions = {
  args: PageArgs & StudioArgs & {mediaSort: MediaSort[]};
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Studio>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useStudioDetails = ({
  args,
  fields,
  options,
  customFetch,
}: useStudioDetailsOptions) => {
  return createInfiniteQuery<Maybe<Studio>>(
    ["studio-details", { args }],
    ({ pageParam = 1 }) =>
      getStudioDetails({
        args: { ...args, page: pageParam },
        fields,
        withInfo: pageParam === 1,
        customFetch,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (!!lastPage)
          if (lastPage.media?.pageInfo?.hasNextPage)
            return (lastPage.media?.pageInfo?.currentPage as number) + 1;
          else return undefined;
      },
      ...options,
    }
  );
};

export default useStudioDetails;
