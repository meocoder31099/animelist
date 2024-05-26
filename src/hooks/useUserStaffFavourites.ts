// Import Types
import type { Maybe } from "@/types";
import type { StaffConnection, QueryUserArgs } from "@/types/anilistv2";
import type { PostDataError } from "@/hooks/usePostData";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getUserStaffFavourites } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type useUserStaffFavouritesOptions = {
  args: QueryUserArgs & { staffPage?: number };
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<StaffConnection>, PostDataError>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useUserStaffFavourites = ({
  args,
  fields,
  options,
  customFetch,
}: useUserStaffFavouritesOptions) => {
  return createInfiniteQuery<Maybe<StaffConnection>, PostDataError>({
    queryKey: ["user-staff-favourites", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getUserStaffFavourites({
        args: { ...args, staffPage: pageParam },
        fields,
        customFetch,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.pageInfo) {
        const { hasNextPage, currentPage } = lastPage?.pageInfo;
        return hasNextPage ? (currentPage ?? 0) + 1 : undefined;
      }
      return undefined;
    },
    ...options,
  });
};

export default useUserStaffFavourites;
