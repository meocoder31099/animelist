// Import Types
import type { Thread, QueryThreadArgs } from "@/types/anilistv2";
import type { CreateBaseQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getForumThreadDetails } from "@/services/anilist";
import { createQuery } from "@tanstack/svelte-query";

type useForumThreadDetailsOptions = {
  args: QueryThreadArgs;
  fields?: string;
  options?: Omit<CreateBaseQueryOptions<Thread>, "TQueryKey" | "TQueryFnData">;
  customFetch?: typeof fetch;
};
const useForumThreadDetails = ({
  args,
  fields,
  options,
  customFetch,
}: useForumThreadDetailsOptions) => {
  return createQuery<Thread>({
    queryKey: ["thread-details", { args }],
    queryFn: () =>
      getForumThreadDetails({
        args,
        fields,
        customFetch,
      }),
    ...options,
  });
};

export default useForumThreadDetails;
