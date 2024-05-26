<script lang="ts">
  //Import Type
  import type { DetailsModalStack } from "@/types";
  import type { Staff } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { fly } from "svelte/transition";
  import useStaffDetails from "@/hooks/useStaffDetails";
  import useDetailsModalHas from "@/hooks/useDetailsModalHas";
  import useDetailsModalBack from "@/hooks/useDetailsModalBack";
  import useDetailsModalClear from "@/hooks/useDetailsModalClear";
  // import useDetectMobile from "@/hooks/useDetectMobile";

  // Import Actions
  import onClickOutside from "@/use-actions/onClickOutside";

  // Import Stores
  import { isBottomTabBar } from "@/stores/UserSettingStore";
  import { staffDetailsModal } from "@/stores/GlobalStore";

  // Import Components
  import StaffDetailsModal from "@/components/shared/StaffDetailsModal.svelte";
  import CharacterDetailsModalSkeleton from "@/components/skeletons/CharacterDetailsModalSkeleton.svelte";

  export let options: DetailsModalStack;

  let isError: boolean = false;
  let isSuccess: boolean = false;
  let source: Staff;
  let isMobile: boolean = window.innerWidth < 768;
  const isBack: boolean = useDetailsModalHas();

  // useDetectMobile((value) => {
  //   isMobile = value;
  // });

  const details = useStaffDetails({
    args: {
      id: options.value.id,
    },
  });

  const details_unsubscribe = details.subscribe((data) => {
    isError = data.isError;
    isSuccess = data.isSuccess;
    if (data.data?.pages[0]) {
      source = data.data.pages[0];
    }
  });

  const closeModal = () => {
    staffDetailsModal.set(null);
  };

  const clearModal = () => {
    useDetailsModalClear(options.type);
  };

  afterNavigate(() => {
    clearModal();
  });

  onMount(() => {
    window?.document.querySelector("html")?.classList.add("!overflow-hidden");
    isBottomTabBar.set(false);

    return () => {
      window?.document
        .querySelector("html")
        ?.classList.remove("!overflow-hidden");
      isBottomTabBar.set(true);

      details_unsubscribe();
    };
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="fixed inset-0 w-full h-full z-50 bg-background/60 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-w-1"
  class:lg:scrollbar-thumb-neutral-500={isSuccess}
>
  <div class="w-full xl:w-2/4 h-full flex flex-col mx-auto pt-12 md:px-4">
    <div
      in:fly={{
        y: options.value.isBack ? 0 : 100,
        x: options.value.isBack ? -100 : 0,
        opacity: 1,
        duration: 400,
      }}
      class="w-full h-fit flex grow flex-col rounded-t-lg bg-neutral-900"
    >
      <!-- Backgroud -->
      <div
        class="fixed inset-0 blur-3xl bg-cover bg-center bg-no-repeat opacity-10"
        style:background-image={`url("${options.value.image}")`}
      />
      <div
        class="w-full h-full shadow shadow-neutral-900 relative"
        use:onClickOutside={clearModal}
      >
        <!-- Back Button -->
        {#if isBack}
          <button
            on:click={() => {
              closeModal();
              useDetailsModalBack();
            }}
            class="absolute top-2 left-3 md:top-4 md:left-4 bg-neutral-800 rounded-full md:p-1 z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current w-7 h-7"
              ><path
                d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"
              /></svg
            >
          </button>
        {/if}
        <!-- Clear Button -->
        <button
          on:click={() => {
            clearModal();
          }}
          class="absolute top-2 right-3 md:top-4 md:right-4 bg-neutral-800 rounded-full md:p-1 z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current w-7 h-7"
            ><path
              d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
            /></svg
          >
        </button>
        {#if isSuccess}
          <StaffDetailsModal {source} />
        {:else}
          <CharacterDetailsModalSkeleton />
        {/if}
      </div>
    </div>
  </div>
</div>
