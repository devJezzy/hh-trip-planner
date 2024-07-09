import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import getGeocode from "@/utils/GeoLocation";

interface Location {
  lat: number;
  lng: number;
}

const addresses = [
  "the madras branding company",
  "Nungambakkam",
  "Anna fly over"
];

const apiKey = "AIzaSyCFQcxCyaUbVnKVMgyPhkpL5f42BPb2aaU"; // Replace with your actual API key

export default function GoogleMaps({ addresses }: { addresses: string[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
	console.log(addresses)
    const fetchLocations = async () => {
      try {
        const fetchedLocations = await Promise.all(
          addresses.map(address => getGeocode(address, apiKey))
        );
        setLocations(fetchedLocations);
      } catch (error) {
        console.error("Error fetching geocode data:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
      if (locations.length === 0) return;

      const loader = new Loader({
        apiKey: apiKey,
        version: "quarterly",
      });

      const { Map } = await loader.importLibrary("maps");

      const mapOptions: google.maps.MapOptions = {
		draggable: true,
        center: locations[0],
        zoom: 15,
        mapId: "NEXT_MAPS_TUTS",
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const { Marker } = (await loader.importLibrary("marker")) as google.maps.MarkerLibrary;

      // Loop through the locations and place a marker for each
      locations.forEach((location) => {
        new Marker({
          map: map,
          position: location,
        });
      });
    };

    initializeMap();
  }, [locations, apiKey]);

  return <div className="h-[600px]" ref={mapRef} />;
}
