// Import Types
import type { GenreCollectionQueryResponse } from "@/services/anilist/queries";
import type { CreateBaseQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getGenreCollection } from "@/services/anilist";
import { createQuery } from "@tanstack/svelte-query";

type useGenreCollectionOptions = {
  fields?: string;
  options?: Omit<
    CreateBaseQueryOptions<GenreCollectionQueryResponse>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useGenreCollection = ({
  fields,
  options,
  customFetch,
}: useGenreCollectionOptions) => {
  return createQuery<GenreCollectionQueryResponse>({
    queryKey: ["genre-collection"],
    queryFn: () =>
      getGenreCollection({
        fields,
        customFetch,
      }),
    ...options,
  });
};

export default useGenreCollection;
