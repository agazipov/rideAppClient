import MainPage from "../components/main/MainPage";
import { MouseMoveProvider } from "./mouseMove";

export default function ProviderWrapper() {
    return (
        <MouseMoveProvider>
            <MainPage/>
        </MouseMoveProvider>
    )
};