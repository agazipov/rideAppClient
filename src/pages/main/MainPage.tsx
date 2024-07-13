import { MouseEvent, useRef } from "react";
import { useSetMouseMove } from "../../context/mouseMove";
import Description from "../../components/description/Description";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Speedy from "../../components/speedy/Speedy";
import './MainPage.css'
import Background from "../../components/background/Background";

export default function MainPage() {
    const mainRef = useRef(null!);
    const setMouseMove = useSetMouseMove();

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        setMouseMove({ x: event.movementX, y: event.movementY });
    };

    return (
        <div className="wrapper" onMouseMove={handleMouseMove} ref={mainRef}>
            <Background scrollContainer={mainRef.current} />
            <Header />
            <Description />
            <Speedy />
            <Footer />
        </div>
    )
}