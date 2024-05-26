// Import Types
import type { User } from "@/types/anilistv2";
import type { PostDataError } from "@/hooks/usePostData";
import type { CreateBaseQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getViewerDetails } from "@/services/anilist";
import { createQuery } from "@tanstack/svelte-query";

type useViewerDetailsOptions = {
  fields?: string;
  options?: Omit<
    CreateBaseQueryOptions<User, PostDataError>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useViewerDetails = ({
  fields,
  options,
  customFetch,
}: useViewerDetailsOptions) => {
  return createQuery<User, PostDataError>({
    queryKey: ["viewer"],
    queryFn: () =>
      getViewerDetails({
        fields,
        customFetch,
      }),
    ...options,
  });
};

export default useViewerDetails;
