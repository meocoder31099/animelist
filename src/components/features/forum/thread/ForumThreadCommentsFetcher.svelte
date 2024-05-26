<script lang="ts">
  // Import Types
  import type { ComponentProps } from "svelte";
  import type { UsePageForumThreadCommentsArgs } from "@/hooks/usePageForumThreadComments";
  //   import type CardCommentNormal from "@/components/shared/CardCommentNormal.svelte";
  import type CardCommentChild from "@/components/shared/CardCommentChild.svelte";
  type CardCommentProps = ComponentProps<CardCommentNormal>;
  type CardCommentChildProps = ComponentProps<CardCommentChild>;

  // Import Libs
  import { onMount } from "svelte";
  import usePageForumThreadComments from "@/hooks/usePageForumThreadComments";
  import anilistMarkdownHtml from "@/utils/anilistMarkdownHtml";
  import { DEFAULT_AVATAR } from "@/constants";

  // Import Components
  import CardCommentNormal from "@/components/shared/CardCommentNormal.svelte";

  export let args: UsePageForumThreadCommentsArgs;

  let pagesData: CardCommentProps[][] = [];
  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let replysCount: string = "";
  let lastPage: number = 1;
  let currentPage: number = 1;
  let fetchNextPage: () => void;
  const getDefaultCardCommentPropsValue = () => {
    return {
      body: {
        text: "",
      },
      childComments: null,
      createdAt: 0,
      likeCount: 0,
      isLocked: false,
      userAvatar: "",
      userName: "",
    };
  };
  const threadComments = usePageForumThreadComments<CardCommentProps[]>({
    args,
    withChildComments: true,
    processData: (data) => {
      const threadComments: CardCommentProps[] = [];
      for (const comment of data ?? []) {
        if (!comment) continue;

        const newRoot: CardCommentProps = getDefaultCardCommentPropsValue();
        const stack = [{ node: comment, newNode: newRoot }];

        while (stack.length > 0) {
          const lastElement = stack.pop();
          if (!lastElement) continue;
          const { node, newNode } = lastElement;

          newNode["userAvatar"] = node.user?.avatar?.large ?? DEFAULT_AVATAR;
          newNode["userName"] = node.user?.name ?? "";
          newNode["body"] = anilistMarkdownHtml(node.comment ?? "");
          newNode["createdAt"] = node.createdAt;
          newNode["likeCount"] = node.likeCount;
          newNode["isLocked"] = !!node.isLocked;

          if (node.childComments) {
            const childComments: CardCommentChildProps[] = [];
            newNode["childComments"] = childComments;
            for (let i = 0; i < node.childComments.length; i++) {
              const newChildNode: CardCommentChildProps =
                getDefaultCardCommentPropsValue();
              newNode.childComments.push(newChildNode);
              stack.push({
                node: node.childComments[i],
                newNode: newChildNode,
              });
            }
          } else {
            newNode["childComments"] = null;
          }
        }

        threadComments.push(newRoot);
      }
      return threadComments;
    },
  });

  onMount(() => {
    const unThreadCommentsStore = threadComments.subscribe(
      ({
        data,
        isFetchingNextPage,
        isLoading: dataIsLoading,
        hasNextPage: dataHasNextPage,
        fetchNextPage: fn_fetchNextPage,
      }) => {
        const pages = data?.pages;
        const firstPage = pages?.[0]?.threadComments;
        if (!!firstPage && !isFetchingNextPage) {
          const pageInfo = pages[pages.length - 1]?.pageInfo;
          currentPage = pageInfo?.currentPage ?? 1;
          lastPage = pageInfo?.lastPage ?? 0;
          replysCount = (
            (pageInfo?.total ?? 0) -
            (pageInfo?.perPage ?? 0) * currentPage
          ).toLocaleString("en-US");

          if (pagesData.length) {
            const lastPageIndex = pages.length - 1;
            const { threadComments } = pages?.[lastPageIndex] ?? {};
            if (threadComments) {
              pagesData.push(threadComments);
              pagesData = pagesData;
            }
          } else {
            for (const page of pages) {
              if (page?.threadComments?.length) {
                const { threadComments } = page;
                pagesData.push(threadComments);
              }
            }
            pagesData = pagesData;
          }
        }

        // Update status
        isLoading = dataIsLoading || isFetchingNextPage || false;
        fetchNextPage = fn_fetchNextPage;
        hasNextPage = !!dataHasNextPage;
      }
    );

    return () => {
      unThreadCommentsStore();
    };
  });
</script>

<ul class="w-full flex flex-col gap-y-2">
  {#each pagesData as page}
    {#each page as props}
      <li class="w-full"><CardCommentNormal {...props} /></li>
    {/each}
  {/each}
</ul>
{#if hasNextPage}
  <div class="px-2 mt-2 flex justify-between items-center">
    <button
      on:click|stopPropagation|capture={fetchNextPage}
      class="inline-flex items-center bg-blue-500 px-3 py-1.5 rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="w-5 h-5 fill-current"
        ><path
          d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"
        /></svg
      >
      <span class="ml-1 font-bold text-sm"
        >{`${isLoading ? "loading..." : `${replysCount} more replies`}`}</span
      >
    </button>
    <button
      on:click|stopPropagation|capture={fetchNextPage}
      class="inline-flex items-center bg-blue-500 px-3 py-1.5 rounded-full"
    >
      <span class="text-sm">{currentPage}/{lastPage}</span>
    </button>
  </div>
{/if}
