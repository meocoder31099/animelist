// Import Types
import type { Menu } from "@/types";
import type { Writable } from "svelte/store";

//Import Libs
import { browser } from "$app/environment";
import { writable } from "svelte/store";

// Import Stores
import { navigating, page } from "$app/stores";

const icons: Record<string, { icon: string; iconActivated: string }> = {
  anime: {
    icon: `<svg viewBox="0 0 28 28" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5 8 24.086 8.336 23.75 8.75 23.75L19.25 23.75C19.664 23.75 20 24.086 20 24.5 20 24.914 19.664 25.25 19.25 25.25L8.75 25.25ZM17.163 12.846 12.055 15.923C11.591 16.202 11 15.869 11 15.327L11 9.172C11 8.631 11.591 8.297 12.055 8.576L17.163 11.654C17.612 11.924 17.612 12.575 17.163 12.846ZM21.75 20.25C22.992 20.25 24 19.242 24 18L24 6.5C24 5.258 22.992 4.25 21.75 4.25L6.25 4.25C5.008 4.25 4 5.258 4 6.5L4 18C4 19.242 5.008 20.25 6.25 20.25L21.75 20.25ZM21.75 21.75 6.25 21.75C4.179 21.75 2.5 20.071 2.5 18L2.5 6.5C2.5 4.429 4.179 2.75 6.25 2.75L21.75 2.75C23.821 2.75 25.5 4.429 25.5 6.5L25.5 18C25.5 20.071 23.821 21.75 21.75 21.75Z"></path></svg>`,
    iconActivated:
      '<svg viewBox="0 0 28 28"  width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5 8 24.086 8.336 23.75 8.75 23.75L19.25 23.75C19.664 23.75 20 24.086 20 24.5 20 24.914 19.664 25.25 19.25 25.25L8.75 25.25ZM17.164 12.846 12.055 15.923C11.591 16.202 11 15.869 11 15.327L11 9.172C11 8.631 11.591 8.297 12.055 8.576L17.164 11.654C17.612 11.924 17.612 12.575 17.164 12.846M21.75 2.75 6.25 2.75C4.182 2.75 2.5 4.432 2.5 6.5L2.5 18C2.5 20.068 4.182 21.75 6.25 21.75L21.75 21.75C23.818 21.75 25.5 20.068 25.5 18L25.5 6.5C25.5 4.432 23.818 2.75 21.75 2.75"></path></svg>',
  },
  manga: {
    icon: `<svg viewBox="0 0 20 20" width="24" height="24" class="w-6 h-6 m-auto fill-current opacity-80 scale-90"><g fill-rule="evenodd" transform="translate(-446 -350)"><path d="M457 368.832a.5.5 0 0 0 .883.323l1.12-1.332a.876.876 0 0 1 .679-.323h3.522a2.793 2.793 0 0 0 2.796-2.784v-10.931a2.793 2.793 0 0 0-2.796-2.785h-3.454a2.75 2.75 0 0 0-2.75 2.75v15.082zm-1.5 0a.5.5 0 0 1-.883.323l-1.12-1.332a.876.876 0 0 0-.679-.323h-3.522a2.793 2.793 0 0 1-2.796-2.784v-10.931a2.793 2.793 0 0 1 2.796-2.785h3.454a2.75 2.75 0 0 1 2.75 2.75v15.082z"></path></g></svg>`,
    iconActivated:
      '<svg viewBox="0 0 20 20" class="w-6 h-6 m-auto fill-current scale-90"><g fill-rule="evenodd" transform="translate(-446 -350)"><path d="M457 368.832a.5.5 0 0 0 .883.323l1.12-1.332a.876.876 0 0 1 .679-.323h3.522a2.793 2.793 0 0 0 2.796-2.784v-10.931a2.793 2.793 0 0 0-2.796-2.785h-3.454a2.75 2.75 0 0 0-2.75 2.75v15.082zm-1.5 0a.5.5 0 0 1-.883.323l-1.12-1.332a.876.876 0 0 0-.679-.323h-3.522a2.793 2.793 0 0 1-2.796-2.784v-10.931a2.793 2.793 0 0 1 2.796-2.785h3.454a2.75 2.75 0 0 1 2.75 2.75v15.082z"></path></g></svg>',
  },
  timeline: {
    icon: `<?xml version="1.0" encoding="UTF-8"?> <svg class="w-6 h-6 m-auto fill-current" version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="none"><polygon points="-1.5848e-13 0 20 0 20 20 -1.5848e-13 20"/><rect x="2" y="5.5" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><line x1="7.5" x2="5.5" y1="5.5" y2="2.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><line transform="translate(13.5 4) scale(-1 1) translate(-13.5 -4)" x1="14.5" x2="12.5" y1="5.5" y2="2.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></g><g transform="translate(6 7.5)" fill="currentColor"><rect width="8" height="8" opacity="0"/><rect x="3.25" y="1" width="1.5" height="6" rx=".75"/><rect x=".58333" y="4" width="1.5" height="3" rx=".75"/><rect x="5.9167" y="3" width="1.5" height="4" rx=".75"/></g></svg>`,
    iconActivated:
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" class="w-6 h-6 m-auto fill-current"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><polygon points="-1.58484337e-13 0 20 0 20 20 -1.58484337e-13 20"/></g><g><g><polygon points="-1.58484337e-13 0 20 0 20 20 -1.58484337e-13 20"/><path d="M16,4.75 C17.5187831,4.75 18.75,5.98121694 18.75,7.5 L18.75,7.5 L18.75,15.5 C18.75,17.0187831 17.5187831,18.25 16,18.25 L16,18.25 L4,18.25 C2.48121694,18.25 1.25,17.0187831 1.25,15.5 L1.25,15.5 L1.25,7.5 C1.25,5.98121694 2.48121694,4.75 4,4.75 L4,4.75 Z M10,8.5 C9.58578644,8.5 9.25,8.83578644 9.25,9.25 L9.25,9.25 L9.25,13.75 C9.25,14.1642136 9.58578644,14.5 10,14.5 C10.4142136,14.5 10.75,14.1642136 10.75,13.75 L10.75,13.75 L10.75,9.25 C10.75,8.83578644 10.4142136,8.5 10,8.5 Z M12.6666667,10.5 C12.2524531,10.5 11.9166667,10.8357864 11.9166667,11.25 L11.9166667,11.25 L11.9166667,13.75 C11.9166667,14.1642136 12.2524531,14.5 12.6666667,14.5 C13.0808802,14.5 13.4166667,14.1642136 13.4166667,13.75 L13.4166667,13.75 L13.4166667,11.25 C13.4166667,10.8357864 13.0808802,10.5 12.6666667,10.5 Z M7.33333333,11.5 C6.91911977,11.5 6.58333333,11.8357864 6.58333333,12.25 L6.58333333,12.25 L6.58333333,13.75 C6.58333333,14.1642136 6.91911977,14.5 7.33333333,14.5 C7.7475469,14.5 8.08333333,14.1642136 8.08333333,13.75 L8.08333333,13.75 L8.08333333,12.25 C8.08333333,11.8357864 7.7475469,11.5 7.33333333,11.5 Z" fill="currentColor" fill-rule="nonzero"/><line x1="7.5" y1="5.5" x2="5.5" y2="2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="14.5" y1="5.5" x2="12.5" y2="2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" transform="translate(13.500000, 4.000000) scale(-1, 1) translate(-13.500000, -4.000000) "/></g><g transform="translate(11.916667, 10.500000)"/></g></g></svg>',
  },
  browse: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>`,
    iconActivated:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="M10 2c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8z"></path></svg>',
  },
  library: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z"></path></svg>`,
    iconActivated:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path></svg>',
  },
};
const mainRoute: Record<string, string> = {
  "/(app)": "anime",
  "/(app)/manga": "manga",
  "/(app)/timeline": "timeline",
  "/(app)/browse/anime": "browse",
  "/(app)/browse/manga": "browse",
  "/(app)/browse/characters": "browse",
  "/(app)/browse/staff": "browse",
  "/(app)/library": "library",
};

const memusData: Record<string, Menu> = {
  anime: {
    title: "Anime",
    routeId: "/(app)",
    path: "/",
    icon: icons.anime.icon,
    iconActivated: icons.anime.iconActivated,
    isActive: false,
  },
  manga: {
    title: "Manga",
    routeId: "/(app)/manga",
    path: "/manga",
    icon: icons.manga.icon,
    iconActivated: icons.manga.iconActivated,
    isActive: false,
  },
  timeline: {
    title: "Airing",
    routeId: "/(app)/timeline",
    path: "/timeline",
    icon: icons.timeline.icon,
    iconActivated: icons.timeline.iconActivated,
    isActive: false,
  },
  browse: {
    title: "Browse",
    routeId: "/(app)/browse/anime",
    path: "/browse/anime",
    icon: icons.browse.icon,
    iconActivated: icons.browse.iconActivated,
    isActive: false,
  },
  library: {
    title: "Library",
    routeId: "/(app)/library",
    path: "/library",
    icon: icons.library.icon,
    iconActivated: icons.library.iconActivated,
    isActive: false,
  },
};

const memus: Writable<Record<string, Menu>> = writable(memusData);

// Footer
const footerLinks = [
  { title: "About us", path: "/" },
  { title: "Contact us", path: "/" },
  { title: "Get App", path: "/" },
  { title: "Terms of Service", path: "/" },
  { title: "Privacy Policy", path: "/" },
  { title: "Infringement Complaint", path: "/" },
];

if (browser) {
  // Set active menu when frist load page.
  const UnsubscribePageStore = page.subscribe((value) => {
    if (!!value?.route?.id) {
      const currentRouteId = mainRoute[value.route.id];
      if (!!currentRouteId) {
        // Update menu
        const cloneMenus = JSON.parse(JSON.stringify(memusData));
        cloneMenus[currentRouteId].isActive = true;
        memus.set(cloneMenus);
      }
      setTimeout(() => {
        UnsubscribePageStore();
      }, 0);
    }
  });

  // Set active menu.
  navigating.subscribe((navigator) => {
    if (!navigator) return;
    const fromRouteId = mainRoute[navigator.from?.route.id ?? ""];
    const toRouteId = mainRoute[navigator.to?.route.id ?? ""];

    // If both toRouteId and fromRouteId do not exist in mainRoute, exit early.
    if (!toRouteId && !fromRouteId) return;
    // If toRouteId = fromRouteId, exit early.
    if (fromRouteId === toRouteId) return;

    const cloneMenus = JSON.parse(JSON.stringify(memusData));
    // Update the menu item to be active.
    toRouteId && (cloneMenus[toRouteId].isActive = true);
    memus.set(cloneMenus);
  });
}

export { memus, footerLinks, mainRoute };
