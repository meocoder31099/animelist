// Import Types
import type { Writable } from "svelte/store";
import type {
  Maybe,
  MediaDetailsModal,
  CharacterDetailsModal,
  StaffDetailsModal,
  DetailsModalStack,
} from "@/types";

// Import Libs
import { writable } from "svelte/store";

export const currentModal: Writable<Maybe<DetailsModalStack>> = writable(null);
export const mediaDetailsModal: Writable<Maybe<MediaDetailsModal>> =
  writable(null);
export const characterDetailsModal: Writable<Maybe<CharacterDetailsModal>> =
  writable(null);
export const staffDetailsModal: Writable<Maybe<StaffDetailsModal>> =
  writable(null);
export const detailsModalStack: Writable<Maybe<DetailsModalStack[]>> =
  writable(null);
