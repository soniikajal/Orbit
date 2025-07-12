'use client';

// Static imports — required for L.Routing to work in Next.js
import L from 'leaflet';
import 'leaflet-routing-machine';

import { useEffect, useRef, useState } from 'react';

interface CampusMapProps {
  searchQuery?: string;
  onLocationSelect?: (location: string) => void;
}

interface Building {
  name: string;
  original: string;
  latlng: L.LatLng;
}

const CampusMapComponent: React.FC<CampusMapProps> = ({ searchQuery, onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const buildingsRef = useRef<Building[]>([]);
  const fuseRef = useRef<any>(null);
  const routingControlRef = useRef<any>(null);
  const userLocationRef = useRef<L.LatLng | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    let map: L.Map;

    const initializeMap = async () => {
      try {
        // Import Fuse.js dynamically
        const FuseModule = await import('fuse.js');
        const Fuse = FuseModule.default;

        // Fix default marker icon URLs for Leaflet
        delete (L.Icon.Default as any).prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        if (!mapRef.current || mapRef.current.clientHeight === 0) return;

        // Check if map already exists
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
          return;
        }

        // Create new map
        map = L.map(mapRef.current!, {
          center: [28.6103, 77.0370], // NSUT coordinates
          zoom: 17,
          dragging: true,
          zoomControl: false, // Disable zoom controls
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          touchZoom: true,
        });

        mapInstanceRef.current = map;
        setIsMapLoaded(true);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Try to get user location
        map.locate({
          setView: false,
          watch: false,
          enableHighAccuracy: true,
        });

        map.on('locationfound', (e: any) => {
          userLocationRef.current = e.latlng;

          const locationIcon = L.icon({
            iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          L.marker(e.latlng, { icon: locationIcon })
            .addTo(map)
            .bindPopup("You are here")
            .openPopup();
        });

        map.on('locationerror', (err: any) => {
          console.warn("Location access denied or unavailable:", err.message);
          // Don't show alert, just log the warning
        });

        // Load paths
        try {
          const pathsResponse = await fetch('/paths.json');
          const pathsData = await pathsResponse.json();
          L.geoJSON(pathsData, {
            style: { color: '#888', weight: 2.5, dashArray: '4,4' }
          }).addTo(map);
        } catch (error) {
          console.error('Error loading paths:', error);
        }

        // Load markers
        try {
          const markersResponse = await fetch('/markers.json');
          const markersData = await markersResponse.json();
          
          markersData.features.forEach((f: any) => {
            const lat = f.geometry.coordinates[1];
            const lon = f.geometry.coordinates[0];
            const name = f.properties.name;
            const latlng = L.latLng(lat, lon);
            
            buildingsRef.current.push({ name, original: name, latlng });

            const icon = L.icon({
              iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32]
            });

            const marker = L.marker(latlng, { icon }).addTo(map).bindPopup(`<b>${name}</b>`);
            
            // Add click handler for marker selection
            marker.on('click', () => {
              if (onLocationSelect) {
                onLocationSelect(name);
              }
            });
          });

          // Initialize Fuse search
          fuseRef.current = new Fuse(buildingsRef.current, {
            keys: ['name'],
            threshold: 0.4
          });
        } catch (error) {
          console.error('Error loading markers:', error);
        }

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onLocationSelect]);

  // Handle search query changes
  useEffect(() => {
    if (searchQuery && fuseRef.current && mapInstanceRef.current) {
      const results = fuseRef.current.search(searchQuery);
      if (results.length > 0) {
        const location = results[0].item;
        mapInstanceRef.current.setView(location.latlng, 19);
        
        // Optionally trigger selection callback
        if (onLocationSelect) {
          onLocationSelect(location.name);
        }
      }
    }
  }, [searchQuery, onLocationSelect]);

  // Function to search and navigate to location
  const searchLocation = (query: string) => {
    if (!fuseRef.current || !mapInstanceRef.current) return [];
    
    const results = fuseRef.current.search(query);
    return results.slice(0, 8).map((result: any) => result.item);
  };

  return (
    <div className="w-full h-full relative">
      <div 
        id="map" 
        ref={mapRef} 
        className="w-full h-full rounded-[30px] overflow-hidden"
        style={{ minHeight: '650px' }}
      />
      
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center rounded-[30px]">
          <div className="text-center text-white">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 text-white/70 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Loading Campus Map...
            </h3>
            <p className="text-white/80 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Initializing interactive map
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusMapComponent;
