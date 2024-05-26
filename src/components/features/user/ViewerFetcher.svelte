<script lang="ts">
  // Import Types
  import type { PostDataError } from "@/hooks/usePostData";
  type EventDispatcher = {
    success: boolean;
    error: PostDataError;
  };

  // Import Libs
  import { onMount, createEventDispatcher } from "svelte";
  import useViewerDetails from "@/hooks/useViewerDetails";

  // Import Stores
  import { user } from "@/stores/GlobalStore";

  const dispath = createEventDispatcher<EventDispatcher>();
  const viewerDetails = useViewerDetails({});

  onMount(() => {
    const unsubscriberViewerDetails = viewerDetails.subscribe((value) => {
      if (!!value.data) {
        // Set user details to "user" store.
        user.set(value.data);
        dispath("success", true);
      } else if (value.isError) {
        dispath("error", value.error);
        // If Invalid token remove "access_token" from localStorage
        value.error.message === "Invalid token" &&
          localStorage.removeItem("access_token");
      }
    });

    return () => {
      unsubscriberViewerDetails();
    };
  });
</script>
