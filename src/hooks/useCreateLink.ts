type Option =
  | { value: string; convert: "lowcase" | "-" | "+" }
  | string
  | number;

const hyphen = (string: string) =>
  string
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const useCreateLink = (options: Option[]): string => {
  return options
    .map((s: Option) => {
      if (typeof s === "string") return s;
      if (typeof s === "number") return s;
      if (s.convert === "-") return hyphen(s.value);
      else if (s.convert === "lowcase") return s.value.toLowerCase();
    })
    .join("");
};

export default useCreateLink;
