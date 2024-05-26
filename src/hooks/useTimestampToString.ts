const useTimestampToString = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default useTimestampToString;
