// Import Types
import type { MediaArgs } from "@/types/anilist";
import type { Media } from "@/types/anilistv2";
import type { CreateBaseQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getMediaDetails } from "@/services/anilist";
import { createQuery } from "@tanstack/svelte-query";

type useMediaDetailsOptions = {
  args: MediaArgs;
  fields?: string;
  options?: Omit<CreateBaseQueryOptions<Media>, "TQueryKey" | "TQueryFnData">;
  customFetch?: typeof fetch;
};
const useMediaDetails = ({
  args,
  fields,
  options,
  customFetch,
}: useMediaDetailsOptions) => {
  return createQuery<Media>({
    queryKey: ["media-details", { args }],
    queryFn: () =>
      getMediaDetails({
        args,
        fields,
        customFetch,
      }),
    ...options,
  });
};

export default useMediaDetails;
