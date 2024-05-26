<script lang="ts">
  export let align: "center" | "left" | "right" = "center";
  export let rounded: boolean = false;
</script>

<div class="w-full bg-neutral-900 px-2" class:rounded-lg={rounded}>
  <div
    class="flex w-full shrink-0"
    class:justify-center={align === "center"}
    class:justify-start={align === "left"}
    class:justify-end={align === "right"}
  >
    <div class="w-16 h-14 flex items-center justify-center mx-5">
      <div class="w-full h-4 rounded bg-neutral-800" />
    </div>
    <div class="w-16 h-14 flex items-center justify-center mx-5">
      <div class="w-full h-4 rounded bg-neutral-800" />
    </div>
    <div class="w-16 h-14 flex items-center justify-center mx-5">
      <div class="w-full h-4 rounded bg-neutral-800" />
    </div>
  </div>
</div>
