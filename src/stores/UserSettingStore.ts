import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { debounce } from "../utils";

const isSideNavBar = writable(true);
const isBottomTabBar = writable(true);
const isTopNavbarBgTransparent = writable(false);
const isMobile = writable(false);
const isTouchDevice = writable(false);
if (browser) isTouchDevice.set("ontouchstart" in document.documentElement);
// if (browser) {
//   window.onresize = debounce(() => {
//     if (window.innerWidth < 800) {
//       isMobile.set(true);
//       isSideNavBar.set(false);
//     } else {
//       isMobile.set(false);
//       isSideNavBar.set(true);
//     }
//   }, 500);
// }

export {
  isSideNavBar,
  isBottomTabBar,
  isMobile,
  isTopNavbarBgTransparent,
  isTouchDevice,
};
