// Import Types
import type {
  MediaListCollection,
  QueryMediaListCollectionArgs,
} from "@/types/anilistv2";
import type { PostDataError } from "@/hooks/usePostData";
import type { CreateBaseQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getUserMediaListCollection } from "@/services/anilist";
import { createQuery } from "@tanstack/svelte-query";

type userMediaListCollectionOptions = {
  args: QueryMediaListCollectionArgs;
  fields?: string;
  options?: Omit<
    CreateBaseQueryOptions<MediaListCollection, PostDataError>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const userMediaListCollection = ({
  args,
  fields,
  options,
  customFetch,
}: userMediaListCollectionOptions) => {
  return createQuery<MediaListCollection, PostDataError>({
    queryKey: ["user-media-list-collection", { args }],
    queryFn: () =>
      getUserMediaListCollection({
        args,
        fields,
        customFetch,
      }),
    ...options,
  });
};

export default userMediaListCollection;
