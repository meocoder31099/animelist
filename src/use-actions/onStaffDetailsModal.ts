// Import Types
import type { StaffDetailsModal } from "@/types";

// Import Store
import { staffDetailsModal } from "@/stores/GlobalStore";

interface MediaDetailsModalAction {
  destroy: () => void;
}

const onMediaDetailsModal = (
  node: HTMLElement,
  options: StaffDetailsModal
): MediaDetailsModalAction => {
  function handleClick(event: MouseEvent) {
    event.preventDefault();
    staffDetailsModal.set({
      id: options.id,
      image: options.image,
      name: options.name,
    });
  }

  node.addEventListener("click", handleClick);

  return {
    destroy() {
      node.removeEventListener("click", handleClick);
    },
  };
};

export default onMediaDetailsModal;
