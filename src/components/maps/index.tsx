import * as React from 'react';
import { withGoogleMap, GoogleMap, Marker, MarkerProps, GoogleMapProps } from 'react-google-maps';

import './style.scss';

interface IMarkerProps extends MarkerProps { key?: string | number; }

const InitMaps = withGoogleMap((props: IMapsProps) => (
  <GoogleMap
    defaultOptions={{ zoom: 16, }}
    defaultCenter={{ lat: 40.1792, lng: 44.4991 }}
  >
    {props.markers && props.markers.map((item, index) => <Marker key={index} {...item} />)}
  </GoogleMap>
));

interface IMapsProps extends GoogleMapProps {
  className?: string;
  markers?: IMarkerProps[];
};

const Maps = (props: IMapsProps) => (
  <InitMaps 
    containerElement={<div className={`P-google-maps ${props.className || ''}`} />}
    mapElement={<div className="P-google-maps-wrapper" />}
    {...props}
  />
);

export default Maps;