import { useMouseMove } from "../../context/mouseMove";
import './Speedy.css'

export default function Speedy() {
    const mouseMove = useMouseMove();

    return (
        <div className="speedy">
            {/* transform-origin: center right */}
            <div className="arrow" style={{ transform: `rotateZ(${mouseMove}deg)`, transition: 'transform 1s linear' }}></div>
        </div>
    )
}