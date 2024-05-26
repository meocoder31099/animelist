<script lang="ts">
  import Trending from "../../components/HomePage/Trending.svelte";
  import AnimeAiring from "../../components/HomePage/AnimeAiring.svelte";
  import ListHorizontalScroll from "../../components/ListMedia/ListHorizontalScroll.svelte";
  import ListVertical from "../../components/ListMedia/ListVertical.svelte";
</script>

<Trending
  on:isSuccess={(event) => {
    /*trendingIsSuccess = event.detail*/
  }}
/>

<!-- <svelte:component this={AnimeAiring} />
<svelte:component
  this={ListHorizontal}
  type="ANIME"
  id="animeTop"
  name="Phổ biến"
  mediaSort={["SCORE_DESC", "FAVOURITES_DESC", "POPULARITY_DESC"]}
  isRank={true}
/> -->
<!-- {/if} -->
<ListVertical
  id={"animeNew"}
  type="ANIME"
  name="Mới cập nhật"
  queryVariables={{
    sort: ["UPDATED_AT_DESC"],
    perPage: 18,
  }}
/>
<AnimeAiring />
<ListVertical
  id={"animeUpcoming"}
  type="ANIME"
  name="Sắp tới"
  queryVariables={{
    status: "NOT_YET_RELEASED",
    sort: ["TRENDING_DESC"],
    perPage: 18,
  }}
/>
<ListHorizontalScroll
  type="ANIME"
  id="animeTop"
  name="Phổ biến"
  queryVariables={{
    sort: ["SCORE_DESC", "FAVOURITES_DESC", "POPULARITY_DESC"],
    perPage: 20,
  }}
  isRank={true}
/>
