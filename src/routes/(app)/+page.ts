// // Import Types
// import type { PageLoad } from "./$types";
// import type { Page } from "@/types/anilist";

// // Import Enum
// import { MediaType, MediaSort, MediaStatus } from "@/types/anilist";

// // Import Libs
// import usePageMediaPrefetch from "@/hooks/usePageMediaPrefetch";
// import queryClient from "@/utils/queryClient";

// export const load: PageLoad = async () => {
//   // const args = {
//   //   type: MediaType.Anime,
//   //   sort: [MediaSort.Trending_desc, MediaSort.Popularity_desc],
//   //   status_not_in: [MediaStatus.Not_yet_released],
//   //   perPage: 20,
//   // };
//   // await queryClient.prefetchQuery({
//   //   queryKey: ["page-media", { args }],
//   //   queryFn: (): Promise<Page> => usePageMediaPrefetch(args),
//   // });
//   // const a = queryClient.getQueryData(["page-media", { args }]);
//   // console.log(a);
// };
