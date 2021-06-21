import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonItem,
} from '@ionic/react';
import { sunnyOutline } from 'ionicons/icons';

const Header: React.FC = () => {
  return (
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
  );
};
export default Header;
