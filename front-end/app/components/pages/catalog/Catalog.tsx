import {FC} from 'react'

import styles from './Catalog.module.scss'
import {IFilm} from "@/types/film.interface";
import VideoItemCatalog from "@/components/UI/video-item/VideoItemCatalog";

const Catalog: FC<{newVideo: IFilm[]}> = ({newVideo}) => {
	return (
		<div className={styles.recommended}>
			<div className={styles.top_block}>
				<h2>Новые фильмы</h2>
			</div>

			<div className={styles.catalog}>
				{
					newVideo.map(video => (
						<VideoItemCatalog video={video} key={video.id}/>
					))
				}
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)

}
export default Catalog
