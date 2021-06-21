import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonItem,
  IonList,
  IonAvatar,
  IonLabel,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { sunnyOutline } from 'ionicons/icons';
import './Tab1.css';
import './Tab2.css';
import Axios from 'axios';
import moment from 'moment';
import Header from '../components/Header';

const Tab1: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [weather, setWeatherData] = useState<any>({});
  const [isDataExist, setIsDataExists] = useState(false);

  const setIntoFavouritePage = (props: string) => {
    let a: any = [];
    a = JSON.parse(localStorage.getItem('favourite')!) || [];
    a.push(props);
    localStorage.setItem('favourite', JSON.stringify(a));
  };

  const getWeatherData = async () => {
    try {
      const data = await Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchText}&appid=${process.env.REACT_APP_SECRET_KEY}`
      );
      const dataResponse = data.data;
      setWeatherData(dataResponse);
      setIsDataExists(true);
      localStorage.setItem('weatherList', JSON.stringify(dataResponse));
    } catch (e) {
      setWeatherData(e.message);
      setIsDataExists(true);
    }
  };

  useEffect(() => {
    let locationName = JSON.parse(localStorage.getItem('current') || '{}').name;
    const axiosData = async () => {
      let weatherData = await Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${process.env.REACT_APP_SECRET_KEY}`
      );
      setWeatherData(weatherData.data);
      setIsDataExists(true);
    };

    axiosData();
  }, []);
  return (
    <IonPage>
      <Header />

      <IonContent fullscreen color="dark">
        <h2 className="ion-text-center ion-padding-vertical nabil-margin-top">
          Masukkan Nama Kota:
        </h2>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol
              sizeLg="3"
              sizeMd="6"
              sizeSm="8"
              offsetSm="1"
              offsetMd="3"
              offsetLg="4.5"
            >
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                showCancelButton="focus"
              ></IonSearchbar>
            </IonCol>
            <IonButton
              color="light"
              onClick={() => getWeatherData()}
              onKeyPress={(e) => e.key === 'Enter' && getWeatherData()}
            >
              Search Now
            </IonButton>
          </IonRow>
          {isDataExist === true && (
            <div>
              <h2
                className="ion-text-center"
                style={{
                  padding: '10px 0px',
                }}
              >
                Forecast Around {weather.city.name} in the upcoming hour is
              </h2>
              {weather.list.map((weather) => (
                <div className="for-hovering">
                  {weather.weather.map((descWeather) => (
                    <IonList
                      key={weather.dt_txt}
                      className="list-dark"
                      lines="full"
                    >
                      <IonItem color="dark">
                        <IonAvatar slot="start">
                          <img
                            src={`http://openweathermap.org/img/wn/${descWeather.icon}@4x.png`}
                            alt=""
                            style={{}}
                          />
                        </IonAvatar>
                        <IonLabel>
                          <h1>{descWeather.main}</h1>
                          <h2
                            style={{
                              paddingTop: '15px',
                            }}
                          >
                            {moment(weather.dt_txt).format('lll')}
                          </h2>
                        </IonLabel>
                        <IonLabel slot="end">
                          <div>
                            <h2
                              style={{
                                fontSize: '1.4em',
                                color:
                                  weather.main.temp > 290 ? '#9c312c' : 'green',
                              }}
                            >
                              {(weather.main.temp - 273.15).toFixed(2)}°C
                            </h2>
                            <span
                              style={{
                                color: 'green',
                                fontSize: '1em',
                                paddingTop: '7px',
                              }}
                            >
                              {(weather.main.temp_min - 273.15).toFixed(2)}-
                              {(weather.main.temp_max - 273.15).toFixed(2)}°C
                              {weather.key}
                            </span>
                          </div>
                        </IonLabel>
                        <IonButton
                          slot="end"
                          onClick={() => setIntoFavouritePage(weather)}
                          style={{ minHeight: '35px' }}
                        >
                          Favourite
                        </IonButton>
                      </IonItem>
                    </IonList>
                  ))}
                </div>
              ))}
            </div>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Tab1;
