// Import Types
import type { Maybe } from "@/types";
import type { PageArgs, AiringScheduleArgs, Page } from "@/types/anilist";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getAiringSchedules } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type useCharacterDetailsOptions = {
  args: PageArgs & AiringScheduleArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Page>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useAiringSchedules = ({
  args,
  fields,
  options,
  customFetch,
}: useCharacterDetailsOptions) => {
  return createInfiniteQuery<Maybe<Page>>(
    ["airing-schedules", { args }],
    ({ pageParam = 1 }) =>
      getAiringSchedules({
        args: { ...args, page: pageParam },
        fields,
        customFetch,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (!!lastPage)
          if (lastPage.pageInfo?.hasNextPage)
            return (lastPage.pageInfo.currentPage as number) + 1;
          else return undefined;
      },
      ...options,
    }
  );
};

export default useAiringSchedules;
