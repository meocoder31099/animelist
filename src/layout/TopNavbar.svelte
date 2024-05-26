<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { User } from "@/types/anilistv2";

  // Import Libs
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { mainRoute } from "@/stores/DetailDataStore";
  import { get } from "svelte/store";

  // Import Stores
  import {
    isSideNavBar,
    isTopNavbarBgTransparent,
  } from "@/stores/UserSettingStore";
  import { user } from "@/stores/GlobalStore";
  import { navigating, page } from "$app/stores";

  // Import Components
  const Image = async () =>
    (await import("@/components/shared/Image.svelte")).default;

  let userDetails: Maybe<User> = null;
  let isMainPage: boolean = !!mainRoute[get(page).route.id ?? ""];
  let backLength: number = 0;
  let forwardLength: number = 0;
  let isFirstView: boolean = true;
  let isBackSave: boolean = true;
  let isClearForward: boolean = true;

  onMount(() => {
    // Watch navigation to handle backPage and forwardPage.
    const unsubscribeNavigating = navigating.subscribe((navigation) => {
      if (!!navigation) {
        // Check if the next route is the main route.
        isMainPage = !!mainRoute[navigation.to?.route.id ?? ""];
        if (!navigation.from) {
          if (!isMainPage) {
            backLength++;
          } else {
            isFirstView = false;
          }
          return;
        }

        // Nếu url không đổi thì không cần làm gì nữa.
        if (navigation.from.url.pathname === navigation.to?.url.pathname)
          return;

        // Nếu trang đã được xem thì cập nhật lại giá trị isFirstView thành false. (dùng để quay lại trang chủ nếu trang đầu tiên được truy cập không phải là trang chủ)
        if (isFirstView) {
          isFirstView = false;
          backLength--;
        }

        // Không thêm trang và danh sách lịch sử khi có state.isNotSaveHistory = true
        if (isBackSave && !history.state.isNotSaveHistory) {
          backLength++;
        }
        if (isClearForward) forwardLength = 0;
        // Nếu backLength đã về 0 mà vẫn chưa ở trang chủ thì tăng thêm một lượt và đặt isFirstView = true để trở về trang chủ.
        if (!backLength && !isMainPage) {
          backLength++;
          forwardLength = 0;
          isFirstView = true;
        }

        isBackSave = true;
        isClearForward = true;
      } else {
        if (isFirstView) {
          if (!isMainPage) {
            backLength++;
            isFirstView = false;
          } else {
            isFirstView = false;
          }
          return;
        }
      }
    });

    const unUser = user.subscribe((value) => {
      userDetails = value ?? null;
    });

    return () => {
      unUser();
      unsubscribeNavigating();
    };
  });

  const toggleSideNavBar = () => {
    isSideNavBar.update((show) => !show);
  };
  isSideNavBar.set(false);

  const backPage = () => {
    if (!backLength) return;
    isBackSave = false;
    isClearForward = false;
    backLength--;
    if (isFirstView) {
      isFirstView = false;
      goto("/");
      return;
    }
    forwardLength++;
    history.back();
  };
  const forwardPage = () => {
    if (!forwardLength) return;
    isBackSave = false;
    isClearForward = false;
    forwardLength--;
    backLength++;
    history.forward();
  };
</script>

<nav
  class="fixed top-0 left-0 right-0 h-14 flex justify-between items-center gap-x-2 px-2 lg:px-0 py-2 text-white bg-neutral-900/95 transition-colors duration-300 z-40"
  class:!bg-transparent={$isTopNavbarBgTransparent}
>
  <!-- Left -->
  <div class="flex w-96 lg:justify-between items-center">
    <!-- Navigations -->
    <div
      class="lg:w-20 lg:flex lg:justify-between lg:p-2 pr-14 lg:scale-90 lg:border lg:border-neutral-600 lg:rounded-lg"
      class:hidden={isMainPage}
    >
      <!-- Previus -->
      <button
        class="block rounded-full"
        class:text-neutral-600={!!!backLength}
        class:cursor-not-allowed={!!!backLength}
        on:click={backPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="w-6 h-6 fill-current"
          ><path
            d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"
          /></svg
        >
      </button>
      <!-- Next -->
      <button
        class="hidden lg:block rounded-full"
        class:text-neutral-600={!!!forwardLength}
        class:cursor-not-allowed={!!!forwardLength}
        on:click={forwardPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="w-6 h-6 fill-current"
          ><path
            d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"
          /></svg
        >
      </button>
    </div>
    <!-- <div class="flex"> -->
    <!-- Toggle SideNavbar -->
    <!-- <button
        class="hidden lg:block p-2 rounded-full mr-2 lg:hover:bg-neutral-800"
        on:click={toggleSideNavBar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="w-6 h-6 fill-current"
          ><path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12h12M3 6h18M3 18h6"
          /></svg
        >
      </button> -->

    <!-- Logo -->
    <!-- <div class="items-end flex lg:flex" class:hidden={!isMainPage}>
        <img
          src="https://anilist.co/img/icons/icon.svg"
          class="w-10 max-h-10"
          alt="logo"
        />
        <span class="text-xs scale-90 pb-6 text-neutral-400">EN</span>
      </div> -->
    <!-- </div> -->
  </div>
  <!-- Right -->
  <div class="flex w-80 justify-end">
    <ul class="flex justify-center items-center space-x-6">
      <li>
        <a href="/browse/anime">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="w-6 h-6 fill-current"
            ><path
              d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
            /></svg
          >
        </a>
      </li>
      {#if !!userDetails}
        <!-- Đã đăng nhập -->
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="w-6 h-6 fill-current"
            ><path
              d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"
            /></svg
          >
        </li>
        <li>
          <div class="w-6 h-6">
            {#await Image() then ImageComponent}
              <a href={`/user/${userDetails.name}`}>
                <ImageComponent
                  src={userDetails.avatar?.large || ""}
                  backgroundColor="transparent"
                />
              </a>
            {/await}
          </div>
        </li>
      {:else}
        <!-- Chưa đăng nhập -->
        <li class="relative group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="w-6 h-6 fill-current"
            ><path
              d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            /></svg
          >
          <div
            class="hidden group-hover:flex absolute -bottom-20 left-1/2 -translate-x-1/2 w-56 justify-center items-center text-sm"
          >
            <span class="rounded-lg bg-neutral-800 p-2.5">Cài đặt</span>
          </div>
        </li>
        <li>
          <a
            href="https://anilist.co/api/v2/oauth/authorize?client_id=12599&response_type=token"
          >
            <button
              class="rounded-full bg-white text-neutral-900 px-3 md:px-4 py-1.5 inline-flex items-center"
            >
              <span class="font-semibold">Đăng nhập</span>
            </button>
          </a>
        </li>
      {/if}
    </ul>
  </div>
</nav>
