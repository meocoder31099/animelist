const useNameToUrl = (postName: string) =>
  postName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export default useNameToUrl;
