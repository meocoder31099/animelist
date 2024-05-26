<script lang="ts">
  // Import Libs

  //Import Components
  import Image from "@/components/shared/Image.svelte";

  export let bannerImageUrl: string | undefined;
  export let thumbImgageUrl: string;
  export let isMobile: boolean;
</script>

{#if !isMobile}
  <div class="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden z-0">
    <Image src={bannerImageUrl || thumbImgageUrl} position={bannerImageUrl ? 'center' : 'top'}/>
    <div
      class="w-full h-full bg-gradient-to-t from-neutral-900 via-transparent to-transparent"
    />
    {#if !isMobile && !bannerImageUrl}
      <div
        class="absolute inset-0 flex flex-col justify-end md:px-6 lg:px-12 pb-24"
      >
        <div class="w-40">
          <div class="aspect-w-2 aspect-h-3">
            <div class="w-full h-full rounded-lg overflow-hidden">
              <Image src={thumbImgageUrl} />
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}
