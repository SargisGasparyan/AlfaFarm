import * as React from 'react';

import HelperPureComponent from 'platform/classes/helper-pure-component';
import DispatcherChannels from 'platform/constants/dispatcher-channels';
import { southWestArmenia, northEastArmenia } from 'platform/constants';
import { IYandexPlace } from 'platform/constants/interfaces';

import './style.scss';

interface IProps {
  suggestDisabled?: boolean;
  onPlaceSelect?(selected: IYandexPlace): void;
};

class YandexAutocomplete extends HelperPureComponent<IProps & React.HTMLProps<HTMLInputElement>, {}> {
  
  private inputRef = React.createRef<HTMLInputElement>();

  private suggestView: any = null;

  public componentDidMount() {
    window.ymaps && window.ymaps.SuggestView ? this.loadSuggest() : window.addEventListener(DispatcherChannels.YMapsSDKLoad, this.loadSuggest);
  }

  public componentDidUpdate(prevProps: IProps) {
    const { suggestDisabled } = this.props;
    if (prevProps.suggestDisabled !== suggestDisabled)
      suggestDisabled ? this.suggestView && this.suggestView.destroy() : this.loadSuggest();
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener(DispatcherChannels.YMapsSDKLoad, this.loadSuggest);
  }

  private loadSuggest = () => {
    if (window.ymaps && window.ymaps.SuggestView && this.inputRef.current) {
      this.suggestView = new window.ymaps.SuggestView(this.inputRef.current, { results: 6, boundedBy: [ southWestArmenia, northEastArmenia ] });
      this.suggestView.events.add('select', this.onSelect);
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
