// Import Types
import type { Maybe } from "@/types";
import type {
  StaffConnection,
  MediaArgs,
  PageArgs,
  StaffSort,
} from "@/types/anilist";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getMediaStaffPageDetails } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type useMediaStaffPageDetailsOptions = {
  args: PageArgs & MediaArgs & { staffSort?: StaffSort };
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<StaffConnection>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useMediaStaffPageDetails = ({
  args,
  fields,
  options,
  customFetch,
}: useMediaStaffPageDetailsOptions) => {
  return createInfiniteQuery<Maybe<StaffConnection>>({
    queryKey: ["page-media-staff", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getMediaStaffPageDetails({
        args: { ...args, page: pageParam },
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

export default useMediaStaffPageDetails;
