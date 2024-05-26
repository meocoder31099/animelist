// Import Types
import type { CharacterDetailsModal } from "@/types";

// Import Store
import { characterDetailsModal } from "@/stores/GlobalStore";

interface MediaDetailsModalAction {
  destroy: () => void;
}

const onMediaDetailsModal = (
  node: HTMLElement,
  options: CharacterDetailsModal
): MediaDetailsModalAction => {
  function handleClick(event: MouseEvent) {
    event.preventDefault();
    characterDetailsModal.set({
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
