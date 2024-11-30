import { Marker, Popup } from 'react-leaflet';
import { MapLocation } from './types';

interface CustomMarkerProps {
  location: MapLocation;
}

export function CustomMarker({ location }: CustomMarkerProps) {
  return (
    <Marker position={[location.lat, location.lng]}>
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