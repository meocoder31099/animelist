const useIdFromUrl = (url: string): number =>
  parseInt(url?.slice(url?.lastIndexOf("an") + 2));
export default useIdFromUrl;
