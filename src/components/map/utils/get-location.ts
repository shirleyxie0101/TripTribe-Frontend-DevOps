import { Location } from '@/types/address';

export const getLocation = async (defaultLocation: Location) => {
  if (navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
      });

      return { lng: position.coords.longitude, lat: position.coords.latitude };
    } catch (err) {
      console.error('Error getting geolocation:', err);
      return defaultLocation;
    }
  } else {
    console.error('no navigator.geolocation');
    return defaultLocation;
  }
};
