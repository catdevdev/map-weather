import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

declare global {
  interface Window {
    google: any;
  }
}

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Index = ({ GOOGLE_MAP_KEY }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="">
      <Head>
        <title>Map Weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100wv", height: "100vh" }}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Index;

export async function getStaticProps() {
  // Connect to Database using DB properties
  return {
    props: {
      GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
    },
  };
}
