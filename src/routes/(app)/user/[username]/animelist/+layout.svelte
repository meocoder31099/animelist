<script lang="ts">
  // Import Types
  import type { LayoutData } from "./$types";
  import type { Maybe, CardMediaVerticalOptions } from "@/types";
  import { type MediaList, MediaType } from "@/types/anilistv2";
  import type { SelectItems } from "@/components/shared/SelectBase.svelte";

  // Import Libs
  import { onMount, setContext } from "svelte";
  import { goto } from "$app/navigation";
  import useUserMediaListCollection from "@/hooks/useUserMediaListCollection";
  import useCreateLink from "@/hooks/useCreateLink";

  // Import Stores
  import { page } from "$app/stores";
  import {
    UserMediaListCollectionStore,
    currentCollectionNameStore,
  } from "@/stores/UserMediaListCollectionStore";

  // Import Components
  import SelectBase from "@/components/shared/SelectBase.svelte";

  export let data: LayoutData;

  let routeID: Maybe<string> = null;
  let pagePath: string;
  let pageUrl: URL;
  let listType: Maybe<string> = null;
  const listTypes: SelectItems = {};
  let selectedListType: Maybe<string> = null;
  const sectionOrderIndex = new Map<string, number>();
  let listSection: string[] = [];
  const userMediaListCollection = useUserMediaListCollection({
    args: {
      userName: data.username,
      type: MediaType.Anime,
    },
  });

  onMount(() => {
    const unPageStore = page.subscribe((value) => {
      if (!value) return;
      routeID = value.route.id;
      pageUrl = value.url;
      pagePath = pageUrl.pathname.replace(/\/[^/]+$/, "");
      listType = pageUrl.searchParams.get("list");
    });

    const unUserMediaListCollectionStore = userMediaListCollection.subscribe(
      (value) => {
        const data = value.data;
        if (!!data) {
          // Get section order index.
          const { sectionOrder: listSectionOrder, customLists } =
            data.user?.mediaListOptions?.animeList || {};
          for (const section of listSectionOrder || []) {
            if (!section) continue;
            sectionOrderIndex.set(section, sectionOrderIndex.size + 1);
          }
          for (const section of customLists || []) {
            if (!section) continue;
            sectionOrderIndex.set(section, sectionOrderIndex.size + 1);
          }

          // Handle list data
          for (const list of data.lists ?? []) {
            if (!list) continue;
            const { name, entries } = list;
            if (!!name) {
              // Get list sections.
              listSection.push(name);
              // Get Media.
              const mediaList: (MediaList & {
                cardOption: CardMediaVerticalOptions;
              })[] = [];
              for (const entrie of entries ?? []) {
                if (!entrie?.media?.id) continue;
                const { progress, score } = entrie;
                const {
                  id,
                  type,
                  bannerImage,
                  coverImage,
                  title,
                  format,
                  episodes,
                } = entrie.media;
                mediaList.push({
                  ...entrie,
                  cardOption: {
                    id: id,
                    coverImage: {
                      alt: title?.userPreferred,
                      image:
                        coverImage?.large ||
                        coverImage?.extraLarge ||
                        coverImage?.medium,
                      color: coverImage?.color,
                    },
                    title: title?.userPreferred,
                    to: useCreateLink([
                      "/",
                      { value: type || "", convert: "lowcase" },
                      "/details/",
                      {
                        value: title?.userPreferred || "",
                        convert: "-",
                      },
                      "-an",
                      id,
                    ]),
                    subDescription: `${progress}/${episodes ?? "?"}${
                      score ? ` — ${score}` : ""
                    } — ${format}`,
                    bannerImage: bannerImage,
                  },
                });
              }
              if (!!mediaList.length)
                UserMediaListCollectionStore.update((value) => {
                  if (!value) value = {};
                  value[name] = mediaList;
                  return value;
                });
            }
          }

          // Sort listSection follow sectionOrderIndex.
          listSection.sort(
            (a, b) =>
              (sectionOrderIndex.get(a) ?? 0) - (sectionOrderIndex.get(b) ?? 0)
          );

          // Get list types.
          for (const section of listSection) {
            listTypes[section] = { title: section };
          }

          // Get selected list type.
          updateBrowseType();
        }
      }
    );

    return () => {
      unPageStore();
      unUserMediaListCollectionStore();
      currentCollectionNameStore.set(undefined);
    };
  });

  const changeListType = (collectionName: string) => {
    pageUrl.searchParams.set("list", collectionName);
    goto(pageUrl, {
      noScroll: true,
      replaceState: true,
      state: {
        isNotSaveHistory: true,
      },
    });
    currentCollectionNameStore.set(collectionName);
  };
  const updateBrowseType = (): void => {
    if (!!listType && !!listTypes[listType]) {
      selectedListType = listType;
      currentCollectionNameStore.set(listType);
    } else {
      const firstsectionOrder = listSection[0];
      if (!!firstsectionOrder) {
        selectedListType = firstsectionOrder;
        currentCollectionNameStore.set(firstsectionOrder);
      }
    }
  };
</script>

{#if !!selectedListType}
  <div class="flex flex-col gap-4">
    <div>
      <h2 class="text-lg md:text-xl lg:text-2xl">
        List
        <SelectBase
          data={listTypes}
          bind:value={selectedListType}
          name="userFavouriteTypes"
          on:select={(event) => {
            changeListType(event.detail);
          }}
        />
      </h2>
    </div>
    <slot />
  </div>
{:else}
  <div class="mt-16 flex items-center justify-center text-center gap-4">
    <svg
      viewBox="0 0 135 140"
      xmlns="http://www.w3.org/2000/svg"
      fill="#e03131"
      width="44px"
      class="mantine-1avyp1d"
      role="presentation"
      ><rect y="10" width="15" height="120" rx="6"
        ><animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        /><animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        /></rect
      ><rect x="30" y="10" width="15" height="120" rx="6"
        ><animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        /><animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        /></rect
      ><rect x="60" width="15" height="140" rx="6"
        ><animate
          attributeName="height"
          begin="0s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        /><animate
          attributeName="y"
          begin="0s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        /></rect
      ><rect x="90" y="10" width="15" height="120" rx="6"
        ><animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        /><animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        /></rect
      ><rect x="120" y="10" width="15" height="120" rx="6"
        ><animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        /><animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        /></rect
      ></svg
    >
  </div>
{/if}
