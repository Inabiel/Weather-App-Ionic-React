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
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { sunnyOutline } from 'ionicons/icons';
import './Tab1.css';
import Axios from 'axios';

const Tab1: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [weather, setWeatherData] = useState<any>({});
  const [isDataExist, setIsDataExists] = useState(false);

  const getWeatherData = async () => {
    try {
      const data = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${process.env.REACT_APP_SECRET_KEY}`
      );
      const dataResponse = data.data;
      setWeatherData(dataResponse);
      setIsDataExists(true);
      localStorage.setItem('current', JSON.stringify(dataResponse));
    } catch (e) {
      setWeatherData(e.message);
      setIsDataExists(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('current')) {
      setWeatherData(JSON.parse(localStorage.getItem('current') || '{}'));
      setIsDataExists(true);
      console.log(weather);
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonItem color="dark" className="ion-text-center">
            <IonIcon
              slot="start"
              icon={sunnyOutline}
              className="tab-icon-size ion-text-center"
            ></IonIcon>
            Weather Application
          </IonItem>
          <IonTitle color="light"></IonTitle>
        </IonToolbar>
      </IonHeader>

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
          {isDataExist === true && Object.keys(weather).length > 7 && (
            <div>
              <IonRow>
                <IonCol>
                  <h1 className="ion-text-center" style={{ fontSize: '5em' }}>
                    {weather.name}
                  </h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  {weather.weather.map((weather) => (
                    <div>
                      <h2
                        className="ion-text-center"
                        style={{ fontSize: '2.5em' }}
                      >
                        {weather.main}
                      </h2>
                      <img
                        src={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                        alt=""
                        height="500px"
                        style={{
                          display: 'block',
                          margin: '0 auto',
                          marginTop: '-50px',
                        }}
                      />
                    </div>
                  ))}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <h1
                    className="ion-text-center"
                    style={{
                      fontSize: '1.75em',
                      color: weather.main.temp > 290 ? '#9c312c' : 'green',
                    }}
                  >
                    {(weather.main.temp - 273.15).toFixed(2)}°C
                  </h1>
                  <h1
                    className="ion-text-center"
                    style={{ fontSize: '1.75em' }}
                  >
                    Feels Like {(weather.main.feels_like - 273.15).toFixed(2)}°C
                  </h1>
                </IonCol>
              </IonRow>
            </div>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Tab1;
