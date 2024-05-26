// Import Stores
import { detailsModalStack } from "@/stores/GlobalStore";

const useDetailsModalHas = (): boolean => {
  let isHas: boolean = false;

  const detailsModalStack_unsubscribe = detailsModalStack.subscribe(
    (modalStackValue) => {
      isHas = !!modalStackValue && !!modalStackValue.length;
    }
  );
  detailsModalStack_unsubscribe();
  return isHas;
};

export default useDetailsModalHas;
