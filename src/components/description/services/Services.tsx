import './Services.css';

const CONTENT_SERVICES = [
    {
        header: 'Пунктуальность',
        text: 'С нами легко планировать свой день, ведь мы всегда довезем вас во время'
    },
    {
        header: 'Опыт',
        text: 'Мы работаем в сегменте Ride-sharing Servis уже более 5 лет'
    },
    {
        header: 'Доверие',
        text: 'Более 70 тысяч пассажиров воспользовались нашим сервисом'
    },
    {
        header: 'Безопастность',
        text: 'У наших водителей большой опыт, а автомобили проходят ТО перед каждой поездкой'
    },
    {
        header: 'Комфорт',
        text: 'К вашим услугам уютный салон автомобилей класса Comfort'
    },
    {
        header: 'Атмосфера',
        text: 'У наших поездок всегда прекрасная атмосфера'
    },
]

export default function Services() {
    return (
        <div className='description__tabs'>
            {CONTENT_SERVICES.map((service, index) => {
                const style = index === 0 || index === 2 ? 'description__header modify' : 'description__header';
                return (
                    <div className={`description__section section_${index + 1}`}>
                        <h4 data-headerfist={service.header} className={style}>{service.header}</h4>
                        <p>
                            {service.text}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}