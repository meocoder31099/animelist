// Import Types
import type { MediaList } from "@/types/anilistv2";
import type { CardMediaVerticalOptions } from "@/types";
import type { Writable } from "svelte/store";

// Import Libs
import { writable } from "svelte/store";

export const UserMediaListCollectionStore: Writable<
  Record<string, (MediaList & { cardOption: CardMediaVerticalOptions })[]>
> = writable();

export const currentCollectionNameStore: Writable<string | undefined> = writable();
