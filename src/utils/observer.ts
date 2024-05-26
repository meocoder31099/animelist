// Import Type
import type { Maybe } from "@/types";

const observers = new Map<string, IntersectionObserver>();

const createIntersectionObserver = (args: {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  key: string;
}): IntersectionObserver => {
  let observer: Maybe<IntersectionObserver> = observers.get(args.key) || null;
  if (!!!observer) {
    observer = new IntersectionObserver(args.callback, args.options);
    observers.set(args.key, observer);
  }
  return observer as IntersectionObserver;
};

export default createIntersectionObserver;
