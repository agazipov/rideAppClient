import { MouseEvent, useRef } from "react";
import { useSetMouseMove } from "../../context/mouseMove";
import Description from "../description/Description";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Speedy from "../speedy/Speedy";
import './MainPage.css'
import Background from "../background/Background";
import { ContainerViewRide } from "../viewRide/ContainerViewRide";

export default function MainPage() {
    const mainRef = useRef(null!);
    const setMouseMove = useSetMouseMove();

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        setMouseMove({ x: event.movementX, y: event.movementY });
    };

    return (
        <div className="main" onMouseMove={handleMouseMove} ref={mainRef}>
            <Background scrollContainer={mainRef.current}/>
            <Header />
            <Description />
            <ContainerViewRide />
            <Speedy />
            <Footer />
        </div>
    )
}