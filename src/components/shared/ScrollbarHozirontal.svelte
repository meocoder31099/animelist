<script lang="ts">
  // Import Libs
  import { detectInView } from "@/utils";
  import { onMount } from "svelte";
  // Import Store
  import { isTouchDevice } from "@/stores/UserSettingStore";

  export let isNavigation: boolean = false;

  let scrollBar: HTMLElement;
  let availableToNext: boolean = true;
  let availableToPrevius: boolean = false;

  const scrollbarControl = (type: string) => {
    if (
      (!availableToPrevius && type !== "next") ||
      (!availableToNext && type === "next")
    )
      return;

    if (scrollBar.querySelector('[isView="1"]')) {
      // Kiểm tra nếu không phải loại next và thanh cuộn đang ở phần tử đầu tiên thì không cần cuộn.
      if (
        scrollBar.querySelector('[isView="1"]')?.getAttribute("data-index") ===
          "1" &&
        type !== "next"
      )
        return;

      const totalNumberElement = scrollBar.childElementCount;
      const lengthElementInView =
        scrollBar.querySelectorAll('[isView="1"]').length - 1;

      const indexFirstElementInView = parseInt(
        scrollBar
          .querySelector('[isView="1"]')
          ?.getAttribute("data-index") as string
      );

      const indexLastElementInView =
        indexFirstElementInView + lengthElementInView;

      // Kiểm tra nếu là loại next và thanh cuộn đang ở phần tử cuối cùng thì không cần cuộn.
      if (indexLastElementInView >= totalNumberElement && type === "next")
        return;

      const indexNextElement = indexLastElementInView + lengthElementInView;

      if (type === "next") {
        // Nếu tổng số Element của thanh cuộn lớn hơn index của Element cuối trong lần cuộn tiếp theo thì set availableToPrevius và availableToNext = true
        // Ngược lại thì set availableToPrevius = true và availableToNext = false
        if (totalNumberElement > indexNextElement) {
          availableToPrevius = true;
          availableToNext = true;
          scrollBar
            .querySelector(`[data-index="${indexNextElement}"]`)
            ?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "end",
            });
        } else {
          availableToPrevius = true;
          availableToNext = false;
          scrollBar.scrollBy({
            behavior: "smooth",
            left: scrollBar.scrollWidth,
          });
        }
      }
      // Nếu index của Element đầu tiên trong danh sách các Element đang được hiển thị trong thanh cuộn
      // lớn hơn số lượng Elment cần cuộn lùi lại thì set availableToPrevius và availableToNext = true
      // Ngược lại thì set availableToPrevius = false và availableToNext = true
      else {
        if (indexFirstElementInView > lengthElementInView + 1) {
          availableToPrevius = true;
          availableToNext = true;
          scrollBar
            .querySelector(
              `[data-index="${indexFirstElementInView - lengthElementInView}"]`
            )
            ?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            });
        } else {
          availableToPrevius = false;
          availableToNext = true;
          scrollBar.scrollBy({
            behavior: "smooth",
            left: -scrollBar.scrollWidth,
          });
        }
      }
    }
  };

  onMount(() => {
    Array.from(scrollBar.children).forEach((el, i) => {
      el.setAttribute("data-index", (i + 1).toString());
      detectInView(el as HTMLElement);
    });
  });
</script>

<div
  class="flex justify-center relative"
  class:mt-12={isNavigation || !$isTouchDevice}
>
  {#if isNavigation || !$isTouchDevice}
    <div class="absolute flex gap-x-2 right-2 -top-12">
      <!-- Previus -->
      <button
        on:click={() => scrollbarControl("previus")}
        class="block p-1 lg:p-2 rounded-full bg-neutral-900/80 lg:hover:bg-neutral-800 z-10"
        class:opacity-60={!availableToPrevius}
        class:cursor-not-allowed={!availableToPrevius}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="w-6 h-6 fill-current"
          ><path
            d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
          /></svg
        >
      </button>
      <!-- Next -->
      <button
        on:click={() => scrollbarControl("next")}
        class="block p-1 lg:p-2 rounded-full bg-neutral-900/80 lg:hover:bg-neutral-800 z-10"
        class:opacity-60={!availableToNext}
        class:cursor-not-allowed={!availableToNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="w-6 h-6 fill-current"
          ><path
            d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
          /></svg
        >
      </button>
    </div>
  {/if}
  <div
    bind:this={scrollBar}
    class="flex flex-row w-full overflow-x-auto snap-x scrollbar-none"
  >
    <slot />
  </div>
</div>
