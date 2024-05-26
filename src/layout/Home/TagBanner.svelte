<script lang="ts">
  const tags = ["Mixes", "Music", "Sitcoms", "Playlists", "Conan O'Brien"];
</script>

<div
  class="flex items-center text-gray-200 px-6"
>
  <ul class="flex-1 p-3 space-x-3">
    <li
      class="inline-flex items-center px-3 py-1 text-sm  text-black bg-gray-200 rounded-xl leading-sm"
    >
      All
    </li>
    {#each tags as tag}
      <li
        class="inline-flex items-center px-3 py-1 text-sm bg-[#363636] rounded-xl leading-sm "
      >
        {tag}
      </li>
    {/each}
    <div />
  </ul>
  <div class="flex w-4 h-4">
    <svg
      viewBox="0 0 16 16"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      class="style-scope yt-icon fill-[#fafafa] "
    >
      <g class="style-scope yt-icon">
        <path
          d="M4.97,12.65L9.62,8L4.97,3.35l0.71-0.71L11.03,8l-5.35,5.35L4.97,12.65z"
          class="style-scope yt-icon"
        />
      </g>
    </svg>
  </div>
</div>
