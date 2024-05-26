// Import Types
import type { Maybe } from "@/types";
import type { Page, MediaArgs, PageArgs } from "@/types/anilist";

// Import Libs
import { getPageMedia } from "@/services/anilist";

type usePageMediaPrefetchOptions = {
  args: PageArgs & MediaArgs;
  fields?: string;
  customFetch?: typeof fetch;
};
const usePageMedia = ({
  args,
  fields,
  customFetch,
}: usePageMediaPrefetchOptions): Promise<Maybe<Page>> =>
  getPageMedia({
    args,
    fields,
    customFetch,
  });

export default usePageMedia;
