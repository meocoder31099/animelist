// Import Types
import type { Maybe } from "@/types";
import type { MediaConnection, QueryUserArgs } from "@/types/anilistv2";
import type { PostDataError } from "@/hooks/usePostData";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getUserAnimeFavourites } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type useUserAnimeFavouritesOptions = {
  args: QueryUserArgs & { animePage?: number };
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<MediaConnection>, PostDataError>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useUserAnimeFavourites = ({
  args,
  fields,
  options,
  customFetch,
}: useUserAnimeFavouritesOptions) => {
  return createInfiniteQuery<Maybe<MediaConnection>, PostDataError>({
    queryKey: ["user-anime-favourites", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getUserAnimeFavourites({
        args: { ...args, animePage: pageParam },
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

export default useUserAnimeFavourites;
