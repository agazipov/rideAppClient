import { Provider } from "react-redux";
import { store } from './index';

interface IChildren {
    children: React.ReactNode
}

export function StoreProvider({children}: IChildren) {
    return <Provider store={store}>{children}</Provider>
}