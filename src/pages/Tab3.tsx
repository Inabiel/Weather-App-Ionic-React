import {
  IonContent,
  IonPage,
  IonItem,
  IonList,
  IonAvatar,
  IonLabel,
} from '@ionic/react';
import Header from '../components/Header';
import './Tab3.css';
import { useState, useEffect } from 'react';
import moment from 'moment';

const Tab3: React.FC = () => {
  const [weather, setWeather] = useState<any>({});
  const [isDataExist, setIsdataExist] = useState(false);

  useEffect(() => {
    let favouriteWeather = JSON.parse(localStorage.getItem('favourite')!);
    setWeather(favouriteWeather);
    setIsdataExist(true);
  }, []);

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen color="dark">
        {isDataExist === true && (
          <div>
            {weather.map((weather) => (
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
                    </IonItem>
                  </IonList>
                ))}
              </div>
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
