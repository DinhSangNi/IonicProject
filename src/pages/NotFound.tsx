import { IonButton, IonContent, IonPage, IonText } from '@ionic/react';
import './NotFound.css';
import clsx from 'clsx';

const NotFound: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-text-center">
                <IonText color="danger">
                    <h1 className={clsx('text-title')}>404</h1>
                </IonText>
                <p>
                    Oops... page not found. Please check the URL or go back to
                    the home page.
                </p>
                <IonButton routerLink="/">Go to Home</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default NotFound;
