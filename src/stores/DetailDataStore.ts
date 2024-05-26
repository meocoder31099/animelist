// Import Types
import type { Menu } from "@/types";
import type { Writable } from "svelte/store";

//Import Libs
import { browser } from "$app/environment";
import { writable } from "svelte/store";

// Import Stores
import { navigating, page } from "$app/stores";

const icons: Record<string, { icon: string; iconActivated: string }> = {
  home: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm9-8.586 6 6V15l.001 5H6v-9.586l6-6z"></path><path d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18z"></path></svg>`,
    iconActivated:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="M3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .913-.593.998.998 0 0 0-.17-1.076l-9-10c-.379-.422-1.107-.422-1.486 0l-9 10A1 1 0 0 0 3 14zm5.949-.316C8.98 13.779 9.762 16 12 16c2.269 0 3.042-2.287 3.05-2.311l1.9.621C16.901 14.461 15.703 18 12 18s-4.901-3.539-4.95-3.689l1.899-.627z"></path></svg>',
  },
  forum: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="M16 14h.5c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5h-13C2.673 2 2 2.673 2 3.5V18l5.333-4H16zm-9.333-2L4 14V4h12v8H6.667z"></path><path d="M20.5 8H20v6.001c0 1.1-.893 1.993-1.99 1.999H8v.5c0 .827.673 1.5 1.5 1.5h7.167L22 22V9.5c0-.827-.673-1.5-1.5-1.5z"></path></svg>`,
    iconActivated:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="M13 14h3.5c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5h-13C2.673 2 2 2.673 2 3.5V18l5.333-4H13zm-9-.1.154-.016L4 14v-.1z"></path><path d="M20.5 8H20v6.001c0 1.1-.893 1.993-1.99 1.999H8v.5c0 .827.673 1.5 1.5 1.5h7.167L22 22V9.5c0-.827-.673-1.5-1.5-1.5z"></path></svg>',
  },
  reviews: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path><path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path></svg>`,
    iconActivated:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 m-auto fill-current"><path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path><path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path></svg>',
  },
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
};
const mainRoute: Record<string, string> = {
  "/(app)": "home",
  "/(app)/forum": "forum",
  "/(app)/reviews": "reviews",
  "/(app)/anime": "anime",
  "/(app)/manga": "manga",
  "/(app)/timeline": "timeline",
};

const memusData: Record<string, Menu> = {
  home: {
    title: "Home",
    routeId: "/(app)",
    path: "/",
    icon: icons.home.icon,
    iconActivated: icons.home.iconActivated,
    isActive: false,
  },
  forum: {
    title: "Forums",
    routeId: "/(app)/forum",
    path: "/forum",
    icon: icons.forum.icon,
    iconActivated: icons.forum.iconActivated,
    isActive: false,
  },
  reviews: {
    title: "Reviews",
    routeId: "/(app)/reviews",
    path: "/reviews",
    icon: icons.reviews.icon,
    iconActivated: icons.reviews.iconActivated,
    isActive: false,
  },
  anime: {
    title: "Anime",
    routeId: "/(app)/anime",
    path: "/anime",
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
    title: "Phát sóng",
    routeId: "/(app)/timeline",
    path: "/timeline",
    icon: icons.timeline.icon,
    iconActivated: icons.timeline.iconActivated,
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
