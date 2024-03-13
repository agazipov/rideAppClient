import { animated, useScroll } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react';

import './Background.css';
import map from './map_2.png'

interface IBackGround {
    scrollContainer: React.MutableRefObject<HTMLDivElement>
}

const PATH_LENGTH = 1340.751220703125;

export default function Background({ scrollContainer }: IBackGround) {
    // const pathRef = useRef<SVGPathElement>(null);

    // useEffect(() => {
    //     pathLength = (pathRef.current as SVGPathElement).getTotalLength();
    // }, [pathRef]);

    const { scrollYProgress } = useScroll({
        container: scrollContainer,
        default: {
            immediate: true,
        },
    });


    return (
        <div className="background">
            <div className="map">
                <img
                    width="100%"
                    // height="48%"
                    src={map}
                    alt="map"
                />
            </div>
            <div className="path">
                <animated.svg
                    // height={371}
                    // width={1349}
                    // preserveAspectRatio="xMinYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 130.9 1295 181.5"
                    style={{
                        strokeDashoffset: scrollYProgress.to((scrollP) => {
                            return PATH_LENGTH - scrollP * PATH_LENGTH;
                        }),
                        strokeDasharray: PATH_LENGTH,
                    }}
                >
                    <path d="M68 297C80 261 107 224 144 214 174 200 187 209 203 219 210 189 244 195 273 166 292 159 
                        308 153 316 158 323 170 336 144 337 150 363 171 382 161 398 151 410 152 393 176 399 189 418 201 
                        430 204 450 204 450 204 450 204 450 204 466 204 444 241 476 230 497 234 516 266 544 272 576 301 
                        600 279 618 284 639 302 670.6667 296 697 302 803 330 880 294 961 276 1013 243 1054 254 1072 240 
                        1089 236.6667 1121 239 1123 230 1131 194 1150.3333 164 1164 131" stroke="#FF0000" stroke-width="5" fill="none" />
                </animated.svg>
            </div>
        </div>
    )
}