<script lang="ts">
  // Import libs
  import { lazyImage } from "../../utils/lazyLoad";
  import { aniListDescriptionRewrite } from "../../utils/aniList";
  import { fade } from "svelte/transition";

  export let isLoading = true;
  export let isSuccess = false;
  export let source: any = [];
</script>

<div class="w-full flex flex-col gap-8 justify-center mt-20 mb-6">
  {#if isLoading}
    <div class="w-full bg-neutral-900 p-4 md:p-8 animate-pulse">
      <div
        class="max-w-6xl 3xl:max-w-[1520px] w-full flex gap-4 md:gap-6 3xl:gap-8 mx-auto"
      >
        <div
          class="w-[120px] md:w-[180px] shrink-0 flex flex-col gap-4 relative"
        >
          <div class="aspect-w-2 aspect-h-3">
            <div class="w-full h-full rounded bg-neutral-800 overflow-hidden" />
          </div>
        </div>
        <div class="w-full flex justify-between">
          <div class="w-full flex flex-col gap-y-2 md:gap-y-4">
            <div class="w-full xl:w-3/4 h-6 bg-neutral-800 rounded" />
            <div class="w-2/3 h-4 bg-neutral-800 rounded" />
            <div
              class="mt-4 2xl:mt-6 w-1/2 md:w-1/6 h-4 bg-neutral-800 rounded"
            />
            <div class="w-1/2 h-4 bg-neutral-800 rounded" />
            <div class="w-1/2 h-4 bg-neutral-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  {:else if isSuccess}
    <div in:fade|global class="w-full bg-neutral-900 p-4 md:p-8">
      <div
        class="max-w-6xl 3xl:max-w-[1520px] w-full flex gap-4 md:gap-6 3xl:gap-8 mx-auto"
      >
        <div
          class="w-[120px] md:w-[180px] shrink-0 flex flex-col gap-4 relative"
        >
          <div class="aspect-w-2 aspect-h-3">
            <div class="w-full h-full rounded overflow-hidden">
              <img
                data-lazy={source.image.large}
                use:lazyImage
                alt=""
                class="w-full h-full bg-neutral-800 shadow-md shadow-black object-cover object-center rounded"
              />
            </div>
            <div class="w-full h-full">
              <div class="absolute top-1 right-1 flex justify-center">
                <div
                  class="bg-rose-500 py-0.5 px-1.5 rounded-lg inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="fill-current w-4 h-4"
                    ><path
                      d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"
                    /></svg
                  >
                  <span class="text-sm ml-1.5 font-medium"
                    >{source.favourites}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between overflow-hidden">
          <div class="flex flex-col gap-y-1.5 md:gap-y-4">
            <h1 class="text-2xl md:text-4xl font-medium">
              {source.name.userPreferred}
            </h1>
            <div class="text-sm md:text-lg line-clamp-2">
              {#if source.name.native}
                <span class="last:after:content-[''] after:content-[',_']"
                  >{source.name.native}</span
                >
              {/if}
              {#each source.name.alternative as alternative}
                <span class="last:after:content-[''] after:content-[',_']"
                  >{alternative}</span
                >
              {/each}
            </div>
            <div class="flex flex-col mt-2 md:gap-1 md:text-lg">
              {#if source.gender}
                <div>
                  <span class="font-medium mr-2">Home town:</span
                  >{source.homeTown}
                </div>
              {/if}
              {#if source.homeTown}
                <div>
                  <span class="font-medium mr-2">Birthday:</span>{source
                    .dateOfBirth.day}/{source.dateOfBirth.month}
                </div>
              {/if}
              {#if source.dateOfBirth.month}
                <div>
                  <span class="font-medium mr-2">Birthday:</span>{source
                    .dateOfBirth.day}/{source.dateOfBirth.month}/{source
                    .dateOfBirth.year}
                </div>
              {/if}
              <div>
                <span class="font-medium mr-2">Years active:</span>{source
                  .yearsActive[0]} - {source.yearsActive[1] || "present"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- Old style -->

<!-- <script lang="ts">
  // Import libs
  import { lazyImage } from "../../utils/lazyLoad";
  import { aniListDescriptionRewrite } from "../../utils/aniList";
  import { fade } from "svelte/transition";

  export let isLoading = true;
  export let isSuccess = false;
  export let source: any = [];

  // let isMoreDescription = false;

  // const viewMore = (event: MouseEvent) => {
  //   const target = event.target as HTMLDivElement;
  //   if (!target.getAttribute("spoiler")) isMoreDescription = !isMoreDescription;
  // };
</script>

<div class="w-full flex flex-col gap-8 justify-center px-5 mb-32">
  {#if isLoading}
    <div class="w-full bg-neutral-900 py-8 ">
      <div class="max-w-[1520px] mx-auto w-full grid grid-cols-12 gap-8">
        <div class="col-span-2 relative">
          <div class="absolute inset-0 pl-8">
            <div class="aspect-w-2 aspect-h-3">
              <div
                class="w-full h-full rounded bg-neutral-800 overflow-hidden"
              />
            </div>
          </div>
        </div>
        <div class="col-span-10 flex justify-between">
          <div class="w-full flex flex-col gap-y-2">
            <div class="w-1/3 h-10 bg-neutral-800 rounded" />
            <div class="w-1/5 h-6 bg-neutral-800 rounded" />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full max-w-[1520px] mx-auto grid grid-cols-12 gap-8">
      <div class="col-span-2" />
      <div class="col-span-10 animate-pulse">
        <div class="flex flex-col gap-y-4">
          <div class="w-1/2 mb-2 h-6 bg-neutral-800 rounded" />
          <div class="flex flex-col">
            <div class="w-full mb-1.5 h-6 bg-neutral-800 rounded" />
            <div class="w-full mb-1.5 h-6 bg-neutral-800 rounded" />
            <div class="w-1/2 h-6 bg-neutral-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  {:else if isSuccess}
    <div in:fade|global class="w-full bg-neutral-900 py-8">
      <div class="max-w-[1520px] w-full grid grid-cols-12 gap-8 mx-auto">
        <div class="col-span-2 relative">
          <div class="absolute inset-0 pl-8">
            <div class="aspect-w-2 aspect-h-3">
              <div class="w-full h-full rounded overflow-hidden">
                <img
                  data-lazy={source.image.large}
                  use:lazyImage
                  alt=""
                  class="w-full h-full bg-neutral-800 shadow-md shadow-black object-cover object-center rounded"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-10 flex justify-between">
          <div class="flex flex-col gap-y-2">
            <h1 class="text-3xl font-medium">{source.name.userPreferred}</h1>
            <div>
              {#if source.name.native}
                <span class="last:after:content-[''] after:content-[',_']"
                  >{source.name.native}</span
                >
              {/if}
              {#each source.name.alternative as alternative}
                <span class="last:after:content-[''] after:content-[',_']"
                  >{alternative}</span
                >
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div in:fade|global class="max-w-[1520px] mx-auto w-full grid grid-cols-12 gap-8">
      <div class="col-span-2" />
      <div class="col-span-10">
        <div class="flex flex-col gap-y-4">
          <div class="flex flex-wrap gap-y-2 items-center">
            <div
              class="bg-rose-500 py-0.5 px-1.5 rounded-lg inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="fill-current w-4 h-4"
                ><path
                  d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"
                /></svg
              >
              <span class="text-sm ml-1.5 font-medium">{source.favourites}</span
              >
            </div>
            <span class="w-1 h-1 rounded-full bg-neutral-500 mx-3" />
            <span class="font-medium mr-2">Gender:</span>{source.gender}
            <span class="w-1 h-1 rounded-full bg-neutral-500 mx-3" />
            {#if source.homeTown}
              <span class="font-medium mr-2">Home town:</span>{source.homeTown}
              <span class="w-1 h-1 rounded-full bg-neutral-500 mx-3" />
            {/if}
            {#if source.dateOfBirth.month}
              <span class="font-medium mr-2">Birthday:</span>{source.dateOfBirth
                .day}/{source.dateOfBirth.month}
              <span class="w-1 h-1 rounded-full bg-neutral-500 mx-3" />
            {/if}
            {#if source.dateOfDeath.year}
              <span class="font-medium mr-2">Death:</span>{source.dateOfDeath
                .day}/{source.dateOfDeath.month}/{source.dateOfDeath.year}
              <span class="w-1 h-1 rounded-full bg-neutral-500 mx-3" />
            {/if}
            <span class="font-medium mr-2">Years active:</span>{source
              .yearsActive[0]} - {source.yearsActive[1] || "present"}
            <span class="w-1 h-1 rounded-full bg-neutral-500 mx-3" />
            <span class="font-medium mr-2">Blood type:</span>{source.bloodType}
            <span class="w-1 h-1 rounded-full bg-neutral-500 mx-3" />
            <span class="font-medium mr-2">Age:</span>{source.age || "?"}
          </div>
          <div class="w-full group relative">
            <div
              class="overflow-hidden"
              class:aspect-w-16={!isMoreDescription}
              class:aspect-h-[1.2]={!isMoreDescription}
            >
              <div class="w-full h-full flex flex-col">
                {@html aniListDescriptionRewrite(source.description)}
              </div>
            </div>
            <button
              on:click={(event) => viewMore(event)}
              class={!isMoreDescription
                ? "w-full h-14 absolute -bottom-8 z-10 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent"
                : "w-full h-14 z-10"}
              ><span
                class="opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-medium"
                >{isMoreDescription ? "Thu gọn" : "Xem thêm"}</span
              ></button
            >
          </div>
        </div>
      </div>
    </div>
  {/if}
</div> -->
