import './About.css'

export default function About() {
    return (
        <div className="description__about">
            Ежедневные маршруты
            <div className='about__schedule'>
                <div>
                    • 09:00  Бакал-Сатка-Челябинск<br />
                    • 16:00  Бакал-Сатка-Челябинск<br />
                </div>
                <div>
                    • 12:30  Челябинск-Сатка-Бакал<br />
                    • 19:30  Челябинск-Сатка-Бакал<br />
                </div>
            </div>
            <br />
            <p>
                Забронировать поездку можно по телефонам: <br />
                <a href="tel:+79193580101">+7(919)-358-01-01</a><br />
                <a href="tel:+79823690982">+7(982)-369-09-82</a> <br />
                {/* <span>Сергей </span><a href="tel:+79124797066">+7(912)-479-70-66</a> < br /> */}
                Или написать нам в <a href="https://t.me/+gJWC4yA0Vu05NDIy" target="_blank" rel="noreferrer">Телеграм</a>
            </p>
        </div>
    )
}