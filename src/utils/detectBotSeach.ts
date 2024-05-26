const detectBotSeach = (userAgents: string | null): boolean => {
  if (!!!userAgents) return false;
  const userAgentsBots = ["yandex", "yahoo", "bing"];
  const isBotSearch = userAgentsBots.some((bot) =>
    (userAgents as string).toLocaleLowerCase().includes(bot)
  );
  return isBotSearch;
};

export default detectBotSeach;
