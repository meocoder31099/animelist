<script lang="ts">
  // Import Types
  import type { User } from "@/types/anilistv2";
  import type { Maybe } from "@/types";
  import type { CardUserProps } from "@/components/shared/CardUser.svelte";

  // Import Libs
  import { onMount } from "svelte";
  import usePageUserollowers from "@/hooks/usePageUserollowers";
  import { isBottomPage } from "@/utils";
  import useDebounce from "@/hooks/useDebounce";
  import { DEFAULT_AVATAR } from "@/constants";

  // Import Components
  import UsersList from "@/components/shared/UsersList.svelte";

  export let userId: number;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let cardProps: CardUserProps[] = [];
  const pageUserActivity = usePageUserollowers({
    args: {
      userId: userId,
    },
  });

  onMount(() => {
    const unPageUserActivity = pageUserActivity.subscribe((value) => {
      const pages = value.data?.pages;
      const firstPage = pages?.[0]?.followers;
      if (!!firstPage && !value.isFetchingNextPage) {
        if (cardProps.length) {
          const lastPageIndex = pages.length - 1;
          const edgesTemp = pages?.[lastPageIndex]?.followers;
          if (edgesTemp) {
            cardProps = cardProps.concat(createCardProps(edgesTemp));
          }
        } else {
          for (const page of pages) {
            if (page?.followers?.length) {
              const edgesTemp = page.followers;
              const options = createCardProps(edgesTemp);
              cardProps = cardProps.concat(options);
            }
          }
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

  const createCardProps = (followers: Maybe<User>[]): CardUserProps[] => {
    const cardOptions: CardUserProps[] = [];
    for (const userData of followers) {
      if (!userData) continue;

      const userAvatar = userData?.avatar?.large || DEFAULT_AVATAR;
      const {
        id: userId = 0,
        name: userName = "",
        isFollowing = false,
        moderatorRoles = [],
      } = userData ?? {};
      const user = {
        id: userId,
        avatar: userAvatar,
        name: userName,
        isFollowing: isFollowing,
        moderatorRoles: moderatorRoles,
      };

      cardOptions.push({
        ...user,
      });
    }
    return cardOptions;
  };

  const handleScroll = useDebounce(() => {
    if (isBottomPage() && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, 100);
</script>

<UsersList source={cardProps} {hasNextPage} {isLoading} />
