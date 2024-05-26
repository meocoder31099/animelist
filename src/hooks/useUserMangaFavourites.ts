// Import Types
import type { Maybe } from "@/types";
import type { MediaConnection, QueryUserArgs } from "@/types/anilistv2";
import type { PostDataError } from "@/hooks/usePostData";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getUserMangaFavourites } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type useUserMangaFavouritesOptions = {
  args: QueryUserArgs & { mangaPage?: number };
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<MediaConnection>, PostDataError>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useUserMangaFavourites = ({
  args,
  fields,
  options,
  customFetch,
}: useUserMangaFavouritesOptions) => {
  return createInfiniteQuery<Maybe<MediaConnection>, PostDataError>({
    queryKey: ["user-manga-favourites", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getUserMangaFavourites({
        args: { ...args, mangaPage: pageParam },
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

export default useUserMangaFavourites;
