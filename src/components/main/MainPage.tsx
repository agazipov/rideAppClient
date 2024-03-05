import { MouseEvent } from "react";
import { useSetMouseMove } from "../../context/mouseMove";
import Calendar from "../calendar/Calendar";
import Description from "../description/Description";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Speedy from "../speedy/Speedy";
import './MainPage.css'
import Background from "../Background/Background";

export default function MainPage() {
    const setMouseMove = useSetMouseMove();

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        // console.log(event.movementX);
        setMouseMove({ x: event.movementX, y: event.movementY });
    };

    return (
        <div className="main" onMouseMove={handleMouseMove}>
            <Background />
            <Header />
            <Description />
            <Calendar isAdmin={false} />
            <Speedy />
            <Footer />
        </div>
    )
}