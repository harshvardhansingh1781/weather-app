import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const APIKEY = "f3ffbea71d536b21ad64c20668589310";

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${APIKEY}`;

  const searchLocation = (e) => {
    e.preventDefault();
    axios
      .get(URL)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        const weather = res.data.weather[0].main;
        console.log(weather);
        const element = document.querySelector(".bg");
        switch (weather) {
          case "Rain":
            element.classList.add("rainy-bg");
            break;

          case "Thunderstorm":
            element.classList.add("thunderstorm-bg");
            break;

          case "Haze":
            element.classList.add("cloudy-bg");
            break;

          case "Clear":
            element.classList.add("clear-bg");
            break;
          case "Clouds":
            element.classList.add("cloudy-bg");
            break;

          default:
            element.classList.add("default-bg");
        }
        setLocation("");
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <div className="bg">
      <div className="container-fluid ">
        <div className="container pt-1">
          {/* <h2 className="font-weight-bold">Weather App</h2> */}
          <div className="container">
            <form onSubmit={searchLocation}>
              <div className="input-group row m-auto py-3">
                <input
                  type="text"
                  placeholder="Search City"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-control m-auto shadow"
                />
                <div className="input-group-append m-0 p-0">
                  <button
                    className="btn btn-info  form-control shadow"
                    onClick={searchLocation}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>


          <div>
            {data.main ? (
              <div>
                {/* <div className="my-5"></div> */}
                <div className="container card-detail py-2">
                  <div className="heading text-light">
                    <div className="city mt-3">
                      <h2>{data.name}</h2>
                    </div>
                    <div className="temp">
                      <h1 className="display-2 ">
                        <b>
                          {data.main ? (
                            <span>
                              {(
                                ((data.main.feels_like.toFixed() - 32) * 5) /
                                9
                              ).toFixed()}
                              °C
                            </span>
                          ) : null}
                        </b>
                      </h1>
                    </div>
                    <div className="my-5 py-5"></div>
                    <div className="my-5 py-4"></div>
                    <div className="details shadow-lg container mt-5">
                      <div className="row py-2">
                        <div className="inner-details col">
                          <h3>
                            {data.main ? (
                              <p className="bold">
                                {(
                                  ((data.main.feels_like.toFixed() - 32) * 5) /
                                  9
                                ).toFixed()}
                                °C
                              </p>
                            ) : null}
                          </h3>
                          <p className="sub-details">Feels Like</p>
                        </div>
                        <div className="inner-details col">
                          <h3>
                            {data.main ? (
                              <p className="bold">{data.main.humidity}%</p>
                            ) : null}
                          </h3>
                          <p className="sub-details">Humidity</p>
                        </div>
                        <div className="inner-details text-center col">
                          <h3>
                            {data.wind ? (
                              <div className="bold row text-center m-auto">
                                {data.wind.speed.toFixed()}{" "}
                                <h6 className="mt-2 ml-1">MPH</h6>
                              </div>
                            ) : null}
                          </h3>
                          <p className="sub-details">Wind Speed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
