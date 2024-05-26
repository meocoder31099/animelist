// Import Types
import type { MediaDetailsModal } from "@/types";

// Import Store
import { mediaDetailsModal } from "@/stores/GlobalStore";

interface MediaDetailsModalAction {
  destroy: () => void;
}

const onMediaDetailsModal = (
  node: HTMLElement,
  options: MediaDetailsModal
): MediaDetailsModalAction => {
  const handleClick = (event: MouseEvent): void => {
    event.stopPropagation();
    event.preventDefault();
    mediaDetailsModal.set({
      id: options.id,
      image: options.image,
      name: options.name,
      bannerImage: options.bannerImage,
      href: options.href,
    });
  };

  node.addEventListener("click", handleClick);

  return {
    destroy() {
      node.removeEventListener("click", handleClick);
    },
  };
};

export default onMediaDetailsModal;
