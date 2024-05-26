// Import Types
import type { PageLoad } from "./$types";

// Import Libs
import useStaffDetailsPrefetch from "@/hooks/useStaffDetailsPrefetch";
import useIdFromUrl from "@/hooks/useIdFromUrl";

export const load: PageLoad = async ({ parent, params, fetch }) => {
  const { queryClient, isBotSearch } = await parent();
  const Id = useIdFromUrl(params.url);
  const args = {
    id: Id,
  };
  if (isBotSearch) {
    const hasData = queryClient.getQueryData(["staff-details", { args }]);
    if (!hasData)
      await queryClient.prefetchInfiniteQuery({
        queryKey: ["staff-details", { args }],
        queryFn: () =>
          useStaffDetailsPrefetch({
            args,
            customFetch: fetch,
          }),
      });
  }

  return {
    Id,
  };
};
