import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import MapView, { Marker } from 'react-native-maps';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env"

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination)
  // Reference to map, attached to MapView within component.
  const mapRef = useRef(null);
  const dispatch = useDispatch()

  // Run this process when origin or destination updates.
  // Zoom and fit to the markers, defined in the Marker 'identifier' attribute
  useEffect(() => {
    if (!origin || !destination) return;
    
    //  mapRef.current.fitToCoordinates([origin, destination], {
    //   edgePadding: { top: 50, right: 50, bottom: 50, left: 50}
    // })
    mapRef.current.fitToSuppliedMarkers(['origin','destination'], false)
  }, [origin, destination])

  // Calculate travel time. req data from API, store in redux store, then pull it
  useEffect(() => {
    if (!origin || !destination) return;

    //  Async because of GET request to API, 
    const getTravelTime = async() => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
      .then(res => res.json())
      .then(data => {
        // Set the travel tiem information from api into store
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
      })
    }

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY])

  // may need production level imports for independant launch to stores in production otherwise may encounter error
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      // removed *initial* from initialRegion to stop android crash. this only costed me several hours of my life to figure out.
      region={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      >
        {/* If origin and destination exist, render mapview directions*/}
        {origin && destination && (
          <MapViewDirections 
           origin={origin.description}
           destination={destination.description}
           apikey={GOOGLE_MAPS_APIKEY}
           strokeWidth={3}
           strokeColor="black"
          />
        )}
      {/* Optional origin and destination*/}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }} 
          title="Origin"
          description={origin.description}
          identifier="origin"
          focusable
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }} 
          title="Destination"
          description={origin.description}
          identifier="destination"
          focusable
        />
      )}
      </MapView>
  );
};

export default Map;