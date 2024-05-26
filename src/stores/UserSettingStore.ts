import { writable } from "svelte/store";
import { browser } from "$app/environment";

const isSideNavBar = writable(true);
const isBottomTabBar = writable(true);
const isTopNavbarBgTransparent = writable(false);
const isMobile = writable(false);
const isTouchDevice = writable(false);
if (browser) isTouchDevice.set("ontouchstart" in document.documentElement);

export {
  isSideNavBar,
  isBottomTabBar,
  isMobile,
  isTopNavbarBgTransparent,
  isTouchDevice,
};
