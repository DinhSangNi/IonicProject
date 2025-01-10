import {
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  useIonRouter,
} from "@ionic/react";
import { checkmarkDoneOutline } from "ionicons/icons";

const Register: React.FC = () => {
  const router = useIonRouter();

  const doRegister = (e: any) => {
    e.preventDefault();
    console.log("do register");
    router.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Free Code Camp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <form onSubmit={doRegister}>
              <IonInput
                type="email"
                label="Email"
                labelPlacement="floating"
                placeholder="FreeCodeCamp@academy.com"
                fill="outline"
              />
              <IonInput
                type="password"
                label="Password"
                labelPlacement="floating"
                fill="outline"
                className="ion-margin-top"
              />
              <IonButton
                type="submit"
                className="ion-margin-top"
                expand="block"
              >
                Create My Account
                <IonIcon icon={checkmarkDoneOutline} slot="end" />
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
