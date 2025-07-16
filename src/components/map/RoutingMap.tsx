// src/components/map/RoutingMap.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import Fuse from 'fuse.js';

interface RoutingMapProps {
  className?: string;
  searchQuery?: string;
  onLocationSelect?: (location: string) => void;
  showSearchBar?: boolean;
}

export default function RoutingMap({ className = "", searchQuery, onLocationSelect, showSearchBar = true }: RoutingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const routingControl = useRef<any>(null);
  const fuse = useRef<any>(null);
  const buildings = useRef<any[]>([]);
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);
  const startLatLng = useRef<L.LatLng | null>(null);
  const endLatLng = useRef<L.LatLng | null>(null);
  const userLocation = useRef<L.LatLng | null>(null);
  const locationAddedToFuse = useRef<boolean>(false);

  // Handle search query from navigation page
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== '') {
      setEndInput(searchQuery);
      // Auto-trigger search if there's a match
      const building = buildings.current.find(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
      if (building) {
        endLatLng.current = building.latlng;
        // Set start location to user location if available
        if (userLocation.current) {
          startLatLng.current = userLocation.current;
          setStartInput("Your Location");
        }
        tryRoute();
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    const initMap = async () => {
      if (mapRef.current && !mapInstance.current) {
        const map = L.map(mapRef.current).setView([28.6103, 77.0370], 17);
        mapInstance.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapInstance.current);

        mapInstance.current.locate({ setView: false, enableHighAccuracy: true });

        mapInstance.current.on('locationfound', (e: any) => {
          userLocation.current = e.latlng;
          startLatLng.current = e.latlng;
          setStartInput("Your Location");

          // Only add "Your Location" once to buildings and Fuse
          if (!locationAddedToFuse.current) {
            buildings.current.unshift({ name: "Your Location", latlng: e.latlng });
            fuse.current = new Fuse(buildings.current, { keys: ['name'], threshold: 0.3 });
            locationAddedToFuse.current = true;
          }

          // Call onLocationSelect to update parent component
          if (onLocationSelect) {
            onLocationSelect("Your Location");
          }

          L.marker(e.latlng, {
            icon: L.icon({
              iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })
          }).addTo(mapInstance.current!).bindPopup("You are here").openPopup();
        });

        const markersRes = await fetch('/markers.json');
        const markersData = await markersRes.json();
        markersData.features.forEach((f: any) => {
          const latlng = L.latLng(f.geometry.coordinates[1], f.geometry.coordinates[0]);
          buildings.current.push({ name: f.properties.name, latlng });
          L.marker(latlng, {
            icon: L.icon({
              iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            })
          }).addTo(mapInstance.current!).bindPopup(`<b>${f.properties.name}</b>`);
        });

        fuse.current = new Fuse(buildings.current, { keys: ['name'], threshold: 0.3 });

        const pathsRes = await fetch('/paths.json');
        const pathsData = await pathsRes.json();
        L.geoJSON(pathsData, {
          style: { color: '#888', weight: 2.5, dashArray: '4,4' }
        }).addTo(mapInstance.current!);
      }
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const handleSearchChange = (val: string, type: 'start' | 'end') => {
    if (type === 'start') setStartInput(val);
    else setEndInput(val);

    setActiveInput(type);
    if (!fuse.current) return setSuggestions([]);

    const results = fuse.current.search(val.trim()).map((r: any) => r.item.name);
    const uniqueSuggestions = Array.from(new Set(["Your Location", ...results]));
    setSuggestions(uniqueSuggestions.slice(0, 8));
  };

  const handleSuggestionClick = (name: string) => {
    let result;

    if (name === "Your Location" && userLocation.current) {
      result = { name: "Your Location", latlng: userLocation.current };
    } else {
      result = buildings.current.find((b) => b.name === name);
    }

    if (!result) return;

    if (activeInput === 'start') {
      setStartInput(result.name);
      startLatLng.current = result.latlng;
    } else {
      setEndInput(result.name);
      endLatLng.current = result.latlng;
    }
    setSuggestions([]);
    tryRoute();
  };

  const tryRoute = () => {
    if (!startLatLng.current || !endLatLng.current || !mapInstance.current) return;

    if (routingControl.current) {
      mapInstance.current.removeControl(routingControl.current);
    }

    routingControl.current = L.Routing.control({
      waypoints: [startLatLng.current, endLatLng.current],
      router: L.Routing.osrmv1({
        profile: 'foot',
        serviceUrl: 'http://localhost:5000/route/v1'
      }),
      lineOptions: {
        styles: [{ color: '#007bff', weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10
      },
      show: true,
      addWaypoints: false,
      routeWhileDragging: false
    }).addTo(mapInstance.current!);
  };

  return (
    <div className={`relative ${className}`}>
      {showSearchBar && (
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center p-2 z-[999] bg-white rounded-xl shadow-lg absolute top-4 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[700px]">
          <input
            value={startInput}
            onChange={(e) => handleSearchChange(e.target.value, 'start')}
            placeholder="Start Location (default: your location)"
            className="w-full px-4 py-2 border rounded-md text-sm"
          />
          <input
            value={endInput}
            onChange={(e) => handleSearchChange(e.target.value, 'end')}
            placeholder="Destination"
            className="w-full px-4 py-2 border rounded-md text-sm"
          />
          {suggestions.length > 0 && (
            <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 bg-white border rounded-md shadow z-[1000] w-[90%] sm:w-[700px] max-h-48 overflow-y-auto">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Most searched */}
      {/* Location cards removed - functionality moved to navigation page */}

      <div ref={mapRef} className="w-full h-full min-h-[650px] rounded-[30px] overflow-hidden" />
    </div>
  );
}