<script lang="ts">
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
  import { navigating, page } from "$app/stores";

  let isMainPage: boolean = !!mainRoute[get(page).route.id ?? ""];
  let backLength: number = 0;
  let forwardLength: number = 0;
  let isFirstView: boolean = true;
  let isBackSave: boolean = true;
  let isClearForward: boolean = true;

  onMount(() => {
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

    return () => {
      unsubscribeNavigating();
    };
  });

  const toggleSideNavBar = () => {
    isSideNavBar.update((show) => !show);
  };

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
  class="fixed top-0 left-0 right-0 flex justify-between items-center px-2 md:px-5 py-2 text-white bg-neutral-900/95 transition-colors duration-300 z-40"
  class:!bg-transparent={$isTopNavbarBgTransparent}
>
  <div
    class="flex w-96 lg:justify-between items-center"
    class:!justify-start={!$isSideNavBar}
  >
    <div class="flex" class:!order-2={!$isSideNavBar}>
      <!-- Toggle SideNavbar -->
      <button
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
      </button>

      <!-- Logo -->
      <div class="items-end flex lg:flex" class:hidden={!isMainPage}>
        <img
          src="https://i.imgur.com/xlRkyew.png"
          class="w-10 max-h-10 rounded-full object-cover object-center"
          alt="logo"
        />
        <span class="text-xs scale-90 pb-6 text-neutral-400">EN</span>
      </div>
    </div>
    <!-- Navigations -->
    <div class="lg:flex gap-x-4 pr-14" class:hidden={isMainPage}>
      <!-- Previus -->
      <button
        class="block drop-shadow-xl p-2 rounded-full lg:bg-neutral-800/40 lg:hover:bg-neutral-800"
        class:text-neutral-400={!!!backLength}
        class:cursor-not-allowed={!!!backLength}
        on:click={backPage}
      >
        <svg
          viewBox="0 0 16 16"
          class="w-6 h-6 lg:w-5 lg:h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          /></svg
        >
      </button>
      <!-- Next -->
      <button
        class="hidden lg:block drop-shadow-xl p-2 rounded-full lg:bg-neutral-800/40 lg:hover:bg-neutral-800"
        class:text-neutral-400={!!!forwardLength}
        class:cursor-not-allowed={!!!forwardLength}
        on:click={forwardPage}
      >
        <svg
          viewBox="0 0 16 16"
          class="w-5 h-5 fill-current -scale-x-100"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          /></svg
        >
      </button>
    </div>
  </div>

  <div class="flex w-80 justify-end">
    <ul class="flex justify-center items-center space-x-6">
      <!-- Chung cho đã/chưa đăng nhập -->
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
          <span class="rounded-lg bg-neutral-800 p-2.5">Settings</span>
        </div>
      </li>
      <!-- Chưa đăng nhập -->
      <li>
        <button
          class="rounded-full bg-white text-neutral-900 px-3 md:px-4 py-1.5 inline-flex items-center"
        >
          <span class="font-semibold">Login</span>
        </button>
      </li>

      <!-- Đã đăng nhập -->
      <!-- <li>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 fill-current"><path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"></path></svg>
      </li>
      <li>
        <img
          class="rounded-full w-7 h-7"
          alt="avatar"
          src="https://raw.githubusercontent.com/leon-to/youtube.nuxt3.tailwindcss/develop/assets/img/leon.jpg"
        />
      </li> -->
    </ul>
  </div>
</nav>
