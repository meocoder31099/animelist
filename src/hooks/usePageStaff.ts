// Import Types
import type { Maybe } from "@/types";
import type { StaffArgs, PageArgs } from "@/types/anilist";
import type { Page } from "@/types/anilistv2";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getPageStaff } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type usePageStaffOptions = {
  args: PageArgs & StaffArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Page>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const usePageStaff = ({
  args,
  fields,
  options,
  customFetch,
}: usePageStaffOptions) => {
  return createInfiniteQuery<Maybe<Page>>({
    queryKey: ["page-staff", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getPageStaff({
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

export default usePageStaff;
