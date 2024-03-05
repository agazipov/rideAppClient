import './Header.css'

export default function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__title">
                    <h1>Raid Servis Patriot</h1>
                    <span>Перевозки Бакал-Сатка-Челябинск и Челябинск-Сатка-Бакал</span>
                </div>
                <div className="header__quote">
                    <p><q>Кто едет из Бакала, тот едет. Кто не едет, тот остается.</q> <br /> - Джейсон Стетхем</p>
                </div>
            </div>
        </header>
    )
}