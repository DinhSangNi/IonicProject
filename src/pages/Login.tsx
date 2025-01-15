import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonIcon,
    IonCardContent,
    useIonRouter,
} from '@ionic/react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
// import FCC from '../assets/freecodecamp.png';
import { useState } from 'react';
import Intro from '../components/Intro';
// import { ContextData } from "../App"

type User = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const [introSeen, setIntroSeen] = useState(true);
    const [user, setUser] = useState<User>({
        email: '',
        password: '',
    });
    const router = useIonRouter();

    const handleUserChange = (e: CustomEvent) => {
        setUser((prev) => {
            const { name, value } = e.target as HTMLIonInputElement;
            return {
                ...prev,
                [name]: value,
            };
        });
    };
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('login');
        router.push('/dashboard');
    };

    const handleFinishIntro = (): void => {
        setIntroSeen(false);
    };

    const handleIntroAgain = (): void => {
        setIntroSeen(true);
    };

    return introSeen ? (
        <Intro onFinish={handleFinishIntro} />
    ) : (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={handleLogin}>
                            <IonInput
                                type="email"
                                label="Email"
                                labelPlacement="floating"
                                fill="outline"
                                placeholder="example@gmail.com"
                                name="email"
                                value={user.email}
                                onIonInput={handleUserChange}
                            />
                            <IonInput
                                type="password"
                                label="Password"
                                labelPlacement="floating"
                                fill="outline"
                                name="password"
                                value={user.password}
                                onIonInput={handleUserChange}
                                className="ion-margin-top"
                            />
                            <IonButton
                                type="submit"
                                expand="block"
                                className="ion-margin-top"
                            >
                                Login
                                <IonIcon icon={logInOutline} slot="end" />
                            </IonButton>
                            <IonButton
                                type="button"
                                color={'secondary'}
                                expand="block"
                                className="ion-margin-top"
                                routerLink="/register"
                            >
                                Create Account
                                <IonIcon
                                    icon={personCircleOutline}
                                    slot="end"
                                />
                            </IonButton>
                            <IonButton
                                type="button"
                                expand="block"
                                fill="clear"
                                color={'secondary'}
                                size="small"
                                className="ion-margin-top"
                                onClick={handleIntroAgain}
                            >
                                Watch Intro Again
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Login;
