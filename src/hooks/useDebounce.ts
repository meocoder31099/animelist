const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((this: any, ...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return function debounced(...args: Parameters<T>) {
    const context = this;

    clearTimeout(timeoutId!);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

export default useDebounce;
