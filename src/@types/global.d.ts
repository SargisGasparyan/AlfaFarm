import { History } from 'history';

declare global {
  interface Window {
    JSON: JSON;
    routerHistory: History;
    abortableRequests: AbortController[];
  }
}