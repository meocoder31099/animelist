<!-- <script context="module" lang="ts">
  export interface CardReviewProps extends Omit<Review, "media" | "user"> {
    media: {
      id: number;
      image: string;
      name: string;
      href: string;
      bannerImage?: string;
    };
    user: {
      id: number;
      avatar: string;
      name: string;
    };
  }
</script> -->

<script lang="ts">
  // Import Types
  // import type { Review } from "@/types/anilistv2";
  type ReviewMedia = {
    name: string;
    coverImage: string;
    bannerImage?: string;
  };
  type ReviewUser = {
    id: number;
    avatar: string;
    name: string;
  };

  // Import Actions
  // import onMediaDetailsModal from "@/use-actions/onMediaDetailsModal";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let summary: string = "";
  export let rating: number;
  export let href: string;
  export let media: ReviewMedia;
  export let user: ReviewUser;

  const coverImage = media.bannerImage || media.coverImage;
</script>

<a
  class="h-full w-full flex flex-col gap-y-3 p-3 bg-neutral-900 rounded-lg"
  {href}
>
  <div class="flex flex-col gap-y-3 px-2">
    <div class="flex items-center gap-x-1">
      <!-- User Avatar -->
      <div class="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden">
        <Image src={user.avatar} />
      </div>
      <!-- Username -->
      <span class="font-bold text-sm">{user.name}</span>
    </div>
    <!-- Descriptions -->
    <div class="flex gap-x-3 leading-tight">
      <div class="overflow-hidden">
        <!-- Title -->
        <h3 class="line-clamp-2">
          Review of <span class="font-semibold">{media.name}</span>
        </h3>
        <!-- Summary -->
        <div class="italic text-neutral-400 text-sm mt-1 line-clamp-3">
          {summary}
        </div>
      </div>
    </div>
  </div>
  <!-- Banner image -->
  <div class="mt-auto aspect-w-3 aspect-h-1 rounded-lg overflow-hidden">
    <Image src={coverImage} position="top" />
    <div
      class="w-fit h-fit flex items-center bg-neutral-800/60 px-2 py-0.5 rounded-br-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="w-4 h-4 fill-current"
        ><path
          d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"
        /></svg
      >
      <span class="ml-1 text-sm">{rating}</span>
    </div>
  </div>
</a>
