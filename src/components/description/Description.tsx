import './Description.css'
import stetemImg from './stetem.jpg'

export default function Description() {
    return (
        <section className="description container">
            <div className="description__body">
                <div className="description__about">
                    <p>
                        Приветствуем вас на нашем сайте! Мы - компания, которая предлагает услуги по ride-sharing,
                        удобному и экологичному способу передвижения, когда
                        несколько пассажиров делят машину для поездки в одном направлении. <br />
                        <br />
                        Мы рады предложить вам наши поездки, которые доступны каждый день.
                        Присоединяйтесь к нам, чтобы сэкономить время, деньги и сделать вашу поездку более приятной и удобной.
                        Мы поможем вам быстро и безопасно добраться до места назначения. < br />
                        <br />
                        Наше расписание:<br />
                        • 09:00  Бакал-Сатка-Челябинск<br />
                        • 16:00  Бакал-Сатка-Челябинск<br />
                        <br />
                        • 12:30  Челябинск-Сатка-Бакал<br />
                        • 19:30  Челябинск-Сатка-Бакал<br />
                        <br />
                        Забронировать поездку можно по телефонам: <br />
                        <span>Ксения </span><a href="tel:+79193582009">+7(919)-358-20-09</a> <span>, </span>
                        <a href="tel:+79823699189">+7(982)-369-91-89</a> < br />
                        <span>Сергей </span><a href="tel:+79124797066">+7(912)-479-70-66</a> < br />
                        Или написать в наш <a href="https://t.me/+gJWC4yA0Vu05NDIy" target="_blank" rel="noreferrer">Телеграм</a>
                    </p>
                    <div className='description__img'>
                        <img src={stetemImg} alt="background__img" width={420} />
                    </div>
                </div>
                <div className="description__tabs">
                    <div className="description__section">
                        <h4>Пунктуальность</h4>
                        <p>
                            Всегда во время
                        </p>
                    </div>
                    <div className="description__section">
                        <h4>Опыт</h4>
                        <p>
                            Работаем в сегменте Ride-sharing Servis более 5 лет
                        </p>
                    </div>
                    <div className="description__section">
                        <h4>Доверие</h4>
                        <p>
                            70 тыс. пассажиров воспользовались нашим сервисом
                        </p>
                    </div>
                    <div className="description__section">
                        <h4>Безопасность</h4>
                        <p>
                            Есть ремень безопасности
                        </p>
                    </div>
                    <div className="description__section">
                        <h4>Комфорт и т.д.</h4>
                        <p>
                            В любую погоду вашей жопке будет уютно
                        </p>
                    </div>
                    <div className="description__section">
                        <p>
                            Что-то еще
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}