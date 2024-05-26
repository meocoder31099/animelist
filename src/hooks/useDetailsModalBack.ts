// Import Type
import type { DetailsModalStack, Maybe } from "@/types";
import { DetailsModalStackTypes as DetailsModalStackValue } from "@/types";

// Import Stores
import {
  detailsModalStack,
  mediaDetailsModal,
  characterDetailsModal,
  staffDetailsModal,
} from "@/stores/GlobalStore";

const useDetailsModalBack = (): void => {
  let to: Maybe<DetailsModalStack> = null;
  detailsModalStack.update((modalStackValue) => {
    if (!!modalStackValue) {
      to = modalStackValue.pop() ?? null;
    }
    // Check has to? If to !== null set value to store.
    if (!!to) {
      if (to.type === DetailsModalStackValue.Media)
        mediaDetailsModal.set({ ...to.value, isBack: true });
      if (to.type === DetailsModalStackValue.Character)
        characterDetailsModal.set({ ...to.value, isBack: true });
      if (to.type === DetailsModalStackValue.Staff)
        staffDetailsModal.set({ ...to.value, isBack: true });
    }
    return modalStackValue;
  });
};

export default useDetailsModalBack;
