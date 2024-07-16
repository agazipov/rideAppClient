import { animated, useScroll } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react';

import './Background.css';
import map from './map_2.png'

interface IBackGround {
    scrollContainer: React.MutableRefObject<HTMLDivElement>
}

const PATH_LENGTH = 1340.751220703125;

export default function Background({ scrollContainer }: IBackGround) {
    const ref: any = useRef();
    const [view, setView] = useState(false);

    const observer = useRef(
        new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;
            if (width < 576) {
                setView(true);
            } else {
                setView(false);
            }
        })
    );

    useEffect(() => {
        observer.current.observe(ref.current);
    },[ref, observer]);

    const { scrollYProgress } = useScroll({
        container: scrollContainer,
        default: {
            immediate: true,
        },
    });


    return (
        <div className="background" ref={ref}>
            <div className="map">
                <animated.svg
                    className="map__svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1293 453"
                    style={{
                        strokeDashoffset: scrollYProgress.to((scrollP) => {
                            return PATH_LENGTH - scrollP * PATH_LENGTH;
                        }),
                        strokeDasharray: PATH_LENGTH,
                        left: view ? scrollYProgress.to((scrollP) => {
                            return scrollP * (-1540);
                        }) : "auto",
                    }}
                >
                    <path
                        d="M68 297C80 261 107 224 144 214 174 200 187 209 203 219 210 189 244 195 273 166 292 159 
                        308 153 316 158 323 170 336 144 337 150 363 171 382 161 398 151 410 152 393 176 399 189 418 201 
                        430 204 450 204 450 204 450 204 450 204 466 204 444 241 476 230 497 234 516 266 544 272 576 301 
                        600 279 618 284 639 302 670.6667 296 697 302 803 330 880 294 961 276 1013 243 1054 254 1072 240 
                        1089 236.6667 1121 239 1123 230 1131 194 1150.3333 164 1164 131"
                        stroke="#FF0000"
                        strokeWidth="5"
                        fill="none"
                        scale="2 2"
                    />
                </animated.svg>
            </div>
        </div>
    )
}