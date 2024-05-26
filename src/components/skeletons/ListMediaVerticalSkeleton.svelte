<script lang="ts">
  // Import Libs
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";

  //Import Stores
  import { isSideNavBar, isTouchDevice } from "@/stores/UserSettingStore";

  // Import Components
  import CardVerticalBaseSkeleton from "@/components/skeletons/CardVerticalBaseSkeleton.svelte";

  export let numberChild: number;

  let isSideNavBarValue: boolean = true;
  let isTouchDeviceValue: boolean = true;
  let isSnapStart: boolean = true;
  let isSnapEnd: boolean = false;

  $: isSnapStart = !isTouchDeviceValue && isSideNavBarValue;
  $: isSnapEnd = !isTouchDeviceValue && !isSideNavBarValue;

  onMount(() => {
    // Subscribe to changes in isSideNavBar
    const isSideNavBar_unsubscribe = isSideNavBar.subscribe((value) => {
      isSideNavBarValue = value;
    });
    // Subscribe to changes in isTouchDevice
    const isTouchDevice_unsubscribe = isTouchDevice.subscribe((value) => {
      isTouchDeviceValue = value;
    });

    return () => {
      isSideNavBar_unsubscribe();
      isTouchDevice_unsubscribe();
    };
  });
</script>

{#each { length: numberChild } as _, i}
  <div
    in:scale={{
      delay: i * 200,
      start: 0.9,
    }}
    class="w-100/29 md:w-1/5 lg:w-1/6 2xl:w-1/7 3xl:w-1/8 first:ml-2 md:first:ml-6 lg:first:ml-8 mr-2 sm:mr-2.5 md:mr-2 lg:md:mr-3 2xl:mr-3 3xl:mr-4 4xl:mr-5 shrink-0"
    class:snap-start={isSnapStart}
    class:snap-end={isSnapEnd}
    class:lg:first:!ml-0={isSideNavBarValue}
  >
    <CardVerticalBaseSkeleton />
  </div>
{/each}

<!-- to={useCreateLink([
  "/",
  { value: media.type || "", convert: "lowcase" },
  "/details/",
  { value: media.title?.userPreferred || "", convert: "-" },
  "-an",
  media.id,
])} -->
