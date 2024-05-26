<script lang="ts">
  //Import Types
  import type { Maybe } from "@/types";

  export let backgroundColor: Maybe<string> = null;
</script>

<span
  class="w-1 h-1 rounded-full bg-neutral-500 opacity-60 last:hidden"
  style:background-color={backgroundColor}
/>
