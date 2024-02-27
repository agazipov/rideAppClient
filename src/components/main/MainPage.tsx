import Calendar from "../calendar/Calendar";
import Description from "../description/Description";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import './MainPage.css'

export default function MainPage() {
    return (
        <div className="container">
            <div className="main">
                <Header />
                <Description />
                <Calendar />
                <Footer />
            </div>
        </div>
    )
}