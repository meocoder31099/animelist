// Import Types
import type { User, QueryUserArgs } from "@/types/anilistv2";
import type { PostDataError } from "@/hooks/usePostData";
import type { CreateBaseQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getUserInfo } from "@/services/anilist";
import { createQuery } from "@tanstack/svelte-query";

export const prefixKey = "user";

type useUserInfoOptions = {
  args: QueryUserArgs;
  fields?: string;
  options?: Omit<
    CreateBaseQueryOptions<User, PostDataError>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useUserInfo = ({
  args,
  fields,
  options,
  customFetch,
}: useUserInfoOptions) => {
  return createQuery<User, PostDataError>({
    queryKey: [prefixKey, { args }],
    queryFn: () =>
      getUserInfo({
        args,
        fields,
        customFetch,
      }),
    ...options,
  });
};

export default useUserInfo;
