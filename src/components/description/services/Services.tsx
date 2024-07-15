import { CONTENT_SERVICES } from '../../../libs/constant';
import './Services.css';

export default function Services() {
    return (
        <div className='description__tabs'>
            {CONTENT_SERVICES.map((service, index) => (
                <div key={index} className={`description__section section_${index + 1}`}>
                    <h4 data-headerfist={service.header} className={index === 0 || index === 2 ? 'description__header modify' : 'description__header'}>
                        {service.header}
                    </h4>
                    <p>{service.text}</p>
                </div>
            ))}
        </div>
    )
}