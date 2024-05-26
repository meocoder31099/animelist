// Only use onMount because it needs access to window.localStorage, window.addEventListener, and window.removeEventListener.
// Import Types
type Unsubscriber = () => void;

const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const subscriptions: Record<string, ((value: T | undefined) => void)[]> = {};

  // Parse localStorage to JSON and check type it.
  // Return undefined if type not is type <T>.
  const parse = (value: any): T | undefined => {
    if (!value) {
      return undefined;
    }
    try {
      const parsed = JSON.parse(value);
      return parsed as T;
    } catch (e) {
      return undefined;
    }
  };

  const get = (): T | undefined => {
    const item = localStorage.getItem(key);
    return parse(item);
  };

  // Set new value to localStorage.
  const set = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    subscriptions[key] && notifySubscribers(key, newValue);
  };

  // Notify to all subscribers.
  const notifySubscribers = (key: string, newValue: T | undefined) => {
    const subscribers = subscriptions[key] || [];
    subscribers.forEach((subscriber) => subscriber(newValue));
  };

  // Set value in localStorage to initialValue.
  if (!!initialValue) set(initialValue);
  let localStorageValue: T | undefined = initialValue ?? get();

  const subscribe = (value: (value: T | undefined) => void): Unsubscriber => {
    subscriptions[key]
      ? subscriptions[key].push(value)
      : (subscriptions[key] = [value]);
    const storageListener = (event: StorageEvent) => {
      if (event.type === "storage" && event.key === key) {
        try {
          localStorageValue = parse(event.newValue);
        } catch (e) {
          localStorageValue = undefined;
        }
        notifySubscribers(key, localStorageValue);
      }
    };

    // Add event listener storage change.
    window.addEventListener("storage", storageListener);
    value(localStorageValue);

    // Return remove event listener storage.
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  };

  // Update localStorage value.
  const update = (update: (value: T | undefined) => T): void => {
    const newValue: T = update(localStorageValue);
    set(newValue);
  };

  return {
    get,
    subscribe,
    set,
    update,
  };
};

export default useLocalStorage;
