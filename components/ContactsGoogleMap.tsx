"use client";

import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef } from "react";
import { MAP_BUSINESS_NAME, MAP_CENTER } from "@/lib/contacts-map";

/** Pin tip aligns to LatLng; label sits to the right (absolute, doesn't widen anchor box). */
function StudioMapMarker() {
  return (
    <div
      className="pointer-events-none relative h-[2.875rem] w-8 shrink-0 md:h-12 md:w-9"
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-1/2 h-10 w-8 -translate-x-1/2 text-neon-red md:h-11 md:w-9"
        style={{
          filter:
            "drop-shadow(0 3px 8px rgb(0 0 0 / 0.75)) drop-shadow(0 0 14px hsl(var(--neon-red) / 0.5))",
        }}
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
        />
      </svg>
      <span
        className="absolute bottom-2 left-[calc(100%+0.55rem)] max-w-[min(230px,calc(100vw-10rem))] truncate font-body text-[9px] font-semibold uppercase tracking-[0.24em] text-neon-red sm:text-[10px] md:bottom-2.5 md:tracking-[0.26em]"
        style={{
          textShadow: "0 2px 4px rgb(0 0 0 / 0.92), 0 0 20px hsl(var(--neon-red) / 0.55)",
        }}
      >
        {MAP_BUSINESS_NAME}
      </span>
    </div>
  );
}

/** Bottom-center of the pin box aligns to geographic point. */
function markerPixelOffset(width: number, height: number) {
  return { x: -(width / 2), y: -height };
}

/** Dark roadmap to sit under the existing section treatments (similar to prior embed + filter). */
const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1f2937" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#111827" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#374151" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2937" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#4b5563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#111827" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#374151" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1f2937" }],
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
];

type ContactsGoogleMapProps = {
  onReady?: () => void;
};

export default function ContactsGoogleMap({ onReady }: ContactsGoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const loadEndReportedRef = useRef(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "contacts-google-map",
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    if (loadError && !loadEndReportedRef.current && onReady) {
      loadEndReportedRef.current = true;
      onReady();
    }
  }, [loadError, onReady]);

  if (loadError) {
    if (process.env.NODE_ENV === "development") {
      console.error("[ContactsGoogleMap] Failed to load Google Maps JS API", loadError);
    }
    return null;
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <GoogleMap
      mapContainerClassName="absolute inset-0 z-0 h-full w-full"
      center={MAP_CENTER}
      zoom={17}
      onLoad={onReady}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        clickableIcons: false,
        styles: DARK_MAP_STYLES,
      }}
    >
      <OverlayView
        position={MAP_CENTER}
        mapPaneName={OverlayView.MARKER_LAYER}
        getPixelPositionOffset={markerPixelOffset}
      >
        <StudioMapMarker />
      </OverlayView>
    </GoogleMap>
  );
}
