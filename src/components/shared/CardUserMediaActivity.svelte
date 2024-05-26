<script lang="ts">
  // Import Libs
  import { DEFAULT_MEDIA_COVER_IMAGE, DEFAULT_AVATAR } from "@/constants";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let mediaCoverImage: string = DEFAULT_MEDIA_COVER_IMAGE;
  export let userAvatar: string = DEFAULT_AVATAR;
  export let userName: string;
  export let status: string;
  export let progress: string;
</script>

<div class="relative rounded-lg overflow-hidden">
  <div class="aspect-w-4 aspect-h-7">
    <Image src={mediaCoverImage} />
    <div
      class="bg-gradient-to-t from-neutral-900/80 via-neutral-900/20"
    />
  </div>
  <span
    class="absolute top-2 left-2 w-10 h-10 rounded-full overflow-hidden border-4 border-blue-500"
  >
    <Image src={userAvatar} />
  </span>
  <div class="absolute bottom-1 left-2 right-2">
    <div class="font-bold line-clamp-1">{userName}</div>
    <div class="text-xs first-letter:uppercase">{status} {progress}</div>
  </div>
</div>
