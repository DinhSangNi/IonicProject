import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { IonButton } from "@ionic/react";
import "./Intro.css";
import { ReactNode } from "react";
import {
    memeCat1 as slide1,
    memeCat2 as slide2,
    memeCat3 as slide3,
} from "../assets";

type Props = {
    onFinish: () => void;
};

type SwiperButtonNextProps = {
    children: ReactNode;
};

const SwiperButtonNext: React.FC<SwiperButtonNextProps> = ({
    children,
}: SwiperButtonNextProps) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

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
    );
};

export default Intro;
