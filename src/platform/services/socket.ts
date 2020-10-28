import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

import Settings from './settings';
import Enviroment from './enviroment';

class Socket {
  public static connection: HubConnection;

  public static connect = () => {
    Socket.connection = new HubConnectionBuilder()
      .withUrl(`${Enviroment.BASE_URL}notificationHub`, {
        accessTokenFactory: () => Settings.token || '',
      })
      .build();

    return Socket.connection.start();
  }
 
  public static disconnect = () => Socket.connection && Socket.connection.stop();
}


export default Socket;