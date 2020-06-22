import { History } from 'history';

declare global {
  interface Window {
    routerHistory: History;
    abortableRequests: AbortController[];
  }
}