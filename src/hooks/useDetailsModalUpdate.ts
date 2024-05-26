// Import Type
import type {
  DetailsModalStackTypes,
  DetailsModalStack,
  MediaDetailsModal,
  CharacterDetailsModal,
  StaffDetailsModal,
  Maybe,
} from "@/types";
import { DetailsModalStackTypes as DetailsModalStackValue } from "@/types";

// Import Stores
import {
  currentModal,
  detailsModalStack,
  mediaDetailsModal,
  characterDetailsModal,
  staffDetailsModal,
} from "@/stores/GlobalStore";

const useDetailsModalUpdate = (
  type: DetailsModalStackTypes,
  value: MediaDetailsModal | CharacterDetailsModal | StaffDetailsModal
): void => {
  if (!value.isBack) {
    let currentModalValue: Maybe<DetailsModalStack> = null;
    const currentModal_unsubscribe = currentModal.subscribe((value) => {
      currentModalValue = value;
    });
    currentModal_unsubscribe();

    if (!!currentModalValue) {
      detailsModalStack.update((modalStackValue) => {
        if (!!modalStackValue)
          modalStackValue.push(currentModalValue as DetailsModalStack);
        else modalStackValue = [currentModalValue as DetailsModalStack];
        return modalStackValue;
      });
      if (type !== DetailsModalStackValue.Media) mediaDetailsModal.set(null);
      if (type !== DetailsModalStackValue.Character)
        characterDetailsModal.set(null);
      if (type !== DetailsModalStackValue.Staff) staffDetailsModal.set(null);
    }
  }
  currentModal.set({
    type: type,
    value: value,
  });
};

export default useDetailsModalUpdate;
