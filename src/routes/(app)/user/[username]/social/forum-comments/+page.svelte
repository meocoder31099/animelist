<script lang="ts">
  // Import Types
  import type { PageData } from "./$types";

  //  Import Libs
  import { onMount } from "svelte";
  import useUserInfo from "@/hooks/useUserInfo";

  // Import Components
  import UserForumThreadComments from "@/components/features/user/UserForumThreadComments.svelte";

  export let data: PageData;

  let userId: number;
  const userInfo = useUserInfo({
    args: {
      name: data.username,
    },
  });

  onMount(() => {
    const unUserInfo = userInfo.subscribe((value) => {
      const data = value.data;
      if (!!data) {
        userId = data.id;
      }
    });

    return () => {
      unUserInfo();
    };
  });
</script>

{#if userId}
  <UserForumThreadComments {userId} />
{/if}
