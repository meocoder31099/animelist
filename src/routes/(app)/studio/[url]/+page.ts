// Import Types
import type { PageLoad } from "../$types";

// Import Enum
import { MediaSort } from "@/types/anilist";

// Import Libs
import useStudioDetailsPrefetch from "@/hooks/useStudioDetailsPrefetch.";
import useIdFromUrl from "@/hooks/useIdFromUrl";

export const load: PageLoad = async ({ parent, params, fetch }) => {
  const { queryClient, isBotSearch } = await parent();
  const Id = useIdFromUrl(params.url);
  const args = {
    id: Id,
    mediaSort: [MediaSort.Start_date_desc],
  };

  if (isBotSearch) {
    const hasData = queryClient.getQueryData(["studio-details", { args }]);
    if (!hasData)
      await queryClient.prefetchInfiniteQuery({
        queryKey: ["studio-details", { args }],
        queryFn: () =>
          useStudioDetailsPrefetch({
            args,
            customFetch: fetch,
          }),
      });
  }

  return {
    Id,
  };
};
