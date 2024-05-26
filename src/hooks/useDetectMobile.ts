import { onMount } from "svelte";
import useDebounce from "@/hooks/useDebounce";

const useDetectMobile = (callback: (isMobile: boolean) => void) => {
  const update = () => {
    callback(window.innerWidth < 768);
  };

  onMount(() => {
    // Detect for the first time whether the device is mobile.
    update();
    window.addEventListener("resize", useDebounce(update, 500));

    return () => {
      // Remove event listener when component is destroyed.
      window.removeEventListener("resize", update);
    };
  });
};

export default useDetectMobile;
