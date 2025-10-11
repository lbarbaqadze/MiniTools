'use client'
import styles from "./Weather.module.scss"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCloud, faWind } from "@fortawesome/free-solid-svg-icons"

interface WeatherData {
    temp: number;
    humidity: number;
    wind_speed: number;
    city: string;
    icon: string;
}

export default function Weather() {
    const [city, setCity] = useState("Tbilisi");
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const fetchWeather = async (searchCity?: string) => {
        const targetCity = searchCity || city;
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&units=metric&appid=${API_KEY}`;

        const isNight = (dt: number, sunrise: number, sunset: number) => {
            return dt < sunrise || dt > sunset;
        }

        const getWeatherImage = (main: string, night: boolean) => {
            switch (main) {
                case "Clear":
                    return night ? "/images/moon2.png" : "/images/clear.png";
                case "Clouds":
                    return night ? "/images/night-cloud.png" : "/images/clouds.png";
                case "Drizzle":
                    return night ? "/images/drizzle.png" : "/images/drizzle.png";
                case "Mist":
                    return night ? "/images/mist3.png" : "/images/mist.png";
                case "Rain":
                    return night ? "/images/drizzle.png" : "/images/drizzle.png";
                case "Snow":
                    return night ? "/images/snow.png" : "/images/snow.png";
                case "Thunderstorm":
                    return night ? "/images/humidity.png" : "/images/humidity.png";
                default:
                    return night ? "/images/moon2.png" : "/images/clear.png";
            }
        }

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.cod !== 200 && data.cod !== "200") {
                console.error("City not found or API error:", data.message);
                setWeather(null);
                return;
            }

            const night = isNight(data.dt, data.sys.sunrise, data.sys.sunset);

            setWeather({
                temp: data.main.temp,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed * 3.6,
                city: data.name,
                icon: getWeatherImage(data.weather[0].main, night)
            });
        } catch (err) {
            console.error("Weather fetch error:", err);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Weather</h1>
            <div className={styles.cont1}>
                <input
                    type="text"
                    placeholder="Search"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
                />
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={styles.search}
                    onClick={() => fetchWeather()}
                />
            </div>

            {weather && (
                <>
                    <img src={weather.icon} alt="weather icon" className={styles.icon} />
                    <div className={styles.cont3}>
                        <h2 className={styles.h2}>{Math.round(weather.temp)}°C</h2>
                        <h3 className={styles.h3}>{weather.city}</h3>
                    </div>
                    <div className={styles.cont4}>
                        <div className={styles.cont41}>
                            <FontAwesomeIcon icon={faCloud} className={styles.search} />
                            <div className={styles.cont411}>
                                <p style={{ fontSize: "20px" }}>{weather.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className={styles.cont42}>
                            <FontAwesomeIcon icon={faWind} className={styles.search} />
                            <div className={styles.cont422}>
                                <p style={{ fontSize: "20px" }}>{Math.round(weather.wind_speed)} km/h</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
