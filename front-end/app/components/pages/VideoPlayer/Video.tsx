import {FC} from "react";

import styles from './Video.module.scss'
import {IFilm} from "@/types/film.interface";
import {useRouter} from "next/router";
import {filmApi} from "@/store/api/film.api";
import {PulseLoader} from "react-spinners";
import Head from "next/head";
import {Player} from "@/components/pages/VideoPlayer/video-player/Player";
import Comments from "@/components/pages/VideoPlayer/comments/Comments";

const Video :FC = () =>{
    const {query} = useRouter()
    const {data: video = {} as IFilm, isLoading } = filmApi.useGetFilmByIdQuery(Number(query.id), {
        skip: !query.id
    })

    if (isLoading)
        return (
            <PulseLoader
                loading={isLoading}
                color={'#c62e21'}
                style={{ position: 'absolute', top: '40%', left: '48%' }}
            />
        )

    return (
        <>
            <Head>
                <title>{video.name}</title>
            </Head>
                <div className={styles.wrapper}>
                  <Player src={video.videoPath} title={video.namePoster} link={video.id}/>
                    <Comments comments={video.comments || []} videoId={video.id}/>
                </div>
        </>
    )
}

export default Video