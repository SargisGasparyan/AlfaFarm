import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import DispatcherChannels from 'platform/constants/dispatcher-channels';

import './style.scss';
import { southWestArmenia, northEastArmenia } from 'platform/constants';
import { IYandexPlace } from 'platform/constants/interfaces';

interface IProps {
  onPlaceSelect?(selected: IYandexPlace): void;
};

class YandexAutocomplete extends HelperPureComponent<IProps & React.HTMLProps<HTMLInputElement>, {}> {
  
  private inputRef = React.createRef<HTMLInputElement>();
  
  public componentDidMount() {
    window.ymaps && window.ymaps.SuggestView ? this.sdkLoaded() : window.addEventListener(DispatcherChannels.YMapsSDKLoad, this.sdkLoaded);
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener(DispatcherChannels.YMapsSDKLoad, this.sdkLoaded);
  }

  private sdkLoaded = () => {
    if (window.ymaps && window.ymaps.SuggestView && this.inputRef.current) {
      const suggestView = new window.ymaps.SuggestView(this.inputRef.current, { results: 6, boundedBy: [ southWestArmenia, northEastArmenia ] });
      suggestView.events.add('select', this.onSelect);
    }
  }

  private onSelect = async (e: { get(value: string): any }) => {
    const { onPlaceSelect } = this.props;
    const activeItem = e.get('item');

    if (window.ymaps && onPlaceSelect) {
      const geocodeResponse = await window.ymaps.geocode(activeItem.value);
      onPlaceSelect({
        name: activeItem.value,
        position: geocodeResponse.geoObjects.get(0).geometry.getCoordinates(),
      });
    }
  }

  public render() {
    const props = {...this.props};
    
    delete props.ref;
    delete props.onPlaceSelect;

    return <input ref={this.inputRef} {...props} />;
  }
}

export default YandexAutocomplete;
