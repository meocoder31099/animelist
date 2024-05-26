// Import Types
import type { Maybe } from "@/types";
import type { CharacterConnection, QueryUserArgs } from "@/types/anilistv2";
import type { PostDataError } from "@/hooks/usePostData";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getUserCharactersFavourites } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type useUserCharactersFavouritesOptions = {
  args: QueryUserArgs & { charactersPage?: number };
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<CharacterConnection>, PostDataError>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useUserCharactersFavourites = ({
  args,
  fields,
  options,
  customFetch,
}: useUserCharactersFavouritesOptions) => {
  return createInfiniteQuery<Maybe<CharacterConnection>, PostDataError>({
    queryKey: ["user-characters-favourites", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getUserCharactersFavourites({
        args: { ...args, charactersPage: pageParam },
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

export default useUserCharactersFavourites;
