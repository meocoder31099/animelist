<script lang="ts">
  //Import Types
  import type { Maybe } from "@/types";

  export let backgroundColor: Maybe<string> = null;
  export let size: "small" | "normal" = "normal";
</script>

<span
  class="{`${
    size === 'small' ? 'w-0.5 h-0.5' : 'w-1 h-1'
  }`} rounded-full bg-neutral-500 opacity-60 last:hidden"
  style:background-color={backgroundColor}
/>
