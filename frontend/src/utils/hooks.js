import { useEffect, useState } from "react";
import { getCityOfUserApi } from "./axios";

export function useLocalStorage() {
  function setToLocalStorage(obj) {
    for (let i in obj) {
      localStorage.setItem(i, obj[i]);
    }
  }

  function removeFromLocalStorage(arr) {
    for (let i of arr) {
      localStorage.removeItem(i);
    }
  }

  return [setToLocalStorage, removeFromLocalStorage];
}

export function useUserCity() {
  const [city, setCity] = useState(null);

  async function getCity(latitude, longitude) {
    let data = await getCityOfUserApi({ latitude, longitude });

    setCity(data.data?.EnglishName);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getCity(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  return city;
}
