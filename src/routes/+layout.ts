// Import Types
import type { LayoutLoad } from "./$types";

// Import Libs
import { browser } from "$app/environment";
import { QueryClient } from "@tanstack/svelte-query";

// Import Stores
import { isMobile, isSideNavBar } from "../stores/UserSettingStore";

export const load: LayoutLoad = async ({ data }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retryDelay: 2000,
        enabled: browser,
      },
    },
  });

  return { queryClient, isBotSearch: data.isBotSearch };
};

if (browser) {
  if (window.innerWidth < 768) {
    isMobile.set(true);
  } else if (window.innerWidth >= 1024) {
    isSideNavBar.set(true);
  }
}
