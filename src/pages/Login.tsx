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
} from "@ionic/react"
import { logInOutline, personCircleOutline } from "ionicons/icons"
import FCC from "../assets/freecodecamp.png"
import { useState } from "react"
import Intro from "../components/Intro"
// import { ContextData } from "../App"

const Login: React.FC = () => {
    type User = {
        email: string
        password: string
    }
    const [introSeen, setIntroSeen] = useState(true)
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
    })
    // const userData = useContext(ContextData)
    // // console.log("data:", userData)

    console.log(user)

    const userChange = (e: CustomEvent) => {
        setUser((prev) => {
            const { name, value } = e.target as HTMLIonInputElement
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("login")
    }

    const finishIntro = (): void => {
        setIntroSeen(false)
    }

    const introAgain = (): void => {
        setIntroSeen(true)
    }

    return introSeen ? (
        <Intro onFinish={finishIntro} />
    ) : (
        <IonPage>
            <IonHeader>
                <IonToolbar color={"success"}>
                    <IonTitle>Free Code Camp</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <div className="ion-text-center ">
                    <img
                        src={FCC}
                        alt="FreeCodeCampImage"
                        width="50%"
                        height="40%"
                    />
                </div>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={login}>
                            <IonInput
                                type="email"
                                label="Email"
                                labelPlacement="floating"
                                fill="outline"
                                placeholder="freecodecamp@academy.com"
                                name="email"
                                onIonInput={userChange}
                            />
                            <IonInput
                                type="password"
                                label="Password"
                                labelPlacement="floating"
                                fill="outline"
                                name="password"
                                onIonInput={userChange}
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
                                color={"secondary"}
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
                                color={"secondary"}
                                size="small"
                                className="ion-margin-top"
                                onClick={introAgain}
                            >
                                Watch Intro Again
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Login
