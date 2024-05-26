// Import Types
import type { Maybe } from "@/types";
import type { PageArgs, CharacterArgs, Character } from "@/types/anilist";

// Import Libs
import { getCharacterDetails } from "@/services/anilist";

type useCharacterDetailsPrefetchOptions = {
  args: PageArgs & CharacterArgs;
  fields?: string;
  customFetch?: typeof fetch;
};
const useCharacterDetailsPrefetch = ({
  args,
  fields,
  customFetch,
}: useCharacterDetailsPrefetchOptions): Promise<Maybe<Character>> =>
  getCharacterDetails({
    args: args,
    fields,
    customFetch,
  });

export default useCharacterDetailsPrefetch;
