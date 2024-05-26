<script lang="ts">
  // Import Enum
  import { MediaType, MediaSort, MediaStatus } from "@/types/anilist";

  //Import Libs
  import {
    siteName,
    siteThemeColor,
    siteUrl,
    siteSocialImageUrl,
    mangaDescription,
  } from "@/configs";

  // Import Components
  import SEO from "@/components/shared/SEO.svelte";
  import Trending from "../../../components/HomePage/Trending.svelte";
  import ListVertical from "../../../components/ListMedia/ListVertical.svelte";

  const pageTitle: string = `Home (Manga) — ${siteName}`;
  const pageHref: string = siteUrl;
  const pageDescription: string = mangaDescription;
  const pageSocialImageUrl: string = siteSocialImageUrl;
</script>

<SEO
  {pageDescription}
  {pageHref}
  {pageTitle}
  {pageSocialImageUrl}
  {siteName}
  {siteThemeColor}
/>

<Trending type={MediaType.Manga} />
<ListVertical
  type={MediaType.Manga}
  name="Newly updated"
  queryVariables={{
    sort: [MediaSort.Updated_at_desc],
    perPage: 15,
  }}
/>
<ListVertical
  type={MediaType.Manga}
  name="Upcoming"
  queryVariables={{
    status: MediaStatus.Not_yet_released,
    sort: [MediaSort.Trending_desc],
    perPage: 15,
  }}
/>
<ListVertical
  type={MediaType.Manga}
  name="All time popular"
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
