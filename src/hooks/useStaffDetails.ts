// Import Types
import type { Maybe } from "@/types";
import type { PageArgs, StaffArgs, Staff } from "@/types/anilist";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getStaffDetails } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type useStaffDetailsOptions = {
  args: PageArgs & StaffArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Staff>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useStaffDetails = ({
  args,
  fields,
  options,
  customFetch,
}: useStaffDetailsOptions) => {
  return createInfiniteQuery<Maybe<Staff>>(
    ["staff-details", { args }],
    ({
      pageParam = {
        withInfo: true,
        withMedia: true,
        withStaffRole: false,
        page: 1,
      },
    }) =>
      getStaffDetails({
        args: { ...args, page: pageParam.page },
        fields,
        withInfo: pageParam.withInfo,
        withMedia: pageParam.withMedia,
        withStaffRole: pageParam.withStaffRole,
        customFetch,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (!!lastPage)
          if (lastPage.characterMedia?.pageInfo?.hasNextPage)
            return {
              withInfo: false,
              withMedia: true,
              withStaffRole: false,
              page:
                (lastPage.characterMedia?.pageInfo?.currentPage as number) + 1,
            };
          else if (
            lastPage.staffMedia?.pageInfo?.hasNextPage ||
            (!lastPage.characterMedia?.pageInfo?.hasNextPage &&
              !lastPage.staffMedia)
          )
            return {
              withInfo: false,
              withMedia: false,
              withStaffRole: true,
              page:
                (lastPage.staffMedia?.pageInfo?.currentPage || (0 as number)) +
                1,
            };
          else return undefined;
      },
      ...options,
    }
  );
};

export default useStaffDetails;
