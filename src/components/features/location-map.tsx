
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { toast } from "@/components/ui/sonner";
import { LocateFixed, RefreshCcw } from "lucide-react";

interface LocationMapProps {
  className?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  useCurrentLocation?: boolean;
}

// Default Mapbox token
const DEFAULT_MAPBOX_TOKEN = "pk.eyJ1IjoiYnJhbWJoYXR0YWJoaXNoZWsiLCJhIjoiY21hZWh5aDI1MDdtNTJsc2Y1NTNiZHcwdiJ9.GqrCge76mzWlS6c9WcfOhQ";

// Custom popup style injection
const injectCustomPopupStyles = () => {
  // Check if custom styles are already injected
  if (!document.getElementById('mapbox-custom-popup-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'mapbox-custom-popup-styles';
    styleElement.innerHTML = `
      .mapboxgl-popup {
        animation: popup-fade-in 0.3s ease forwards;
      }
      
      .mapboxgl-popup-content {
        background: rgba(30, 34, 47, 0.85) !important;
        color: #fff !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        padding: 16px !important;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .mapboxgl-popup-content h3 {
        color: #9b87f5 !important;
        margin-top: 0 !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        margin-bottom: 8px !important;
      }
      
      .mapboxgl-popup-content p {
        color: #fff !important;
        margin: 0 0 4px 0 !important;
      }
      
      .mapboxgl-popup-content .text-xs {
        color: rgba(255, 255, 255, 0.7) !important;
        font-size: 0.75rem !important;
      }
      
      .mapboxgl-popup-content .text-sm {
        font-size: 0.875rem !important;
        color: #fff !important;
      }
      
      .mapboxgl-popup-content .font-medium {
        font-weight: 500 !important;
      }
      
      .mapboxgl-popup-content .font-bold {
        font-weight: 700 !important;
      }
      
      .mapboxgl-popup-content .text-gray-500 {
        color: rgba(255, 255, 255, 0.7) !important;
      }
      
      .mapboxgl-popup-content .mt-2 {
        margin-top: 0.5rem !important;
      }
      
      .mapboxgl-popup-close-button {
        color: #fff !important;
        font-size: 22px !important;
        padding: 5px 8px !important;
      }
      
      .mapboxgl-popup-tip {
        border-top-color: rgba(30, 34, 47, 0.85) !important;
        border-bottom-color: rgba(30, 34, 47, 0.85) !important;
      }
      
      @keyframes popup-fade-in {
        0% {
          opacity: 0;
          transform: translateY(10px) scale(0.95);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      .mapboxgl-popup.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
        border-top-color: rgba(30, 34, 47, 0.85) !important;
      }
      
      .mapboxgl-popup.mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
        border-bottom-color: rgba(30, 34, 47, 0.85) !important;
      }
      
      .mapboxgl-popup.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
        border-right-color: rgba(30, 34, 47, 0.85) !important;
      }
      
      .mapboxgl-popup.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
        border-left-color: rgba(30, 34, 47, 0.85) !important;
      }
    `;
    document.head.appendChild(styleElement);
  }
};

export function LocationMap({ 
  className, 
  lat = 37.7749, // Default to San Francisco coordinates
  lng = -122.4194, 
  zoom = 14,
  useCurrentLocation = true
}: LocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const popup = useRef<mapboxgl.Popup | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(DEFAULT_MAPBOX_TOKEN);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [accuracyRadius, setAccuracyRadius] = useState<number | null>(null);
  const [placeName, setPlaceName] = useState<string | null>(null);

  // Inject custom styles when component mounts
  useEffect(() => {
    injectCustomPopupStyles();
  }, []);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapboxToken(e.target.value);
  };

  // Function to fetch place name from coordinates using Mapbox Geocoding API
  const fetchPlaceName = async (longitude: number, latitude: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}&language=en&types=place,locality,neighborhood,address`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch place name");
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        // Use the most detailed place name available
        setPlaceName(data.features[0].place_name);
        return data.features[0].place_name;
      } else {
        setPlaceName("Unknown location");
        return "Unknown location";
      }
    } catch (error) {
      console.error("Error fetching place name:", error);
      setPlaceName("Location name unavailable");
      return "Location name unavailable";
    }
  };

  // Get current location using browser's geolocation API with maximum accuracy
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    setIsLoading(true);
    toast.info("Getting your precise location... Please wait");
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { longitude, latitude, accuracy } = position.coords;
        setCurrentLocation([longitude, latitude]);
        setAccuracyRadius(accuracy);
        setLocationError(null);
        
        // Fetch place name before updating the map
        const locationName = await fetchPlaceName(longitude, latitude);
        
        setIsLoading(false);
        setIsLocating(false);
        
        // If map is already initialized, update its center
        if (map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 17, // Zoom in even closer for more precision
            essential: true
          });
          
          // Update marker position or create new one
          if (marker.current) {
            marker.current.setLngLat([longitude, latitude]);
          } else {
            marker.current = new mapboxgl.Marker({ 
              color: "#FF0000",
              draggable: false
            })
              .setLngLat([longitude, latitude])
              .addTo(map.current);
          }
          
          // Draw accuracy circle if we have accuracy data
          addAccuracyCircle(map.current, [longitude, latitude], accuracy);
          
          // Update or add popup with precise location info - now attached directly to the marker
          if (popup.current) {
            popup.current.remove();
          }
          
          popup.current = new mapboxgl.Popup({ 
            offset: 25, 
            closeButton: true, 
            className: "animated-popup",
            closeOnClick: false // Keep popup open until manually closed
          })
            .setLngLat([longitude, latitude])
            .setHTML(`
              <h3 class="font-bold">Your Current Location</h3>
              <p class="text-sm font-medium">${locationName}</p>
              <div class="text-xs text-gray-500 mt-2">
                <p>Latitude: ${latitude.toFixed(6)}</p>
                <p>Longitude: ${longitude.toFixed(6)}</p>
                <p>Accuracy: ±${Math.round(accuracy)} meters</p>
              </div>
            `)
            .addTo(map.current);

          toast.success(`Location found: ${locationName.split(',')[0]} (±${Math.round(accuracy)}m accuracy)`);
        } else {
          // Initialize map with current location
          initializeMap(longitude, latitude, 17); // Higher zoom level for better precision
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Could not get your location";
        
        switch(error.code) {
          case 1:
            errorMessage = "Location access denied. Please enable location permissions in your browser settings.";
            break;
          case 2:
            errorMessage = "Location unavailable. Try again outdoors or check your device GPS.";
            break;
          case 3:
            errorMessage = "Location request timed out. Please try again in an area with better GPS signal.";
            break;
        }
        
        setLocationError(errorMessage);
        setIsLoading(false);
        setIsLocating(false);
        toast.error(errorMessage);
        
        // Initialize with default location if there's an error
        initializeMap(lng, lat);
      },
      {
        enableHighAccuracy: true,  // Request the best possible results
        timeout: 20000,            // Wait up to 20 seconds for a more accurate response
        maximumAge: 0              // Don't use a cached position
      }
    );
  };

  // Add an accuracy circle around the user's location
  const addAccuracyCircle = (mapInstance: mapboxgl.Map, center: [number, number], radiusInMeters: number) => {
    // Remove any existing accuracy circle
    if (mapInstance.getSource('accuracy-circle')) {
      mapInstance.removeLayer('accuracy-fill');
      mapInstance.removeLayer('accuracy-border');
      mapInstance.removeSource('accuracy-circle');
    }
    
    // Create a GeoJSON source for the circle
    mapInstance.addSource('accuracy-circle', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: center
        },
        properties: {
          radius: radiusInMeters
        }
      }
    });
    
    // Add the accuracy circle fill
    mapInstance.addLayer({
      id: 'accuracy-fill',
      type: 'circle',
      source: 'accuracy-circle',
      paint: {
        'circle-radius': {
          stops: [
            [0, 0],
            [20, radiusInMeters / 0.075] // Scale radius based on zoom level
          ],
          base: 2
        },
        'circle-color': '#4285F4',
        'circle-opacity': 0.15
      }
    });
    
    // Add the accuracy circle border
    mapInstance.addLayer({
      id: 'accuracy-border',
      type: 'circle',
      source: 'accuracy-circle',
      paint: {
        'circle-radius': {
          stops: [
            [0, 0],
            [20, radiusInMeters / 0.075] // Scale radius based on zoom level
          ],
          base: 2
        },
        'circle-color': '#4285F4',
        'circle-opacity': 0.3,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#4285F4'
      }
    });
  };

  const initializeMap = async (longitude = lng, latitude = lat, zoomLevel = zoom) => {
    if (!mapContainer.current || !mapboxToken) return;

    setIsLoading(true);
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      if (map.current) {
        map.current.remove();
      }
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: zoomLevel,
        interactive: true,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      
      // Add scale control for distance context
      map.current.addControl(new mapboxgl.ScaleControl(), "bottom-left");

      // Add geolocate control
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }),
        "bottom-right"
      );

      // Add marker at location
      marker.current = new mapboxgl.Marker({ 
        color: "#FF0000", 
        draggable: false 
      })
        .setLngLat([longitude, latitude])
        .addTo(map.current);

      // If we're initializing with current location, get the place name
      let locationName = "Our Location";
      if (currentLocation || useCurrentLocation) {
        // Only fetch if not already fetched
        if (!placeName) {
          locationName = await fetchPlaceName(longitude, latitude);
        } else {
          locationName = placeName;
        }
      }

      // Add popup with info - now attached directly to the marker
      const popupContent = currentLocation || useCurrentLocation
        ? `
          <h3 class="font-bold">Your Location</h3>
          <p class="text-sm font-medium">${locationName}</p>
          <div class="text-xs text-gray-500 mt-2">
            <p>Latitude: ${latitude.toFixed(6)}</p>
            <p>Longitude: ${longitude.toFixed(6)}</p>
            ${accuracyRadius ? `<p>Accuracy: ±${Math.round(accuracyRadius)} meters</p>` : ''}
          </div>
        `
        : "<h3 class=\"font-bold\">Our Office</h3><p>123 Innovation Street<br>Tech City, TC 12345</p>";
        
      popup.current = new mapboxgl.Popup({ 
        offset: 25, 
        closeButton: true,
        className: "animated-popup",
        closeOnClick: false // Keep popup open until manually closed
      })
        .setLngLat([longitude, latitude])
        .setHTML(popupContent)
        .addTo(map.current);
      
      // If we have accuracy data, add the accuracy circle
      if (currentLocation && accuracyRadius) {
        map.current.on('load', () => {
          addAccuracyCircle(map.current!, currentLocation, accuracyRadius!);
        });
      }
        
      map.current.on('load', () => {
        setIsTokenValid(true);
        setIsLoading(false);
      });
      
      map.current.on('error', () => {
        setIsTokenValid(false);
        setIsLoading(false);
      });
      
    } catch (error) {
      console.error("Error initializing map:", error);
      setIsTokenValid(false);
      setIsLoading(false);
    }
  };

  // Initialize map on component mount
  useEffect(() => {
    if (useCurrentLocation) {
      getCurrentLocation();
    } else {
      initializeMap();
    }
    
    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  if (!isTokenValid) {
    return (
      <div className={`${className} flex flex-col items-center justify-center bg-card p-6`}>
        <div className="max-w-md w-full space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-medium">Mapbox API Key Required</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Please enter your Mapbox public access token to display the map.
              You can get one for free at{" "}
              <a 
                href="https://account.mapbox.com/access-tokens/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={mapboxToken}
              onChange={handleTokenChange}
              placeholder="Enter Mapbox public token"
              className="flex-1 p-2 border rounded-md bg-background focus:ring-2 focus:ring-primary/50"
            />
            <button 
              onClick={() => useCurrentLocation ? getCurrentLocation() : initializeMap()}
              disabled={isLoading || !mapboxToken}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Load Map"}
            </button>
          </div>
          
          {isTokenValid === false && mapboxToken && !isLoading && (
            <p className="text-sm text-red-500">
              Invalid API key. Please check your Mapbox token and try again.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={mapContainer} className="w-full h-full relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        {locationError && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-100 text-red-700 p-3 rounded-md text-sm z-10 shadow-md border border-red-200">
            <div className="flex items-center">
              <div className="mr-2 flex-shrink-0">⚠️</div>
              <div>{locationError}</div>
            </div>
          </div>
        )}
        {useCurrentLocation && (
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <button 
              onClick={getCurrentLocation}
              disabled={isLocating}
              className="bg-primary p-3 rounded-md shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center text-white"
              title="Get precise current location"
            >
              {isLocating ? (
                <RefreshCcw className="h-5 w-5 animate-spin" />
              ) : (
                <LocateFixed className="h-5 w-5" />
              )}
            </button>
            <div className="bg-white/90 p-2 rounded-md shadow-md text-xs text-center">
              {isLocating ? "Getting location..." : "Click for precise location"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
