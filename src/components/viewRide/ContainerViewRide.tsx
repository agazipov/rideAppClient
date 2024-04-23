import { useGetRouteQuery } from "../../redux/api/api";
import { ViewRide } from "./ViewRide";

export function ContainerViewRide() {
    const { data, isLoading } = useGetRouteQuery();

    if (isLoading) {
        return (
            <div style={{zIndex: 10}}>Загрузка</div>
        )
    }

    if (!data) {
        return (
            <div style={{zIndex: 10}}>Нет данных</div>
        )
    }
    
    return (
        <ViewRide events={data}/>
    )
}