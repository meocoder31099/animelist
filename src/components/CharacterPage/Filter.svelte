<script lang="ts">
  type FilterOption = {
    value: string | null;
    label: string;
  };

  // Import Component
  import Select from "svelte-select/no-styles/Select.svelte";

  const languageOption = [
    { value: "Japanese", label: "Japanese" },
    { value: "English", label: "English" },
    { value: "Italian", label: "Italian" },
    { value: "Portuguese", label: "Portuguese" },
    { value: "German", label: "German" },
    { value: "Spanish", label: "Spanish" },
    { value: "Korean", label: "Korean" },
    { value: "French", label: "French" },
    { value: "Chinese", label: "Chinese" },
  ];

  export let language_value: FilterOption = {
    value: "Japanese",
    label: "Japanese",
  };
</script>

<div class="w-full flex justify-end">
  <div class="w-fit px-4">
    <ul class="flex flex-wrap gap-10 p-5">
      <li class="flex flex-col gap-2">
        <!-- <label for="source-selector" class="font-medium">Season</label> -->
        <Select
          placeholder={"Any"}
          items={languageOption}
          clearable={false}
          searchable={false}
          showChevron
          bind:value={language_value}
        />
      </li>
    </ul>
  </div>
</div>
