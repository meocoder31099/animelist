// Import Types.
import type { Maybe } from "@/types";
import type { PageArgs } from "@/types/anilist";
import type { Page, QueryThreadCommentArgs } from "@/types/anilistv2";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs.
import { getPageForumThreadComments } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

// Định nghĩa các kiểu dữ liệu tùy chỉnh dựa trên kiểu generic T.
type CustomDataType<T> = Maybe<{
  pageInfo: Page["pageInfo"];
  threadComments: T;
}>;

export type UsePageForumThreadCommentsArgs = PageArgs & QueryThreadCommentArgs;

// Định nghĩa các tùy chọn cho hàm usePageForumThreadComments.
type usePageForumThreadCommentsOptions<TQueryData> = {
  args: UsePageForumThreadCommentsArgs;
  fields?: string;
  withChildComments?: boolean;
  options?: Omit<
    CreateInfiniteQueryOptions<CustomDataType<TQueryData>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
  processData: (data: Page["threadComments"]) => TQueryData;
};

// Hàm usePageForumThreadComments sẽ tạo ra một truy vấn không giới hạn
// dựa trên các tùy chọn và hàm xử lý dữ liệu được truyền vào.
const usePageForumThreadComments = <TQueryData = Page["threadComments"]>({
  args,
  fields,
  withChildComments = false,
  options,
  customFetch,
  processData,
}: usePageForumThreadCommentsOptions<TQueryData>) => {
  // Hàm createInfiniteQuery() sẽ tạo ra một truy vấn không giới hạn
  // dựa trên thông tin truyền vào.
  return createInfiniteQuery<CustomDataType<TQueryData>>({
    queryKey: ["page-forum-thread-comments", { args }],
    queryFn: async ({ pageParam = 1 }) => {
      // Lấy dữ liệu từ.getPageForumThreadComments() dựa trên các tham số.
      const data = await getPageForumThreadComments({
        args: {
          ...args,
          page: pageParam,
        },
        fields,
        withChildComments,
        customFetch,
      });

      // Nếu không có dữ liệu, trả về null.
      if (!data) return null;

      // Trả về đối tượng kết quả với pageInfo và threadComments sau khi xử lý processData.
      return {
        pageInfo: data.pageInfo,
        threadComments: processData(data.threadComments),
      };
    },
    // Lấy thông tin trang tiếp theo từ thông tin pageInfo.
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.pageInfo?.currentPage;
      if (lastPage?.pageInfo?.hasNextPage && currentPage)
        return currentPage + 1;
      return undefined;
    },
    ...options,
  });
};

export default usePageForumThreadComments;
