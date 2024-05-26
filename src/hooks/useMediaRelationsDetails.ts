// Import Types
import type { Maybe } from "@/types";
import type { MediaConnection, MediaArgs, PageArgs } from "@/types/anilist";
import type { CreateBaseQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getMediaRelationsPageDetails } from "@/services/anilist";
import { createQuery } from "@tanstack/svelte-query";

type useMediaRelationsDetailsOptions = {
  args: PageArgs & MediaArgs;
  fields?: string;
  options?: Omit<
    CreateBaseQueryOptions<Maybe<MediaConnection>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useMediaRelationsDetails = ({
  args,
  fields,
  options,
  customFetch,
}: useMediaRelationsDetailsOptions) => {
  return createQuery<Maybe<MediaConnection>>({
    queryKey: ["media-relations", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getMediaRelationsPageDetails({
        args: { ...args, page: pageParam },
        fields,
        customFetch,
      }),
    ...options,
  });
};

export default useMediaRelationsDetails;
