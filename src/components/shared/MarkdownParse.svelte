<script lang="ts">
  // Import Types
  import type { AnilistMarkdownHTML } from "@/utils/anilistMarkdownHtml";

  // Import Libs
  import { getContext } from "svelte";
  import useCreateComponent from "@/hooks/useCreateComponent";
  import { ANILIST_MARKDOWN_COMPONENTS, QUERY_CONTEXT_KEY } from "@/constants";
  import anilistMarkdownHtml from "@/utils/anilistMarkdownHtml";
  import { trueTypeOf } from "@/utils";

  export let markdown: string | AnilistMarkdownHTML;

  const markdownPared: AnilistMarkdownHTML =
    trueTypeOf(markdown) === "string"
      ? anilistMarkdownHtml(markdown as string)
      : (markdown as AnilistMarkdownHTML);

  const { childrenComponents } = markdownPared ?? {};

  // Create children components in content.
  if (!!childrenComponents) {
    const queryClient = getContext(QUERY_CONTEXT_KEY);
    const context = new Map<string, any>();
    // Set context name "$$_queryClient" with queryClient for "@tanstack/svelte-query" to use createQuery.
    // This is required to use createQuery from "@tanstack/svelte-query".
    context.set("$$_queryClient", queryClient);
    for (const { target, props, type } of childrenComponents) {
      if (!ANILIST_MARKDOWN_COMPONENTS[type]) continue;
      useCreateComponent({
        componentClass: ANILIST_MARKDOWN_COMPONENTS[type](),
        target,
        props,
        context,
      });
    }
  }
</script>

<div class="markdown">
  {@html markdownPared?.text ?? ""}
</div>

<style lang="postcss" global>
  .markdown {
    @apply text-neutral-200 break-words overflow-hidden;
    word-break: break-word;
  }
  .markdown h1 {
    @apply text-white text-lg;
  }
  .markdown img {
    @apply inline align-text-top rounded-lg;
  }
  .markdown hr {
    @apply border-2 border-neutral-800 my-2 rounded-lg;
  }
  .markdown a {
    @apply text-blue-400;
  }
  .markdown ul {
    @apply block ps-7 my-4 list-disc whitespace-normal;
  }
  .markdown ol {
    @apply block list-decimal my-4 ps-7;
  }
  .markdown blockquote {
    @apply inline-block border-l-4 border-neutral-800 px-4 my-2;
  }
  .markdown pre,
  .markdown pre code {
    @apply whitespace-pre-wrap;
  }
  .markdown .markdown-spoiler {
    @apply min-w-[30px] inline-block relative rounded overflow-hidden cursor-pointer;
  }
  .markdown .markdown-spoiler::after {
    @apply absolute inset-0 w-full h-full bg-neutral-800 content-[''];
  }
  .markdown p {
    @apply my-4;
  }
  .markdown p:last-of-type,
  .markdown blockquote p:last-of-type {
    @apply mb-0;
  }
  .markdown p:first-of-type,
  .markdown blockquote p {
    @apply mt-0;
  }
</style>
