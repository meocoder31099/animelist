<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { User, UserStatistics } from "@/types/anilistv2";
  // type EventDispatcher = {
  //   success: boolean;
  //   error: PostDataError;
  // };

  // Import Libs
  import { onMount } from "svelte";
  import useUserInfo from "@/hooks/useUserInfo";

  // Import Stores
  // import { user } from "@/stores/GlobalStore";

  // Import Components
  import UserOverviewStatistic from "@/components/shared/UserOverviewStatistic.svelte";

  export let username: string;

  let userOverViewDetails: User;
  let animeStatistic: Maybe<UserStatistics>;
  let mangaStatistic: Maybe<UserStatistics>;
  const userInfo = useUserInfo({
    args: {
      name: username,
    },
  });

  onMount(() => {
    const unUserInfo = userInfo.subscribe((value) => {
      if (!!value.data) {
        userOverViewDetails = value.data;

        const animeStats = value.data.statistics?.anime;
        if (!!animeStats) animeStatistic = animeStats;

        const mangaStats = value.data.statistics?.manga;
        if (!!mangaStats) mangaStatistic = mangaStats;
      }
    });

    return () => {
      unUserInfo();
    };
  });
</script>

{#if !!userOverViewDetails}
  <UserOverviewStatistic statistic={animeStatistic} />
  <UserOverviewStatistic statistic={mangaStatistic} />
{/if}
