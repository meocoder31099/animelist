// Import Types
import type { Maybe } from "@/types";

// Import Libs
import createIntersectionObserver from "@/utils/observer";

const onLazyLoadImage = (node: HTMLImageElement) => {
  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.style.opacity = "0";
        img.onload = () => {
          img.style.opacity = "1";
          img.style.transition = "opacity .7s";
          setTimeout(() => {
            img.style.removeProperty("opacity");
            img.style.removeProperty("transition");
          }, 700);
        };
        img.src = img.dataset.src as string;

        img.removeAttribute("data-src");
        observer?.unobserve(img);
      }
    });
  };
  const observerKey = "lazyloadImage";

  let observer: Maybe<IntersectionObserver> = createIntersectionObserver({
    callback: observerCallback,
    key: observerKey,
  });

  observer.observe(node);

  return {
    destroy() {
      observer?.unobserve(node);
      // observer?.disconnect();
      // observer = null;
    },
  };
};

export default onLazyLoadImage;
