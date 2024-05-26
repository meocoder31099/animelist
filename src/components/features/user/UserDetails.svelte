<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { User, ModRole } from "@/types/anilistv2";

  // Import Libs
  import { onMount } from "svelte";
  import useUserInfo from "@/hooks/useUserInfo";

  // Import Components
  import UserBannerImage from "@/components/shared/UserBannerImage.svelte";
  import Image from "@/components/shared/Image.svelte";

  export let username: string;

  let moderatorRoles: Maybe<ModRole>[] = [];
  let userDetails: Maybe<User>;
  const userInfo = useUserInfo({
    args: {
      name: username,
    },
  });

  onMount(() => {
    const unUserInfo = userInfo.subscribe((value) => {
      const data = value.data;
      if (!!data) {
        userDetails = data;
        // Get moderator role.
        for (const moderatorRole of data.moderatorRoles ?? []) {
          if (!moderatorRole) continue;
          moderatorRoles.push(moderatorRole);
        }
      }
    });

    return () => {
      unUserInfo();
    };
  });
</script>

{#if userDetails}
  <div class="relative mb-4">
    <!-- Banner -->
    <UserBannerImage imageUrl={userDetails.bannerImage} />
    <!-- User info -->
    <div
      class="w-full max-w-details mx-auto flex flex-col md:flex-row gap-4 md:gap-4 items-center"
    >
      <!-- Avatar -->
      <div
        class="flex-shrink-0 w-40 h-40 -mt-28 md:-mt-14 rounded-full overflow-hidden z-10"
      >
        <Image src={userDetails.avatar?.large || ""} />
      </div>
      <div class="w-full flex flex-col md:flex-row gap-x-4 gap-y-6 px-2">
        <!-- Info -->
        <div
          class="basis-1/2 flex flex-col items-center md:items-start text-center"
        >
          <!-- Username -->
          <h2 class="font-bold text-2xl md:text-3xl leading-tight">
            {userDetails.name}
          </h2>
          {#if !!moderatorRoles}
            <div
              class="mt-2 flex justify-center md:justify-start flex-wrap gap-2"
            >
              {#each moderatorRoles as moderatorRole}
                <span
                  class="line-clamp-1 bg-neutral-800 text-xs px-2 py-0.5 rounded-lg"
                  >{moderatorRole}</span
                >
              {/each}
            </div>
          {/if}
        </div>
        <!-- Action -->
        <div class="basis-1/2 flex md:justify-end items-start gap-2">
          <!-- Fllow -->
          <button
            class="w-full md:w-fit inline-flex justify-center items-center px-4 py-2 font-semibold bg-neutral-800/80 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="w-5 h-5 fill-current"
              ><path d="M4 22h12v-2H4V8H2v12c0 1.103.897 2 2 2z" /><path
                d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-2 9h-3v3h-2v-3h-3V9h3V6h2v3h3v2z"
              /></svg
            >
            <span class="ml-2">Follow</span>
          </button>
          <!-- Dropmenu -->
          <button
            class="flex-shrink-0 inline-flex px-4 py-2 font-semibold bg-neutral-800/80 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="w-6 h-6 fill-current scale-90"
              ><path
                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              /></svg
            >
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
