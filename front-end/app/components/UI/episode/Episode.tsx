import {FC} from "react";

import style from './Episode.module.scss'
import Slider from "@/components/UI/slider/Slider";
import {ISeries} from "@/types/film.interface";
import Link from "next/link";

const SliderProps = {
    zoomFactor: 20, // How much the image should zoom on hover in percent
    slideMargin: 10, // Margin on each side of slides
    maxVisibleSlides: 3,
    pageTransition: 500 // Transition when flipping pages
};

const Episode :FC<{serials: ISeries[], name: string, logo: string, id: number}> = ({serials, name, logo, id}) => {
    return (
        <div className={style.episode}>
            <Slider {...SliderProps}>
                {
                    serials.map(serial =>
                        <div key={serial.id} className={style.episodePreview}>
                            <Link href={`/serial/${id}/${serial.id}`}>
                                <img src={serial.thumbnailPath} width='450' style={{marginBottom: '1rem'}}/>
                                <span>{name + ' ' + serial.id} серия</span>
                            </Link>
                        </div>
                    )
                }
            </Slider>
        </div>
    )
}

export default Episode