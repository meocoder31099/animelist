<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { ThreadComment } from "@/types/anilistv2";
  import type { CardUserForumThreadCommentsProps } from "@/components/shared/CardUserForumThreadComment.svelte";

  // Import Libs
  import { onMount } from "svelte";
  import usePageForumThreadComments from "@/hooks/usePageForumThreadComments";
  import { isBottomPage } from "@/utils";
  import useDebounce from "@/hooks/useDebounce";
  import { DEFAULT_AVATAR } from "@/constants";

  // Import Components
  import UserForumThreadCommentList from "@/components/shared/UserForumThreadCommentList.svelte";

  export let userId: number;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let pagesData: CardUserForumThreadCommentsProps[][] = [];
  const pageUserActivity = usePageForumThreadComments({
    args: {
      userId: userId,
    },
    processData: (data) => data,
  });

  onMount(() => {
    const unPageUserActivity = pageUserActivity.subscribe((value) => {
      const pages = value.data?.pages;
      const firstPage = pages?.[0]?.threadComments;
      if (!!firstPage && !value.isFetchingNextPage) {
        if (pagesData.length) {
          const lastPageIndex = pages.length - 1;
          const edgesTemp = pages?.[lastPageIndex]?.threadComments;
          if (edgesTemp) {
            const cardProps = createCardProps(edgesTemp);
            if (!!cardProps) pagesData.push(cardProps);
            // Assign the value of pagesData to itself to notify Svelte that it has been updated, otherwise Svelte will not be able to detect the change.
            pagesData = pagesData;
          }
        } else {
          for (const page of pages) {
            if (page?.threadComments?.length) {
              const edgesTemp = page.threadComments;
              const cardProps = createCardProps(edgesTemp);
              if (!cardProps) continue;
              pagesData.push(cardProps);
            }
          }
          // Assign the value of pagesData to itself to notify Svelte that it has been updated, otherwise Svelte will not be able to detect the change.
          pagesData = pagesData;
        }
      }

      // Update status
      isLoading = value.isLoading || value.isFetchingNextPage || false;
      fetchNextPage = value.fetchNextPage;
      hasNextPage = !!value.hasNextPage;
      !hasNextPage && window.removeEventListener("scroll", handleScroll);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      unPageUserActivity();
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const createCardProps = (threadComments: Maybe<ThreadComment>[]) => {
    const cardProps: CardUserForumThreadCommentsProps[] = [];
    for (const threadComment of threadComments) {
      if (!threadComment) continue;
      const { thread } = threadComment;
      if (!thread) continue;
      // Get thread data
      const { id: threadId, title: threadTitle } = thread;
      // Get user comment data
      const userAvatar = threadComment?.user?.avatar?.large || DEFAULT_AVATAR;
      const { id: userId = 0, name: userName = "" } = threadComment?.user ?? {};
      const user = {
        id: userId,
        avatar: userAvatar,
        name: userName,
      };
      // Get other comment data
      const {
        createdAt,
        id,
        isLiked,
        isLocked,
        likeCount,
        comment: textContent,
      } = threadComment;
      // Push props to card{PProps
      cardProps.push({
        thread: {
          id: threadId,
          title: threadTitle,
        },
        threadComment: {
          createdAt,
          id,
          isLiked,
          isLocked,
          likeCount,
          textContent,
          user,
        },
      });
    }
    return cardProps;
  };

  const handleScroll = useDebounce(() => {
    if (isBottomPage() && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, 100);
</script>

<UserForumThreadCommentList pages={pagesData} {hasNextPage} {isLoading} />
