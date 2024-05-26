// Import Types
import type { Maybe } from "@/types";
import type { PageArgs, CharacterArgs, Character } from "@/types/anilist";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getCharacterDetails } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type useCharacterDetailsOptions = {
  args: PageArgs & CharacterArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Character>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useCharacterDetails = ({
  args,
  fields,
  options,
  customFetch,
}: useCharacterDetailsOptions) => {
  return createInfiniteQuery<Maybe<Character>>(
    ["characters-details", { args }],
    ({ pageParam = 1 }) =>
      getCharacterDetails({
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

export default useCharacterDetails;
