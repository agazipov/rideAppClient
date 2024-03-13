import { MouseEvent, useRef } from "react";
import { useSetMouseMove } from "../../context/mouseMove";
import Calendar from "../calendar/Calendar";
import Description from "../description/Description";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Speedy from "../speedy/Speedy";
import './MainPage.css'
import Background from "../background/Background";

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
            <Calendar isAdmin={false} />
            <Speedy />
            <Footer />
        </div>
    )
}