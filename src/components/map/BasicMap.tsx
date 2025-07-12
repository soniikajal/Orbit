'use client';

import { useEffect, useRef } from 'react';

interface BasicMapProps {
  searchQuery?: string;
  onLocationSelect?: (location: string) => void;
}

const BasicMap: React.FC<BasicMapProps> = ({ searchQuery, onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initMap = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        // Dynamic imports for client-side only
        const L = await import('leaflet');
        await import('leaflet-routing-machine');
        
        // Fix default marker icon URLs
        delete (L.Icon.Default as any).prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        if (!mapRef.current) return;

        // Create map
        const map = L.map(mapRef.current, {
          center: [28.6103, 77.0370], // NSUT coordinates
          zoom: 17,
        });

        mapInstanceRef.current = map;

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Load markers
        try {
          const response = await fetch('/markers.json');
          const data = await response.json();
          
          data.features.forEach((f: any) => {
            const lat = f.geometry.coordinates[1];
            const lon = f.geometry.coordinates[0];
            const name = f.properties.name;
            
            L.marker([lat, lon])
              .addTo(map)
              .bindPopup(`<b>${name}</b>`)
              .on('click', () => {
                if (onLocationSelect) {
                  onLocationSelect(name);
                }
              });
          });
        } catch (error) {
          console.error('Error loading markers:', error);
        }

        // Load paths
        try {
          const response = await fetch('/paths.json');
          const data = await response.json();
          
          L.geoJSON(data, {
            style: { color: '#888', weight: 2.5, dashArray: '4,4' }
          }).addTo(map);
        } catch (error) {
          console.error('Error loading paths:', error);
        }

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [onLocationSelect]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-[30px] overflow-hidden"
      style={{ minHeight: '650px' }}
    />
  );
};

export default BasicMap;
