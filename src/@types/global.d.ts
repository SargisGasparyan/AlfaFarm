import { History } from 'history';

declare global {
  interface Window {
    JSON: JSON;
    ymaps?: { [key: string]: any };
    routerHistory: History;
    abortableRequests: AbortController[];
  }
}