type PostDataOptions = {
  url: string;
  body: any;
  options?: RequestInit;
  customFetch?: typeof fetch;
};

const usePostData = async <T>({
  url,
  body,
  options = {},
  customFetch = fetch,
}: PostDataOptions): Promise<T> => {
  const defaultOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await customFetch(url, { ...defaultOptions, ...options });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export default usePostData;
