<script lang="ts">
  // Import Css
  import "@/app.css";

  // Import Type
  import type { SvelteComponent } from "svelte";
  import type { Maybe, DetailsModalStack } from "@/types";

  // Import Enum
  import { DetailsModalStackTypes } from "@/types";

  // Import Libs
  import { onMount, onDestroy, tick } from "svelte";
  // import { page } from "$app/stores";
  // import { fade, slide } from "svelte/transition";
  import useDetailsModalUpdate from "@/hooks/useDetailsModalUpdate";

  // Import Stores
  import { isSideNavBar } from "@/stores/UserSettingStore";
  import {
    mediaDetailsModal,
    characterDetailsModal,
    staffDetailsModal,
  } from "@/stores/GlobalStore";

  // Import Components
  import TopNavbar from "@/layout/TopNavbar.svelte";
  import SideNavbar from "@/layout/SideNavbar.svelte";
  // import MediaDetailsModalWrap from "@/components/wrapped/MediaDetailsModalWrap.svelte";
  // import ChracterDetailsModalWrap from "@/components/wrapped/ChracterDetailsModalWrap.svelte";
  // import StaffDetailsModalWrap from "@/components/wrapped/StaffDetailsModalWrap.svelte";
  // import Footer from "../../layout/Footer.svelte";

  let MediaDetailsModalWrap: typeof SvelteComponent<any>;
  let ChracterDetailsModalWrap: typeof SvelteComponent<any>;
  let StaffDetailsModalWrap: typeof SvelteComponent<any>;
  let mediaModal: Maybe<DetailsModalStack> = null;
  let isShowMediaDetailsModal: boolean = false;
  let characterModal: Maybe<DetailsModalStack> = null;
  let isShowCharacterDetailsModal: boolean = false;
  let staffModal: Maybe<DetailsModalStack> = null;
  let isShowStaffDetailsModal: boolean = false;

  onMount(() => {
    import("@/components/wrapped/MediaDetailsModalWrap.svelte").then(
      (module) => {
        MediaDetailsModalWrap = module.default;
      }
    );
    import("@/components/wrapped/ChracterDetailsModalWrap.svelte").then(
      (module) => {
        ChracterDetailsModalWrap = module.default;
      }
    );
    import("@/components/wrapped/StaffDetailsModalWrap.svelte").then(
      (module) => {
        StaffDetailsModalWrap = module.default;
      }
    );

    const mediaDetailsModal_unsubscribe = mediaDetailsModal.subscribe(
      (value) => {
        if (!!value) {
          mediaModal = {
            type: DetailsModalStackTypes.Media,
            value: value,
          };
          useDetailsModalUpdate(DetailsModalStackTypes.Media, value);
        }
        isShowMediaDetailsModal = !!value;
      }
    );

    // detailsModalStack.subscribe((value) => {
    //   console.log(new Date().toLocaleString(), value);
    // });

    const characterDetailsModal_unsubscribe = characterDetailsModal.subscribe(
      (value) => {
        if (!!value) {
          characterModal = {
            type: DetailsModalStackTypes.Character,
            value: value,
          };
          useDetailsModalUpdate(DetailsModalStackTypes.Character, value);
        }
        isShowCharacterDetailsModal = !!value;
      }
    );

    const staffDetailsModal_unsubscribe = staffDetailsModal.subscribe(
      (value) => {
        if (!!value) {
          staffModal = {
            type: DetailsModalStackTypes.Staff,
            value: value,
          };
          useDetailsModalUpdate(DetailsModalStackTypes.Staff, value);
        }
        isShowStaffDetailsModal = !!value;
      }
    );

    return () => {
      mediaDetailsModal_unsubscribe();
      characterDetailsModal_unsubscribe();
      staffDetailsModal_unsubscribe();
    };
  });
</script>

<div class="flex flex-col min-h-screen h-full w-full">
  <TopNavbar />
  <div class="flex flex-row w-full h-full">
    <!-- <SideNavbar /> -->
    <!-- {#key $page.url} -->
    <div
      class="flex flex-col w-full h-full lg:pl-20"
    >
      {#key mediaModal}
        {#if mediaModal && isShowMediaDetailsModal}
          <svelte:component this={MediaDetailsModalWrap} options={mediaModal} />

          <!-- {#await MediaDetailsModalWrap() then MediaDetailsModalWrapComponent}
            <MediaDetailsModalWrapComponent options={mediaModal} />
          {/await} -->
        {/if}
      {/key}
      {#key characterModal}
        {#if characterModal && isShowCharacterDetailsModal}
          <svelte:component
            this={ChracterDetailsModalWrap}
            options={characterModal}
          />
          <!-- {#await ChracterDetailsModalWrap() then ChracterDetailsModalWrapComponent}
            <ChracterDetailsModalWrapComponent options={characterModal} />
          {/await} -->
        {/if}
      {/key}
      {#key staffModal}
        {#if staffModal && isShowStaffDetailsModal}
          <svelte:component this={StaffDetailsModalWrap} options={staffModal} />
          <!-- {#await StaffDetailsModalWrap() then StaffDetailsModalWrapComponent}
            <StaffDetailsModalWrapComponent options={staffModal} />
          {/await} -->
        {/if}
      {/key}
      <slot />
      <!-- <Footer /> -->
    </div>
    <!-- {/key} -->
  </div>
</div>
