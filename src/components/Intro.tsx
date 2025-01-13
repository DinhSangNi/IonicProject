import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
import slide1 from "../assets/memecat1.jpg"
import slide2 from "../assets/memecat2.jpg"
import slide3 from "../assets/memecat3.jpg"
import "swiper/css"
import { IonButton } from "@ionic/react"
import "./Intro.css"
import { ReactNode } from "react"

interface Props {
    onFinish: () => void
}

interface SwiperButtonNextProps {
    children: ReactNode
}

const SwiperButtonNext: React.FC<SwiperButtonNextProps> = ({
    children,
}: SwiperButtonNextProps) => {
    const swiper = useSwiper()
    return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>
}

const Intro: React.FC<Props> = ({ onFinish }: Props) => {
    return (
        <Swiper>
            <SwiperSlide>
                <img src={slide1} alt="Intro 1  " />
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide2} alt="" />
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide3} alt="" />
                <IonButton onClick={() => onFinish()}>Finish</IonButton>
            </SwiperSlide>
        </Swiper>
    )
}

export default Intro
