<script lang="ts">
  // Import Enum
  import { MediaType, MediaSort, MediaStatus } from "@/types/anilist";

  //Import Libs
  import {
    siteName,
    siteThemeColor,
    siteUrl,
    siteSocialImageUrl,
    animeDescription,
  } from "@/configs";

  // Import Components
  import SEO from "@/components/shared/SEO.svelte";
  import Trending from "@/components/HomePage/Trending.svelte";
  import AnimeAiring from "@/components/HomePage/AnimeAiring.svelte";
  // const ListVertical2 = async () => (await import("./test.svelte")).default;
  import ListHorizontalScroll from "@/components/ListMedia/ListHorizontalScroll.svelte";
  import ListVertical from "@/components/ListMedia/ListVertical.svelte";
  // import Test from "./test.svelte";

  const pageTitle = `Home (Anime) — ${siteName}`;
  const pageHref = siteUrl;
  const pageDescription = animeDescription;
  const pageSocialImageUrl = siteSocialImageUrl;
</script>

<SEO
  {pageDescription}
  {pageHref}
  {pageTitle}
  {pageSocialImageUrl}
  {siteName}
  {siteThemeColor}
/>

<Trending
  on:isSuccess={(event) => {
    /*trendingIsSuccess = event.detail*/
  }}
/>

<ListVertical
  name="Mới cập nhật"
  queryVariables={{
    sort: [MediaSort.Updated_at_desc],
    perPage: 15,
  }}
/>
<AnimeAiring />
<ListVertical
  name="Sắp tới"
  queryVariables={{
    status: MediaStatus.Not_yet_released,
    sort: [MediaSort.Trending_desc],
    perPage: 15,
  }}
/>
<ListVertical
  name="Phổ biến"
  queryVariables={{
    sort: [
      MediaSort.Score_desc,
      MediaSort.Favourites_desc,
      MediaSort.Popularity_desc,
    ],
    perPage: 15,
  }}
  isRanking={true}
/>
<!-- <ListHorizontalScroll
  id="animeTop"
  name="Phổ biến"
  queryVariables={{
    sort: ["SCORE_DESC", "FAVOURITES_DESC", "POPULARITY_DESC"],
    perPage: 20,
  }}
  isRank={true}
/> -->
<!-- {#await ListVertical2() then ListVertical2Component}
  <div
    use:onkeepAlive={{
      id: "test",
      componentClass: ListVertical2Component,
      props: {},
    }}
  />
{/await} -->
