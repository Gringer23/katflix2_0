import {FC} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import styles from "@/components/pages/VideoPlayer/Video.module.scss";
import {filmApi} from "@/store/api/film.api";
import {PulseLoader} from "react-spinners";
import {IFilm, ISeries} from "@/types/film.interface";
import {Player} from "@/components/pages/VideoPlayer/video-player/Player";
import Comments from "@/components/pages/VideoPlayer/comments/Comments";


const VideoSerial :FC = () => {
    const {query} = useRouter()

    const idSerial = query.id +'/'+ query.serialId
    const { data: film = {} as IFilm } = filmApi.useGetFilmByIdQuery(
        Number(query.id),
        {
            skip: !query?.id
        }
    )

    const {data: serial = {} as ISeries, isLoading} = filmApi.useGetSerialByIdQuery(idSerial,{
        skip: !idSerial || !query.id && !query.serialId
    })

        if (isLoading)
            return (
                <PulseLoader
                    loading={isLoading}
                    color={'#c62e21'}
                    style={{position: 'absolute', top: '40%', left: '48%'}}
                />
            )

    return (
            <>
                <Head>
                    {film.name + ' ' + serial.id} серия
                </Head>
                <div className={styles.wrapper}>
                    <Player src={serial.videoPath} title={film.namePoster} link={film.id}/>
                    <Comments comments={film.comments || []} videoId={film.id}/>
                </div>
            </>
        )
    }


export default VideoSerial