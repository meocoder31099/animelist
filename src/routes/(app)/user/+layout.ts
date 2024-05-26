// Import Types
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ params }) => {
  const username = params.username;

  return {
    username,
  };
};
