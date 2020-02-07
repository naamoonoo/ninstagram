import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export const forceHistory = createBrowserHistory({ forceRefresh: true });
