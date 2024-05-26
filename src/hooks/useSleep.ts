const useSleep = (ms: number): Promise<void> =>
  new Promise((f) => setTimeout(f, ms));

export default useSleep;
