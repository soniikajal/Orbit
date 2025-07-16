'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// ✅ Static imports — required for L.Routing to work in Next.js
import L from 'leaflet';
import 'leaflet-routing-machine';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => Promise.resolve(LeafletMap), { ssr: false });

function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    let routingControl: any = null;
    let buildings: any[] = [];
    let fuse: any = null;
    let userLocation: any = null;
    let startLatLng: any = null;
    let endLatLng: any = null;

    import('fuse.js').then((FuseModule) => {
      const Fuse = FuseModule.default;

      delete (L.Icon.Default as any).prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapRef.current || mapRef.current.clientHeight === 0) return;

      if ((mapRef.current as any)._leaflet_map_instance) {
        map = (mapRef.current as any)._leaflet_map_instance;
        map.invalidateSize();
      } else {
        map = L.map(mapRef.current!, {
          zoom: 17,
          dragging: true,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          tap: true,
          touchZoom: true,
        });

        (mapRef.current as any)._leaflet_map_instance = map;

        setTimeout(() => map.invalidateSize(), 100);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
      }

      map.locate({
        setView: true,
        watch: false,
        enableHighAccuracy: true,
      });

      map.on('locationfound', (e: any) => {
        userLocation = e.latlng;

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

        if (!startLatLng) startLatLng = userLocation;
      });

      map.on('locationerror', (err: any) => {
        console.error("❌ Location access denied:", err.message);
        alert("Location access denied or unavailable.");
      });

      fetch('/paths.json')
        .then(res => res.json())
        .then(data => {
          L.geoJSON(data, {
            style: { color: '#888', weight: 2.5, dashArray: '4,4' }
          }).addTo(map);
        });

      fetch('/markers.json')
        .then(res => res.json())
        .then(data => {
          data.features.forEach((f: any) => {
            const lat = f.geometry.coordinates[1];
            const lon = f.geometry.coordinates[0];
            const name = f.properties.name;
            const latlng = L.latLng(lat, lon);
            buildings.push({ name, original: name, latlng });

            const icon = L.icon({
              iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32]
            });

            L.marker(latlng, { icon }).addTo(map).bindPopup(`<b>${name}</b>`);
          });

          fuse = new Fuse(buildings, {
            keys: ['name'],
            threshold: 0.4
          });
        });

      const startInput = document.getElementById('startInput') as HTMLInputElement;
      const endInput = document.getElementById('endInput') as HTMLInputElement;
      const suggestions = document.getElementById('suggestions') as HTMLDivElement;

      function showSuggestions(inputEl: HTMLInputElement, isStart: boolean) {
        const val = inputEl.value.trim();
        if (!val || !fuse) return (suggestions.style.display = 'none');
        suggestions.innerHTML = '';
        fuse.search(val).slice(0, 8).forEach((result: any) => {
          const div = document.createElement('div');
          div.className = 'suggestion';
          div.textContent = result.item.name;
          div.onclick = () => {
            inputEl.value = result.item.original;
            suggestions.style.display = 'none';
            if (isStart) startLatLng = result.item.latlng;
            else endLatLng = result.item.latlng;
            tryRouting();
          };
          suggestions.appendChild(div);
        });
        suggestions.style.display = 'block';
      }

      startInput?.addEventListener('input', () => showSuggestions(startInput, true));
      endInput?.addEventListener('input', () => showSuggestions(endInput, false));
      document.addEventListener('click', e => {
        if (!(e.target as HTMLElement).closest('#searchBox')) suggestions.style.display = 'none';
      });

      function tryRouting() {
        if (!startLatLng || !endLatLng) return;

        if (!L.Routing || !L.Routing.control) {
          alert("Leaflet Routing Machine plugin failed to load.");
          return;
        }

        if (routingControl) map.removeControl(routingControl);

        routingControl = L.Routing.control({
          waypoints: [startLatLng, endLatLng],
          router: L.Routing.osrmv1({
            profile: 'foot',
            serviceUrl: 'https://nsut-osrm.onrender.com/route/v1'
          }),
          lineOptions: { styles: [{ color: '#007bff', weight: 5 }] },
          show: true,
          addWaypoints: true,
          routeWhileDragging: true,
          createMarker: () => null
        }).addTo(map);

        routingControl.on('routesfound', (e: any) => {
          const route = e.routes[0];
          document.getElementById('distance')!.innerText = `${Math.round(route.summary.totalDistance)} m`;
          document.getElementById('duration')!.innerText = `${Math.round(route.summary.totalTime / 60)} min`;
          document.getElementById('route-summary')!.style.display = 'block';
        });
      }

      (window as any).clearRoute = function clearRoute() {
        if (routingControl) map.removeControl(routingControl);
        routingControl = null;
        startLatLng = userLocation;
        endLatLng = null;
        startInput.value = '';
        endInput.value = '';
        document.getElementById('route-summary')!.style.display = 'none';
        suggestions.style.display = 'none';
      };
    });

    return () => map && map.remove();
  }, []);

  return (
    <>
      <div id="searchBox">
        <input id="startInput" className="searchInput" placeholder="Start location (default: your location)" />
        <input id="endInput" className="searchInput" placeholder="Destination..." />
        <div id="suggestions"></div>
      </div>
      <div id="map" ref={mapRef}></div>
      <div id="route-summary">🚶 Route: <span id="distance"></span> • <span id="duration"></span></div>
      <button id="clearBtn" onClick={() => (window as any).clearRoute()}>
        Clear Route
      </button>
    </>
  );
}

export default function Page() {
  return <MapWithNoSSR />;
}
