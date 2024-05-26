// Import Types
import type { Media, MediaArgs } from "@/types/anilist";

// Import Libs
import { getMediaDetails } from "@/services/anilist";
type useMediaDetailsPrefetchOptions = {
  args: MediaArgs;
  fields?: string;
  customFetch?: typeof fetch;
};
const useMediaDetailsPrefetch = ({
  args,
  fields,
  customFetch,
}: useMediaDetailsPrefetchOptions): Promise<Media> =>
  getMediaDetails({
    args,
    fields,
    customFetch,
  });
export default useMediaDetailsPrefetch;
