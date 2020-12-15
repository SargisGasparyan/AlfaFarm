import * as React from 'react';
import Broadcast, { IChannelCallback } from 'platform/services/broadcast';

const useSubscriber = (channelName: string, callback: IChannelCallback): void => {
  const ref = React.useRef<IChannelCallback>();

  ref.current && Broadcast.unsubscribe(channelName, ref.current);
  ref.current = callback;
  Broadcast.subscribe(channelName, ref.current);

  React.useEffect(() => {
    return () => {
      console.log('mtavvv');
      ref.current && Broadcast.unsubscribe(channelName, ref.current);
    }
  }, []);
} 

export default useSubscriber;