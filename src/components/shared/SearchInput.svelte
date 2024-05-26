<script lang="ts">
  // Import Libs
  import { createEventDispatcher } from "svelte";
  import useDebounce from "@/hooks/useDebounce";

  export let search_value: string | undefined;
  export let placeholder: string = "";

  const dispatch = createEventDispatcher();
  const handleInput: any = useDebounce((node: Event) => {
    const el = node.target as HTMLInputElement;
    const value = el.value || undefined;
    dispatch("search", value);
  }, 1000);
  const clearInput = () => {
    search_value = undefined;
    dispatch("search", undefined);
  };
  const showFilter = () => dispatch("showFilter", true);
</script>

<div class="flex w-full sticky top-14 z-10">
  <div
    class="flex w-full justify-between items-center relative text-white"
  >
    <span class="absolute inset-y-0 left-0 flex items-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        on:click={() => showFilter()}
        class="p-2 bg-neutral-600/60 rounded-lg cursor-pointer">Filter</span
      >
    </span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      on:click={() => clearInput()}
      class="absolute inset-y-0 right-0 hidden items-center cursor-pointer hover:text-neutral-600"
      class:!flex={search_value?.length}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="fill-current w-5 h-5"
        ><path
          d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
        /></svg
      >
    </span>
    <input
      type="text"
      name="search"
      class="w-full bg-background py-6 pl-16 pr-14 text-white focus:outline-none placeholder:text-neutral-500"
      {placeholder}
      autocomplete="off"
      bind:value={search_value}
      on:input={handleInput}
    />
  </div>
</div>
