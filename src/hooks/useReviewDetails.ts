// Import Types
import type { Review, QueryReviewArgs } from "@/types/anilistv2";
import type { CreateBaseQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getReviewDetails } from "@/services/anilist";
import { createQuery } from "@tanstack/svelte-query";

type useReviewDetailsOptions = {
  args: QueryReviewArgs;
  fields?: string;
  options?: Omit<CreateBaseQueryOptions<Review>, "TQueryKey" | "TQueryFnData">;
  customFetch?: typeof fetch;
};
const useReviewDetails = ({
  args,
  fields,
  options,
  customFetch,
}: useReviewDetailsOptions) => {
  return createQuery<Review>({
    queryKey: ["review-details", { args }],
    queryFn: () =>
      getReviewDetails({
        args,
        fields,
        customFetch,
      }),
    ...options,
  });
};

export default useReviewDetails;
