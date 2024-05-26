// Import Types
import type { Maybe } from "@/types";
import type { PageArgs, StudioArgs, MediaSort, Studio } from "@/types/anilist";

// Import Libs
import { getStudioDetails } from "@/services/anilist";

type useStudioDetailsPrefetchOptions = {
  args: PageArgs & StudioArgs & { mediaSort: MediaSort[] };
  fields?: string;
  customFetch?: typeof fetch;
};
const useStudioDetailsPrefetch = ({
  args,
  fields,
  customFetch,
}: useStudioDetailsPrefetchOptions): Promise<Maybe<Studio>> =>
  getStudioDetails({
    args: args,
    fields,
    customFetch,
  });

export default useStudioDetailsPrefetch;
