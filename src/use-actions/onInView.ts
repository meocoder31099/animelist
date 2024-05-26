// Import Types
import type { Maybe } from "@/types";

// Import Libs
import createIntersectionObserver from "@/utils/observer";

type inViewCallback = (data: { isView: boolean; node: HTMLElement }) => void;

const onInVỉew = (node: HTMLElement, callback: inViewCallback) => {
  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      callback({ isView: entry.isIntersecting, node });
    });
  };
  const observerOptions: IntersectionObserverInit = {
    threshold: 1,
  };
  const observerKey = "navbarTransparent";

  let observer: Maybe<IntersectionObserver> = createIntersectionObserver({
    callback: observerCallback,
    key: observerKey,
    options: observerOptions,
  });
  observer.observe(node);

  return {
    destroy() {
      callback({ isView: false, node });
      observer?.unobserve(node);
    },
  };
};

export default onInVỉew;
