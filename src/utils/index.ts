// Hàm thực hiện fecth với phương thức POST
export const fetchPOST = async (
  url: string,
  body: any,
  options: RequestInit = {}
): Promise<any> => {
  const defaultOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// Hàm chuyển tiêu đề thành url.
export const convertToUrl = (postName: string) =>
  postName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

// Hàm get id từ url
export const getID = (url: string): number =>
  parseInt(url?.slice(url?.lastIndexOf("an") + 2));

// Hàm debounce
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (this: any, ...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return function debounced(...args: Parameters<T>) {
    const context = this;

    clearTimeout(timeoutId!);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export const isBottomPage = (): boolean => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight =
    document.documentElement.clientHeight || window.innerHeight;

  if (scrollTop + clientHeight >= scrollHeight - clientHeight * 0.35)
    return true;
  else return false;
};

export const focus = (node: HTMLElement) => node.focus();

export const spaceToAdd = (string: string) => string.replaceAll(" ", "+");

export const detectInView = (node: HTMLElement) => {
  const observer: IntersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.setAttribute("isView", "1");
        } else {
          node.setAttribute("isView", "0");
        }
      });
    },
    {
      threshold: 0,
    }
  );
  observer.observe(node);
};

export const arraysEqual = (a: any[], b: any[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
};

export const trueTypeOf = (value: any) =>
  Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
