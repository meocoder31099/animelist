<script lang="ts">
  //Import Types
  import type { Maybe, DetailsModalStack, MediaDetailsModal } from "@/types";
  import { type Media, MediaType } from "@/types/anilist";

  export let detailsLink: string;
  export let mediaType: Maybe<MediaType>;
  export let isSuccess: boolean = true;

  let viewLink: string = "";
</script>

<div class="md:-mt-20 z-10">
  <div
    class="w-full flex flex-row justify-between md:justify-start items-center gap-x-3 md:gap-x-10 px-3 md:px-6 lg:px-12 md:pb-6"
  >
    <!-- Play/Read -->
    {#if isSuccess}
      <a class="w-1/2 md:w-40 shrink-0" href={viewLink}>
        <button
          class="w-full drop-shadow-xl bg-neutral-100 text-black py-2 my-3 md:my-0 px-6 font-bold rounded-lg flex justify-center items-center transition-opacity duration-300 hover:opacity-80"
        >
          {#if mediaType === MediaType.Anime}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="fill-current w-6 h-6"
              ><path
                d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"
              />
            </svg>
          {:else}
            <svg viewBox="0 0 20 20" class="fill-current w-6 h-6 scale-90"
              ><g fill-rule="evenodd" transform="translate(-446 -350)"
                ><path
                  d="M457 368.832a.5.5 0 0 0 .883.323l1.12-1.332a.876.876 0 0 1 .679-.323h3.522a2.793 2.793 0 0 0 2.796-2.784v-10.931a2.793 2.793 0 0 0-2.796-2.785h-3.454a2.75 2.75 0 0 0-2.75 2.75v15.082zm-1.5 0a.5.5 0 0 1-.883.323l-1.12-1.332a.876.876 0 0 0-.679-.323h-3.522a2.793 2.793 0 0 1-2.796-2.784v-10.931a2.793 2.793 0 0 1 2.796-2.785h3.454a2.75 2.75 0 0 1 2.75 2.75v15.082z"
                /></g
              ></svg
            >
          {/if}
          <span class="ml-2 3xl:text-lg"
            >{mediaType === MediaType.Anime ? "Play" : "Read"}</span
          >
        </button>
      </a>
    {:else}
      <button
        class="w-1/2 md:w-40 shrink-0 bg-neutral-100 text-black py-2 my-3 md:my-0 px-6 rounded-lg inline-flex justify-center items-center cursor-not-allowed"
      >
        <svg
          class="animate-spin h-5 w-5 3xl:h-6 3xl:w-6 m-0.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </button>
    {/if}
    <div
      class="flex w-full justify-evenly md:justify-start gap-x-3 md:gap-x-10"
    >
      <!-- Save Button -->
      <button
        class="flex flex-col gap-y-0.5 items-center justify-between text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="w-7 h-7 3xl:w-6 3xl:h-6 fill-current"
          ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg
        >
        <span class="text-sm scale-90 3xl:scale-100">List</span>
      </button>
      <!-- Details Button -->
      <a href={detailsLink}>
        <button
          class="flex flex-col gap-y-0.5 items-center justify-between text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-7 h-7 3xl:w-6 3xl:h-6 fill-current scale-90"
            ><path
              d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
            /><path d="M11 11h2v6h-2zm0-4h2v2h-2z" /></svg
          >
          <span class="text-sm scale-90 3xl:scale-100">Details</span>
        </button>
      </a>
    </div>
  </div>
</div>
