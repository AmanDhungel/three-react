import { useEffect, useState } from "react";
import errorImg from '../assets/allowLocation.png';
import { toast } from "react-toastify";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface City {
  name: string;
  weather: { main: string; description: string }[];
  main: { temp: number; feels_like: number };
}

interface SearchCity {
  data: City;
}

const WeatherApp = () => {
  const [errorLocation, setErrorLocation] = useState<boolean>(false);
  const [cityTemp, setCityTemp] = useState<string>('');
  const [city, setCity] = useState<City | null>(null);
  const [searchCity, setSearchCity] = useState<SearchCity | null>(null);
  const [searchCityError, setSearchCityError] = useState<boolean>(false);

  useGSAP(() => {
    gsap.to('#weather', {
      duration: 0.8,
      opacity: 1,
      y: 0,
      stagger: 0.3,
      ease: 'power1.inOut',
    });
  });

  useEffect(() => {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation is not supported by this browser");
    }

    async function success(position: GeolocationPosition) {
      setErrorLocation(false);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=47308893b772a7c2246766e91b3fd82b`);
        const data: City = await response.json();
        setCity(data);
      } catch (error: any) {
        console.log(error);
        toast.warn(error.message);
      }
    }
  }, []);

  async function fetchByCity() {
    if (!cityTemp) {
      return toast.error('Fill in the input');
    }
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityTemp}&exclude=hourly,daily&appid=47308893b772a7c2246766e91b3fd82b`);
      setSearchCity(response);
    } catch (error) {
      setSearchCityError(true);
      console.log(error);
      toast.warn(`Could not find city with the name ${cityTemp}`);
    }
  }

  console.log(city, searchCity);

  function error() {
    setErrorLocation(true);
  }

  if (errorLocation) {
    return (
      <div className="flex flex-col items-center justify-center mt-5 rounded-xl p-4 bg-red-500">
        <h1 className="text-6xl text-white">Error</h1>
        <p className="text-2xl text-white">Please allow location access to proceed further and reload after allowing location</p>
        <img src={errorImg} width={500} height={200} alt="error" className="rounded-xl mt-2" />
      </div>
    );
  }

  return (
    <div className="flex text-white gap-3 h-[38.9rem] scroll-my-0 bg-black">
      <div>
        {errorLocation ? (
          <div className="flex flex-col items-center justify-center mt-5 rounded-xl p-4 bg-red-500">
            <h1 className="text-6xl text-white">Error</h1>
            <p className="text-2xl text-white">Please allow location access to proceed further and reload after allowing location</p>
            <img src={errorImg} width={500} height={200} alt="error" className="rounded-xl mt-2" />
          </div>
        ) : (
          <div className="flex flex-col text-white gap-3 opacity-0 -translate-y-[10rem]" id="weather">
            <h1 className="text-2xl capitalize tracking-wider">Your City Weather</h1>
            <div className="flex flex-col gap-3 mt-[55px]">
              <h2 className="text-lg">City: {city?.name}</h2>
              <h2 className="text-lg">Weather: {city?.weather[0].main}</h2>
              <h2 className="text-lg">Description: {city?.weather[0].description}</h2>
              <h2 className="text-lg">Temperature: {city?.main.temp && (city?.main.temp - 273.15).toFixed(2)}°C</h2>
              <h2 className="text-lg">Feels Like: {city?.main.feels_like && (city?.main.feels_like - 273.15).toFixed(2)}°C</h2>
            </div>
          </div>
        )}
      </div>
      <hr className="border-[0.5px] h-[30rem]" />
      <div className="flex flex-col text-white gap-3 opacity-0 -translate-y-[10rem]" id="weather">
        <h1 className="text-2xl capitalize tracking-wider">Search by city</h1>
        <div className="flex gap-3">
          <input type="text" onChange={(e) => setCityTemp(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchByCity()} maxLength={30} className="p-3 text-black rounded-xl" />
          <button className="p-3 bg-cyan-400 rounded-lg" onClick={fetchByCity}>Search</button>
        </div>
        {
          !searchCity && searchCityError ? (
            <h1>No City Found Yet</h1>
          ) : (
            <div className="flex flex-col gap-3">
              <h2 className="text-lg">City: {searchCity?.data.name}</h2>
              <h2 className="text-lg">Weather {searchCity?.data.weather[0].main}</h2>
              <h2 className="text-lg">Description: {searchCity?.data.weather[0].description}</h2>
              <h2 className="text-lg">Temperature: {searchCity?.data.main.temp && (searchCity?.data.main.temp - 273.15).toFixed(2)}°C</h2>
              <h2 className="text-lg">Feels Like: {searchCity?.data.main.feels_like && (searchCity?.data.main.feels_like - 273.15).toFixed(2)}°C</h2>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default WeatherApp;