<script lang="ts">
  // Import Actions
  import onLazyLoadImage from "@/use-actions/onLazyLoadImage";

  export let src: string;
  export let alt: string = "avatar";
  export let backgroundColor: string | "transparent" | null = null;
  export let position:
    | "bottom"
    | "center"
    | "left"
    | "left-bottom"
    | "left-top"
    | "right"
    | "right-bottom"
    | "right-top"
    | "top" = "center";

  let objectPositionClass = `object-${position}`;
</script>

<div
  class="w-full h-full"
  class:bg-neutral-800={backgroundColor !== "transparent"}
  style:background-color={backgroundColor && backgroundColor !== "transparent"
    ? backgroundColor
    : null}
>
  <img
    data-src={src}
    use:onLazyLoadImage
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    {alt}
    class="w-full h-full object-cover object-center {objectPositionClass}"
  />
</div>
