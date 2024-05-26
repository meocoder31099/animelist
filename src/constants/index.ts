const START_YEAR = 1940;
export const CURRENT_YEAR = new Date().getFullYear();

export const SEASON_YEARS = new Array(CURRENT_YEAR + 2 - START_YEAR)
  .fill(null)
  .map((_, index) => START_YEAR + index)
  .sort((a, b) => b - a);
