import { IPassengers } from "../../type/interface"
import "./salon.css"

interface ISalon {
    passengers: IPassengers,
    setPassenger?: (e: string) => void,
}

export default function Salon({ passengers, setPassenger }: ISalon) {
// если компонент не принимает функцию именения, то отрисовывает элементы без возможности клика
    return (
        <div className="grid-container">
            <div className="grid-item-1"></div>
            {setPassenger ? Object.keys(passengers).map((key, index) => {
                return (
                    <div className={`grid-item-${index + 2}`} key={index}>
                        <div className={`${passengers[key] ? 'free' : 'busy'}`} onClick={() => {
                            setPassenger(key);
                        }}></div>
                    </div>
                )
            }) : 
            Object.keys(passengers).map((key, index) => {
                return (
                    <div className={`grid-item-${index + 2}`} key={index}>
                        <div className={`${passengers[key] ? 'free' : 'busy'}`}></div>
                    </div>
                )
            })
            }
        </div>
    )
}