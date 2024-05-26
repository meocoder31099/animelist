<script lang="ts">
  // Import Types
  import type { PostDataError } from "@/hooks/usePostData";

  // Import Libs
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  // Import Stores
  import { page } from "$app/stores";

  // Import Components
  import ViewerFetcher from "@/components/features/user/ViewerFetcher.svelte";

  let isViewerFetcher: boolean = false;
  let isError: boolean = false;
  let errorDetails: PostDataError;

  onMount(() => {
    const unsubscribePageStore = page.subscribe((value) => {
      if (!!value.url.hash) {
        const hashData = new URLSearchParams(value.url.hash);
        const accessToken = hashData.get("#access_token");
        const tokenType = hashData.get("token_type");
        const expiresIn = hashData.get("expires_in");

        if (!!accessToken) {
          localStorage.setItem("access_token", accessToken);
          isViewerFetcher = true;
        }
      }
    });

    return () => {
      unsubscribePageStore();
    };
  });

  const successRedirect = () => {
    goto("/");
  };

  const handleError = (event: CustomEvent) => {
    errorDetails = event.detail;
    isError = true;
  };
</script>

<div class="h-screen flex items-center justify-center text-center -mb-20">
  <div class="flex flex-col gap-4">
    {#if !isError}
      <div class="flex items-center justify-center text-center gap-4">
        <svg
          viewBox="0 0 135 140"
          xmlns="http://www.w3.org/2000/svg"
          fill="#e03131"
          width="44px"
          class="mantine-1avyp1d"
          role="presentation"
          ><rect y="10" width="15" height="120" rx="6"
            ><animate
              attributeName="height"
              begin="0.5s"
              dur="1s"
              values="120;110;100;90;80;70;60;50;40;140;120"
              calcMode="linear"
              repeatCount="indefinite"
            /><animate
              attributeName="y"
              begin="0.5s"
              dur="1s"
              values="10;15;20;25;30;35;40;45;50;0;10"
              calcMode="linear"
              repeatCount="indefinite"
            /></rect
          ><rect x="30" y="10" width="15" height="120" rx="6"
            ><animate
              attributeName="height"
              begin="0.25s"
              dur="1s"
              values="120;110;100;90;80;70;60;50;40;140;120"
              calcMode="linear"
              repeatCount="indefinite"
            /><animate
              attributeName="y"
              begin="0.25s"
              dur="1s"
              values="10;15;20;25;30;35;40;45;50;0;10"
              calcMode="linear"
              repeatCount="indefinite"
            /></rect
          ><rect x="60" width="15" height="140" rx="6"
            ><animate
              attributeName="height"
              begin="0s"
              dur="1s"
              values="120;110;100;90;80;70;60;50;40;140;120"
              calcMode="linear"
              repeatCount="indefinite"
            /><animate
              attributeName="y"
              begin="0s"
              dur="1s"
              values="10;15;20;25;30;35;40;45;50;0;10"
              calcMode="linear"
              repeatCount="indefinite"
            /></rect
          ><rect x="90" y="10" width="15" height="120" rx="6"
            ><animate
              attributeName="height"
              begin="0.25s"
              dur="1s"
              values="120;110;100;90;80;70;60;50;40;140;120"
              calcMode="linear"
              repeatCount="indefinite"
            /><animate
              attributeName="y"
              begin="0.25s"
              dur="1s"
              values="10;15;20;25;30;35;40;45;50;0;10"
              calcMode="linear"
              repeatCount="indefinite"
            /></rect
          ><rect x="120" y="10" width="15" height="120" rx="6"
            ><animate
              attributeName="height"
              begin="0.5s"
              dur="1s"
              values="120;110;100;90;80;70;60;50;40;140;120"
              calcMode="linear"
              repeatCount="indefinite"
            /><animate
              attributeName="y"
              begin="0.5s"
              dur="1s"
              values="10;15;20;25;30;35;40;45;50;0;10"
              calcMode="linear"
              repeatCount="indefinite"
            /></rect
          ></svg
        >
      </div>
    {:else}
      {errorDetails.message}
    {/if}
  </div>
</div>
{#if isViewerFetcher}
  <ViewerFetcher
    on:success={() => {
      successRedirect();
    }}
    on:error={handleError}
  />
{/if}
