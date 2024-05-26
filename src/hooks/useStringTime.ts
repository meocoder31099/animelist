const pad = (number: number): string => {
  return number < 10 ? "0" + number.toString() : number.toString();
};

const useStringTime = (date: string): string => {
  const parseDate = new Date(parseInt(date) * 1000);
  return `${pad(parseDate.getHours())}:${pad(parseDate.getMinutes())}`;
};

export default useStringTime;
