import { useGetRouteQuery } from "../../../../redux/api/api";
import { ViewRide } from "../ViewRide/ViewRide";
import './ContainerViewRide.css';

export default function ContainerViewRide() {
    const { data, isLoading, error } = useGetRouteQuery();

    if (error) {
        return (
            <div className="containerViewRide">Ошибка</div>
        )
    }

    if (isLoading) {
        return (
            <div className="containerViewRide">Загрузка</div>
        )
    }

    if (!data) {
        return (
            <div className="containerViewRide">Нет данных</div>
        )
    }
    
    return (
        <ViewRide events={data}/>
    )
}