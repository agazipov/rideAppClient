import { useMouseMove } from "../../context/mouseMove";
import './Speedy.css'

export default function Speedy() {
    const mouseMove = useMouseMove();

    return (
        <div>
            <div className="speedy">
                <div className="arrow" style={{transform: `rotateZ(${mouseMove}deg)`, transition: 'transform 1s'}}></div>
                {mouseMove}
            </div>
        </div>
    )
}