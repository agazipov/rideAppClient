import './Header.css';

const CONTENT_HEADER = {
    logo: 'RaidServisPatriot'
}

export default function Header() {
    return (
        <header className="header">
            <div className="header__container container">
                <div className="header__title">
                    <h1 className='header__logo' data-logo={CONTENT_HEADER.logo}>{CONTENT_HEADER.logo}</h1>
                    {/* <span>Перевозки Бакал-Сатка-Челябинск и Челябинск-Сатка-Бакал</span> */}
                </div>
                <div className="header__quote">
                    <p><q>Кто едет, тот едет. Кто не едет, тот остается.</q></p>
                </div>
            </div>
        </header>
    )
}