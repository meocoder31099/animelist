<div class="flex flex-col px-0.5 py-2 sm:px-0 animate-pulse">
  <div class="flex flex-col gap-y-2 mb-6">
    <div class="flex items-center">
      <div class="bg-neutral-800 w-20 h-10 rounded-lg" />
    </div>
  </div>
  <div class="w-full gap-4 md:gap-6 grid grid-cols-2 md:grid-cols-5">
    {#each { length: 10 } as _}
      <dl>
        <dt class="flex justify-between gap-1 mb-2">
          <span class="w-14 h-3 bg-neutral-800 rounded-lg" />
          <span class="w-10 h-3 bg-neutral-800 rounded-lg" />
        </dt>
        <dd class="flex items-center">
          <div
            class="w-full bg-neutral-800 rounded-lg h-4 md:h-5 overflow-hidden"
          />
        </dd>
      </dl>
    {/each}
  </div>
</div>
