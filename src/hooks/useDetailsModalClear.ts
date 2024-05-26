// Import Type
import type { DetailsModalStackTypes } from "@/types";
import { DetailsModalStackTypes as DetailsModalStackValue } from "@/types";

// Import Stores
import {
  currentModal,
  detailsModalStack,
  mediaDetailsModal,
  characterDetailsModal,
  staffDetailsModal,
} from "@/stores/GlobalStore";

const useDetailsModalClear = (type: DetailsModalStackTypes): void => {
  currentModal.set(null);
  detailsModalStack.set(null);

  if (type === DetailsModalStackValue.Media) mediaDetailsModal.set(null);
  if (type === DetailsModalStackValue.Character)
    characterDetailsModal.set(null);
  if (type === DetailsModalStackValue.Staff) staffDetailsModal.set(null);
};

export default useDetailsModalClear;
