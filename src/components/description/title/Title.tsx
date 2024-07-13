import { useEffect, useState } from 'react';
import './Title.css'

const CONTENT_TITLE = {
    titleHeader: 'Сервис по перевозке и доставке',
    titleSpan: 'Нашими услугам уже воспользовались',
    titleText: ['Осуществляем перевозки по маршрутам', 'Бакал-Сатка-Челябинск и Челябинск-Сатка-Бакал']
}

export default function Title() {
    const [count, setCount] = useState(73184)
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => prev += 1)
        }, 10000);
        return () => clearInterval(interval)
    }, []);

    return (
        <div className='desc__title'>
            <h1 className='desc__header' data-header={CONTENT_TITLE.titleHeader}>{CONTENT_TITLE.titleHeader}</h1>
            <p className='desc__span' data-span={CONTENT_TITLE.titleSpan}>{CONTENT_TITLE.titleSpan}</p>
            <p className='desc__title-count'>{count}</p>
            <div >
                {CONTENT_TITLE.titleText.map((text, index) => {
                    return (
                        <p className='desc__title-text' data-text={CONTENT_TITLE.titleText[index]}>{text}</p>)
                })
                }
            </div>
        </div>
    )
}