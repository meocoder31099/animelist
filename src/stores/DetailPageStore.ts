// Import Types
import type { Maybe } from "@/types";
import type { Writable } from "svelte/store";
import type {
  Media,
  CharacterEdge,
  StaffEdge,
  Recommendation,
  MediaEdge,
  MediaRank,
  MediaExternalLink,
  MediaStreamingEpisode,
  MediaStats,
} from "@/types/anilist";

import { writable } from "svelte/store";

export const isLoading: Writable<boolean> = writable(true);
export const isSuccess: Writable<boolean> = writable(false);
export const source: Writable<Maybe<Media>> = writable(null);
export const stats: Writable<Maybe<MediaStats>> = writable(null);
export const externalLink: Writable<Maybe<MediaExternalLink[]>> =
  writable(null);
export const streamingEpisodes: Writable<Maybe<MediaStreamingEpisode[]>> =
  writable(null);
export const characters: Writable<Maybe<CharacterEdge[]>> = writable(null);
export const staff: Writable<Maybe<StaffEdge[]>> = writable(null);
export const relations: Writable<Maybe<MediaEdge[]>> = writable(null);
export const recommendations: Writable<Maybe<Recommendation[]>> =
  writable(null);
export const rankings: Writable<Maybe<MediaRank[]>> = writable(null);
export const tabActive: any = writable("");
