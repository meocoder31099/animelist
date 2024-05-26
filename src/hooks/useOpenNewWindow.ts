// Import Types
import type { Maybe } from "@/types";

const useOpenNewWindow = (url: Maybe<string>) => {
  if (url) window.open(url, "_blank");
};

export default useOpenNewWindow;
