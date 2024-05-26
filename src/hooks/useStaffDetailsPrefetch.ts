// Import Types
import type { Maybe } from "@/types";
import type { PageArgs, StaffArgs, Staff } from "@/types/anilist";

// Import Libs
import { getStaffDetails } from "@/services/anilist";

type useCharacterDetailsPrefetchOptions = {
  args: PageArgs & StaffArgs;
  fields?: string;
  customFetch?: typeof fetch;
};
const useCharacterDetailsPrefetch = ({
  args,
  fields,
  customFetch,
}: useCharacterDetailsPrefetchOptions): Promise<Maybe<Staff>> =>
  getStaffDetails({
    args: args,
    fields,
    customFetch,
  });

export default useCharacterDetailsPrefetch;
