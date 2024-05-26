// Import Types
import {
  type Media,
  MediaType,
  type Review,
  type Thread,
} from "@/types/anilistv2";

// Import Libs
import FormatDistanceDate from "./formatDistanceDate";

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

// Get true type of data, use it replace for typeof default of JavaScript.
export const trueTypeOf = (value: any) =>
  Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

// https://gist.github.com/bluzky/b8c205c98ff3318907b30c3e0da4bf3f
export const vietnameseSlug = (str: string) => {
  const from =
    "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ";
  const to =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";

  let newStr = str;

  for (let i = 0, l = from.length; i < l; i++) {
    newStr = newStr.replace(RegExp(from[i], "gi"), to[i]);
  }

  newStr = newStr
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return newStr;
};

export const createMediaDetailsUrl = ({ type, title, id }: Media) => {
  const userPreferred = title?.userPreferred ?? "";
  if (type === MediaType.Anime) {
    return `/anime/details/${vietnameseSlug(userPreferred)}-an${id}`;
  }

  return `/manga/details/${vietnameseSlug(userPreferred)}-an${id}`;
};

export const createForumThreadDetailsUrl = ({ id }: Thread) => {
  return `/forum/thread/${id}`;
};

export const createReviewDetailsUrl = ({ id }: Review) => {
  return `/review/${id}`;
};

// export const createCharacterDetailsUrl = (character: Character) => {
//   return `/characters/details/${character.id}/${vietnameseSlug(
//     character?.name?.userPreferred
//   )}`;
// };

// export const createVoiceActorDetailsUrl = (voiceActor: Staff) => {
//   return `/voice-actors/details/${voiceActor.id}/${vietnameseSlug(
//     voiceActor?.name?.userPreferred
//   )}`;
// };

// export const createStudioDetailsUrl = (studio: Studio) => {
//   return `/studios/${studio.id}/${vietnameseSlug(studio?.name)}`;
// };

export const formatTimeAgo = (timestamp: number): string => {
  const formatDistance = new FormatDistanceDate(
    new Date(timestamp * 1000),
    new Date()
  );
  return formatDistance.getDistance();
};
