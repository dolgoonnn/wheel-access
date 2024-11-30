import { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { CustomMarker } from './CustomMarker';
import { MapLocation } from './types';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

interface MapComponentProps {
  locations: MapLocation[];
  center: [number, number];
  zoom: number;
}

export function MapComponent({ locations, center, zoom }: MapComponentProps) {
  useEffect(() => {
    // Workaround for map container sizing issues
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-[600px] w-full rounded-lg shadow-lg"
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={100}
      >
        {locations.map((location) => (
          <CustomMarker key={location.id} location={location} />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}