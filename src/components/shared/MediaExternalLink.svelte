<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { MediaExternalLink } from "@/types/anilist";

  // Import Enum
  import { ExternalLinkType } from "@/types/anilist";

  // Import Libs
  import useOpenNewWindow from "@/hooks/useOpenNewWindow";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let isLoading: boolean = true;
  export let isSuccess: boolean = false;
  export let source: Maybe<MediaExternalLink[]> = null;
  let info: Maybe<MediaExternalLink[]> = [];
  let streaming: Maybe<MediaExternalLink[]> = [];
  let social: Maybe<MediaExternalLink[]> = [];
  let sourceSorted: Maybe<MediaExternalLink[]> = null;

  if (!!source)
    for (let obj of source) {
      if (obj.type === ExternalLinkType.Info) {
        info.push(obj);
      } else if (obj.type === ExternalLinkType.Streaming) {
        streaming.push(obj);
      } else if (obj.type === ExternalLinkType.Social) {
        social.push(obj);
      }
    }

  sourceSorted = [...info, ...social, ...streaming];
</script>

{#if !!sourceSorted}
  <div
    class="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 py-2"
  >
    {#each sourceSorted as external}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => {
          useOpenNewWindow(external.url);
        }}
        class="col-span-1 flex gap-3 border border-neutral-800 p-2 rounded-lg cursor-pointer relative"
      >
        <div
          class="w-16 shrink-0 p-4 rounded-lg overflow-hidden"
          class:bg-neutral-700={!!!external?.icon}
          style:background-color={external.color}
        >
          <div class="aspect-w-1 aspect-h-1">
            <div class="flex justify-center items-center">
              {#if !!external?.icon}
                <Image
                  src={external?.icon || ""}
                  backgroundColor={"transparent"}
                />
              {:else}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="w-8 h-8 fill-current"
                  ><path
                    d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"
                  /><path
                    d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"
                  /></svg
                >
              {/if}
            </div>
          </div>
        </div>
        <div class="text-sm sm:text-base flex flex-col justify-evenly">
          <span class="font-bold font-lexenddeca">{external.site}</span>
          <div>
            <span class="text-sm">{external.type}</span>
            {#if external.language}
              <span class="text-sm">({external.language})</span>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}
