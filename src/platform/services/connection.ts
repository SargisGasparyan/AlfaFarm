//? Service for connections with outside resources
//? Service for request

import nodeFetch from 'node-fetch';

import Enviroment from './enviroment';
import Settings from './settings';
import { OSTypeEnum, LanguageEnum } from '../constants/enums';
import { NoneJSONRequestBody } from '../constants/types';
import { IRequest, IBodyRequest, IResponse } from '../constants/interfaces';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

class Connection {

  //? To get query from object
  private static queryFromObject = (obj: object): string => {
    const str: string[] = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p) && (obj[p] !== null && obj[p] !== undefined && obj[p] !== '')) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }

    return str.join("&");
  }

  //? To set header default configuration
  private static createHeaders = (isUpload: boolean): Headers => {
    const HEADERS = new Headers();
    Settings.authToken ? HEADERS.append('Authorization', `Bearer ${Settings.authToken}`) : 
    Settings.token && HEADERS.append('Authorization', `Bearer ${Settings.token}`);
    HEADERS.append('Language', Settings.language.toString());
    HEADERS.append('OsType', OSTypeEnum.Web.toString());
    !isUpload && HEADERS.append('Content-Type', 'application/json');
    
    return HEADERS;
  }


  //? To check the response
  private static responseRestructure = (response: Response, dataAsSuccess?: boolean, withoutError?: boolean): Promise<any> => {
    (response.status === 401 || response.status === 403) && Settings.logout();

    return new Promise(async resolve => {
      const alertify = await import('alertifyjs');
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.indexOf("application/json") !== -1) {
        response.json().then((result: IResponse<any>) => {
          const success = dataAsSuccess ? result.data : result.success;
          if (!success && !withoutError && result.message) {
            alertify.dismissAll();
            alertify.error(result.message);
          }
          
          resolve(result);
        });
      } else response.text().then(resolve);
    });
  }

  //? Kill all pending requests (abort)
  public static AbortAll = (): void => window.abortableRequests.forEach(item => item.abort());

  // ? POST request
  public static POST = async <Body extends object>(data: IBodyRequest<Body>): Promise<any> => {
    const abort = new AbortController();
    const { controller, action, body, query, noneJSONBody, dataAsSuccess, withoutError } = data;
    const onlyQuery: boolean = (!action && query) as boolean;
    const HEADERS = Connection.createHeaders(noneJSONBody as boolean);
    !data.unabortable && window.abortableRequests.push(abort);
    try {
      const response: Response = await fetch(`${Enviroment.BASE_URL}api/${controller}${!onlyQuery ? '/' : ''}${action}${query ? `?${Connection.queryFromObject(query)}` : ''}`, {
        body: noneJSONBody ? body as NoneJSONRequestBody : JSON.stringify(body),
        method: 'POST',
        headers: HEADERS,
        signal: abort.signal,
      });
      return Connection.responseRestructure(response, dataAsSuccess, withoutError);  
    } catch (e) {
      !data.unabortable && window.abortableRequests.splice(window.abortableRequests.indexOf(abort), 1);    
      return { aborted: true };
    }
  }

  //? PUT request
  public static PUT = async <Body extends object>(data: IBodyRequest<Body>): Promise<any> => {
    const abort = new AbortController();
    const { controller, action, body, query, noneJSONBody } = data;
    const onlyQuery: boolean = (!action && query) as boolean;
    const HEADERS = Connection.createHeaders(noneJSONBody as boolean);
    !data.unabortable && window.abortableRequests.push(abort);
    try {
      const response: Response = await fetch(`${Enviroment.BASE_URL}api/${controller}${!onlyQuery ? '/' : ''}${action}${query ? `?${Connection.queryFromObject(query)}` : ''}`, {
        body: noneJSONBody ? body as NoneJSONRequestBody : JSON.stringify(body),
        method: 'PUT',
        headers: HEADERS,
        signal: abort.signal,
      });  

      !data.unabortable && window.abortableRequests.splice(window.abortableRequests.indexOf(abort), 1);
      return Connection.responseRestructure(response);  
    } catch (e) {
      !data.unabortable && window.abortableRequests.splice(window.abortableRequests.indexOf(abort), 1);
      return { aborted: true };
    }
  }

  //? DELETE request
  public static DELETE = async <Body extends object>(data: IBodyRequest<Body>, confirmQuestion?: string): Promise<any> => {
    const abort = new AbortController();
    const { controller, action, body, query, noneJSONBody, withoutConfirmModal } = data;
    return new Promise(resolve => {
      const userCanceled = async () => {
        resolve(false);
        window.removeEventListener(DispatcherChannels.UserCanceled, userCanceled);
        window.removeEventListener(DispatcherChannels.UserConfirmed, userConfirmed);
        window.dispatchEvent(new CustomEvent(DispatcherChannels.ToggleConfirm));
      }

      const userConfirmed = async () => {
        const onlyQuery: boolean = (!action && query) as boolean;
        const HEADERS = Connection.createHeaders(false);
        !data.unabortable && window.abortableRequests.push(abort);

        try {
          const response: Response = await fetch(`${Enviroment.BASE_URL}api/${controller}${!onlyQuery ? '/' : ''}${action}${query ? `?${Connection.queryFromObject(query)}` : ''}`, {
            body: noneJSONBody ? body as NoneJSONRequestBody : JSON.stringify(body),
            method: 'DELETE',
            headers: HEADERS,
            signal: abort.signal,
          });
    
          !data.unabortable && window.abortableRequests.splice(window.abortableRequests.indexOf(abort), 1);
          resolve(Connection.responseRestructure(response));    
        } catch (e) {
          !data.unabortable && window.abortableRequests.splice(window.abortableRequests.indexOf(abort), 1);
          resolve({ aborted: true });
        }

        if (!withoutConfirmModal) {
          window.dispatchEvent(new CustomEvent(DispatcherChannels.ToggleConfirm, { detail: confirmQuestion }));
          window.removeEventListener(DispatcherChannels.UserCanceled, userCanceled);
          window.removeEventListener(DispatcherChannels.UserConfirmed, userConfirmed);  
        }
      }

      if (!withoutConfirmModal) {
        window.dispatchEvent(new CustomEvent(DispatcherChannels.ToggleConfirm, { detail: confirmQuestion }));
        window.addEventListener(DispatcherChannels.UserCanceled, userCanceled);
        window.addEventListener(DispatcherChannels.UserConfirmed, userConfirmed);
      } else userConfirmed();
    });
    
  }

  //? GET request
  public static GET = async (data: IRequest): Promise<any> => {
    const abort = new AbortController();
    const { controller, action, query } = data;
    const onlyQuery = !action && query;
    const HEADERS = Connection.createHeaders(false);
    !data.unabortable && window.abortableRequests.push(abort);
    try {
      const response = await fetch(`${Enviroment.BASE_URL}api/${controller}${!onlyQuery ? '/' : ''}${action}${query ? `?${Connection.queryFromObject(query)}` : ''}`, {
        method: 'GET',
        headers: HEADERS,
        signal: abort.signal,
      });
    
      !data.unabortable && window.abortableRequests.splice(window.abortableRequests.indexOf(abort), 1);
      return Connection.responseRestructure(response);
    } catch (e) {
      !data.unabortable && window.abortableRequests.splice(window.abortableRequests.indexOf(abort), 1);    
      return { aborted: true };
    }
  }

  //? Request Helper for server
  public static ServerRequest = async ({ method, controller, action, body, query }: {
    method: string;
    controller: string;
    action: string;
    body?: any;
    query: { [key: string]: any },
  }) => {
    const onlyQuery = !action && query;
    const response = await nodeFetch(`${Enviroment.BASE_URL}api/${controller}${!onlyQuery ? '/' : ''}${action}${query ? `?${Connection.queryFromObject(query)}` : ''}`, {
      body,
      headers: { language: LanguageEnum.English.toString() },
      method,
    });

    return response.ok ? response.json() : {};
  }
}

export default Connection;
