import * as io from 'socket.io-client';

import Settings from './settings';
import Enviroment from './enviroment';

class Socket {
  public static connection: SocketIOClient.Socket;

  private static guestListener = () => {
    Socket.connection.on('yourId', (id: string) => Settings.guestId = id);
  }

  public static connect = () => {
    const query = new URLSearchParams();
    if (Settings.token) {
      const token = encodeURIComponent(`Bearer ${Settings.token}`);
      query.append('authorization', token);
    } else {
      query.append('webGuest', 'true');
      Settings.guestId && query.append('guestId', Settings.guestId);
    }

    Socket.connection = io.connect(Enviroment.BASE_URL, { query: query.toString(), transports: ['polling'] });
    !Settings.token && Socket.guestListener();
  }
 
  public static disconnect = () => Socket.connection && Socket.connection.disconnect();
}


export default Socket;