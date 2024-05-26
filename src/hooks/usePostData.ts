type PostDataOptions = {
  url: string;
  body: any;
  options?: RequestInit;
  customFetch?: typeof fetch;
};
export type PostDataError = {
  message?: string;
  status?: number;
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
    const error: PostDataError = data?.errors?.[0]
      ? data.errors[0]
      : { message: "error", status: 400 };
    throw error;
  }

  return data;
};

export default usePostData;
