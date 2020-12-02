type IChannelCallback = (data?: any) => void;

interface IChannel {
  name: string;
  callbacks: IChannelCallback[];
}

class Broadcast {

  private static listeners: IChannel[] = [];

  private static findChannel(name: string) {
    return Broadcast.listeners.find(item => item.name === name);
  }

  public static subscribe(name: string, callback: IChannelCallback) {
    const channel = Broadcast.findChannel(name);

    if (!channel) {
      Broadcast.listeners.push({
        name,
        callbacks: [callback],
      });
    } else if (channel.callbacks.some(item => item === callback)) return;
    else channel.callbacks.push(callback);
  }

  public static unsubscribe(name: string, callback: IChannelCallback) {
    const channel = Broadcast.findChannel(name);

    if (channel) {
      const existingCallbackIndex = channel.callbacks.indexOf(callback);
      channel.callbacks.splice(existingCallbackIndex, 1);
    }
  }

  public static dispatch(name: string, data?: any) {
    const channel = Broadcast.findChannel(name);
    channel && channel.callbacks.map(item => item(data));
  }
}

export default Broadcast;
