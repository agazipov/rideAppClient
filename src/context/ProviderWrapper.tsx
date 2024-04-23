import MainPage from "../pages/main/MainPage";
import { MouseMoveProvider } from "./mouseMove";

export default function ProviderWrapper() {
    return (
        <MouseMoveProvider>
            <MainPage/>
        </MouseMoveProvider>
    )
};