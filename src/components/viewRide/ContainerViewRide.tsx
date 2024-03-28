import { useGetRouteQuery } from "../../redux/api/api";
import { ViewRide } from "./ViewRide";

export function ContainerViewRide() {
    const { data, isLoading } = useGetRouteQuery();

    if (isLoading) {
        return (
            <div>Загрузка</div>
        )
    }

    if (!data) {
        return (
            <div>Нет данных</div>
        )
    }
    
    return (
        <ViewRide events={data}/>
    )
}