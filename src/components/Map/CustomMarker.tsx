import { Marker, Popup } from 'react-leaflet';
import { MapLocation } from './types';
import { DivIcon } from 'leaflet';

interface CustomMarkerProps {
  location: MapLocation;
}

const getStatusColor = (status: string) => {
  const colors = {
    SUCCESS: '#2ecc71',
    REVIEW: 'yellow'
  };
  return colors[status];
};

export function CustomMarker({ location }: CustomMarkerProps) {
  const color = getStatusColor(location.status);
  const icon = new DivIcon({
    className: 'marker-icon',
    html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%;"></div>`,
    iconSize: [30, 30]
  });

  return (
    <Marker position={[location.lat, location.lng]} icon={icon}>
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold text-lg">{location.title}</h3>
          {location.description && (
            <p className="text-gray-600 mt-1">{location.description}</p>
          )}
        </div>
      </Popup>
    </Marker>
  );
}